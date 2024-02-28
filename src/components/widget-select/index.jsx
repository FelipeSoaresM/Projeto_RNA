import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import "./style.scss";

const SelectWithPlaceholder = ({
  value,
  onChange,
  placeholder,
  options,
  questionNumber,
  questionTitle,
  error,
}) => {
  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth className={`form-control${error ? " error" : ""}`}>
        <InputLabel id={`select-placeholder-label-${questionNumber}`}>
          {placeholder}
        </InputLabel>
        <Select
          labelId={`select-placeholder-label-${questionNumber}`}
          id={`select-placeholder-${questionNumber}`}
          name={questionTitle}
          value={value}
          label={placeholder}
          onChange={(event) => onChange(event, questionNumber, questionTitle)}
          error={error}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>Error</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default SelectWithPlaceholder;
