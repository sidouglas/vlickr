import { ImageGrid } from '@/components/ImageGrid';
import { LoaderOverlaid } from '@/components/LoaderOverlaid';
import { Main } from '@/components/Main';
import { NavBarSearch } from '@/components/NavBarSearch/NavBarSearch';
import { Pagination } from '@/components/Pagination';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '@/store';

export const Home = () => {
  const setSearchTerm = useStore((state) => state.setSearchTerm);
  const isLoading = useStore((state) => state.isLoading);
  const [pagination, setPagination] = useStore((state) => [state.pagination, state.setPagination]);
  const photos = useStore((state) => state.photos);
  const location = useLocation();
  const hasPhotos = photos.length > 0;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    const page = Number(location.pathname.match(/\d+/)?.[0]);
    if (search) {
      setSearchTerm(search);
    }
    if (page) {
      setPagination({ page });
    }
  }, [location, setPagination, setSearchTerm]);

  return (
    <>
      <NavBarSearch />
      <Main className={hasPhotos ? 'relative' : undefined}>
        {isLoading ? <LoaderOverlaid /> : null}
        <ImageGrid />
        {pagination && hasPhotos ? (
          <Pagination
            currentPage={pagination.page}
            nextPageUrl={pagination.nextPageUrl}
            prevPageUrl={pagination.prevPageUrl}
            totalPages={pagination.pages}
          />
        ) : null}
      </Main>
    </>
  );
};
