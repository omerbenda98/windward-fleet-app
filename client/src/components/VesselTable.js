import React, { useState } from 'react';
import '../styles/VesselTable.css';

function VesselTable({ vessels }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedVessels = () => {
    if (!sortConfig.key) return vessels;

    return [...vessels].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle location sorting (latitude or longitude)
      if (sortConfig.key === 'location') {
        aValue = a.location ? a.location[0] : -Infinity;
        bValue = b.location ? b.location[0] : -Infinity;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ↕';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  const formatLocation = (location) => {
    if (!location || !Array.isArray(location) || location.length < 2) {
      return 'N/A';
    }
    const [lng, lat] = location;
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  return (
    <div className="vessel-table-container">
      <h3>Vessels ({vessels.length})</h3>
      <table className="vessel-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="sortable">
              Name{getSortIndicator('name')}
            </th>
            <th onClick={() => handleSort('mmsi')} className="sortable">
              MMSI{getSortIndicator('mmsi')}
            </th>
            <th onClick={() => handleSort('flag')} className="sortable">
              Flag{getSortIndicator('flag')}
            </th>
            <th onClick={() => handleSort('location')} className="sortable">
              Location (lat, lng){getSortIndicator('location')}
            </th>
          </tr>
        </thead>
        <tbody>
          {getSortedVessels().map(vessel => (
            <tr key={vessel._id}>
              <td>{vessel.name || 'N/A'}</td>
              <td>{vessel.mmsi || 'N/A'}</td>
              <td>{vessel.flag || 'N/A'}</td>
              <td>{formatLocation(vessel.location)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VesselTable;
