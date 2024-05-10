import { getPhotoDetailsUrl } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { createFetch } from './createFetch';
import { flickrImageDetailSchema } from '@/types/flickrImageDetail';
import { z } from 'zod';

export const queryImageDetailResponseSchema = z.object({
  stat: z.enum(['ok', 'fail']),
  code: z.number().optional(),
  message: z.string().optional(),
  photo: flickrImageDetailSchema,
});

const get = createFetch<typeof queryImageDetailResponseSchema>(queryImageDetailResponseSchema);

export const useQueryImageDetail = (photoId?: string) => {
  return useQuery({
    queryKey: ['detail', photoId],
    staleTime: 10 * 1000,
    enabled: !!photoId,
    retry: false,
    queryFn: async () => {
      if (!photoId) return Promise.reject();
      const response = await get(getPhotoDetailsUrl(photoId));
      if (response.stat === 'fail') {
        throw new Error(response.message);
      }
      return response;
    },
  });
};
