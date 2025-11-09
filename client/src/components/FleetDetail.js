import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFleetVessels, searchFleetVessels } from '../services/api';
import VesselTable from './VesselTable';
import VesselMap from './VesselMap';
import SearchBar from './SearchBar';
import '../styles/FleetDetail.css';

function FleetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allVessels, setAllVessels] = useState([]);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFleetVessels();
  }, [id]);

  const loadFleetVessels = async () => {
    try {
      setLoading(true);
      const data = await getFleetVessels(id);
      setAllVessels(data);
      setFilteredVessels(data);
      setError(null);
    } catch (err) {
      setError('Failed to load fleet vessels');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      // Check if any filter is provided
      const hasFilters = filters.name?.trim() || filters.mmsi?.trim() || filters.flag?.trim();

      if (hasFilters) {
        // Use server search route with filters
        const results = await searchFleetVessels(id, filters);
        setFilteredVessels(results);
      } else {
        // No filters, show all vessels
        setFilteredVessels(allVessels);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Search failed');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Fleets
      </button>

      <h1>Fleet Details</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="fleet-content">
        <VesselTable vessels={filteredVessels} />
        <VesselMap vessels={filteredVessels} />
      </div>
    </div>
  );
}

export default FleetDetail;
