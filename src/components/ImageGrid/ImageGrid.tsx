import { useStore } from '@/store';
import { ImageGridProps } from './types';
import { Link } from 'react-router-dom';
import { cn } from '@/utils';

export const ImageGrid = (props: ImageGridProps) => {
  const { className } = props;
  const photos = useStore((state) => state.photos);
  const hasPhotos = photos.length > 0;
  const searchTerm = useStore((state) => state.searchTerm);
  const isLoading = useStore((state) => state.isLoading);

  if (!hasPhotos && !searchTerm) {
    return null;
  }

  if (!hasPhotos && !isLoading) {
    return (
      <div className={cn('text-center text-lg', className)}>No photos found for {searchTerm}.</div>
    );
  }

  return (
    <div
      className={cn(
        'relative grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className
      )}
    >
      {photos.map(({ id, title, owner, url }) => (
        <div
          key={id}
          className="overflow-hidden rounded-lg bg-primary-accent transition-transform duration-100 hover:scale-105"
        >
          <Link to={`/photo/${id}`} role="link">
            <img src={url} alt="" loading="lazy" className="h-48 w-full object-cover" />
          </Link>
          <div className="p-4">
            <h2 className="line-clamp-2 text-lg font-bold leading-tight" title={title}>
              {title}
            </h2>
            <p className="text-sm">by {owner}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
