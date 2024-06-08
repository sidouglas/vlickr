import type { SkeletonLineProps } from './types';

export const SkeletonLine = ({ children }: SkeletonLineProps) => {
  return children ? (
    children
  ) : (
    <div className="mt-2 flex flex-col gap-2">
      <div className="h-4 w-full animate-pulse rounded-md bg-base"></div>
    </div>
  );
};
