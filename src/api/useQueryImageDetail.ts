import { getPhotoDetailsUrl } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { createFetch } from './createFetch';
import { flickrImageDetailSchema } from '@/types/flickrImageDetail';
import { z } from 'zod';
import { queryFn } from './queryFn';

export const queryImageDetailResponseSchema = z.object({
  stat: z.enum(['ok', 'fail']),
  code: z.number().optional(),
  message: z.string().optional(),
  photo: flickrImageDetailSchema,
});

const requestImageDetail = createFetch<typeof queryImageDetailResponseSchema>(
  queryImageDetailResponseSchema
);

export const useQueryImageDetail = (photoId?: string) => {
  return useQuery({
    queryKey: ['detail', photoId],
    enabled: !!photoId,
    queryFn: queryFn(getPhotoDetailsUrl(photoId ?? ''), requestImageDetail),
  });
};
