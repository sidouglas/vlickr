import { useQueryImages } from '@/api/useQueryImages';
import { useCallback, useEffect } from 'react';
import { useStore } from '@/store';
import { SearchForm } from '../SearchForm';
import { NavBar } from '../NavBar';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

export const NavBarSearch = () => {
  const navigate = useNavigate();

  const { pagination, setIsLoading, searchTerm, setSearchTerm, setPagination, setPhotos } =
    useStore(
      useShallow((state) => ({
        pagination: state.pagination,
        searchTerm: state.searchTerm,
        setIsLoading: state.setIsLoading,
        setPagination: state.setPagination,
        setPhotos: state.setPhotos,
        setSearchTerm: state.setSearchTerm,
      }))
    );

  const { error, data, isFetching } = useQueryImages(searchTerm, pagination?.page || 1);
  const handleOnChange = useCallback(
    (value: string) => {
      setPagination({ page: 1 });
      setSearchTerm(value);
      navigate('/');
    },
    [navigate, setPagination, setSearchTerm]
  );
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const searchValue = form.get('search');
      if (typeof searchValue === 'string' && searchValue) {
        setSearchTerm(searchValue);
        setPagination({ page: 1 });
        navigate('/');
      }
    },
    [navigate, setPagination, setSearchTerm]
  );

  useEffect(() => {
    if (data && !error) {
      setPhotos(data.photos.photo);
      setPagination(data.photos);
    }
    setIsLoading(isFetching);
  }, [data, error, setPhotos, isFetching, setSearchTerm, setIsLoading, setPagination]);

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
