import { z } from 'zod';
import { flickrDetailImageSchema } from './flickrImage';

export const flickrImageDetailSchema = flickrDetailImageSchema
  .merge(
    z.object({
      description: z.object({
        _content: z.string(),
      }),
      title: z.object({
        _content: z.string(),
      }),
      dates: z.object({
        posted: z.string(),
      }),
      views: z.string(),
      owner: z.object({
        realname: z.string(),
        location: z.string().nullish(),
        username: z.string(),
      }),
    })
  )
  .transform(({ description, title, ...rest }) => {
    return {
      date: new Date(parseInt(rest.dates.posted) * 1000),
      description: description._content,
      title: title._content,
      ...rest,
    };
  });

export type FlickrImageDetail = z.infer<typeof flickrImageDetailSchema>;
