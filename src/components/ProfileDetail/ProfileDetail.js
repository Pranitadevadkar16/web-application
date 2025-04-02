import { Box, Typography, Divider, Chip, Avatar } from '@mui/material';
import { LocationOn, Email, Phone, Work, Interests } from '@mui/icons-material';
import InteractiveMap from '../MapView/InteractiveMap';

const ProfileDetail = ({ profile }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <Avatar
          src={profile.photo}
          alt={profile.name}
          sx={{ width: 200, height: 200, borderRadius: '50%' }}
        />
        <Box>
          <Typography variant="h3" gutterBottom>{profile.name}</Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {profile.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
            <Work color="primary" sx={{ mr: 1 }} />
            <Typography>{profile.position || 'Professional'}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn color="primary" sx={{ mr: 1 }} />
            <Typography>{profile.address}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email color="primary" sx={{ mr: 1 }} />
            <Typography>{profile.email}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Phone color="primary" sx={{ mr: 1 }} />
            <Typography>{profile.phone}</Typography>
          </Box>
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Interests color="primary" sx={{ mr: 1 }} /> Interests
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {profile.interests.map((interest, index) => (
            <Chip key={index} label={interest} color="primary" />
          ))}
        </Box>
      </Box>
      
      <Typography variant="h5" gutterBottom>Location</Typography>
      <InteractiveMap 
        center={profile.coordinates} 
        zoom={14}
        markers={[{
          coordinates: profile.coordinates,
          name: profile.name,
          address: profile.address
        }]}
      />
    </Box>
  );
};

export default ProfileDetail;