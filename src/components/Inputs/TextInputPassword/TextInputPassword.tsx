import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  InputProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ChangeEventHandler, ReactNode, useState } from "react";

interface ITextInputProps extends InputProps {
  icon?: ReactNode;
  placeholder: string;
  error?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const TextInputPassword: React.FC<ITextInputProps> = ({
  icon,
  placeholder,
  error,
  onChange,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // b r e a k p o i n t s
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  //////

  const inputStyle = {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${error ? "red" : "#959595"}`,
    borderRadius: "20px",
    padding: "10px",
    backgroundColor: "transparent",
    color: "black",
    width: `${smDown ? "17.1875rem" : "18.75rem"}`,
  };

  const iconStyle = {
    marginRight: "8px",
    display: "flex",
    alignItems: "center",
    color: error ? "red" : "#ffffff",
    fontSize: "1.5rem",
  };

  const fieldStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    backgroundColor: "transparent",
    color: error ? "red" : "white",
    fontSize: "1rem",
  };

  return (
    <Box style={inputStyle}>
      {icon && typeof icon === "string" ? (
        <Typography style={iconStyle}>{icon}</Typography>
      ) : (
        <>{icon}</>
      )}
      <Input
        type={showPassword ? "text" : "password"}
        style={fieldStyle}
        placeholder={placeholder}
        onChange={onChange}
        {...inputProps}
        endAdornment={
          icon && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                style={iconStyle}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </Box>
  );
};
