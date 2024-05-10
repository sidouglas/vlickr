import { useQueryImages } from '@/api/useQueryImages';
import { useCallback, useEffect } from 'react';
import { useStore } from '@/store';
import { SearchForm } from '../SearchForm';
import { NavBar } from '../NavBar';

export const NavBarSearch = () => {
  const currentPage = useStore((state) => state.currentPage);
  const setPhotos = useStore((state) => state.setPhotos);
  const [searchTerm, setSearchTerm] = useStore((state) => [state.searchTerm, state.setSearchTerm]);
  const { error, data, isFetching } = useQueryImages(searchTerm, currentPage);

  const handleOnChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
    },
    [setSearchTerm]
  );
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const searchValue = form.get('search');
      if (typeof searchValue === 'string') {
        setSearchTerm(searchValue);
      }
    },
    [setSearchTerm]
  );

  useEffect(() => {
    if (data && !error) {
      setPhotos(data.photos.photo);
    }
  }, [data, error, setPhotos, setSearchTerm]);

  return (
    <NavBar>
      <SearchForm
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        isFetching={isFetching}
      />
    </NavBar>
  );
};
