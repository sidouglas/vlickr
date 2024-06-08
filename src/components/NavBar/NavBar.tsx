import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const NavBar = ({ children }: { children?: ReactNode }) => {
  return (
    <nav className="fixed z-10 flex w-full items-center justify-between bg-primary p-4 ">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">
          Vlickr
        </Link>
        <img src="/logo.svg" alt="" className="ml-2 h-5" />
      </div>
      {children}
    </nav>
  );
};
