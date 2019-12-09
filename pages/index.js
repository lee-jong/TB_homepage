// # Library
import React from 'react';
import Router from 'next/router';

// #  Component
import MainDevaloperBoard from '../components/dump/main/MainDevaloperBoard';
import MainInfo from '../components/dump/main/MainInfo';
import GuestBook from '../components/dump/main/GuestBook';

class Home extends React.Component {
  static async getInitialProps({}) {
    return {};
  }

  goToPage = pageName => {
    Router.push(`/${pageName}`);
  };

  render() {
    return (
      <>
        <div className="TB_main">
          <div className="TB_main_sideMenu">
            <img src="/static/images/Menu2.png" />
          </div>

          <div className="TB_main_content">
            <div className="TB_main_content_box">
              <MainDevaloperBoard goToPage={this.goToPage} />
            </div>
            <div className="TB_main_content_box_right">
              <div className="TB_main_content_box2">
                <MainInfo goToPage={this.goToPage} />
              </div>
              <div className="TB_main_content_box3">
                <GuestBook goToPage={this.goToPage} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
