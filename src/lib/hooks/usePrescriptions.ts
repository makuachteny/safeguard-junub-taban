'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PrescriptionDoc } from '../db-types';

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPrescriptions = useCallback(async () => {
    try {
      setError(null);
      const { getAllPrescriptions } = await import('../services/prescription-service');
      const data = await getAllPrescriptions();
      setPrescriptions(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load prescriptions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrescriptions();
  }, [loadPrescriptions]);

  const create = useCallback(async (data: Omit<PrescriptionDoc, '_id' | '_rev' | 'type' | 'createdAt' | 'updatedAt'>) => {
    const { createPrescription } = await import('../services/prescription-service');
    const result = await createPrescription(data);
    await loadPrescriptions();
    return result;
  }, [loadPrescriptions]);

  const dispense = useCallback(async (id: string) => {
    const { dispensePrescription } = await import('../services/prescription-service');
    const result = await dispensePrescription(id);
    await loadPrescriptions();
    return result;
  }, [loadPrescriptions]);

  return { prescriptions, loading, error, create, dispense, reload: loadPrescriptions };
}
