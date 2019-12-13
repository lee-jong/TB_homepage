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
    let DNPathCheck = path.slice(0, 14) === '/developerNote';

    return { pageProps, path, DNPathCheck };
  }

  render() {
    const { Component, pageProps, path, DNPathCheck } = this.props;
    return (
      <Container>
        {!DNPathCheck && (
          <div className="TB">
            <BaseLayout path={path} DNPathCheck={DNPathCheck}>
              <Component {...pageProps} />
            </BaseLayout>
          </div>
        )}
        {DNPathCheck && (
          <BaseLayout path={path} DNPathCheck={DNPathCheck}>
            <Component {...pageProps} />
          </BaseLayout>
        )}
      </Container>
    );
  }
}

export default MyApp;
