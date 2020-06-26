import React from 'react';

class Board extends React.Component {
    createBoard = () => {
        let board = [];
        let alphabet = ['-a', '-b', '-c', '-d', '-e', '-f', '-g', '-h'];
        const {
            game,
            checkedPlace,
            choiceBattalion,
            movementBattalion,
        } = this.props;

        for (let i = 0; i < 8; i++) {
            board.push(
                <div>
                    {alphabet.map((item, index) => (
                        <div
                            className={
                                (checkedPlace(i + 1 + alphabet[index], 'key') ==
                                    game.choice &&
                                    'active') ||
                                (game.moving.findIndex(
                                    (item) => item == i + 1 + alphabet[index]
                                ) !== -1 &&
                                    'moving') ||
                                (checkedPlace(i + 1 + alphabet[index], 'key') ==
                                    game.choice &&
                                    game.moving.findIndex(
                                        (item) =>
                                            item == i + 1 + alphabet[index]
                                    ) !== -1 &&
                                    'active moving')
                            }
                            onClick={
                                game.moving.findIndex(
                                    (item) => item == i + 1 + alphabet[index]
                                ) !== -1
                                    ? () =>
                                          movementBattalion(
                                              i + 1 + alphabet[index]
                                          )
                                    : () =>
                                          choiceBattalion(
                                              checkedPlace(
                                                  i + 1 + alphabet[index],
                                                  'key'
                                              )
                                          )
                            }
                        >
                            <img
                                className={
                                    checkedPlace(
                                        i + 1 + alphabet[index],
                                        'img'
                                    ) && 'chess_img'
                                }
                                src={checkedPlace(
                                    i + 1 + alphabet[index],
                                    'img'
                                )}
                            />
                        </div>
                    ))}
                </div>
            );
        }

        return board;
    };

    render() {
        const { game } = this.props;
        return (
            <>
                <div className="TB_chess_board_main">
                    <div className="TB_chess_board">{this.createBoard()}</div>
                    <div className="navi">
                        {game.status == 'end' ? (
                            <h1>{game.turn}차례</h1>
                        ) : (
                            <h1>{game.endMessage}</h1>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default Board;
