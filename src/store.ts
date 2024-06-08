import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { FlickrImage } from './types/flickrImage';
import { urlEncode } from './utils';
import { PER_PAGE } from './constants';

type Pagination = {
  nextPageUrl: string;
  page: number;
  pages: number;
  perpage: number;
  prevPageUrl: string;
  total: number;
};

type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: never[]) => unknown ? never : K;
}[keyof T];

export type Store = {
  error: string | null;
  isLoading: boolean;
  pagination: Pagination | null;
  photos: FlickrImage[];
  searchTerm: string;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setPagination: (pagination: Partial<Pagination>) => void;
  setPhotos: (photos: FlickrImage[]) => void;
  setSearchTerm: (value: string) => void;
};

export const defaultState: Pick<Store, NonFunctionKeys<Store>> = {
  error: null,
  isLoading: false,
  pagination: null,
  photos: [],
  searchTerm: '',
};

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      ...defaultState,
      setError: (error) => set({ error }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setPagination: (pagination = {}) => {
        set((state) => {
          const { page, pages, perpage, total } = pagination;
          const currentPage = page ?? state.pagination?.page ?? 1;
          const itemsPerPage = perpage ?? state.pagination?.perpage ?? PER_PAGE;
          const totalCount = total ?? state.pagination?.total ?? 1;
          const totalPages = pages ?? state.pagination?.pages ?? 1;

          const encodedSearchTerm = urlEncode(state.searchTerm);
          const nextPage = Math.min((currentPage ?? 0) + 1, totalPages);
          const prevPage = Math.max((currentPage ?? 1) - 1, 1);

          return {
            pagination: {
              nextPageUrl: `/search/${nextPage}?search=${encodedSearchTerm}`,
              page: currentPage,
              pages: totalPages,
              perpage: itemsPerPage,
              prevPageUrl: `/search/${prevPage}?search=${encodedSearchTerm}`,
              total: totalCount,
            },
          };
        });
      },
      setPhotos: (photos) => set({ photos }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
    }))
  )
);
