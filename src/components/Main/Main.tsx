import { cn } from '@/utils';
import { HTMLAttributes } from 'react';

export const Main = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <main className={cn('m-auto max-w-7xl px-4 pt-20 text-base', className)} {...rest}>
      {children}
    </main>
  );
};
