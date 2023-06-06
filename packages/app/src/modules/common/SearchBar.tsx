import { TextField, TextFieldProps } from '@mui/material';
import React, { useState } from 'react';
type ISearchBarProps = {
  value: string;
  onChangeText: (e: string) => void;
  placeholder: string;
  width?: string;
} & TextFieldProps;

const SearchBar: React.FC<ISearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  width,
  ...rest
}) => {
  const [input, setInput] = useState(value);

  const setText = (text: string) => {
    setInput(text);
    onChangeText(text);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <TextField
      {...rest}
      type="text"
      size="small"
      value={input}
      onChange={onChange}
      label={placeholder}
      sx={{ width: width || '100%' }}
    />
  );
};
export default SearchBar;
