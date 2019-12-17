// # Library
import React from 'react';

// # Helper & Util
import { handelRouter } from '../../../helpers/nextUtil';

class ImgGame extends React.Component {
    render() {
        return (
            <>
                <div className="TB_imgGame">
                    <div className="TB_imgGame_header">
                        <div className="TB_imgGame_header_title">
                            Images Game
                        </div>
                    </div>
                    <div className="TB_imgGame_content">
                        <div className="TB_imgGame_home">
                            <div className="TB_imgGame_content_header">
                                <div>WelCome TB Game</div>
                            </div>
                            <div className="TB_imgGame_content_button">
                                <button
                                    onClick={() =>
                                        handelRouter(
                                            'developerNote/imgGame/customize'
                                        )
                                    }
                                    name="customize"
                                >
                                    이미지 게임 시작하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ImgGame;
