import React from 'react';

class Home extends React.Component {
  static async getInitialProps({}) {
    console.log('몇 번 직히냐...ㅎ');

    return {};
  }
  render() {
    return (
      <>
        <h1>Home</h1>
      </>
    );
  }
}

export default Home;
