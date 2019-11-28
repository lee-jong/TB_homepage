// # library
import React from 'react';

// # Component
import Meta from '../shared/Meta';
import Header from '../shared/Header';

const BaseLayout = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      {children}
    </>
  );
};

export default BaseLayout;
