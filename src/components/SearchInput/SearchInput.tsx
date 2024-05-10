import { cn } from '@/utils';
import type { SearchInputProps } from './types';

import { useCallback, useState } from 'react';
import { ChangeEvent } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

export const SearchInput = (props: SearchInputProps) => {
  const { onChange, className, ...rest } = props;
  const [value, setValue] = useState<string | undefined>('');
  const debounced = useDebounceCallback(onChange, 500);
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setValue(() => e.target.value);
      debounced(e.target.value);
    },
    [debounced]
  );

  return (
    <input
      type="text"
      placeholder="Search photos..."
      className={cn('rounded-l-lg bg-primary-accent text-base placeholder:text-base', className)}
      onChange={handleOnChange}
      value={value}
      {...rest}
    />
  );
};
