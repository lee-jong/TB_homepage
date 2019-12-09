import React from 'react';

class GuestBook extends React.Component {
  render() {
    const { goToPage } = this.props;
    return (
      <>
        <div className="TB_main_guestBook">
          <div className="TB_main_guestBook_header">
            <div className="TB_main_guestBook_header_title">Guest Book</div>
            <div
              className="TB_main_guestBook_header_more"
              onClick={() => goToPage('guest')}
            >
              More
            </div>
          </div>
          <div className="TB_main_guestBook_content">
            <div className="TB_main_guestBook_content_list">
              <ul className="TB_main_guestBook_content_item">
                <li className="TB_main_guestBook_content_font">NickName</li>
                <li className="TB_main_guestBook_content_font">Content</li>
              </ul>
              <ul className="TB_main_guestBook_content_item">
                <li className="TB_main_guestBook_content_font">NickName</li>
                <li className="TB_main_guestBook_content_font">Content</li>
              </ul>
              <ul className="TB_main_guestBook_content_item">
                <li className="TB_main_guestBook_content_font">NickName</li>
                <li className="TB_main_guestBook_content_font">Content</li>
              </ul>
              <ul className="TB_main_guestBook_content_item">
                <li className="TB_main_guestBook_content_font">NickName</li>
                <li className="TB_main_guestBook_content_font">Content</li>
              </ul>
              <ul className="TB_main_guestBook_content_item">
                <li className="TB_main_guestBook_content_font">NickName</li>
                <li className="TB_main_guestBook_content_font">Content</li>
              </ul>
              <ul className="TB_main_guestBook_content_dat">
                <li>.</li>
                <li>.</li>
                <li>.</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GuestBook;
