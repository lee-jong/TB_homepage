// # library
import React from 'react';

// # Component
import Meta from '../shared/Meta';
import Header from '../shared/Header';

const BaseLayout = ({ children, path, DNPathCheck }) => {
  return (
    <>
      <Meta />
      {!DNPathCheck && <Header />}
      {children}
    </>
  );
};

export default BaseLayout;
