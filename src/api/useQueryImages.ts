import { searchPhotosUrl } from '@/constants';
import { flickrImageSchema } from '@/types/flickrImage';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { createFetch } from './createFetch';

export const MIN_SEARCH_TERM_LENGTH = 3;

export const queryImageResponseSchema = z.object({
  stat: z.enum(['ok', 'fail']),
  code: z.number().optional(),
  message: z.string().optional(),
  photos: z.object({
    page: z.number(),
    pages: z.number(),
    perpage: z.number(),
    total: z.number(),
    photo: z.array(flickrImageSchema),
  }),
});

const get = createFetch<typeof queryImageResponseSchema>(queryImageResponseSchema);

export const useQueryImages = (searchTerm: string, pageNumber: number) => {
  return useQuery({
    queryKey: ['search', searchTerm],
    enabled: !!searchTerm && searchTerm.length >= MIN_SEARCH_TERM_LENGTH,
    staleTime: 10 * 1000,
    queryFn: async () => {
      if (!searchTerm) return Promise.reject();
      const response = await get(searchPhotosUrl({ term: searchTerm, page: pageNumber }));
      if (response.stat === 'fail') {
        throw new Error(response.message);
      }
      return response;
    },
  });
};
