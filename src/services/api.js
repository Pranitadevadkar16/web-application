import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const fetchProfiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export const saveProfile = async (profile) => {
  try {
    const response = profile.id 
      ? await axios.put(`${API_BASE_URL}/profiles/${profile.id}`, profile)
      : await axios.post(`${API_BASE_URL}/profiles`, profile);
    return response.data;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

export const deleteProfile = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/profiles/${id}`);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};