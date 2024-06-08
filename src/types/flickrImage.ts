import { getAspectRatio } from '@/utils';
import { z } from 'zod';

export const flickrImageSchema = z
  .object({
    farm: z.number(),
    height_m: z.number(),
    id: z.string(),
    owner: z.string(),
    secret: z.string(),
    server: z.string(),
    title: z.string(),
    url_m: z.string().url(),
    width_m: z.number(),
  })
  .transform((data) => {
    return {
      ...data,
      aspectRatio: data.height_m && data.width_m ? getAspectRatio(data.width_m, data.height_m) : '',
      url: data.url_m ?? null,
    };
  });

export type FlickrImage = z.infer<typeof flickrImageSchema>;

export const flickrDetailImageSchema = flickrImageSchema.innerType().omit({
  url_m: true,
  height_m: true,
  width_m: true,
});

export type FlickrDetailImage = z.infer<typeof flickrDetailImageSchema>;

export const flickrPhotoSizeSchema = z.object({
  height: z.number(),
  label: z.string(),
  media: z.string(),
  source: z.string().url(),
  url: z.string().url(),
  width: z.number(),
});

export type FlickrImageSize = z.infer<typeof flickrPhotoSizeSchema>;

export const flickImageSizesSchema = z.object({
  canblog: z.number(),
  canprint: z.number(),
  candownload: z.number(),
  size: z.array(flickrPhotoSizeSchema),
});

export type FlickrImageSizes = z.infer<typeof flickImageSizesSchema>;

export const queryImageSizeResponseSchema = z.object({
  code: z.number().optional(),
  message: z.string().optional(),
  sizes: flickImageSizesSchema,
  stat: z.enum(['ok', 'fail']),
});

export type ImageSizeResponseSchema = z.infer<typeof queryImageSizeResponseSchema>;

export const paginatedImageSchema = z.object({
  id: z.union([z.string(), z.number()]),
  thumb: z.string().nullish(),
  title: z.string().nullish(),
  url: z.string().nullish(),
});

export type PaginatedImage = z.infer<typeof paginatedImageSchema>;
