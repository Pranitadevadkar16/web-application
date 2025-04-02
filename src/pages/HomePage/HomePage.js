import React, { useState, useContext } from 'react';
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Map, List } from '@mui/icons-material';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import InteractiveMap from '../../components/MapView/InteractiveMap';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import { ProfilesContext } from '../../context/ProfilesContext';

const HomePage = () => {
  const { profiles, loading, error } = useContext(ProfilesContext);
  const [view, setView] = useState('list');
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const handleSearch = (term) => {
    const filtered = profiles.filter(profile => 
      profile.name.toLowerCase().includes(term.toLowerCase()) ||
      profile.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  const handleFilter = (category) => {
    if (category === 'all') {
      setFilteredProfiles(profiles);
    } else {
      const filtered = profiles.filter(profile => 
        profile.interests.some(interest => 
          interest.toLowerCase().includes(category.toLowerCase())
        )
      );
      setFilteredProfiles(filtered);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography>Loading profiles...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Profile Explorer
      </Typography>
      
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, newView) => setView(newView)}
        >
          <ToggleButton value="list">
            <List sx={{ mr: 1 }} /> List
          </ToggleButton>
          <ToggleButton value="map">
            <Map sx={{ mr: 1 }} /> Map
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === 'list' ? (
        <Grid container spacing={3}>
          {filteredProfiles.map(profile => (
            <Grid item key={profile.id} xs={12} sm={6} md={4} lg={3}>
              <ProfileCard profile={profile} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <InteractiveMap 
          center={[-0.127758, 51.507351]} // Default to London
          markers={filteredProfiles.map(profile => ({
            coordinates: profile.coordinates,
            name: profile.name,
            address: profile.address
          }))}
        />
      )}
    </Box>
  );
};

export default HomePage;