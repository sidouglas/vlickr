import { InputHTMLAttributes } from 'react';

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
};
