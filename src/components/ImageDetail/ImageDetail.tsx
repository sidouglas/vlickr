import type { ImageDetailProps } from './types';

import { ImageSrcSet } from '../ImageSrcSet';
import { useCallback, useState } from 'react';
import { LoaderOverlaid } from '../LoaderOverlaid';

export const ImageDetail = (props: ImageDetailProps) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  const handleOnLoad = useCallback(() => setHasImageLoaded(true), [setHasImageLoaded]);

  return (
    <div className="m-auto flex min-h-screen max-w-4xl flex-col items-center text-base">
      <figure className="relative w-full rounded-lg bg-muted p-4 shadow-lg">
        {!hasImageLoaded ? <LoaderOverlaid /> : null}
        <ImageSrcSet
          id={props.id}
          alt={props.title}
          maxWidth={896}
          sizes="(max-width: 816px) 640px"
          className="rounded-lg"
          onLoad={handleOnLoad}
        />
        {hasImageLoaded ? (
          <figcaption className="mt-4">
            <dl className="grid grid-cols-[min-content_1fr] gap-x-4">
              <dt className="min-w-[100px]">Title:</dt>
              <dd className="grow">{props.title}</dd>
              <dt>Posted on:</dt>
              <dd className="overflow-hidden text-ellipsis">{props.date.toDateString()}</dd>

              <dt>Owner:</dt>
              <dd>{props.owner.username}</dd>

              <dt>Views:</dt>
              <dd>{props.views}</dd>
              {props.description ? (
                <>
                  <dt>Description:</dt>
                  <dd className="overflow-hidden text-ellipsis">{props.description}</dd>
                </>
              ) : null}
            </dl>
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
};
