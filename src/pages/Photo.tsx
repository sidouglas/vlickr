import { useQueryPaginatedImages } from '@/api/useQueryPaginatedImages';
import { useQueryImageDetail } from '@/api/useQueryImageDetail';
import { ImageDetail } from '@/components/ImageDetail';
import { Main } from '@/components/Main';
import { NavBar } from '@/components/NavBar';

import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import { FlickrImageDetail } from '@/types/flickrImageDetail';

export const Photo = () => {
  const [id, setId] = useState(useParams<'id'>().id);
  const navigate = useNavigate();
  const imageDetail = useQueryImageDetail(id);
  const paginatedImages = useQueryPaginatedImages(id);
  const model = useRef<FlickrImageDetail | null>(null);
  if (!id || imageDetail.error) {
    navigate('/not-found');
  }

  const handlePaginationChange = useCallback(
    (photoId: string) => {
      if (photoId) {
        setId(photoId);
        navigate(`/photo/${photoId}`);
      }
    },
    [navigate]
  );

  if (imageDetail.status === 'success') {
    model.current = imageDetail.data.photo;
  }

  const photo = imageDetail?.data?.photo || model.current;

  return (
    <>
      <NavBar />
      <Main>
        {photo ? (
          <div className="relative">
            <ImageDetail
              photo={photo}
              pagination={paginatedImages?.data?.pagination}
              onPageChange={handlePaginationChange}
            />
          </div>
        ) : null}
      </Main>
    </>
  );
};
