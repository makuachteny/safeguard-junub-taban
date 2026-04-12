import { pharmacyInventoryDB } from '../db';
import type { PharmacyInventoryDoc } from '../db-types';
import { v4 as uuidv4 } from 'uuid';
import type { DataScope } from './data-scope';
import { filterByScope } from './data-scope';
import { logAudit } from './audit-service';

export async function getAllInventory(scope?: DataScope): Promise<PharmacyInventoryDoc[]> {
  const db = pharmacyInventoryDB();
  const result = await db.allDocs({ include_docs: true });
  const all = result.rows
    .map(r => r.doc as PharmacyInventoryDoc)
    .filter(d => d && d.type === 'pharmacy_inventory')
    .sort((a, b) => a.medicationName.localeCompare(b.medicationName));
  return scope ? filterByScope(all, scope) : all;
}

export async function createInventoryItem(
  data: Omit<PharmacyInventoryDoc, '_id' | '_rev' | 'type' | 'createdAt' | 'updatedAt' | 'dispensedToday'>
): Promise<PharmacyInventoryDoc> {
  const db = pharmacyInventoryDB();
  const now = new Date().toISOString();
  const doc: PharmacyInventoryDoc = {
    _id: `inv-${uuidv4().slice(0, 8)}`,
    type: 'pharmacy_inventory',
    dispensedToday: 0,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  const resp = await db.put(doc);
  doc._rev = resp.rev;
  logAudit('PHARMACY_STOCK_IN', undefined, undefined,
    `${data.medicationName} stocked: ${data.stockLevel} ${data.unit} (batch ${data.batchNumber})`
  ).catch(() => {});
  return doc;
}

export async function updateInventoryItem(
  id: string,
  updates: Partial<PharmacyInventoryDoc>
): Promise<PharmacyInventoryDoc | null> {
  const db = pharmacyInventoryDB();
  try {
    const existing = await db.get(id) as PharmacyInventoryDoc;
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    const resp = await db.put(updated);
    updated._rev = resp.rev;
    return updated;
  } catch {
    return null;
  }
}

/**
 * Decrement stock for a medication by name (best-effort match).
 * Called by the pharmacy page when a prescription is dispensed.
 * If the medication isn't in inventory (e.g. new drug), this is a no-op.
 */
export async function decrementStock(
  medicationName: string,
  hospitalId: string | undefined,
  quantity: number = 1
): Promise<void> {
  const db = pharmacyInventoryDB();
  const result = await db.allDocs({ include_docs: true });
  const items = result.rows
    .map(r => r.doc as PharmacyInventoryDoc)
    .filter(d => d && d.type === 'pharmacy_inventory' && d.medicationName === medicationName);
  // Prefer the item matching the dispensing facility, fall back to any match
  const target = items.find(i => i.hospitalId === hospitalId) || items[0];
  if (!target) return;
  const now = new Date().toISOString();
  target.stockLevel = Math.max(0, target.stockLevel - quantity);
  target.dispensedToday = (target.dispensedToday || 0) + quantity;
  target.lastDispensed = now;
  target.updatedAt = now;
  await db.put(target);
}

export async function deleteInventoryItem(id: string): Promise<boolean> {
  const db = pharmacyInventoryDB();
  try {
    const doc = await db.get(id);
    await db.remove(doc);
    return true;
  } catch {
    return false;
  }
}

export function classifyStockStatus(item: PharmacyInventoryDoc): 'adequate' | 'low' | 'critical' | 'expired' {
  const today = new Date().toISOString().slice(0, 10);
  if (item.expiryDate && item.expiryDate < today) return 'expired';
  if (item.stockLevel <= 0) return 'critical';
  if (item.stockLevel < item.reorderLevel * 0.3) return 'critical';
  if (item.stockLevel < item.reorderLevel) return 'low';
  return 'adequate';
}
