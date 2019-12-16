import React from 'react';

import Ready from '../../../components/dump/developerNote/imgGame/Ready';
import Start from '../../../components/dump/developerNote/imgGame/Start';

import { numValid } from '../../../helpers/utils';

class Customize extends React.Component {
    state = {
        option: {
            title: '',
            time: '',
            battle: false
        },
        start: false
    };

    handleChange = e => {
        const { title, time } = this.state.option;
        switch (e.target.name) {
            case 'battle':
                this.setState({
                    option: {
                        ...this.state.option,
                        battle: !this.state.option.battle
                    }
                });
                break;

            case 'start':
                if (title == '') return alert('주제를 선택해주세요.');
                if (time == '') return alert('시간을 선택해주세요.');
                if (numValid(time))
                    return alert('시간 설정은 숫자만 입력해주세요.');

                this.setState({
                    start: !this.state.start
                });
                break;

            default:
                this.setState({
                    option: {
                        ...this.state.option,
                        [e.target.name]: e.target.value
                    }
                });
                break;
        }
    };

    render() {
        const { start } = this.state;
        const { battle } = this.state.option;
        return (
            <>
                <div className="TB_Customize">
                    {!start && (
                        <Ready
                            option={this.state.option}
                            handleChange={this.handleChange}
                        />
                    )}

                    {start && (
                        <Start
                            option={this.state.option}
                            handleChange={this.handleChange}
                            battle={battle}
                        />
                    )}
                </div>
            </>
        );
    }
}

export default Customize;
