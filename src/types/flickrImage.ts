import { getAspectRatio } from '@/utils';
import { z } from 'zod';

export const flickrImageSchema = z
  .object({
    farm: z.number(),
    id: z.string(),
    owner: z.string(),
    secret: z.string(),
    server: z.string(),
    title: z.string(),
    url_m: z.string().url(),
    height_m: z.number(),
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
  label: z.string(),
  width: z.number(),
  height: z.number(),
source: z.string().url(),
  url: z.string().url(),
  media: z.literal('photo'),
});

export type FlickrImageSize = z.infer<typeof flickrPhotoSizeSchema>;

export const flickImageSizesSchema = z.object({
  canblog: z.number(),
  canprint: z.number(),
  candownload: z.number(),
  size: z.array(flickrPhotoSizeSchema),
});

export type FlickrImageSizes = z.infer<typeof flickImageSizesSchema>;
