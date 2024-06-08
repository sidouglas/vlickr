import { createFetch } from './createFetch';
import { flickrImageSchema } from '@/types/flickrImage';
import { MIN_SEARCH_TERM_LENGTH } from '@/constants';
import { searchPhotosUrl } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const queryImageResponseSchema = z.object({
  code: z.number().optional(),
  message: z.string().optional(),
  photos: z.object({
    page: z.number(),
    pages: z.number(),
    perpage: z.number(),
    photo: z.array(flickrImageSchema),
    total: z.number(),
  }),
  stat: z.enum(['ok', 'fail']),
});

const get = createFetch<typeof queryImageResponseSchema>(queryImageResponseSchema);

export const useQueryImages = (searchTerm: string, pageNumber: number) => {
  return useQuery({
    queryKey: ['search', `${searchTerm}-${pageNumber}`],
    enabled: !!searchTerm && searchTerm.length >= MIN_SEARCH_TERM_LENGTH,
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
