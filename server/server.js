const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load data from JSON files
let vessels = [];
let fleets = [];
let vesselLocations = [];

try {
  vessels = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'vessels.json'), 'utf8'));
  fleets = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'fleets.json'), 'utf8'));
  vesselLocations = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'vesselLocations.json'), 'utf8'));
  console.log('Data loaded successfully');
  console.log(`Vessels: ${vessels.length}, Fleets: ${fleets.length}, Locations: ${vesselLocations.length}`);
} catch (error) {
  console.error('Error loading data files:', error.message);
}

// Helper function to join vessel data with location data
function getVesselWithLocation(vesselId) {
  const vessel = vessels.find(v => v._id === vesselId);
  if (!vessel) return null;

  const location = vesselLocations.find(l => l._id === vesselId);

  return {
    ...vessel,
    location: location?.lastpos?.geometry?.coordinates || null
  };
}

// GET /api/fleets - Return all fleets with vessel count
app.get('/api/fleets', (req, res) => {
  const fleetsWithCount = fleets.map(fleet => ({
    _id: fleet._id,
    name: fleet.name,
    vesselCount: fleet.vessels ? fleet.vessels.length : 0
  }));

  res.json(fleetsWithCount);
});

// GET /api/fleets/:id/vessels - Return all vessels in a specific fleet
app.get('/api/fleets/:id/vessels', (req, res) => {
  const fleetId = req.params.id;
  const fleet = fleets.find(f => f._id === fleetId);

  if (!fleet) {
    return res.status(404).json({ error: 'Fleet not found' });
  }

  // Handle both array of strings and array of objects with _id
  const fleetVessels = fleet.vessels
    .map(vessel => {
      const vesselId = typeof vessel === 'string' ? vessel : vessel._id;
      return getVesselWithLocation(vesselId);
    })
    .filter(v => v !== null);

  res.json(fleetVessels);
});

// GET /api/vessels/search - Search vessels by name, mmsi, and/or flag
app.get('/api/vessels/search', (req, res) => {
  const { name, mmsi, flag, fleetId } = req.query;

  let results;

  // If fleetId is provided, search only within that fleet
  if (fleetId) {
    const fleet = fleets.find(f => f._id === fleetId);
    if (!fleet) {
      return res.status(404).json({ error: 'Fleet not found' });
    }
    // Handle both array of strings and array of objects with _id
    results = fleet.vessels
      .map(vessel => {
        const vesselId = typeof vessel === 'string' ? vessel : vessel._id;
        return getVesselWithLocation(vesselId);
      })
      .filter(v => v !== null);
  } else {
    // Otherwise search all vessels
    results = vessels.map(v => getVesselWithLocation(v._id)).filter(v => v !== null);
  }

  // Apply filters with AND operator
  if (name) {
    const searchName = name.toLowerCase();
    results = results.filter(v =>
      v.name && v.name.toLowerCase().includes(searchName)
    );
  }

  if (mmsi) {
    results = results.filter(v =>
      v.mmsi && v.mmsi.toString().includes(mmsi.toString())
    );
  }

  if (flag) {
    const searchFlag = flag.toLowerCase();
    results = results.filter(v =>
      v.flag && v.flag.toLowerCase().includes(searchFlag)
    );
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
