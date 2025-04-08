// src/services/dashboardData.js
export const getDashboardData = async () => {
    return {
      users: {
        total: 450,
        active: 300,
        inactive: 50,
        pending: 100
      },
      growth: [65, 59, 80, 81]
    };
  };