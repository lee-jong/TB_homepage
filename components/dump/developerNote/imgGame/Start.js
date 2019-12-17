import React from 'react';

import { customize_img } from '../../../../helpers/json/customize';
import { randomImg } from '../../../../helpers/utils';

class Start extends React.Component {
    state = {
        loading: {
            L_status: true,
            L_timer: 3
        },
        start: {
            S_status: false,
            S_timer: this.props.option.time,
            S_img: randomImg(customize_img[this.props.title]),
            S_count: 1
        },
        end: {
            E_status: false,
            E_result: {
                success: [],
                fail: []
            }
        }
    };

    loadingTime = '';
    statingTime = '';

    componentDidMount() {
        this.gameReadyTime();
    }

    timeOut = name => {
        clearInterval(this[name]);
        this[name] = '';

        if (name == 'loadingTime') {
            this.gameStartTime();
        }
    };

    gameReadyTime = () => {
        this.loadingTime = setInterval(() => {
            if (this.state.loading.L_timer === 0)
                return this.setState(
                    {
                        loading: {
                            L_status: false,
                            L_timer: 3
                        },
                        start: {
                            ...this.state.start,
                            S_status: true
                        }
                    },
                    () => this.timeOut('loadingTime')
                );
            this.setState({
                loading: {
                    ...this.state.loading,
                    L_timer: this.state.loading.L_timer - 1
                }
            });
        }, 1000);
    };

    gameStartTime = () => {
        this.statingTime = setInterval(() => {
            if (this.state.start.S_timer == 0)
                return this.setState(
                    {
                        start: {
                            ...this.state.start.S_timer,
                            S_timer: this.props.option.time,
                            S_status: false
                        },
                        end: {
                            ...this.state.end,
                            E_status: true
                        }
                    },
                    () => this.timeOut('statingTime')
                );

            this.setState({
                start: {
                    ...this.state.start,
                    S_timer: this.state.start.S_timer - 1
                }
            });
        }, 1000);
    };

    gameReStart = () => {
        this.setState(
            {
                loading: {
                    ...this.state.loading,
                    L_status: true
                },
                start: {
                    ...this.state.start,
                    S_timer: this.props.option.time,
                    S_count: 1
                },
                end: {
                    E_status: false,
                    E_result: {
                        success: [],
                        fail: []
                    }
                }
            },
            () => this.gameReadyTime()
        );
    };

    nextImg = bool => {
        const { S_img, S_count } = this.state.start;
        const { E_result } = this.state.end;
        const { title } = this.props;

        let findIdx = customize_img[title].findIndex(
            item => item.key == this.state.start.S_img.key
        );
        customize_img[title][findIdx].exposure = true;

        if (!randomImg(customize_img[title]) || S_count == 10) {
            this.timeOut('statingTime');
            return this.setState({
                start: {
                    ...this.state.start,
                    S_img: randomImg(customize_img[title]),
                    S_status: false
                },
                end: {
                    E_status: true,
                    E_result: {
                        success: bool
                            ? E_result.success.concat(S_img)
                            : E_result.success,
                        fail: !bool
                            ? E_result.fail.concat(S_img)
                            : E_result.fail
                    }
                }
            });
        }

        this.setState({
            start: {
                ...this.state.start,
                S_img: randomImg(customize_img[title]),
                S_count: S_count + 1
            },
            end: {
                ...this.state.end,
                E_result: {
                    success: bool
                        ? E_result.success.concat(S_img)
                        : E_result.success,
                    fail: !bool ? E_result.fail.concat(S_img) : E_result.fail
                }
            }
        });
    };

    goToMain = () => {
        location.reload();
    };

    render() {
        const { L_timer, L_status } = this.state.loading;
        const { S_timer, S_status, S_img } = this.state.start;
        const { E_status, E_result } = this.state.end;
        const { battle, handleChange } = this.props;

        return (
            <>
                {L_status && (
                    <div className="TB_Customize_loading">{L_timer}</div>
                )}
                {S_status && (
                    <>
                        <div className="TB_Customize_game">
                            <div className="TB_Customize_header">
                                <div className="TB_Customize_header_time">
                                    남은 시간 : {S_timer}
                                </div>

                                <div className="TB_Customize_header_title">
                                    정답 : {S_img.name}
                                </div>
                            </div>
                            <div className="TB_Customize_content">
                                <img
                                    className="TB_Customize_img"
                                    src={S_img.img}
                                />
                            </div>
                            <div className="TB_Customize_bottom">
                                <button onClick={() => this.nextImg(true)}>
                                    다음
                                </button>
                                <button onClick={() => this.nextImg(false)}>
                                    패스
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {E_status && (
                    <>
                        <div className="TB_Customize_end">
                            <div className="TB_Customize_end_title">END</div>
                            <div className="TB_Customize_end_result">
                                <span className="TB_Customize_end_result_left">
                                    맞춘 갯수 : {E_result.success.length}{' '}
                                </span>
                                <span className="TB_Customize_end_result_right">
                                    틀린 갯수 : {E_result.fail.length}
                                </span>
                            </div>

                            {battle ? (
                                <button
                                    onClick={this.gameReStart}
                                    onChange={handleChange}
                                    name="battle"
                                >
                                    상대시작
                                </button>
                            ) : (
                                <button onClick={this.goToMain}>
                                    돌아가기
                                </button>
                            )}
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default Start;
