import React from 'react';

class Board extends React.Component {
    createBoard = () => {
        let board = [];
        let alphabet = ['-a', '-b', '-c', '-d', '-e', '-f', '-g', '-h'];
        const {
            game,
            checkedPlace,
            choiceBattalion,
            movementBattalion
        } = this.props;

        for (let i = 0; i < 8; i++) {
            board.push(
                <div>
                    {alphabet.map((item, index) => (
                        <div
                            className={
                                (checkedPlace(i + 1 + alphabet[index]) ==
                                    game.choice &&
                                    'active') ||
                                (game.moving.findIndex(
                                    item => item == i + 1 + alphabet[index]
                                ) !== -1 &&
                                    'moving') ||
                                (checkedPlace(i + 1 + alphabet[index]) ==
                                    game.choice &&
                                    game.moving.findIndex(
                                        item => item == i + 1 + alphabet[index]
                                    ) !== -1 &&
                                    'active moving')
                            }
                            onClick={
                                game.moving.findIndex(
                                    item => item == i + 1 + alphabet[index]
                                ) !== -1
                                    ? () =>
                                          movementBattalion(
                                              i + 1 + alphabet[index]
                                          )
                                    : choiceBattalion
                            }
                        >
                            {checkedPlace(i + 1 + alphabet[index])}
                        </div>
                    ))}
                </div>
            );
        }

        return board;
    };

    render() {
        return (
            <>
                <div className="TB_chess_board">{this.createBoard()}</div>
            </>
        );
    }
}

export default Board;
