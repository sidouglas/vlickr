import { useQueryImageSizes } from '@/api/useQueryImageSizes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageSrcSetProps } from './types';
import { FlickrImageSize } from '@/types/flickrImage';
import { useStore } from '@/store';

const generateSrcSet = (imageData: FlickrImageSize[], maxWidth: number) => {
  return imageData
    .reduce((srcSet, image) => {
      if (image.width <= maxWidth) {
        return `${srcSet}${image.source} ${image.width}w, `;
      }
      return srcSet;
    }, '')
    .slice(0, -2);
};

const placeholderGif = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const ImageSrcSet = ({ id, maxWidth, className, onLoad, ...rest }: ImageSrcSetProps) => {
  const setError = useStore((state) => state.setError);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { data, error } = useQueryImageSizes(id);

  const photos = useStore((state) => state.photos);

  useEffect(() => {
    if (error) {
      setError('Sorry, something went wrong and we could not load the image.');
    }
  }, [error, setError]);

  const aspectRatio = useMemo(() => {
    if (!photos.length) {
      return '';
    }
    const photo = photos.find((photo) => photo.id === id);
    return photo?.aspectRatio ? photo.aspectRatio : '';
  }, [id, photos]);

  const getImageSrcSet = useMemo(() => {
    if (!data) return;
    return generateSrcSet(data.sizes.size, maxWidth);
  }, [data, maxWidth]);

  const handleOnLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasLoaded(true);
      setTimeout(() => onLoad?.(e), 500);
    },
    [onLoad]
  );

  return (
    <img
      src={placeholderGif}
      className={`${className} w-full`}
      srcSet={getImageSrcSet}
      style={{ aspectRatio: hasLoaded || aspectRatio ? aspectRatio : '1' }}
      onLoad={handleOnLoad}
      {...rest}
    />
  );
};
