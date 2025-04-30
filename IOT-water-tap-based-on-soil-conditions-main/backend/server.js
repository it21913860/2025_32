// sensor-server/server.js
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json());

let latestReading = { moisture: 0, temp: 0, humidity: 0, ts: Date.now() };

// ESP32 will POST here
app.post('/api/sensor', (req, res) => {
  const { moisture, temp, humidity } = req.body;
  latestReading = { moisture, temp, humidity, ts: Date.now() };
  res.sendStatus(200);
});

// React will GET this
app.get('/api/sensor/latest', (req, res) => {
  res.json(latestReading);
});


const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Sensor API listening on http://localhost:${PORT}`));