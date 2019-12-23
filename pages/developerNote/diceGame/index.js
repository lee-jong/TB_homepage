import React from 'react';

import Dice_Home from '../../../components/dump/developerNote/diceGame/Home';
import Dice_Game from '../../../components/dump/developerNote/diceGame/index';

import { getColor } from '../../../helpers/json/color';

class DiceGame extends React.Component {
    state = {
        game: {
            status: false,
            users: [
                {
                    key: 0,
                    space: 0,
                    status: 'start',
                    color: 'hsla(4, 98%, 49%, 0.329)',
                    rotation: 0
                },
                {
                    key: 1,
                    space: 0,
                    status: 'start',
                    color: 'hsla(253, 98%, 49%, 0.329)',
                    rotation: 0
                }
            ],
            personnel: '2',
            option: 1
        }
    };

    handleChange = (e, name, bool) => {
        let e_name = e.target.name;
        let value = e.target.value;

        if (bool == undefined) {
            this.setState({
                [name]: {
                    ...this.state[name],
                    [e_name]: value
                }
            });
        }

        if (bool !== undefined) {
            this.setState({
                [name]: {
                    ...this.state[name],
                    [e_name]: !this.state[name][e_name]
                }
            });
        }
        //선택한 유저만큼 유저의 수를 만들기
        if (e_name == 'personnel') {
            const { users } = this.state.game;
            let createUsers = [];

            //옵션창을 재선택 했을 경우 기존의 값을 비워주고 만들어주기
            if (users.length !== 0) {
                this.setState({
                    game: {
                        ...this.state.game,
                        users: []
                    }
                });
            }

            for (let i = 0; i < value; i++) {
                createUsers.push({
                    key: i,
                    space: 0,
                    status: 'start',
                    color: getColor[i].color,
                    rotation: 0
                });
                this.setState({
                    game: {
                        ...this.state.game,
                        users: createUsers,
                        [e_name]: value
                    }
                });
            }
        }
    };

    render() {
        const { game } = this.state;
        return (
            <>
                <div className="TB_diceGame">
                    {!game.status && (
                        <Dice_Home
                            handleChange={this.handleChange}
                            info={game}
                        />
                    )}
                    {game.status && <Dice_Game info={game} />}
                </div>
            </>
        );
    }
}

export default DiceGame;
