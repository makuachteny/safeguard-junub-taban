'use client';

import { useState, useMemo } from 'react';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import { Pill, AlertTriangle, Search, TrendingDown, CheckCircle2, Loader2, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { usePermissions } from '@/lib/hooks/usePermissions';
import { usePrescriptions } from '@/lib/hooks/usePrescriptions';
import { usePharmacyInventory } from '@/lib/hooks/usePharmacyInventory';
import { useToast } from '@/components/Toast';
import { medications } from '@/data/mock';
import { classifyStockStatus } from '@/lib/services/pharmacy-inventory-service';

const UNITS = ['tablets', 'vials', 'bottles', 'sachets', 'tubes', 'ampoules', 'sachet', 'ml'];

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState<'queue' | 'inventory'>('queue');
  const [search, setSearch] = useState('');
  const { globalSearch, currentUser } = useApp();
  const { canDispense } = usePermissions();
  const { showToast } = useToast();
  const router = useRouter();
  const { prescriptions: rxQueue, loading: rxLoading, dispense } = usePrescriptions();
  const { items: rawInventory, create: createInventory, update: updateInventory } = usePharmacyInventory();

  const q = search || globalSearch;

  // Stock-in modal state
  const [showStockInModal, setShowStockInModal] = useState(false);
  const [stockForm, setStockForm] = useState({
    medicationName: '',
    category: 'General',
    stockLevel: 0,
    unit: 'tablets',
    reorderLevel: 50,
    batchNumber: '',
    expiryDate: '',
  });

  // Augment each inventory row with a live status classification (which
  // changes over time as stock drains or the expiry date passes).
  const inventory = useMemo(() =>
    rawInventory.map(item => ({ ...item, status: classifyStockStatus(item) })),
  [rawInventory]);

  const handleDispense = async (rxId: string) => {
    const rx = rxQueue.find(r => r._id === rxId);
    await dispense(rxId);
    if (rx) {
      const { decrementStock } = await import('@/lib/services/pharmacy-inventory-service');
      await decrementStock(rx.medication, currentUser?.hospitalId, 1).catch(() => {});
      const { logAudit } = await import('@/lib/services/audit-service');
      logAudit('DISPENSE_PRESCRIPTION', currentUser?._id, currentUser?.username, `Dispensed ${rx.medication} to ${rx.patientName} (${rxId})`).catch(() => {});
      showToast(`Dispensed ${rx.medication}`, 'success');
    }
  };

  const handleStockIn = async () => {
    if (!stockForm.medicationName.trim() || stockForm.stockLevel <= 0) {
      showToast('Medication name and stock level are required', 'error');
      return;
    }
    if (!currentUser?.hospitalId) {
      showToast('Your account is not assigned to a facility', 'error');
      return;
    }
    try {
      await createInventory({
        hospitalId: currentUser.hospitalId,
        hospitalName: currentUser.hospitalName || '',
        medicationName: stockForm.medicationName.trim(),
        category: stockForm.category,
        stockLevel: stockForm.stockLevel,
        unit: stockForm.unit,
        reorderLevel: stockForm.reorderLevel,
        batchNumber: stockForm.batchNumber.trim() || `BN${Date.now().toString(36).toUpperCase()}`,
        expiryDate: stockForm.expiryDate || new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
        lastReceived: new Date().toISOString(),
        orgId: currentUser.orgId,
      });
      showToast(`Stocked ${stockForm.medicationName}`, 'success');
      setShowStockInModal(false);
      setStockForm({ medicationName: '', category: 'General', stockLevel: 0, unit: 'tablets', reorderLevel: 50, batchNumber: '', expiryDate: '' });
    } catch (err) {
      console.error(err);
      showToast('Failed to save stock receipt', 'error');
    }
  };

  const handleReceive = async (itemId: string) => {
    const qty = parseInt(prompt('Quantity to add to stock:') || '0');
    if (!qty || qty <= 0) return;
    const existing = inventory.find(i => i._id === itemId);
    if (!existing) return;
    await updateInventory(itemId, {
      stockLevel: existing.stockLevel + qty,
      lastReceived: new Date().toISOString(),
    });
    showToast(`Added ${qty} ${existing.unit} to ${existing.medicationName}`, 'success');
  };

  const pendingRx = rxQueue.filter(r => r.status === 'pending').length;
  const dispensedRx = rxQueue.filter(r => r.status === 'dispensed').length;
  const lowStock = inventory.filter(i => i.status === 'low' || i.status === 'critical').length;
  const expiredItems = inventory.filter(i => i.status === 'expired').length;

  const filteredInventory = inventory.filter(i =>
    !q || i.medicationName.toLowerCase().includes(q.toLowerCase()) || i.category.toLowerCase().includes(q.toLowerCase())
  );

  const filteredQueue = rxQueue.filter(rx =>
    !q || rx.patientName.toLowerCase().includes(q.toLowerCase()) || rx.medication.toLowerCase().includes(q.toLowerCase()) || rx.prescribedBy.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <TopBar title="Pharmacy" />
      <main className="page-container page-enter">
          <PageHeader
            icon={Pill}
            title="Pharmacy Management"
            subtitle="Dispense medications and manage inventory"
            actions={canDispense && (
              <button onClick={() => setShowStockInModal(true)} className="btn btn-primary">
                <Plus className="w-4 h-4" /> Receive Stock
              </button>
            )}
          />

          {/* Stats */}
          <div className="kpi-grid mb-4">
            {[
              { label: 'Pending Prescriptions', value: pendingRx, icon: Pill, color: 'var(--color-warning)', bg: 'rgba(252,211,77,0.10)' },
              { label: 'Dispensed Today', value: dispensedRx, icon: CheckCircle2, color: 'var(--accent-primary)', bg: 'rgba(0,119,215,0.12)' },
              { label: 'Low Stock Items', value: lowStock, icon: TrendingDown, color: 'var(--color-danger)', bg: 'rgba(229,46,66,0.10)' },
              { label: 'Expired Items', value: expiredItems, icon: AlertTriangle, color: '#F87171', bg: 'rgba(229,46,66,0.12)' },
            ].map(s => (
              <div key={s.label} className="kpi cursor-pointer" onClick={() => {
                const tabMap: Record<string, 'queue' | 'inventory'> = { 'Pending Prescriptions': 'queue', 'Dispensed Today': 'queue', 'Low Stock Items': 'inventory', 'Expired Items': 'inventory' };
                setActiveTab(tabMap[s.label] || 'queue');
              }}>
                <div className="kpi__icon" style={{ background: s.bg }}>
                  <s.icon style={{ color: s.color }} />
                </div>
                <div className="kpi__body">
                  <div className="kpi__value">{s.value}</div>
                  <div className="kpi__label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b mb-4" style={{ borderColor: 'var(--border-light)' }}>
            <button onClick={() => setActiveTab('queue')}
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'queue' ? 'tab-active' : ''}`}
              style={{ color: activeTab === 'queue' ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
              Prescription Queue ({pendingRx})
            </button>
            <button onClick={() => setActiveTab('inventory')}
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'inventory' ? 'tab-active' : ''}`}
              style={{ color: activeTab === 'inventory' ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
              Inventory ({inventory.length})
            </button>
          </div>

          {activeTab === 'queue' && (
            <div className="card-elevated overflow-hidden">
              {rxLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--text-muted)' }} />
                </div>
              ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Prescribed By</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueue.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-sm" style={{ color: 'var(--text-muted)' }}>
                        No prescriptions found. Prescriptions will appear here when doctors save consultations.
                      </td>
                    </tr>
                  ) : filteredQueue.map(rx => (
                    <tr key={rx._id} className="cursor-pointer hover:bg-[var(--table-row-hover)]" onClick={() => { if (rx.patientId) router.push(`/patients/${rx.patientId}`); }}>
                      <td className="font-medium text-sm" style={{ color: 'var(--accent-primary)' }}>{rx.patientName}</td>
                      <td className="text-sm">{rx.medication}</td>
                      <td className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                        {rx.dose} {rx.frequency} {rx.duration ? `x ${rx.duration}` : ''}
                      </td>
                      <td className="text-xs" style={{ color: 'var(--text-secondary)' }}>{rx.prescribedBy}</td>
                      <td className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                        {rx.createdAt ? new Date(rx.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td>
                        <span className={`badge text-[10px] ${rx.status === 'pending' ? 'badge-warning' : 'badge-normal'}`}>
                          {rx.status === 'pending' ? 'Pending' : 'Dispensed'}
                        </span>
                      </td>
                      <td>
                        {rx.status === 'pending' && canDispense && (
                          <button className="btn btn-primary btn-sm" style={{ padding: '4px 12px', fontSize: '0.75rem' }}
                            onClick={(e) => { e.stopPropagation(); handleDispense(rx._id); }}>Dispense</button>
                        )}
                        {rx.status === 'pending' && !canDispense && (
                          <span className="text-[10px] font-medium px-2 py-1 rounded" style={{ background: 'rgba(148,163,184,0.1)', color: 'var(--text-muted)' }}>Pharmacist only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <>
              <div className="card-elevated p-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input type="search" placeholder="Search medications..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 search-icon-input" style={{ background: 'var(--overlay-subtle)' }} />
                </div>
              </div>
              <div className="card-elevated overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Reorder Level</th>
                      <th>Status</th>
                      <th>Batch</th>
                      <th>Expiry</th>
                      <th>Dispensed Today</th>
                      {canDispense && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.length === 0 ? (
                      <tr>
                        <td colSpan={canDispense ? 9 : 8} className="text-center py-8 text-sm" style={{ color: 'var(--text-muted)' }}>
                          No items in inventory yet. Click &ldquo;Receive Stock&rdquo; to record the first stock receipt for your facility.
                        </td>
                      </tr>
                    ) : filteredInventory.map(item => (
                      <tr key={item._id}>
                        <td className="font-medium text-sm">{item.medicationName}</td>
                        <td><span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--overlay-medium)', color: 'var(--text-secondary)' }}>{item.category}</span></td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm" style={{ color: item.status === 'critical' ? 'var(--color-danger)' : item.status === 'low' ? 'var(--color-warning)' : 'inherit' }}>
                              {item.stockLevel}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.unit}</span>
                          </div>
                          <div className="w-20 h-1.5 rounded-full mt-1" style={{ background: 'var(--overlay-medium)' }}>
                            <div className="h-full rounded-full" style={{
                              width: `${Math.min(100, (item.stockLevel / Math.max(1, item.reorderLevel * 3)) * 100)}%`,
                              background: item.status === 'critical' ? 'var(--color-danger)' : item.status === 'low' ? 'var(--color-warning)' : 'var(--color-success)',
                            }} />
                          </div>
                        </td>
                        <td className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.reorderLevel} {item.unit}</td>
                        <td>
                          <span className={`badge text-[10px] ${
                            item.status === 'adequate' ? 'badge-normal' :
                            item.status === 'low' ? 'badge-warning' :
                            'badge-emergency'
                          }`}>
                            {item.status === 'adequate' ? 'In Stock' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{item.batchNumber}</td>
                        <td className="text-xs" style={{ color: item.status === 'expired' ? 'var(--color-danger)' : 'var(--text-muted)' }}>
                          {item.expiryDate}
                        </td>
                        <td className="text-center font-semibold text-sm">{item.dispensedToday}</td>
                        {canDispense && (
                          <td>
                            <button className="btn btn-secondary btn-sm" onClick={() => handleReceive(item._id)}>+ Receive</button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Stock-in modal */}
          {showStockInModal && (
            <div className="modal-backdrop" onClick={() => setShowStockInModal(false)}>
              <div className="modal-content card-elevated p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold">Receive Stock</h3>
                  <button onClick={() => setShowStockInModal(false)} className="p-1.5 rounded-lg" style={{ background: 'var(--overlay-subtle)' }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>Medication</label>
                    <input
                      list="medication-list"
                      type="text"
                      value={stockForm.medicationName}
                      onChange={e => {
                        const med = medications.find(m => m.name === e.target.value);
                        setStockForm({ ...stockForm, medicationName: e.target.value, category: med?.category || stockForm.category });
                      }}
                      placeholder="e.g. Amoxicillin 500mg"
                    />
                    <datalist id="medication-list">
                      {medications.map(m => <option key={m.name} value={m.name}>{m.category}</option>)}
                    </datalist>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>Quantity</label>
                      <input type="number" min={1} value={stockForm.stockLevel || ''} onChange={e => setStockForm({ ...stockForm, stockLevel: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>Unit</label>
                      <select value={stockForm.unit} onChange={e => setStockForm({ ...stockForm, unit: e.target.value })}>
                        {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>Reorder Level</label>
                      <input type="number" min={0} value={stockForm.reorderLevel} onChange={e => setStockForm({ ...stockForm, reorderLevel: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>Batch Number</label>
                      <input type="text" value={stockForm.batchNumber} onChange={e => setStockForm({ ...stockForm, batchNumber: e.target.value })} placeholder="Optional" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>Expiry Date</label>
                    <input type="date" value={stockForm.expiryDate} onChange={e => setStockForm({ ...stockForm, expiryDate: e.target.value })} />
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={() => setShowStockInModal(false)} className="btn btn-secondary flex-1">Cancel</button>
                  <button onClick={handleStockIn} className="btn btn-primary flex-1">Save Stock Receipt</button>
                </div>
              </div>
            </div>
          )}
      </main>
    </>
  );
}
