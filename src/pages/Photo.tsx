import { useQueryImageDetail } from '@/api/useQueryImageDetail';
import { ImageDetail } from '@/components/ImageDetail';
import { Main } from '@/components/Main';
import { NavBar } from '@/components/NavBar';
import { useParams } from 'react-router-dom';

export const Photo = () => {
  const { id } = useParams<'id'>();
  const { data } = useQueryImageDetail(id);

  return (
    <>
      <NavBar />
      <Main>{data?.photo ? <ImageDetail {...data.photo} /> : null}</Main>
    </>
  );
};
