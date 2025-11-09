import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFleets } from '../services/api';
import '../styles/FleetList.css';

function FleetList() {
  const [fleets, setFleets] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadFleets();
  }, []);

  const loadFleets = async () => {
    try {
      setLoading(true);
      const data = await getFleets();
      setFleets(data);
      setError(null);
    } catch (err) {
      setError('Failed to load fleets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedFleets = () => {
    if (!sortConfig.key) return fleets;

    return [...fleets].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

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

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h1>Fleet Management</h1>
      <table className="fleet-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="sortable">
              Fleet Name{getSortIndicator('name')}
            </th>
            <th onClick={() => handleSort('vesselCount')} className="sortable">
              Vessel Count{getSortIndicator('vesselCount')}
            </th>
          </tr>
        </thead>
        <tbody>
          {getSortedFleets().map(fleet => (
            <tr
              key={fleet._id}
              onClick={() => navigate(`/fleet/${fleet._id}`)}
              className="clickable-row"
            >
              <td>{fleet.name}</td>
              <td>{fleet.vesselCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FleetList;
