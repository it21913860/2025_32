import { useEffect, useState } from 'react';
import Gauge from './components/Gauge';
import './App.css';

// ⚙️ Thresholds (match your ESP32 sketch)
const THRESHOLD_MOISTURE  = 400;
const TEMP_THRESHOLD      = 30;
const HUMIDITY_THRESHOLD  = 50;

function App() {
  const [data, setData] = useState({
    moisture: 0,
    temp: 0,
    humidity: 0,
    ts: Date.now()
  });

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3000/api/sensor/latest')
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🚰 Determine whether to switch the water pump on
  const waterOn = (
    data.moisture < THRESHOLD_MOISTURE ||
    data.temp     > TEMP_THRESHOLD     ||
    data.humidity < HUMIDITY_THRESHOLD
  );

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h1>🌱 IoT Sensor Dashboard</h1>

        {/* 💧 Water Pump Status */}
        <div className={`water-status ${waterOn ? 'on' : 'off'}`}>
          {waterOn ? '💧 Water Pump ON' : 'Water Pump OFF'}
        </div>

        <div className="gauges">
          <Gauge title="Soil Moisture" value={data.moisture} max={4095} unit=""    color="#3b82f6"/>
          <Gauge title="Temperature"   value={data.temp}      max={50}   unit="°C"  color="#ef4444"/>
          <Gauge title="Humidity"      value={data.humidity}  max={100}  unit="%"   color="#10b981"/>
        </div>

        <div className="timestamp">
          Last updated: {new Date(data.ts).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default App;