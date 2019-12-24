import React from 'react';

// #  Component
import Capital from './capital';
import Idiom from './Idiom';
import Saying from './saying';
import Movie from './movie';

// # Util
import { mixItem } from '../../../../../helpers/utils';
import { letterJSON } from '../../../../../helpers/json/letter';

class Game extends React.Component {
    state = {
        list: mixItem(letterJSON[this.props.option.event]),
        game: {
            round: 1,
            index: 0,
            next: false,
            status: 'start'
        }
    };

    confirmAnswer = () => {
        this.setState({
            game: {
                ...this.state.game,
                next: true
            }
        });
    };

    nextQuestion = () => {
        const { index } = this.state.game;

        this.setState({
            game: {
                ...this.state.game,
                index: index + 1,
                next: false
            }
        });
    };

    oneRoundEnd = () => {
        const { game, list } = this.state;
        this.setState({
            game: {
                ...this.state.game,
                index: game.index + 1,
                round: game.round + 1,
                status: 'end'
            },
            result: list.slice((game.round - 1) * 10, 10 * game.round)
        });
    };

    goContinuing = () => {
        const { game, list } = this.state;

        if (game.round > list.length / 10 && game.status == 'end')
            return this.exhaustion(true);

        this.setState({
            game: {
                ...this.state.game,
                status: 'start'
            }
        });
    };

    exhaustion = bool => {
        if (bool) {
            alert('중복되지 않은 속담이 더 이상 존재하지 않습니다.');
        }

        location.reload();
    };

    render() {
        const { option } = this.props;
        return (
            <>
                {option.event == 'capital' && (
                    <Capital
                        oneRoundEnd={this.oneRoundEnd}
                        confirmAnswer={this.confirmAnswer}
                        nextQuestion={this.nextQuestion}
                        goContinuing={this.goContinuing}
                        exhaustion={this.exhaustion}
                        setting={this.state}
                    />
                )}
                {option.event == 'idiom' && (
                    <Idiom
                        oneRoundEnd={this.oneRoundEnd}
                        confirmAnswer={this.confirmAnswer}
                        nextQuestion={this.nextQuestion}
                        goContinuing={this.goContinuing}
                        exhaustion={this.exhaustion}
                        setting={this.state}
                    />
                )}
                {option.event == 'saying' && (
                    <Saying
                        oneRoundEnd={this.oneRoundEnd}
                        confirmAnswer={this.confirmAnswer}
                        nextQuestion={this.nextQuestion}
                        goContinuing={this.goContinuing}
                        exhaustion={this.exhaustion}
                        setting={this.state}
                    />
                )}

                {option.event == 'movie' && (
                    <Movie
                        oneRoundEnd={this.oneRoundEnd}
                        confirmAnswer={this.confirmAnswer}
                        nextQuestion={this.nextQuestion}
                        goContinuing={this.goContinuing}
                        exhaustion={this.exhaustion}
                        setting={this.state}
                    />
                )}
            </>
        );
    }
}

export default Game;
