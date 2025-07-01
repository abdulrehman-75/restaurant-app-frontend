import React from "react";
import { Button as MUIButton } from "@mui/material";

export default function Button({
  children,
  type = "button",
  variant = "contained", // default variant
  color = "primary",     // can be 'primary', 'secondary', 'error', etc.
  className = "",
  sx = {},               // MUI styling prop
  ...props
}) {
  return (
    <MUIButton
      type={type}
      variant={variant}
      color={color}
      className={className}
      sx={{
        borderRadius: "16px",
        boxShadow: 3,
        textTransform: "none", // keeps the original text casing
        px: 2,
        py: 1,
        ...sx, // allow overriding styles via props
      }}
      {...props}
    >
      {children}
    </MUIButton>
  );
}
