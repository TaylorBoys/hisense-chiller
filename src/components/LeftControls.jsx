import { COLORS } from '../utils/colors';

const styles = {
  container: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 10,
  },
  btnYellow: {
    width: '44px',
    height: '44px',
    background: '#fdd835',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(253, 216, 53, 0.4)',
  },
  btnRed: {
    width: '44px',
    height: '44px',
    background: '#e53935',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(229, 57, 53, 0.4)',
  },
  btnGray: {
    width: '44px',
    height: '44px',
    background: '#616161',
    borderRadius: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(97, 97, 97, 0.4)',
  },
};

export default function LeftControls() {
  return (
    <div style={styles.container}>
      {/* Expand/collapse — yellow with down triangle */}
      <div style={styles.btnYellow} title="展开/折叠">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon points="4,6 16,6 10,14" fill="#000" />
        </svg>
      </div>

      {/* Stop/reset — red with white inner square */}
      <div style={styles.btnRed} title="停止">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="4" y="4" width="10" height="10" fill="#fff" />
        </svg>
      </div>

      {/* Refresh/replay — gray circle with circular arrow */}
      <div style={styles.btnGray} title="刷新">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 4a7 7 0 1 1-6.5 4.3" stroke="#fff" strokeWidth="2" fill="none" />
          <polygon points="4,2 7,6 1,6" fill="#fff" />
        </svg>
      </div>
    </div>
  );
}