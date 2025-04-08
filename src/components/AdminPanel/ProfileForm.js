import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import verifyImageUrl from 'verifyImageUrl';
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';


const ProfileForm = ({ profile, onSubmit, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(profile?.photo || '');

const validationSchema = Yup.object().shape({
  photo: Yup.string()
    .url('Must be valid URL')
    .test('is-image', 'Must be image URL', async (value) => {
      return await verifyImageUrl(value);
    })
});

const verifyImageUrl = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok; // Returns true if image exists
  } catch {
    return false;
  }
};

  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      photo: profile?.photo || '',
      description: profile?.description || '',
      address: profile?.address || '',
      coordinates: profile?.coordinates || [-0.127758, 51.507351],
      email: profile?.email || '',
      phone: profile?.phone || '',
      position: profile?.position || '',
      interests: profile?.interests || []
    },
    validationSchema,
    onSubmit: values => {
      onSubmit(values);
    }
  });

  const handleImageChange = (e) => {
    formik.handleChange(e);
    setImagePreview(e.target.value);
  };

  const interestsOptions = [
    'Technology',
    'Marketing',
    'Finance',
    'Design',
    'Healthcare',
    'Education',
    'Sports',
    'Arts'
  ];

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Photo URL"
            name="photo"
            value={formik.values.photo}
            onChange={handleImageChange}
            error={formik.touched.photo && Boolean(formik.errors.photo)}
            helperText={formik.touched.photo && formik.errors.photo}
          />
          {imagePreview && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: 200, borderRadius: '4px' }} 
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={formik.touched.interests && Boolean(formik.errors.interests)}>
            <InputLabel>Interests</InputLabel>
            <Select
              multiple
              name="interests"
              value={formik.values.interests}
              onChange={formik.handleChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {interestsOptions.map((interest) => (
                <MenuItem key={interest} value={interest}>
                  {interest}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.interests && formik.errors.interests}
            </FormHelperText>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {profile ? 'Update Profile' : 'Add Profile'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;