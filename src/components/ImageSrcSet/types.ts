import { ImgHTMLAttributes, SyntheticEvent } from 'react';

export type OnLoadOptions = { renderedSize: [width: number, height: number | 'auto'] };
export type OnLoadEvent = SyntheticEvent<HTMLImageElement> | false;

export type ImageSrcSetProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'id' | 'maxWidth' | 'onLoad'
> & {
  id: string;
  maxWidth: number;
  ['data-testid']?: string;
  onLoad?: (e: OnLoadEvent, options: OnLoadOptions) => void;
};
