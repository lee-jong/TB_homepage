import React from 'react';

// #  Component
import MainDevaloperBoard from '../components/dump/MainDevaloperBoard';
import MainInfo from '../components/dump/MainInfo';

class Home extends React.Component {
  static async getInitialProps({}) {
    return {};
  }

  render() {
    return (
      <>
        <div className="TB_main">
          <div className="TB_main_logo">
            <img
              className="TB_main_logo_img"
              src="/static/images/twobell.png"
            />
          </div>

          <div className="TB_main_sideMenu">
            <img src="/static/images/Menu2.png" />
          </div>

          <div className="TB_main_content">
            <div className="TB_main_content_box">
              <MainDevaloperBoard />
            </div>
            <div className="TB_main_content_box_right">
              <div className="TB_main_content_box2">
                <MainInfo />
              </div>
              <div className="TB_main_content_box3"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
