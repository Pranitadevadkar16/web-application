import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Chip, Box } from '@mui/material';
import LocationOn from '@mui/icons-material/LocationOn';
import Visibility from '@mui/icons-material/Visibility';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, isAdmin = false, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/profile/${profile.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={profile.photo}
        alt={profile.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {profile.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {profile.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {profile.address}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
          {profile.interests.slice(0, 3).map((interest, index) => (
            <Chip key={index} label={interest} size="small" />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          startIcon={<Visibility />}
          onClick={handleViewDetails}
        >
          View
        </Button>
        {isAdmin && (
          <>
            <Button 
              size="small" 
              startIcon={<Edit />}
              onClick={() => onEdit(profile)}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              startIcon={<Delete />}
              color="error"
              onClick={() => onDelete(profile.id)}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ProfileCard;