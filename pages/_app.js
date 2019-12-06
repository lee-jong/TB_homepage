import React from 'react';
import App, { Container } from 'next/app';
import BaseLayout from '../components/layout/BaseLayout';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    let path = ctx.pathname;

    return { pageProps, path };
  }

  render() {
    const { Component, pageProps, path } = this.props;
    return (
      <Container>
        <div className="TB">
          <BaseLayout path={path}>
            <Component {...pageProps} />
          </BaseLayout>
        </div>
      </Container>
    );
  }
}

export default MyApp;
