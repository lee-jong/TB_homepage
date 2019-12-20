import React from 'react';

class Dice_Home extends React.Component {
    render() {
        const { handleChange, info } = this.props;
        return (
            <>
                <div className="TB_diceGame_home">
                    <div>
                        <div>인원 : </div>
                        <select
                            onChange={e => handleChange(e, 'game')}
                            name="personnel"
                            value={info.personnel}
                        >
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>

                    <div>
                        <button
                            onClick={e => handleChange(e, 'game', 'bool')}
                            name="status"
                        >
                            Game Start
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default Dice_Home;
