import { createFetch } from './createFetch';
import { paginatedImageSchema } from '@/types/flickrImage';

import { z } from 'zod';
import { queryFn } from './queryFn';
import { getPaginatedNextUrl } from '@/constants';
import { useQuery } from '@tanstack/react-query';

export const queryPaginatedImageResponseSchema = z
  .object({
    code: z.number().optional(),
    message: z.string().optional(),
    prevphoto: paginatedImageSchema.nullish(),
    nextphoto: paginatedImageSchema.nullish(),
    stat: z.enum(['ok', 'fail']),
  })
  .transform((data) => {
    const prevPhoto = data.prevphoto?.id ? data.prevphoto : undefined;
    const nextPhoto = data.nextphoto?.id ? data.nextphoto : undefined;
    return {
      ...data,
      pagination: {
        ...(nextPhoto ? { nextPhoto } : {}),
        ...(prevPhoto ? { prevPhoto } : {}),
      },
    };
  });

export const requestPaginatedImages = createFetch<typeof queryPaginatedImageResponseSchema>(
  queryPaginatedImageResponseSchema
);

export const useQueryPaginatedImages = (id?: string) => {
  return useQuery({
    queryKey: ['paginated-image', id],
    queryFn: queryFn(getPaginatedNextUrl(id ?? ''), requestPaginatedImages),
  });
};
