'use client';

import { useState, useEffect, useRef } from 'react';
import { Lock, LogOut, ShieldCheck } from 'lucide-react';

interface LockScreenProps {
  userName: string;
  hasPin: boolean;
  onVerifyPin: (pin: string) => Promise<boolean>;
  onSetPin: (pin: string) => Promise<void>;
  onUnlock: () => void;
  onLogout: () => void;
}

export default function LockScreen({ userName, hasPin, onVerifyPin, onSetPin, onUnlock, onLogout }: LockScreenProps) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [mode, setMode] = useState<'unlock' | 'setup' | 'confirm'>(hasPin ? 'unlock' : 'setup');
  const [submitting, setSubmitting] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear state when mode changes
  useEffect(() => {
    setPin('');
    setConfirmPin('');
    setError('');
  }, [mode]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleVerify = async (enteredPin: string) => {
    if (submitting) return;
    setSubmitting(true);
    const valid = await onVerifyPin(enteredPin);
    if (valid) {
      onUnlock();
    } else {
      setError('Incorrect PIN');
      setPin('');
      triggerShake();
    }
    setSubmitting(false);
  };

  const handleSetup = async (enteredPin: string) => {
    if (mode === 'setup') {
      setConfirmPin(enteredPin);
      setMode('confirm');
      return;
    }
    // confirm mode
    if (enteredPin !== confirmPin) {
      setError('PINs do not match. Try again.');
      setPin('');
      setMode('setup');
      triggerShake();
      return;
    }
    setSubmitting(true);
    await onSetPin(enteredPin);
    onUnlock();
    setSubmitting(false);
  };

  const handleKeyPress = (digit: string) => {
    if (pin.length >= 6) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError('');

    // Auto-submit at 4 digits
    if (newPin.length === 4) {
      // Small delay for visual feedback
      if (resetRef.current) clearTimeout(resetRef.current);
      resetRef.current = setTimeout(() => {
        if (mode === 'unlock') {
          handleVerify(newPin);
        } else {
          handleSetup(newPin);
        }
      }, 200);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const title = mode === 'unlock'
    ? 'Session Locked'
    : mode === 'setup'
      ? 'Set a PIN'
      : 'Confirm PIN';

  const subtitle = mode === 'unlock'
    ? 'Enter your PIN to unlock'
    : mode === 'setup'
      ? 'Choose a 4-digit PIN for quick unlock'
      : 'Enter the same PIN again';

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs px-6">
        {/* Taban logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/taban-logo.svg" alt="Taban" className="w-16 h-16" style={{
          filter: 'drop-shadow(0 4px 12px rgba(10, 61, 107, 0.3))',
        }} />

        {/* Name & status */}
        <div className="text-center">
          <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{userName}</p>
          <div className="flex items-center gap-1.5 justify-center mt-1" style={{ color: 'var(--text-muted)' }}>
            {mode === 'unlock' ? <Lock className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            <span className="text-xs">{title}</span>
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>

        {/* PIN dots */}
        <div className={`flex gap-3 my-1 ${shake ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full transition-all duration-150"
              style={{
                background: i < pin.length ? (error ? 'var(--color-danger)' : 'var(--taban-blue)') : 'transparent',
                border: `2px solid ${i < pin.length ? (error ? 'var(--color-danger)' : 'var(--taban-blue)') : 'var(--border-medium)'}`,
                transform: i < pin.length ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {error && (
          <p className="text-xs text-center" style={{ color: 'var(--color-danger)' }}>{error}</p>
        )}

        {/* Number pad */}
        <div className="w-full">
          <div className="grid grid-cols-3 gap-2.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map(key => (
              <button
                key={key || 'empty'}
                type="button"
                disabled={!key || submitting}
                onClick={() => {
                  if (key === 'del') handleBackspace();
                  else if (key) handleKeyPress(key);
                }}
                className="h-14 rounded-xl text-lg font-semibold transition-all duration-100 flex items-center justify-center active:scale-95"
                style={{
                  background: !key ? 'transparent' : 'var(--overlay-subtle)',
                  color: key === 'del' ? 'var(--text-muted)' : 'var(--text-primary)',
                  border: !key ? 'none' : '1px solid var(--border-light)',
                  cursor: !key ? 'default' : 'pointer',
                  minWidth: 48,
                  minHeight: 48,
                  opacity: submitting ? 0.5 : 1,
                }}
              >
                {key === 'del' ? '⌫' : key}
              </button>
            ))}
          </div>
        </div>

        {/* Switch user / logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-xs font-medium mt-1 px-4 py-2.5 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)', background: 'var(--overlay-subtle)' }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Switch User
        </button>
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}
