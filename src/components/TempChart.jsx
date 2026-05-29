import { COLORS } from '../utils/colors';

const sparklineData = [40.5, 41.2, 42.0, 42.5, 43.0, 42.8, 42.5, 42.3, 41.8, 42.5, 43.2, 42.5];

const styles = {
  container: {
    position: 'absolute',
    left: '80px',
    bottom: '16px',
    width: '180px',
    background: COLORS.panelBg,
    border: `1px solid ${COLORS.pipeCyan}`,
    borderRadius: '6px',
    padding: '10px 14px',
    zIndex: 10,
    backdropFilter: 'blur(4px)',
  },
  tempRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  tempValue: {
    color: COLORS.pipeCyan,
    fontSize: '22px',
    fontWeight: 'bold',
  },
  tempUnit: {
    color: '#aaa',
    fontSize: '12px',
  },
  chartArea: {
    marginTop: '8px',
  },
};

function SparklineSVG() {
  const w = 160, h = 50;
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const pts = sparklineData.map((v, i) => {
    const x = (i / (sparklineData.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });

  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={COLORS.pipeCyan}
        strokeWidth="1.5"
        opacity="0.8"
      />
      {/* Glow line */}
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={COLORS.pipeCyan}
        strokeWidth="4"
        opacity="0.2"
      />
      {/* Fill area under line */}
      <polygon
        points={`0,${h} ${pts.join(' ')} ${w},${h}`}
        fill={COLORS.pipeCyan}
        opacity="0.08"
      />
    </svg>
  );
}

export default function TempChart() {
  return (
    <div style={styles.container}>
      <div style={styles.tempRow}>
        <span style={styles.tempValue}>42.5</span>
        <span style={styles.tempUnit}>°C</span>
      </div>
      <div style={styles.chartArea}>
        <SparklineSVG />
      </div>
    </div>
  );
}