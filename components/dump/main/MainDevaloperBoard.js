import React from 'react';

// # Util
import { getDate } from '../../../helpers/utils';

class MainDevaloperBoard extends React.Component {
    render() {
        const { res, goToPage } = this.props;
        return (
            <>
                <div className="TB_main_board">
                    <div className="TB_main_board_header">
                        <div className="TB_main_board_title">
                            Devaloper Note
                        </div>
                        <div
                            className="TB_main_board_more"
                            onClick={() => goToPage('developer')}
                        >
                            More
                        </div>
                    </div>
                    <div className="TB_main_board_content">
                        <ul className="TB_main_board_content_item">
                            <li className="TB_main_board_content_item_font">
                                제목
                            </li>
                            <li className="TB_main_board_content_item_font">
                                내용
                            </li>
                            <li className="TB_main_board_content_item_font">
                                날짜
                            </li>
                        </ul>
                        {res.list.slice(0, 7).map((item) => (
                            <ul className="TB_main_board_content_item">
                                <li className="TB_main_board_content_item_font">
                                    {item.title}
                                </li>
                                <li className="TB_main_board_content_item_font">
                                    {item.content}
                                </li>
                                <li className="TB_main_board_content_item_font">
                                    {getDate(item.date, 'YYMMDD')}
                                </li>
                            </ul>
                        ))}
                        <ul className="TB_main_board_content_dat">
                            <li>.</li>
                            <li>.</li>
                            <li>.</li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default MainDevaloperBoard;
