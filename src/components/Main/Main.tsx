import React from 'react';

export const Main = (props: { children: React.ReactNode }) => {
  return <main className="m-auto max-w-7xl px-4 pt-20 text-base">{props.children}</main>;
};
