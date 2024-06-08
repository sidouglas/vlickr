import { Main } from '@/components/Main';
import { NavBar } from '@/components/NavBar';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <NavBar />
      <Main>
        <div className="grid h-screen place-content-center px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black">404</h1>

            <p className="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</p>

            <p className="mt-4">We can't find that page.</p>

            <Link
              to="/"
              className="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium focus:outline-none focus:ring"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </Main>
    </>
  );
};
