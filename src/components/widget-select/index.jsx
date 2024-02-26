import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectWithPlaceholder = ({ value, onChange, placeholder, options, questionNumber, questionTitle}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`select-placeholder-label-${questionNumber}`}>{placeholder}</InputLabel>
        <Select
          labelId={`select-placeholder-label-${questionNumber}`}
          id={`select-placeholder-${questionNumber}`}
          name={questionTitle}
          value={value}
          label={placeholder}
          onChange={onChange}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectWithPlaceholder;
