import React from 'react';
import Router from 'next/router';

class Header extends React.Component {
  goToMain = () => {
    Router.push('/');
  };

  render() {
    return (
      <>
        <div className="TB_header">
          <div className="TB_main_logo">
            <img
              onClick={this.goToMain}
              className="TB_main_logo_img"
              src="/static/images/twobell.png"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Header;
