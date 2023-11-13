import { TextField } from '@mui/material';

interface CustomTextFieldProps {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  type?: string;
}

export function CustomTextField({
  value,
  label,
  required = false,
  onBlur,
  helperText,
  error,
  type,
  ...rest
}: CustomTextFieldProps) {
  return (
    <TextField
      required={required}
      label={label}
      variant='standard'
      fullWidth
      sx={{ mb: 2 }}
      {...rest}
      value={value}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
      type={type}
    />
  );
}
