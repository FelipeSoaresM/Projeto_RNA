import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectWithPlaceholder = ({ value, onChange, placeholder, options }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      displayEmpty
      className="age-select"
    >
      <MenuItem disabled value="">
        {placeholder}
      </MenuItem>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectWithPlaceholder;
