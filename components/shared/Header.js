import React from 'react';
import Link from 'next/link';

// # Component
import SideMenu from '../../components/shared/SideMenu';

class Header extends React.Component {
  state = {
    sideMenu: false
  };

  handleSideMenu = () => {
    this.setState({
      sideMenu: !this.state.sideMenu
    });
  };

  render() {
    const { sideMenu } = this.state;
    return (
      <>
        <div className="TB_header">
          <div className="TB_main_logo">
            <img
              className="TB_main_logo_img"
              src="/static/images/twobell.png"
            />
          </div>
        </div>

        {/* <div className="TB_Header">
          <img
            src="/static/images/twobell.png"
            className="TB_Header_Logo"
          ></img>
          <img
            src="/static/images/menu.png"
            className="TB_Menu_icon"
            onClick={this.handleSideMenu}
          ></img>
        </div>
        <SideMenu sideMenu={sideMenu} handleSideMenu={this.handleSideMenu} /> */}

        {/* {sideMenu && (
          <SideMenu sideMenu={sideMenu} handleSideMenu={this.handleSideMenu} />
        )} */}
      </>
    );
  }
}

export default Header;
