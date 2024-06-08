import { PaginatedImage } from '@/types/flickrImage';
import { FlickrImageDetail } from '@/types/flickrImageDetail';

export type ImageDetailProps = {
  photo: FlickrImageDetail;
  onPageChange: (id: string) => void;
  pagination?: {
    prevPhoto?: PaginatedImage;
    nextPhoto?: PaginatedImage;
  };
};
