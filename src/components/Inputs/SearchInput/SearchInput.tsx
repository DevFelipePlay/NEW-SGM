import { ReactNode } from 'react';

interface ISearchInput {
  icon: ReactNode;
  placeholder: string;
  rest: any;
}

export function SearchInput({ icon, placeholder, ...rest }: ISearchInput) {
  const inputStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: 'transparent',
    width: '400px',
  };

  const iconStyle = {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: '1.5rem',
  };

  const fieldStyle = {
    border: 'none',
    outline: 'none',
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
  };

  return (
    <div style={inputStyle}>
      <span style={iconStyle}>{icon}</span>
      <input style={fieldStyle} placeholder={placeholder} {...rest} />
    </div>
  );
}
