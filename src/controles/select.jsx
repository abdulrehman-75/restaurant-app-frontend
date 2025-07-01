import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MUISelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const Select = React.forwardRef(
  (
    {
      id,
      options = [],
      label,
      className = "",
      variant = "outlined",
      error = false,
      helperText = "",
      value = "",
      ...props
    },
    ref
  ) => {
    return (
      <FormControl fullWidth className={className} variant={variant} error={error}>
        {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
        <MUISelect
          labelId={`${id}-label`}
          id={id}
          value={value}
          label={label}
          inputRef={ref}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </MUISelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default Select;
