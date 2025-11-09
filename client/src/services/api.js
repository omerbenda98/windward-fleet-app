import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getFleets = async () => {
  const response = await axios.get(`${API_BASE_URL}/fleets`);
  return response.data;
};

export const getFleetVessels = async (fleetId) => {
  const response = await axios.get(`${API_BASE_URL}/fleets/${fleetId}/vessels`);
  return response.data;
};

export const searchVessels = async (filters) => {
  const params = new URLSearchParams();

  if (filters.name) params.append('name', filters.name);
  if (filters.mmsi) params.append('mmsi', filters.mmsi);
  if (filters.flag) params.append('flag', filters.flag);

  const response = await axios.get(`${API_BASE_URL}/vessels/search?${params.toString()}`);
  return response.data;
};

export const searchFleetVessels = async (fleetId, filters) => {
  const params = new URLSearchParams();

  if (filters.name) params.append('name', filters.name);
  if (filters.mmsi) params.append('mmsi', filters.mmsi);
  if (filters.flag) params.append('flag', filters.flag);

  params.append('fleetId', fleetId);

  const response = await axios.get(`${API_BASE_URL}/vessels/search?${params.toString()}`);
  return response.data;
};
