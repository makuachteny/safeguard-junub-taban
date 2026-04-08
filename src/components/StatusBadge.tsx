'use client';

type BadgeVariant =
  | 'emergency' | 'warning' | 'watch' | 'normal'
  | 'critical' | 'high' | 'medium' | 'low'
  | 'success' | 'info' | 'danger' | 'muted'
  | 'growing' | 'stable' | 'declining';

const BADGE_STYLES: Record<BadgeVariant, { color: string; bg: string; border: string }> = {
  emergency: { color: 'var(--color-danger)', bg: 'var(--color-danger-bg)', border: 'rgba(220,38,38,0.2)' },
  critical:  { color: 'var(--color-danger)', bg: 'var(--color-danger-bg)', border: 'rgba(220,38,38,0.2)' },
  danger:    { color: 'var(--color-danger)', bg: 'var(--color-danger-bg)', border: 'rgba(220,38,38,0.2)' },
  warning:   { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', border: 'rgba(217,119,6,0.2)' },
  high:      { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', border: 'rgba(217,119,6,0.2)' },
  growing:   { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', border: 'rgba(217,119,6,0.2)' },
  watch:     { color: 'var(--accent-primary)', bg: 'var(--accent-light)', border: 'var(--accent-border)' },
  info:      { color: 'var(--accent-primary)', bg: 'var(--accent-light)', border: 'var(--accent-border)' },
  medium:    { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', border: 'rgba(217,119,6,0.2)' },
  stable:    { color: 'var(--accent-primary)', bg: 'var(--accent-light)', border: 'var(--accent-border)' },
  normal:    { color: 'var(--color-success)', bg: 'var(--color-success-bg)', border: 'rgba(13,148,136,0.2)' },
  success:   { color: 'var(--color-success)', bg: 'var(--color-success-bg)', border: 'rgba(13,148,136,0.2)' },
  low:       { color: 'var(--color-success)', bg: 'var(--color-success-bg)', border: 'rgba(13,148,136,0.2)' },
  declining: { color: 'var(--color-success)', bg: 'var(--color-success-bg)', border: 'rgba(13,148,136,0.2)' },
  muted:     { color: 'var(--text-muted)', bg: 'var(--overlay-subtle)', border: 'var(--border-medium)' },
};

interface StatusBadgeProps {
  variant: BadgeVariant | string;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;
}

export default function StatusBadge({ variant, label, size = 'sm', dot = false }: StatusBadgeProps) {
  const style = BADGE_STYLES[variant as BadgeVariant] || BADGE_STYLES.muted;
  const displayLabel = label || variant.charAt(0).toUpperCase() + variant.slice(1);

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5',
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${sizeClasses[size]}`}
      style={{
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.border}`,
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: style.color }}
        />
      )}
      {displayLabel}
    </span>
  );
}

export { BADGE_STYLES };
export type { BadgeVariant };
