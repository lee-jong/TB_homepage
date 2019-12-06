import React from 'react';

class SideMenu extends React.Component {
  render() {
    const { sideMenu, handleSideMenu } = this.props;
    return (
      <div className={!sideMenu ? '' : 'TB_sideMenu'}>
        {sideMenu && (
          <>
            <a onClick={handleSideMenu} className="closebtn">
              x
            </a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </>
        )}
      </div>
    );
  }
}

export default SideMenu;
