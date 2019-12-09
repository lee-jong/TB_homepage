import React from 'react';

const MainInfo = ({ goToPage }) => {
  return (
    <>
      <div className="TB_main_info">
        <div className="TB_main_info_header">
          <div className="TB_main_info_header_title">Two Bell</div>
          <div
            className="TB_main_info_header_more"
            onClick={() => goToPage('info')}
          >
            More
          </div>
        </div>
        <div className="TB_main_info_content">
          <div className="TB_main_info_content_introduction">introduction</div>
        </div>
      </div>
    </>
  );
};

export default MainInfo;
