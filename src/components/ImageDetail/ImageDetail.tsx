import type { ImageDetailProps } from './types';

import { ImageSrcSet, OnLoadOptions } from '../ImageSrcSet';
import { useCallback, useState } from 'react';
import { LoaderOverlaid } from '../LoaderOverlaid';
import { ButtonWithArrow } from '../ButtonWithArrow';
import { Link } from 'react-router-dom';
import { photoDetailUrl } from '@/router';
import { SkeletonLine } from '../SkeletonLine/SkeletonLine';
import AnimateHeight, { Height } from 'react-animate-height';
import { OnLoadEvent } from '../ImageSrcSet/types';

const MAX_IMAGE_WIDTH = 864;

export const ImageDetail = ({ photo, pagination, onPageChange }: ImageDetailProps) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [imageHeight, setImageHeight] = useState<Height>('auto');
  const { prevPhoto, nextPhoto } = pagination ?? {};

  const handleOnLoad = useCallback(
    (_: OnLoadEvent, options: OnLoadOptions) => {
      if (!options) return;
      setHasImageLoaded(true);
      setImageHeight(options.renderedSize[1]);
    },
    [setHasImageLoaded]
  );

  const handlePageChange = useCallback(
    (id: string | number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setHasImageLoaded(false);
      onPageChange(id.toString());
    },
    [onPageChange]
  );

  return (
    <div className="m-auto max-w-4xl flex-col items-center text-base">
      <figure className="w-full rounded-lg bg-muted p-4 shadow-lg">
        <div className="relative text-primary">
          {!hasImageLoaded ? <LoaderOverlaid /> : null}
          <AnimateHeight duration={300} height={imageHeight}>
            <ImageSrcSet
              alt={photo.title}
              className="rounded-lg"
              id={photo.id}
              maxWidth={MAX_IMAGE_WIDTH}
              sizes={`(max-width: ${MAX_IMAGE_WIDTH}px) calc(100vw - 64px), ${MAX_IMAGE_WIDTH}px`}
              onLoad={handleOnLoad}
            />
          </AnimateHeight>
          {prevPhoto ? (
            <Link
              to={photoDetailUrl(prevPhoto.id)}
              onClick={handlePageChange(prevPhoto.id)}
              rel="previous image"
              className="absolute left-[-45px] top-0 flex h-full w-[30px] items-center text-base"
            >
              <ButtonWithArrow size={8} />
            </Link>
          ) : null}

          {nextPhoto ? (
            <Link
              to={photoDetailUrl(nextPhoto.id)}
              onClick={handlePageChange(nextPhoto.id)}
              rel="next image"
              className="absolute right-[-45px] top-0 flex h-full w-[30px] items-center text-base"
            >
              <ButtonWithArrow direction="right" size={8} />
            </Link>
          ) : null}
        </div>
        <figcaption className="mt-4">
          <dl className="grid grid-cols-[min-content_1fr] gap-x-4">
            <dt className="min-w-[100px]">Title:</dt>
            <dd className="grow">
              <SkeletonLine>{photo.title}</SkeletonLine>
            </dd>
            <dt>Posted on:</dt>
            <dd className="overflow-hidden text-ellipsis">
              <SkeletonLine>{photo.date.toDateString()}</SkeletonLine>
            </dd>
            <dt>Owner:</dt>
            <dd>
              <SkeletonLine>{photo.owner.username}</SkeletonLine>
            </dd>
            <dt>Views:</dt>
            <dd>
              <SkeletonLine>{photo.views}</SkeletonLine>
            </dd>
            {photo.description ? (
              <>
                <dt>Description:</dt>
                <dd className="overflow-hidden text-ellipsis">{photo.description}</dd>
              </>
            ) : null}
          </dl>
        </figcaption>
      </figure>
    </div>
  );
};
