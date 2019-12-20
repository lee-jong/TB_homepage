import React from 'react';

class Dice_Game extends React.Component {
    state = {
        users: this.props.info.users,
        turn: 0 // 유저 번호
    };

    goingTimer = '';

    stopTimer = name => {
        clearInterval(this[name]);
        this[name] = '';
    };

    rollingDice = () => {
        const { users, turn } = this.state;
        let usersCopy = users;
        let dice = [1, 2, 3, 4, 5, 6];
        let nextDice = dice[Math.floor(Math.random() * dice.length)];

        let count = 0;
        this.goingTimer = setInterval(() => {
            let changeSpaces = usersCopy.splice(turn, 1);
            let extraction = changeSpaces[0];

            count++;
            if (count == nextDice) {
                this.stopTimer('goingTimer');
            }
            extraction.space = extraction.space + 1;

            if (extraction.space > 32) {
                extraction.space = extraction.space - 32;
            }
            usersCopy.splice(turn, 0, extraction);

            if (turn + 1 >= users.length) {
                return this.setState({
                    users: usersCopy,
                    turn: 0
                });
            } else {
                return this.setState({
                    users: usersCopy,
                    turn: turn + 1
                });
            }
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
                    className="TB_diceGame_plate"
                    value={finds[i].key}
                    style={{ backgroundColor: finds[i].color }}
                >
                    {finds[i].key}
                </div>
            );
        }
        return plate_spaces;
    };

    render() {
        return (
            <>
                <div className="TB_diceGame_game_plate">
                    <div className="TB_diceGame_plate_Above_0">
                        <div>
                            <div>25</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(25)}
                            </div>
                        </div>
                        <div>
                            <div>24</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(24)}
                            </div>
                        </div>
                        <div>
                            <div>23</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(23)}
                            </div>
                        </div>
                        <div>
                            <div>22</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(22)}
                            </div>
                        </div>
                        <div>
                            <div>21</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(21)}
                            </div>
                        </div>
                        <div>
                            <div>20</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(20)}
                            </div>
                        </div>
                        <div>
                            <div>19</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(19)}
                            </div>
                        </div>
                        <div>
                            <div>18</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(18)}
                            </div>
                        </div>
                        <div>
                            <div>17</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(17)}
                            </div>
                        </div>
                        <div>
                            <div>16</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(16)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_1">
                        <div>
                            <div>26</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(26)}
                            </div>
                        </div>
                        <div>
                            <div>15</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(15)}
                            </div>
                        </div>
                        <span className="TB_diceGame_center">
                            <div>title</div>
                            <div>
                                <button>hi</button>
                                <button>hi</button>
                            </div>
                        </span>
                    </div>
                    <div className="TB_diceGame_plate_Above_2">
                        <div>
                            <div>27</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(27)}
                            </div>
                        </div>
                        <div>
                            <div>14</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(14)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_3">
                        <div>
                            <div>28</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(28)}
                            </div>
                        </div>
                        <div>
                            <div>13</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(13)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_4">
                        <div>
                            <div>29</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(29)}
                            </div>
                        </div>
                        <div>
                            <div>12</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(12)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_5">
                        <div>
                            <div>30</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(30)}
                            </div>
                        </div>
                        <div>
                            <div>11</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(11)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_6">
                        <div>
                            <div>31</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(31)}
                            </div>
                        </div>
                        <div>
                            <div>10</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(10)}
                            </div>
                        </div>
                    </div>
                    <div className="TB_diceGame_plate_Above_7">
                        <div>
                            <div>시작</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(0)}
                            </div>
                        </div>
                        <div>
                            <div>1</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(1)}
                            </div>
                        </div>
                        <div>
                            <div>2</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(2)}
                            </div>
                        </div>
                        <div>
                            <div>3</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(3)}
                            </div>
                        </div>
                        <div>
                            <div>4</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(4)}
                            </div>
                        </div>
                        <div>
                            <div>5</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(5)}
                            </div>
                        </div>
                        <div>
                            <div>6</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(6)}
                            </div>
                        </div>
                        <div>
                            <div>7</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(7)}
                            </div>
                        </div>
                        <div>
                            <div>8</div>
                            <span>벌칙</span>
                            <div className="TB_diceGame_plate_Above_test">
                                {this.plateChecked(8)}
                            </div>
                        </div>
                        <div>
                            <div>9</div>
                            <span>벌칙</span>
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
