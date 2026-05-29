import Scene3D from './components/Scene3D';
import LeftControls from './components/LeftControls';
import AlertPanel from './components/AlertPanel';
import MachineControl from './components/MachineControl';
import TempChart from './components/TempChart';

export default function App() {
  return (
    <div className="app-container">
      <div className="canvas-container">
        <Scene3D />
      </div>
      <LeftControls />
      <AlertPanel />
      <MachineControl />
      <TempChart />
    </div>
  );
}