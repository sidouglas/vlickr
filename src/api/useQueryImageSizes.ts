import { getPhotoSizesUrl } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { createFetch } from './createFetch';
import { z } from 'zod';
import { flickImageSizesSchema } from '@/types/flickrImage';

export const queryImageSizeResponseSchema = z.object({
  stat: z.enum(['ok', 'fail']),
  code: z.number().optional(),
  message: z.string().optional(),
  sizes: flickImageSizesSchema,
});

const get = createFetch<typeof queryImageSizeResponseSchema>(queryImageSizeResponseSchema);

export const useQueryImageSizes = (photoId?: string) => {
  return useQuery({
    queryKey: ['size', photoId],
    staleTime: 10 * 1000,
    enabled: !!photoId,
    retry: false,
    queryFn: async () => {
      if (!photoId) return Promise.reject();
      const response = await get(getPhotoSizesUrl(photoId));
      if (response.stat === 'fail') {
        throw new Error(response.message);
      }
      return response;
    },
  });
};
