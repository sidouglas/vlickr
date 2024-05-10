import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { FlickrImage } from './types/flickrImage';

export type Store = {
  currentPage: number;
  photos: FlickrImage[];
  searchTerm: string;
  error: string | null;
  setPhotos: (photos: FlickrImage[]) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (value: string) => void;
};

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector((set) => ({
      currentPage: 1,
      photos: [],
      searchTerm: '',
      error: null,
      setPhotos: (photos) => set({ photos }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setError: (error) => set({ error }),
    }))
  )
);
