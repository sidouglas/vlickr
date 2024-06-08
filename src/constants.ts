import { urlEncode } from './utils';

export const PER_PAGE = 12;
const API_BASE_URL = 'https://api.flickr.com/services/rest/';

export const searchPhotosUrl = ({
  term,
  page = 1,
  perPage = PER_PAGE,
}: {
  term: string;
  page?: number;
  perPage?: number;
}): string => {
  const text = urlEncode(term);
  const searchParams = new URLSearchParams({
    method: 'flickr.photos.search',
    api_key: import.meta.env.VITE_FLICKER_API,
    format: 'json',
    nojsoncallback: '1',
    safe_search: '1',
    page: page.toString(),
    per_page: perPage.toString(),
    extras: 'url_m',
    text,
  });
  const url = new URL(API_BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};

export const getPhotoDetailsUrl = (photoId: string): string => {
  const searchParams = new URLSearchParams({
    method: 'flickr.photos.getInfo',
    api_key: import.meta.env.VITE_FLICKER_API,
    format: 'json',
    safe_search: '1',
    nojsoncallback: '1',
    photo_id: photoId,
  });
  const url = new URL(API_BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};

export const getPhotoSizesUrl = (photoId: string): string => {
  const searchParams = new URLSearchParams({
    method: 'flickr.photos.getSizes',
    api_key: import.meta.env.VITE_FLICKER_API,
    format: 'json',
    nojsoncallback: '1',
    photo_id: photoId,
  });
  const url = new URL(API_BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};

export const getImageUrl = ({
  server,
  id,
  secret,
  size = 'c',
}: {
  server: string;
  id: string;
  secret: string;
  size?: 'b' | 's' | 'q' | 't' | 'm' | 'n' | 'z' | 'c' | 'l' | 'o';
}) => {
  return `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
};

export const getPaginatedNextUrl = (photoId: string): string => {
  const searchParams = new URLSearchParams({
    method: 'flickr.photos.getContext',
    api_key: import.meta.env.VITE_FLICKER_API,
    format: 'json',
    nojsoncallback: '1',
    photo_id: photoId ?? '',
  });
  const url = new URL(API_BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};
export const MIN_SEARCH_TERM_LENGTH = 3;
