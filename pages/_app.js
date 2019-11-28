import React from 'react';
import NavBar from '../components/shared/NavBar';
import App, { Container } from 'next/app';
import BaseLayout from '../components/layout/BaseLayout';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </Container>
    );
  }
}

export default MyApp;
