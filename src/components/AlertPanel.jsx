import { COLORS } from '../utils/colors';

const styles = {
  container: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    width: '260px',
    background: COLORS.alertBg,
    border: `1px solid ${COLORS.alertBorder}`,
    borderRadius: '6px',
    padding: '14px 16px',
    zIndex: 10,
    backdropFilter: 'blur(4px)',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  title: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  badge: {
    background: COLORS.alertBorder,
    color: '#fff',
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '3px',
    fontWeight: 'bold',
  },
  content: {
    color: '#e0e0e0',
    fontSize: '12px',
    lineHeight: '1.5',
  },
  level: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  levelText: {
    color: COLORS.alertBorder,
    fontSize: '12px',
    fontWeight: 'bold',
  },
  timestamp: {
    marginTop: '6px',
    color: '#999',
    fontSize: '11px',
  },
  icon: {
    color: COLORS.alertBorder,
    fontSize: '18px',
  },
};

export default function AlertPanel() {
  return (
    <div style={styles.container}>
      <div style={styles.titleRow}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.alertBorder}>
          <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z" />
        </svg>
        <span style={styles.title}>异常报警</span>
        <span style={styles.badge}>CRITICAL</span>
      </div>
      <div style={styles.content}>
        Pressure low / High and low pressure sensor abnormal detection triggered.
      </div>
      <div style={styles.level}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill={COLORS.alertBorder}>
          <circle cx="7" cy="7" r="7" />
        </svg>
        <span style={styles.levelText}>Level: Critical</span>
      </div>
      <div style={styles.timestamp}>2024-06-15 14:32:01</div>
    </div>
  );
}