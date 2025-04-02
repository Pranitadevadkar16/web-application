import React, { useState } from 'react';
import { TextField, Box, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ flex: 1, minWidth: 200 }}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={handleFilterChange}
          label="Filter"
          startAdornment={
            <InputAdornment position="start">
              <FilterList />
            </InputAdornment>
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="marketing">Marketing</MenuItem>
          <MenuItem value="finance">Finance</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchFilter;