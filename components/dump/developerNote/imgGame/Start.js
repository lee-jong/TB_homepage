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
            S_img: randomImg(customize_img),
            S_result: {
                success: [],
                fail: []
            }
        },
        end: {
            E_status: false
        }
    };

    loadingTime = '';
    statingTime = '';

    componentDidMount() {
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
    }

    timeOut = name => {
        clearInterval(this[name]);
        this[name] = '';

        if (name == 'loadingTime') {
            this.gameStartTime();
        }
    };

    gameStartTime = () => {
        this.statingTime = setInterval(() => {
            if (this.state.start.S_timer == 0)
                return this.setState(
                    {
                        start: {
                            ...this.state.start.S_timer,
                            S_status: false
                        },
                        end: {
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

    nextImg = bool => {
        const { S_img, S_result } = this.state.start;
        let findIdx = customize_img.findIndex(item => item.key == S_img.key);
        customize_img[findIdx].exposure = true;

        this.setState({
            start: {
                ...this.state.start,
                S_result: {
                    ...this.state.start.S_result,
                    success: bool
                        ? S_result.success.concat(S_img)
                        : S_result.fail.concat(S_img)
                },
                S_img: randomImg(customize_img)
            }
        });
    };

    render() {
        const { L_timer, L_status } = this.state.loading;
        const { S_timer, S_status, S_img, S_result } = this.state.start;
        const { E_status } = this.state.end;

        return (
            <>
                {L_status && (
                    <div className="TB_Customize_loading">{L_timer}</div>
                )}
                {S_status && (
                    <>
                        <div>
                            <div className="TB_Customize_header">{S_timer}</div>
                            <div>
                                <div>{S_img.name}</div>
                                <img src={S_img.img} />
                            </div>
                            <div>
                                <button onClick={this.nextImg(true)}>
                                    다음
                                </button>
                                <button onClick={this.nextImg(false)}>
                                    패스
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {E_status && <div className="TB_Customize_loading">END</div>}
            </>
        );
    }
}

export default Start;
