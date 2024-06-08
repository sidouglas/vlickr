import { useQueryImageSizes } from '@/api/useQueryImageSizes';
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ImageSrcSetProps } from './types';
import { FlickrImageSize } from '@/types/flickrImage';
import { useStore } from '@/store';
import { cn, getAspectRatio } from '@/utils';
import { Image } from './Image';

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

const errorImage = {
  className: 'p-[20%] opacity-50 dark:invert',
  src: '/broken.svg',
};

const ASPECT_RATIO = '16 / 9';

export const ImageSrcSet = ({
  id,
  maxWidth,
  className,
  onLoad,
  ['data-testid']: testId,
  ...rest
}: ImageSrcSetProps) => {
  const setError = useStore((state) => state.setError);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIO);
  const { data, error } = useQueryImageSizes(id);
  useEffect(() => {
    if (error) {
      setAspectRatio(ASPECT_RATIO);
      setError('Sorry, something went wrong and we could not load the image.');
      onLoad?.(false, { renderedSize: [0, 'auto'] });
    }
  }, [error, onLoad, setError]);
  const sources = useMemo(() => {
    if (!data) return;
    return {
      srcSet: generateSrcSet(data.sizes.size, maxWidth),
    };
  }, [data, maxWidth]);

  const handleOnLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const current = e.currentTarget;
      const currentSrc = e.currentTarget.currentSrc;
      if (!error && currentSrc && currentSrc !== placeholderGif) {
        const maxWidth = current.clientWidth;
        const [ratio, width, height] = getAspectRatio(current.naturalWidth, current.naturalHeight);
        setAspectRatio(ratio);
        const calcHeight = (height / width) * maxWidth;
        onLoad?.(e, { renderedSize: [maxWidth, calcHeight] });
      }
    },
    [error, onLoad]
  );

  return (
    <Image
      className={cn('w-full', error ? errorImage.className : null, className)}
      data-testid={testId ?? 'image'}
      onLoad={handleOnLoad}
      src={error ? errorImage.src : placeholderGif}
      srcSet={error ? undefined : sources?.srcSet}
      style={{ aspectRatio }}
      {...rest}
    />
  );
};
