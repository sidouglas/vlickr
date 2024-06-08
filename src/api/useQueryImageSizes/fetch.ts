import { createFetch } from '../createFetch';
import { queryImageSizeResponseSchema } from '@/types/flickrImage';

export const fetchImageSizes = createFetch<typeof queryImageSizeResponseSchema>(
  queryImageSizeResponseSchema
);
