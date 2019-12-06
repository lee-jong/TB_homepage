// # library
import React from 'react';

// # Component
import Meta from '../shared/Meta';
import Header from '../shared/Header';

const BaseLayout = ({ children, path }) => {
  return (
    <>
      <Meta />
      {path !== '/' && <Header />}
      {children}
    </>
  );
};

export default BaseLayout;
