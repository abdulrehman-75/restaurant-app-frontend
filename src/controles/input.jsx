import React from "react";
import TextField from "@mui/material/TextField";

const Input = React.forwardRef(function Input(
  { variant = "outlined",
     className = "",
      id,
       name,
        ...props },
  ref
) {
  const inputId = id || name || undefined;

  return (
    <TextField
      id={inputId}
      name={name}
      variant={variant}
      fullWidth
      className={className}
      inputRef={ref}
      {...props}
    />
  );
});

export default Input;
