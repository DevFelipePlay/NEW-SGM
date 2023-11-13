import { Box, Input, InputAdornment, InputProps, Typography } from '@mui/material';
import { ChangeEventHandler, ReactNode } from 'react';

interface ITextInputProps extends InputProps {
  icon?: ReactNode;
  placeholder: string;
  error?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const TextInputDefault: React.FC<ITextInputProps> = ({
  icon,
  placeholder,
  error,
  onChange,
  ...inputProps
}) => {
  const inputStyle = {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${error ? 'red' : '#959595'}`,
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '400px',
  };

  const iconStyle = {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    color: error ? 'red' : '#ffffff',
    fontSize: '1.5rem',
  };

  const fieldStyle = {
    border: 'none',
    outline: 'none',
    flex: 1,
    backgroundColor: 'transparent',
    color: error ? 'red' : 'white',
    fontSize: '1rem',
  };

  return (
    <Box style={inputStyle}>
      {icon && <Typography style={iconStyle}>{icon}</Typography>}
      <Input
        style={fieldStyle}
        placeholder={placeholder}
        onChange={onChange}
        {...inputProps}
        endAdornment={icon && <InputAdornment position='start'>{icon}</InputAdornment>}
      />
    </Box>
  );
};
