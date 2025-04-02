import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProfilesContext = createContext();

export const ProfilesProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockProfiles = [
            {
              id: 1,
              name: 'Alex Johnson',
              photo: 'https://randomuser.me/api/portraits/men/32.jpg',
              description: 'Senior Software Engineer with 8 years of experience in web development',
              address: '123 Tech Street, San Francisco, CA',
              coordinates: [-122.4194, 37.7749],
              email: 'alex.johnson@example.com',
              phone: '+1 555-123-4567',
              interests: ['JavaScript', 'React', 'Node.js']
            },
            {
              id: 2,
              name: 'Maria Garcia',
              photo: 'https://randomuser.me/api/portraits/women/44.jpg',
              description: 'Marketing Director specializing in digital campaigns',
              address: '456 Market Ave, New York, NY',
              coordinates: [-74.0060, 40.7128],
              email: 'maria.garcia@example.com',
              phone: '+1 555-987-6543',
              interests: ['Digital Marketing', 'SEO', 'Content Strategy']
            },
            {
              id: 3,
              name: 'James Wilson',
              photo: 'https://randomuser.me/api/portraits/men/67.jpg',
              description: 'Financial Analyst with expertise in investment strategies',
              address: '789 Finance Blvd, Chicago, IL',
              coordinates: [-87.6298, 41.8781],
              email: 'james.wilson@example.com',
              phone: '+1 555-456-7890',
              interests: ['Investment', 'Risk Analysis', 'Portfolio Management']
            }
          ];
          setProfiles(mockProfiles);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const addProfile = (profile) => {
    const newProfile = {
      ...profile,
      id: Math.max(...profiles.map(p => p.id)) + 1
    };
    setProfiles([...profiles, newProfile]);
  };

  const updateProfile = (id, updatedProfile) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, ...updatedProfile } : profile
    ));
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        loading,
        error,
        addProfile,
        updateProfile,
        deleteProfile
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};