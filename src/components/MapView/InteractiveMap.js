import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, CircularProgress } from '@mui/material';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const InteractiveMap = ({ center, zoom = 12, markers = [] }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = () => {
      try {
        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: center,
          zoom: zoom
        });

        newMap.on('load', () => {
          setMap(newMap);
          setLoading(false);
        });

        return () => newMap.remove();
      } catch (err) {
        setError('Failed to load map');
        setLoading(false);
      }
    };

    initializeMap();
  }, [center, zoom]);

  useEffect(() => {
    if (!map) return;

    // Add markers
    markers.forEach(marker => {
      new mapboxgl.Marker()
        .setLngLat(marker.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3>${marker.name}</h3>
          <p>${marker.address}</p>
        `))
        .addTo(map);
    });

    // Center map if only one marker
    if (markers.length === 1) {
      map.flyTo({
        center: markers[0].coordinates,
        zoom: 14
      });
    }
  }, [map, markers]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box p={2}>{error}</Box>;
  }

  return (
    <Box
      ref={mapContainer}
      sx={{
        height: '500px',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: 3
      }}
    />
  );
};

export default InteractiveMap;