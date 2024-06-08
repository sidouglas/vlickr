import { FlickrImage, FlickrImageSizes, ImageSizeResponseSchema } from '@/types/flickrImage';
import { FlickrImageDetail } from '@/types/flickrImageDetail';
import type { PartialOnUndefinedDeep } from 'type-fest';

export const mockFlickrImage = (props?: Partial<FlickrImage>): FlickrImage => ({
  aspectRatio: '1',
  url: 'url',
  farm: 1,
  id: 'id',
  owner: 'owner',
  secret: 'secret',
  server: 'server',
  title: 'title',
  url_m: 'url_m',
  height_m: 100,
  width_m: 100,
  ...props,
});

export const mockFlickrImageDetail = (
  props?: PartialOnUndefinedDeep<FlickrImageDetail>
): FlickrImageDetail => ({
  ...mockFlickrImage(),
  dates: { posted: '1704027600' },
  owner: {
    location: 'location',
    realname: 'realname',
    username: 'username',
  },
  views: '0',
  date: new Date('2024-01-01T00:00:00'),
  description: 'description',
  title: 'title',
  ...props,
});

export const mockFlickImageSize = (props?: Partial<FlickrImageSizes>) => ({
  label: 'label',
  width: 100,
  height: 100,
  source: 'source',
  url: 'url',
  media: 'photo',
  ...props,
});

export const mockFlickrImageDetailResponse = (
  props?: Partial<FlickrImageSizes>
): ImageSizeResponseSchema => {
  const { size, ...rest } = props ?? { size: [] };
  return {
    sizes: {
      canblog: 1,
      canprint: 1,
      candownload: 1,
      size: [
        {
          url: 'example.jpg',
          label: 'Example',
          width: 100,
          height: 100,
          source: 'example',
          media: 'photo',
        },
        ...(size ?? []),
      ],
      ...rest,
    },
    stat: 'ok',
  };
};
