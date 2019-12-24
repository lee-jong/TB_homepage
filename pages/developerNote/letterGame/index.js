import React from 'react';

// # Component
import Home from '../../../components/dump/developerNote/letterGame/home';
import Game from '../../../components/dump/developerNote/letterGame/game/index';

class letterGame extends React.Component {
    state = {
        status: 'home',
        option: {
            event: 'default' // 종목
        }
    };

    handleChangePage = name => {
        const { event } = this.state.option;
        if (event == 'default') return alert('옵션을 선택해 주세요.');

        this.setState({
            status: name
        });
    };

    handleChange = e => {
        this.setState({
            option: {
                ...this.state.option,
                [e.target.name]: e.target.value
            }
        });
    };

    render() {
        const { status, option } = this.state;
        return (
            <>
                <div className="TB_letterGame">
                    {status == 'home' && (
                        <Home
                            handleChange={this.handleChange}
                            handleChangePage={this.handleChangePage}
                        />
                    )}
                    {status == 'game' && <Game option={option} />}
                </div>
            </>
        );
    }
}

export default letterGame;
