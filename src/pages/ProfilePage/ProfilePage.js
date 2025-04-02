
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail';
import { ProfilesContext } from '../../context/ProfilesContext';


const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProfileById } = useContext(ProfilesContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const foundProfile = getProfileById(id);
        if (!foundProfile) {
          throw new Error('Profile not found');
        }
        setProfile(foundProfile);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, getProfileById]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Profile not found</Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Button 
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <ProfileDetail profile={profile} />
    </Box>
  );
};

export default ProfilePage;