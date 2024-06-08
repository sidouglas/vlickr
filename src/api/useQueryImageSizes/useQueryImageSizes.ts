import { getPhotoSizesUrl } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchImageSizes } from './fetch';

export const useQueryImageSizes = (photoId?: string) => {
  return useQuery({
    queryKey: ['size', photoId],
    enabled: !!photoId,
    retry: false,
    queryFn: async () => {
      if (!photoId) return Promise.reject();
      const response = await fetchImageSizes(getPhotoSizesUrl(photoId));
      if (response?.stat === 'ok') {
        return response;
      }
      throw new Error(response?.message ?? 'Unknown error');
    },
  });
};
