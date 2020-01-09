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
            moving: [],
            status: 'start'
        }
    };

    checkedPlace = (value, type) => {
        const { white, black } = this.state;
        let totalArr = white.battalion.concat(black.battalion);
        let findIdx = totalArr.findIndex(item => item.place == value);
        if (findIdx !== -1) {
            let res = '';
            switch (type) {
                case 'key':
                    res = totalArr[findIdx].key;
                    break;

                case 'img':
                    res = totalArr[findIdx].img;
                    break;
            }

            return res;
        }
    };

    // 골랐을 경우
    choiceBattalion = value => {
        const { game, white, black } = this.state;
        // 차례가 맞는지
        if (game.status == 'end') return;

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
        let getInfo = this.getInfo();

        if (moving.findIndex(item => item == value) !== -1) {
            let whiteIndex = white.battalion.findIndex(
                item2 => item2.key == choice
            );

            let blackIndex = black.battalion.findIndex(
                item3 => item3.key == choice
            );

            if (whiteIndex !== -1) {
                let data;
                let find = white.battalion[whiteIndex];
                //폰을 킹으로 진화~~
                if (find.role == 'pawn' && value.slice(0, 1) == 1) {
                    data = {
                        key: find.key,
                        team: find.team,
                        role: 'king',
                        place: value,
                        img: '/static/images/chess/white-king.png',
                        firstMove: true
                    };
                } else {
                    data = {
                        key: find.key,
                        team: find.team,
                        role: find.role,
                        place: value,
                        img: find.img,
                        firstMove: true
                    };
                }

                if (
                    this.checkedPlace(value, 'key') !== undefined &&
                    Number(choice) !== this.checkedPlace(value, 'key')
                ) {
                    let toCatchIndex = black.battalion.findIndex(
                        i => i.key == this.checkedPlace(value, 'key')
                    );

                    if (
                        black.battalion[toCatchIndex].role &&
                        black.battalion[toCatchIndex].role == 'queen'
                    ) {
                        return this.setState(
                            {
                                game: {
                                    ...this.state.game,
                                    status: 'end'
                                }
                            },
                            () => black.battalion.splice(toCatchIndex, 1)
                        );
                    }
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
                let data;

                if (find.role == 'pawn' && value.slice(0, 1) == 8) {
                    data = {
                        key: find.key,
                        team: find.team,
                        role: 'king',
                        place: value,
                        img: '/static/images/chess/black-king.png',
                        firstMove: true
                    };
                } else {
                    data = {
                        key: find.key,
                        team: find.team,
                        role: find.role,
                        place: value,
                        img: find.img,
                        firstMove: true
                    };
                }

                if (
                    this.checkedPlace(value, 'key') !== undefined &&
                    Number(choice) !== this.checkedPlace(value, 'key')
                ) {
                    let toCatchIndex = white.battalion.findIndex(
                        i => i.key == this.checkedPlace(value, 'key')
                    );

                    if (white.battalion[toCatchIndex].role == 'queen') {
                        return this.setState(
                            {
                                game: {
                                    ...this.state.game,
                                    status: 'end'
                                }
                            },
                            () => white.battalion.splice(toCatchIndex, 1)
                        );
                    }
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

    // 각각의 말의 특성에 따른 이동 모든 이동 범위
    possibleMove = e => {
        const { white, black } = this.state;
        let battalion = this.getInfo('battalion');

        let lineX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let index = '';
        let move = '';
        let move2 = '';
        let move3 = '';
        let findIndex = '';

        if (battalion.team == 'white') {
            index = white.battalion.findIndex(i => i.key == battalion.key);
            move = Number(white.battalion[index].place.slice(0, 1));
            move2 = white.battalion[index].place.slice(1);
            move3 = white.battalion[index].place.slice(2);
            findIndex = lineX.findIndex(item => item == move3);
        }

        if (battalion.team == 'black') {
            index = black.battalion.findIndex(i => i.key == battalion.key);
            move = Number(black.battalion[index].place.slice(0, 1));
            move2 = black.battalion[index].place.slice(1);
            move3 = black.battalion[index].place.slice(2);
            findIndex = lineX.findIndex(item => item == move3);
        }

        switch (battalion.role) {
            case 'king':
                let kingArr = [];
                for (let k = 0; k <= lineX.length; k++) {
                    kingArr.push(move + k + '-' + lineX[findIndex + k]);
                    kingArr.push(move + k + '-' + lineX[findIndex - k]);
                    kingArr.push(move - k + '-' + lineX[findIndex + k]);
                    kingArr.push(move - k + '-' + lineX[findIndex - k]);
                    kingArr.push(k + move2);
                    kingArr.push(move + '-' + lineX[k]);
                }

                this.setState({
                    game: {
                        ...this.state.game,
                        moving: this.movableChecked(kingArr, 'king')
                    }
                });

                break;
            case 'queen':
                let queenArr = [];
                queenArr.push(move + 1 + '-' + move3);
                queenArr.push(move - 1 + '-' + move3);
                queenArr.push(move + '-' + lineX[findIndex + 1]);
                queenArr.push(move + '-' + lineX[findIndex - 1]);
                queenArr.push(move + 1 + '-' + lineX[findIndex + 1]);
                queenArr.push(move - 1 + '-' + lineX[findIndex + 1]);
                queenArr.push(move + 1 + '-' + lineX[findIndex - 1]);
                queenArr.push(move - 1 + '-' + lineX[findIndex - 1]);

                this.setState({
                    game: {
                        ...this.state.game,
                        moving: this.movableChecked(queenArr, 'queen')
                    }
                });

                break;
            case 'bishop':
                let bishopArr = [];
                for (let b = 1; b <= lineX.length; b++) {
                    bishopArr.push(move + b + '-' + lineX[findIndex + b]);
                    bishopArr.push(move + b + '-' + lineX[findIndex - b]);
                    bishopArr.push(move - b + '-' + lineX[findIndex + b]);
                    bishopArr.push(move - b + '-' + lineX[findIndex - b]);
                }
                this.setState({
                    game: {
                        ...this.state.game,
                        moving: this.movableChecked(bishopArr, 'bishop')
                    }
                });

                break;
            case 'knight':
                let knightArr = [];
                for (let k = 1; k <= 2; k++) {
                    knightArr.push(
                        move +
                            k +
                            '-' +
                            lineX[k == 1 ? findIndex + 2 : findIndex + 1]
                    );
                    knightArr.push(
                        move +
                            k +
                            '-' +
                            lineX[k == 1 ? findIndex - 2 : findIndex - 1]
                    );
                    knightArr.push(
                        move -
                            k +
                            '-' +
                            lineX[k == 1 ? findIndex + 2 : findIndex + 1]
                    );
                    knightArr.push(
                        move -
                            k +
                            '-' +
                            lineX[k == 1 ? findIndex - 2 : findIndex - 1]
                    );
                }

                this.setState({
                    game: {
                        ...this.state.game,
                        moving: this.movableChecked(knightArr, 'knight')
                    }
                });

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
                //여기만 다시하기 체크
                if (battalion.team == 'white') {
                    let whitePawn = [];

                    if (
                        !battalion.firstMove &&
                        this.findIndexPlace('black', move - 2 + move2) == -1
                    ) {
                        whitePawn.push(move - 2 + move2);
                    }

                    if (this.findIndexPlace('black', move - 1 + move2) == -1) {
                        whitePawn.push(move - 1 + move2);
                    }

                    if (
                        this.findIndexPlace(
                            'black',
                            move - 1 + '-' + lineX[findIndex + 1]
                        ) !== -1
                    ) {
                        whitePawn.push(move - 1 + '-' + lineX[findIndex + 1]);
                    }

                    if (
                        this.findIndexPlace(
                            'black',
                            move - 1 + '-' + lineX[findIndex - 1]
                        ) !== -1
                    ) {
                        whitePawn.push(move - 1 + '-' + lineX[findIndex - 1]);
                    }

                    this.setState({
                        game: {
                            ...this.state.game,
                            moving: this.movableChecked(whitePawn, 'pawn')
                        }
                    });
                }

                if (battalion.team == 'black') {
                    let blackPawn = [];

                    if (
                        !battalion.firstMove &&
                        this.findIndexPlace('white', move + 2 + move2) == -1
                    ) {
                        blackPawn.push(move + 2 + move2);
                    }

                    if (this.findIndexPlace('white', move + 1 + move2) == -1) {
                        blackPawn.push(move + 1 + move2);
                    }

                    if (
                        this.findIndexPlace(
                            'white',
                            move + 1 + '-' + lineX[findIndex + 1]
                        ) !== -1
                    ) {
                        blackPawn.push(move + 1 + '-' + lineX[findIndex + 1]);
                    }

                    if (
                        this.findIndexPlace(
                            'white',
                            move + 1 + '-' + lineX[findIndex - 1]
                        ) !== -1
                    ) {
                        blackPawn.push(move + 1 + '-' + lineX[findIndex - 1]);
                    }

                    this.setState({
                        game: {
                            ...this.state.game,
                            moving: this.movableChecked(blackPawn, 'pawn')
                        }
                    });
                }
                break;
        }
    };

    findIndexPlace = (team, place) => {
        let res = this.state[team].battalion.findIndex(
            item => item.place == place
        );
        return res;
    };

    // 이동 가능 여부 체크 및 예외 처리
    movableChecked = (arr, type) => {
        const { game } = this.state;
        let movable = [];
        let lineX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let enemyTeam = game.turn !== 'white' ? 'white' : 'black';
        let targetX = this.getInfo('battalion').place.slice(2);
        let targetY = Number(this.getInfo('battalion').place.slice(0, 1));
        let lineXFind = lineX.findIndex(item => item == targetX);

        switch (type) {
            case 'king':
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

                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY - i + '-' + lineX[lineXFind - i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY - i + '-' + lineX[lineXFind - i]
                            );
                            break;
                        }

                        movable.push(targetY - i + '-' + lineX[lineXFind - i]);
                    }
                }

                // 우 직진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY - i + '-' + lineX[lineXFind + i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY - i + '-' + lineX[lineXFind + i]
                            );
                            break;
                        }
                        movable.push(targetY - i + '-' + lineX[lineXFind + i]);
                    }
                }

                //좌 후진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY + i + '-' + lineX[lineXFind - i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY + i + '-' + lineX[lineXFind - i]
                            );
                            break;
                        }
                        movable.push(targetY + i + '-' + lineX[lineXFind - i]);
                    }
                }

                //우 후진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY + i + '-' + lineX[lineXFind + i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY + i + '-' + lineX[lineXFind + i]
                            );

                            break;
                        }

                        movable.push(targetY + i + '-' + lineX[lineXFind + i]);
                    }
                }

                break;

            case 'queen':
                for (let i = 0; i < arr.length; i++) {
                    if (
                        this.state[game.turn].battalion.findIndex(
                            item => item.place == arr[i]
                        ) == -1
                    ) {
                        movable.push(arr[i]);
                    }
                }
                break;

            case 'bishop':
                // 좌 직진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY - i + '-' + lineX[lineXFind - i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY - i + '-' + lineX[lineXFind - i]
                            );
                            break;
                        }

                        movable.push(targetY - i + '-' + lineX[lineXFind - i]);
                    }
                }

                // 우 직진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY - i + '-' + lineX[lineXFind + i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY - i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY - i + '-' + lineX[lineXFind + i]
                            );
                            break;
                        }
                        movable.push(targetY - i + '-' + lineX[lineXFind + i]);
                    }
                }

                //좌 후진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY + i + '-' + lineX[lineXFind - i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind - i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY + i + '-' + lineX[lineXFind - i]
                            );
                            break;
                        }
                        movable.push(targetY + i + '-' + lineX[lineXFind - i]);
                    }
                }

                //우 후진
                for (let i = 1; i < 9; i++) {
                    if (
                        arr.findIndex(
                            item =>
                                item == targetY + i + '-' + lineX[lineXFind + i]
                        ) !== -1
                    ) {
                        if (
                            this.state[game.turn].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            break;
                        }

                        if (
                            this.state[enemyTeam].battalion.findIndex(
                                item =>
                                    item.place ==
                                    targetY + i + '-' + lineX[lineXFind + i]
                            ) !== -1
                        ) {
                            movable.push(
                                targetY + i + '-' + lineX[lineXFind + i]
                            );

                            break;
                        }

                        movable.push(targetY + i + '-' + lineX[lineXFind + i]);
                    }
                }

                break;

            case 'knight':
                for (let i = 0; i < arr.length; i++) {
                    if (
                        this.state[game.turn].battalion.findIndex(
                            item => item.place == arr[i]
                        ) == -1
                    ) {
                        movable.push(arr[i]);
                    }
                }
                break;

            case 'rook':
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

            case 'pawn':
                for (let i = 0; i < arr.length; i++) {
                    if (
                        this.state[game.turn].battalion.findIndex(
                            item => item.place == arr[i]
                        ) == -1
                    ) {
                        movable.push(arr[i]);
                    }
                }

                break;
        }

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
