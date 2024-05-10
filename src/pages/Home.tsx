import { ImageGrid } from '@/components/ImageGrid';
import { Main } from '@/components/Main';
import { NavBarSearch } from '@/components/NavBarSearch/NavBarSearch';

export const Home = () => {
  return (
    <>
      <NavBarSearch />
      <Main>
        <ImageGrid />
      </Main>
    </>
  );
};
