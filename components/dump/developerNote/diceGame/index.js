import React from 'react';

import {
    penaltyJSON,
    changePenaltyJSON
} from '../../../../helpers/json/penalty';
import { mixItem } from '../../../../helpers/utils';

class Dice_Game extends React.Component {
    state = {
        users: this.props.info.users,
        game: {
            turn: 0, // 주사위 굴리는 유저 번호
            plateContent: '가즈아~~~!' //현재 판의 내용
        },
        penalty: mixItem(penaltyJSON),
        dice_status: 'ready' // 현재 주사위 진행 상태
    };

    goingTimer = '';
    changeTimer = '';

    stopTimer = name => {
        clearInterval(this[name]);
        this[name] = '';
    };

    rollingDice = () => {
        const { users, dice_status } = this.state;
        const { turn } = this.state.game;

        if (dice_status !== 'ready') return;
        this.setState({
            dice_status: 'start'
        });

        let usersCopy = users;
        let dice = [1, 2, 3, 4, 5, 6];
        let nextDice = dice[Math.floor(Math.random() * dice.length)];

        let count = 0;
        this.goingTimer = setInterval(() => {
            let changeSpaces = usersCopy.splice(turn, 1);
            let extraction = changeSpaces[0];

            count++;

            // 카운트 수와 주사위가 같지 않으면 + 1 씩 전진!
            extraction.space = extraction.space + 1;

            // 한칸을 모두 돌았을 경우!
            if (extraction.space > 31) {
                // 다시 첫 칸 부터
                extraction.space = extraction.space - 32;
                // 한 바퀴 모두 돈 횟수
                extraction.rotation = extraction.rotation + 1;
            }

            let presentPosition = this[`${'plate' + extraction.space}`]
                .textContent;

            // 한 칸 앞으로 갈 때마다 현재 판의 내용 upload
            this.setState({
                game: {
                    ...this.state.game,
                    plateContent: presentPosition
                }
            });
            usersCopy.splice(turn, 0, extraction);

            //카운트 수와 주사위수가 같으면 stop!
            if (count == nextDice) {
                let findsChange = changePenaltyJSON.findIndex(
                    item => item.content == presentPosition
                );

                //추가적인 움직임이 있을 시
                if (findsChange !== -1) {
                    this.setState({
                        dice_status: 'start'
                    });
                    this.stopTimer('goingTimer');

                    setTimeout(() => {
                        this.changePlate(findsChange, turn);
                    }, 500);
                }

                //추가적인 움직임이 없을 시, 주사위가 굴러갈 수 있는 상태 값
                if (findsChange == -1) {
                    this.stopTimer('goingTimer');
                    this.setState({
                        dice_status: 'ready'
                    });
                }

                //게임 end
                if (extraction.rotation == this.props.info.option) {
                    return this.setState({
                        users: usersCopy,
                        dice_status: 'end'
                    });
                }
            }

            if (turn + 1 >= users.length) {
                return this.setState({
                    users: usersCopy,
                    game: {
                        ...this.state.game,
                        turn: 0
                    }
                });
            } else {
                return this.setState({
                    users: usersCopy,
                    game: {
                        ...this.state.game,
                        turn: turn + 1
                    }
                });
            }
        }, 500);
    };

    // 추가적으로 움직일 떄
    changePlate = (index, turn) => {
        const { users } = this.state;
        let usersCopy = users;
        let count = 0;

        this.changeTimer = setInterval(() => {
            let changeSpaces = usersCopy.splice(turn, 1);
            let extraction = changeSpaces[0];

            count++;
            // 카운트 수와 주사위가 같지 않으면 + 1 씩 전진!
            if (changePenaltyJSON[index].add) {
                extraction.space = extraction.space + 1;
            }

            if (!changePenaltyJSON[index].add) {
                extraction.space = extraction.space - 1;
            }

            if (extraction.space > 31) {
                // 다시 첫 칸 부터
                extraction.space = extraction.space - 32;
            }

            if (extraction.space < 0) {
                extraction.space = 31;
            }

            let presentPosition = this[`${'plate' + extraction.space}`]
                .textContent;

            // 한 칸 앞으로 갈 때마다 현재 판의 내용 upload
            this.setState({
                game: {
                    ...this.state.game,
                    plateContent: presentPosition
                }
            });
            usersCopy.splice(turn, 0, extraction);

            //카운트 수와 주사위수가 같으면 stop!
            if (count == changePenaltyJSON[index].value) {
                //주사위가 굴러갈 수 있는 상태 값
                this.stopTimer('changeTimer');
                this.setState({
                    dice_status: 'ready'
                });
            }

            this.setState({
                users: usersCopy
            });
        }, 500);
    };

    plateChecked = num => {
        const { users } = this.state;

        let finds = [];
        users.map(item => {
            if (item.space == num) {
                finds.push(item);
            }
        });

        let plate_spaces = [];
        for (let i = 0; i < finds.length; i++) {
            plate_spaces.push(
                <div
                    value={finds[i].key}
                    style={{
                        backgroundColor: finds[i].color,
                        width: '30%',
                        display: 'block'
                    }}
                >
                    {finds[i].key}
                </div>
            );
        }
        return plate_spaces;
    };

    render() {
        const { penalty, dice_status, users } = this.state;
        const { plateContent, turn } = this.state.game;
        return (
            <>
                <div className="TB_diceGame_game_plate">
                    <div className="TB_diceGame_plate_Above_0">
                        <div className="TB_diceGame_plate_Above_one">
                            <div>25</div>
                            <span
                                ref={ref => {
                                    this.plate25 = ref;
                                }}
                            >
                                적립주 마시기!
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(25)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>24</div>
                            <span
                                ref={ref => {
                                    this.plate24 = ref;
                                }}
                            >
                                {penalty[0].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(24)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>23</div>
                            <span
                                ref={ref => {
                                    this.plate23 = ref;
                                }}
                            >
                                {penalty[1].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(23)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>22</div>
                            <span
                                ref={ref => {
                                    this.plate22 = ref;
                                }}
                            >
                                {penalty[2].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(22)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>21</div>
                            <span
                                ref={ref => {
                                    this.plate21 = ref;
                                }}
                            >
                                {penalty[3].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(21)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>20</div>
                            <span
                                ref={ref => {
                                    this.plate20 = ref;
                                }}
                            >
                                {penalty[4].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(20)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>19</div>
                            <span
                                ref={ref => {
                                    this.plate19 = ref;
                                }}
                            >
                                {penalty[5].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(19)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>18</div>
                            <span
                                ref={ref => {
                                    this.plate18 = ref;
                                }}
                            >
                                {penalty[6].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(18)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>17</div>
                            <span
                                ref={ref => {
                                    this.plate17 = ref;
                                }}
                            >
                                {penalty[7].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(17)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>16</div>
                            <span
                                ref={ref => {
                                    this.plate16 = ref;
                                }}
                            >
                                {penalty[8].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(16)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_1">
                        <div className="TB_diceGame_plate_Above_two">
                            <div>26</div>
                            <span
                                ref={ref => {
                                    this.plate26 = ref;
                                }}
                            >
                                {penalty[9].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(26)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_two">
                            <div>15</div>
                            <span
                                ref={ref => {
                                    this.plate15 = ref;
                                }}
                            >
                                {penalty[10].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(15)}
                            </div>
                        </div>

                        {/* center */}
                        <div className="TB_diceGame_center">
                            <div className="TB_diceGame_center_content">
                                {dice_status !== 'end' && (
                                    <div>{plateContent}</div>
                                )}
                                {dice_status == 'end' && (
                                    <>
                                        <div>
                                            게임이 종료 되었습니다! <br />
                                            {turn - 1 < 0
                                                ? users.length - 1
                                                : turn - 1}{' '}
                                            팀 승리!!
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="TB_diceGame_center_button">
                                {dice_status == 'ready' && (
                                    <button onClick={this.rollingDice}>
                                        Go !
                                    </button>
                                )}

                                {dice_status == 'end' && (
                                    <button onClick={this.rollingDice}>
                                        Re Game?
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_2">
                        <div className="TB_diceGame_plate_Above_two">
                            <div>27</div>
                            <span
                                ref={ref => {
                                    this.plate27 = ref;
                                }}
                            >
                                {penalty[11].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(27)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_two">
                            <div>14</div>
                            <span
                                ref={ref => {
                                    this.plate14 = ref;
                                }}
                            >
                                {penalty[12].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(14)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_3">
                        <div className="TB_diceGame_plate_Above_two">
                            <div>28</div>
                            <span
                                ref={ref => {
                                    this.plate28 = ref;
                                }}
                            >
                                {penalty[13].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(28)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_two">
                            <div>13</div>
                            <span
                                ref={ref => {
                                    this.plate13 = ref;
                                }}
                            >
                                {penalty[14].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(13)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_4">
                        <div className="TB_diceGame_plate_Above_two">
                            <div>29</div>
                            <span
                                ref={ref => {
                                    this.plate29 = ref;
                                }}
                            >
                                {penalty[15].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(29)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_two">
                            <div>12</div>
                            <span
                                ref={ref => {
                                    this.plate12 = ref;
                                }}
                            >
                                {penalty[16].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(12)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_5">
                        <div className="TB_diceGame_plate_Above_two">
                            <div>30</div>
                            <span
                                ref={ref => {
                                    this.plate30 = ref;
                                }}
                            >
                                {penalty[17].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(30)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_two">
                            <div>11</div>
                            <span
                                ref={ref => {
                                    this.plate11 = ref;
                                }}
                            >
                                {penalty[18].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(11)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_6">
                        <div className="TB_diceGame_plate_Above_two">
                            <div>31</div>
                            <span
                                ref={ref => {
                                    this.plate31 = ref;
                                }}
                            >
                                {penalty[19].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(31)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_two">
                            <div>10</div>
                            <span
                                ref={ref => {
                                    this.plate10 = ref;
                                }}
                            >
                                {penalty[20].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(10)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_7">
                        <div className="TB_diceGame_plate_Above_one">
                            {/* <div>시작</div> */}
                            <span
                                ref={ref => {
                                    this.plate0 = ref;
                                }}
                            >
                                시작
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(0)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>1</div>
                            <span
                                ref={ref => {
                                    this.plate1 = ref;
                                }}
                            >
                                {penalty[21].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(1)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>2</div>
                            <span
                                ref={ref => {
                                    this.plate2 = ref;
                                }}
                            >
                                {penalty[22].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(2)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>3</div>
                            <span
                                ref={ref => {
                                    this.plate3 = ref;
                                }}
                            >
                                {penalty[23].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(3)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>4</div>
                            <span
                                ref={ref => {
                                    this.plate4 = ref;
                                }}
                            >
                                {penalty[24].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(4)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>5</div>
                            <span
                                ref={ref => {
                                    this.plate5 = ref;
                                }}
                            >
                                {penalty[25].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(5)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>6</div>
                            <span
                                ref={ref => {
                                    this.plate6 = ref;
                                }}
                            >
                                {penalty[26].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(6)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>7</div>
                            <span
                                ref={ref => {
                                    this.plate7 = ref;
                                }}
                            >
                                {penalty[27].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(7)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>8</div>
                            <span
                                ref={ref => {
                                    this.plate8 = ref;
                                }}
                            >
                                {penalty[28].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(8)}
                            </div>
                        </div>
                        <div className="TB_diceGame_plate_Above_one">
                            <div>9</div>
                            <span
                                ref={ref => {
                                    this.plate9 = ref;
                                }}
                            >
                                {penalty[29].content}
                            </span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(9)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Dice_Game;
