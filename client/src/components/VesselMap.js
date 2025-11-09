import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/VesselMap.css';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function MapBoundsHandler({ vessels }) {
  const map = useMap();

  useEffect(() => {
    if (vessels.length > 0) {
      const validLocations = vessels
        .filter(v => v.location && Array.isArray(v.location) && v.location.length >= 2)
        .map(v => [v.location[1], v.location[0]]); // Convert [lng, lat] to [lat, lng]

      if (validLocations.length > 0) {
        const bounds = L.latLngBounds(validLocations);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [vessels, map]);

  return null;
}

function VesselMap({ vessels }) {
  const validVessels = vessels.filter(
    v => v.location && Array.isArray(v.location) && v.location.length >= 2
  );

  const defaultCenter = [0, 0];
  const defaultZoom = 2;

  return (
    <div className="vessel-map-container">
      <h3>Vessel Locations</h3>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapBoundsHandler vessels={validVessels} />
        {validVessels.map(vessel => {
          const [lng, lat] = vessel.location;
          return (
            <Marker key={vessel._id} position={[lat, lng]}>
              <Popup>
                <div>
                  <strong>{vessel.name || 'Unknown'}</strong>
                  <br />
                  MMSI: {vessel.mmsi || 'N/A'}
                  <br />
                  Flag: {vessel.flag || 'N/A'}
                  <br />
                  Location: {lat.toFixed(4)}, {lng.toFixed(4)}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default VesselMap;
