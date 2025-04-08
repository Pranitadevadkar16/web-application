// src/components/AdminDashboard.js
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Drawer, List, ListItem, ListItemIcon, ListItemText, 
  Box, Typography 
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Chart data
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Users',
      data: [65, 59, 80, 81],
      backgroundColor: '#1976d2'
    }]
  };

  const pieData = {
    labels: ['Active', 'Inactive', 'Pending'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#4caf50', '#f44336', '#ff9800']
    }]
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 240 }}>
        <List>
          {['Dashboard', 'Profiles', 'Settings'].map((text) => (
            <ListItem 
              button 
              key={text}
              selected={activeTab === text.toLowerCase()}
              onClick={() => setActiveTab(text.toLowerCase())}
            >
              <ListItemIcon>
                {text === 'Dashboard' && <DashboardIcon />}
                {text === 'Profiles' && <PeopleIcon />}
                {text === 'Settings' && <SettingsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        
        {activeTab === 'dashboard' && (
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ width: '60%' }}>
              <Typography variant="h6">User Growth</Typography>
              <Bar data={barData} />
            </Box>
            <Box sx={{ width: '40%' }}>
              <Typography variant="h6">User Status</Typography>
              <Pie data={pieData} />
            </Box>
          </Box>
        )}
        
        {activeTab === 'profiles' && <div>Profile Management Content</div>}
        {activeTab === 'settings' && <div>Settings Content</div>}
      </Box>
    </Box>
  );
};

export default AdminDashboard;