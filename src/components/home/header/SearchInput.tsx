import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
  value: string;
  onChange(value: string): void;
}

export function SearchInput({ value, onChange }: Props) {
  const valueRef = useRef(value);
  const [valueImm, setValueImm] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout>();

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setValueImm(event.target.value);
    valueRef.current = event.target.value;
    debounceRef.current = setTimeout(() => onChange(valueRef.current), 300);
  }

  return (
    <TextField
      value={valueImm}
      onChange={onInputChange}
      placeholder="Search for packages..."
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
