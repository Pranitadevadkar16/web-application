import React, { useState, useContext } from 'react';
import { Box, Button, Typography, Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Add } from '@mui/icons-material';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileForm from '../../components/AdminPanel/ProfileForm';
import { ProfilesContext } from '../../context/ProfilesContext';

const AdminPage = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useContext(ProfilesContext);
  const [openForm, setOpenForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleAddProfile = () => {
    setEditingProfile(null);
    setOpenForm(true);
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setOpenForm(true);
  };

  const handleDeleteProfile = (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(id);
    }
  };

  const handleSubmit = (profileData) => {
    if (editingProfile) {
      updateProfile(editingProfile.id, profileData);
    } else {
      addProfile(profileData);
    }
    setOpenForm(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleAddProfile}
        >
          Add Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        {profiles.map(profile => (
          <Grid item key={profile.id} xs={12} sm={6} md={4} lg={3}>
            <ProfileCard 
              profile={profile} 
              isAdmin={true}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProfile ? 'Edit Profile' : 'Add New Profile'}
        </DialogTitle>
        <DialogContent>
          <ProfileForm 
            profile={editingProfile} 
            onSubmit={handleSubmit}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminPage;