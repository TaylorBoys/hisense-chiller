import { COLORS } from '../utils/colors';

const styles = {
  container: {
    position: 'absolute',
    right: '16px',
    bottom: '16px',
    width: '220px',
    background: COLORS.panelBg,
    border: '1px solid #37474f',
    borderRadius: '6px',
    padding: '14px 16px',
    zIndex: 10,
    backdropFilter: 'blur(4px)',
  },
  title: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '6px',
  },
  subRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '12px',
    color: '#fdd835',
    fontSize: '12px',
  },
  lockIcon: {
    width: '16px',
    height: '16px',
  },
  startBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: COLORS.startBtn,
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 0 15px rgba(30, 136, 229, 0.5)',
  },
};

export default function MachineControl() {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Machine Control</div>
      <div style={styles.subRow}>
        <svg style={styles.lockIcon} viewBox="0 0 16 16" fill="#fdd835">
          <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm1.5 5h-3V4a1.5 1.5 0 1 1 3 0v2zM8 9a1 1 0 1 0 0 2a1 1 0 0 0 0-2z"/>
        </svg>
        Safety Lock Active
      </div>
      <div style={styles.startBtn}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
          <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 0 1-7 7 7 7 0 0 1-7-7 6.92 6.92 0 0 1 2.59-5.42L6.17 5.17A9 9 0 1 0 17.83 5.17z"/>
        </svg>
        开启
      </div>
    </div>
  );
}