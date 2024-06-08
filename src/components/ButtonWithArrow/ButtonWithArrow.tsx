import { cn } from '@/utils';
import type { ButtonWithArrowProps } from './types';

export const ButtonWithArrow = ({
  direction = 'left',
  size = 3,
  ...rest
}: ButtonWithArrowProps) => {
  const srcOnly = direction === 'left' ? 'Previous Page' : 'Next Page';
  let { className } = rest;
  className = cn(className, `size-${size} ${direction === 'right' ? 'rotate-180' : ''}`);
  return (
    <>
      <span className="sr-only">{srcOnly}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
        {...rest}
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};
