import React from 'react';

import Board from '../../../components/dump/developerNote/chessGame/board';

import { WhiteTeam, BlackTeam } from '../../../helpers/json/chess';

class Chess extends React.Component {
    state = {
        white: {
            battalion: WhiteTeam
        },
        black: {
            battalion: BlackTeam
        },
        game: {
            turn: 'white',
            choice: '',
            moving: []
        }
    };

    checkedPlace = value => {
        const { white, black } = this.state;
        let totalArr = white.battalion.concat(black.battalion);
        let findIdx = totalArr.findIndex(item => item.place == value);
        if (findIdx !== -1) {
            return totalArr[findIdx].key;
        }
    };

    choiceBattalion = e => {
        const { game, white, black } = this.state;
        let value = e.target.textContent;
        // 차례가 맞는지
        if (
            game.turn == 'white' &&
            white.battalion.findIndex(i => i.key == value) == -1
        )
            return;
        if (
            game.turn == 'black' &&
            black.battalion.findIndex(i => i.key == value) == -1
        )
            return;

        if (value == game.choice) {
            return this.setState({
                game: {
                    ...this.state.game,
                    choice: '',
                    moving: []
                }
            });
        }

        this.setState(
            {
                game: {
                    ...this.state.game,
                    choice: value,
                    moving: []
                }
            },
            () => this.possibleMove()
        );
    };

    movementBattalion = value => {
        const { white, black } = this.state;
        const { choice, moving } = this.state.game;

        if (moving.findIndex(item => item == value) !== -1) {
            let whiteIndex = white.battalion.findIndex(
                item2 => item2.key == choice
            );

            let blackIndex = black.battalion.findIndex(
                item3 => item3.key == choice
            );

            if (whiteIndex !== -1) {
                let find = white.battalion[whiteIndex];
                let data = {
                    key: find.key,
                    team: find.team,
                    role: find.role,
                    place: value,
                    firstMove: true
                };

                if (this.checkedPlace(value) !== undefined) {
                    let toCatchIndex = black.battalion.findIndex(
                        i => i.key == this.checkedPlace(value)
                    );
                    black.battalion.splice(toCatchIndex, 1);
                    console.log('!?', black.battalion);
                }

                white.battalion.splice(whiteIndex, 1, data);
                this.setState({
                    black: {
                        ...this.state.black,
                        black: black.battalion
                    },
                    white: {
                        ...this.state.white,
                        battalion: white.battalion
                    },
                    game: {
                        ...this.state.game,
                        turn: 'black',
                        choice: '',
                        moving: []
                    }
                });
            }

            if (blackIndex !== -1) {
                let find = black.battalion[blackIndex];
                let data = {
                    key: find.key,
                    team: find.team,
                    role: find.role,
                    place: value,
                    firstMove: true
                };

                if (this.checkedPlace(value) !== undefined) {
                    let toCatchIndex = white.battalion.findIndex(
                        i => i.key == this.checkedPlace(value)
                    );
                    white.battalion.splice(toCatchIndex, 1);
                }

                black.battalion.splice(blackIndex, 1, data);

                this.setState({
                    black: {
                        ...this.state.black,
                        battalion: black.battalion
                    },
                    white: {
                        ...this.state.white,
                        battalion: white.battalion
                    },
                    game: {
                        ...this.state.game,
                        turn: 'white',
                        choice: '',
                        moving: []
                    }
                });
            }
        }
    };

    possibleMove = e => {
        const { game, white, black } = this.state;
        let totalArr = white.battalion.concat(black.battalion);
        let findIdx = totalArr.findIndex(i => i.key == game.choice);
        let battalion = totalArr[findIdx];
        let index = '';
        let move = '';
        let move2 = '';

        if (battalion.team == 'white') {
            index = white.battalion.findIndex(i => i.key == battalion.key);
            move = Number(white.battalion[index].place.slice(0, 1));
            move2 = white.battalion[index].place.slice(1);
        }

        if (battalion.team == 'black') {
            index = black.battalion.findIndex(i => i.key == battalion.key);
            move = Number(black.battalion[index].place.slice(0, 1));
            move2 = black.battalion[index].place.slice(1);
        }

        switch (battalion.role) {
            case 'king':
                break;
            case 'queen':
                break;
            case 'bishop':
                break;
            case 'knight':
                break;
            case 'rook':
                move;

                break;
            case 'pawn':
                if (battalion.team == 'white') {
                    this.setState({
                        game: {
                            ...this.state.game,
                            moving: !battalion.firstMove
                                ? this.state.game.moving.concat(
                                      move - 1 + move2,
                                      move - 2 + move2
                                  )
                                : this.state.game.moving.concat(
                                      move - 1 + move2
                                  )
                        }
                    });
                }

                if (battalion.team == 'black') {
                    this.setState({
                        game: {
                            ...this.state.game,
                            moving: !battalion.firstMove
                                ? this.state.game.moving.concat(
                                      move + 1 + move2,
                                      move + 2 + move2
                                  )
                                : this.state.game.moving.concat(
                                      move + 1 + move2
                                  )
                        }
                    });
                }
                break;
        }
    };

    render() {
        const { game } = this.state;
        return (
            <>
                <Board
                    game={game}
                    checkedPlace={this.checkedPlace}
                    choiceBattalion={this.choiceBattalion}
                    movementBattalion={this.movementBattalion}
                />
            </>
        );
    }
}

export default Chess;
