export type ImageSrcSetProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'id' | 'maxWidth'
> & {
  id: string;
  maxWidth: number;
};
