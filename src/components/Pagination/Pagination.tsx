import type { PaginationProps } from './types';
import { Link } from 'react-router-dom';
import { ButtonWithArrow } from '../ButtonWithArrow/ButtonWithArrow';

export const Pagination = ({
  currentPage,
  totalPages,
  nextPageUrl,
  prevPageUrl,
}: PaginationProps) => {
  return (
    <div className="m-auto flex items-center justify-center gap-3 pt-4">
      <Link
        rel="prev"
        to={prevPageUrl}
        className="inline-flex size-8 items-center justify-center rounded border"
      >
        <ButtonWithArrow />
      </Link>

      <p className="text-sm">
        {currentPage}
        <span className="mx-1">/</span>
        {totalPages}
      </p>

      <Link
        rel="next"
        to={nextPageUrl}
        className="inline-flex size-8 items-center justify-center rounded border"
      >
        <ButtonWithArrow direction="right" />
      </Link>
    </div>
  );
};
