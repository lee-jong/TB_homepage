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

    // 골랐을 경우
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

    // 이동 했을 경우
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

                if (
                    this.checkedPlace(value) !== undefined &&
                    Number(choice) !== this.checkedPlace(value)
                ) {
                    let toCatchIndex = black.battalion.findIndex(
                        i => i.key == this.checkedPlace(value)
                    );
                    black.battalion.splice(toCatchIndex, 1);
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

    //get Info
    getInfo = type => {
        const { game, white, black } = this.state;
        let totalArr = white.battalion.concat(black.battalion);
        let findIdx = totalArr.findIndex(i => i.key == game.choice);
        let battalion = totalArr[findIdx];

        if (type == 'battalion') {
            return battalion;
        }

        if (type == 'totalArr') {
            return totalArr;
        }
    };

    // 이동 가능 여부 보여주기
    possibleMove = e => {
        const { white, black } = this.state;
        let battalion = this.getInfo('battalion');

        let lineX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
                let rookArr = [];
                for (let r = 1; r <= lineX.length; r++) {
                    rookArr.push(r + move2);
                }

                for (let r2 = 0; r2 < lineX.length; r2++) {
                    rookArr.push(move + '-' + lineX[r2]);
                }

                this.setState({
                    game: {
                        ...this.state.game,
                        moving: this.movableChecked(rookArr, 'rook')
                    }
                });

                break;
            case 'pawn':
                if (battalion.team == 'white') {
                    let whitePawn = !battalion.firstMove
                        ? this.state.game.moving.concat(
                              move - 1 + move2,
                              move - 2 + move2
                          )
                        : this.state.game.moving.concat(move - 1 + move2);

                    this.setState({
                        game: {
                            ...this.state.game,
                            moving: this.movableChecked(whitePawn)
                        }
                    });
                }

                if (battalion.team == 'black') {
                    let blackPawn = !battalion.firstMove
                        ? this.state.game.moving.concat(
                              move + 1 + move2,
                              move + 2 + move2
                          )
                        : this.state.game.moving.concat(move + 1 + move2);

                    this.setState({
                        game: {
                            ...this.state.game,
                            moving: this.movableChecked(blackPawn)
                        }
                    });
                }
                break;
        }
    };

    // 이동 가능 여부 체크
    movableChecked = (arr, type) => {
        console.log('arr:::', arr);
        const { game } = this.state;
        let movable = [];
        let lineX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let enemyTeam = game.turn !== 'white' ? 'white' : 'black';
        let targetX = this.getInfo('battalion').place.slice(2);
        let targetY = Number(this.getInfo('battalion').place.slice(0, 1));
        let lineXFind = lineX.findIndex(item => item == targetX);

        // 각각의 말의 특성에 따른
        switch (type) {
            case 'rook':
                //TODO 이런식으로 for 문을 네개를.....?
                // 직진
                for (let i = 1; i < 8; i++) {
                    if (
                        arr.findIndex(
                            item => item == targetY - i + '-' + targetX
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place == targetY - i + '-' + targetX
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place == targetY - i + '-' + targetX
                            ) !== -1
                        ) {
                            movable.push(targetY - i + '-' + targetX);
                            break;
                        }

                        movable.push(targetY - i + '-' + targetX);
                    }
                }

                // 후진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item => item == targetY + i + '-' + targetX
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place == targetY + i + '-' + targetX
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place == targetY + i + '-' + targetX
                            ) !== -1
                        ) {
                            movable.push(targetY + i + '-' + targetX);
                            break;
                        }
                        movable.push(targetY + i + '-' + targetX);
                    }
                }

                //좌
                for (let i = 1; i <= lineXFind; i++) {
                    if (
                        arr.findIndex(
                            item => item == targetY + '-' + lineX[lineXFind - i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            movable.push(targetY + '-' + lineX[lineXFind - i]);
                            break;
                        }
                        movable.push(targetY + '-' + lineX[lineXFind - i]);
                    }
                }

                //우
                for (let i = 1; i < lineX.length; i++) {
                    console.log('!?', lineX[lineXFind + i], i);
                    if (
                        arr.findIndex(
                            item => item == targetY + '-' + lineX[lineXFind + i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            movable.push(targetY + '-' + lineX[lineXFind + i]);

                            break;
                        }

                        movable.push(targetY + '-' + lineX[lineXFind + i]);
                    }
                }

                break;

            default:
                movable = arr;
                break;
        }

        console.log('!?', movable);

        return movable;
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
