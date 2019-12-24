import React from 'react';

class Saying extends React.Component {
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (
            nextProps.setting.game.index !== 0 &&
            !nextProps.setting.game.next &&
            nextProps.setting.game.index % 10 == 0 &&
            nextProps.setting.game.status == 'start'
        )
            return this.props.oneRoundEnd();
    }

    render() {
        const { list, game, result } = this.props.setting;
        const { confirmAnswer, nextQuestion, goContinuing } = this.props;
        return (
            <>
                <div>
                    {game.status == 'start' && (
                        <>
                            <div>
                                {!game.next && (
                                    <>
                                        <div> 문제 : </div>
                                        <div>
                                            {' '}
                                            {list[game.index]['masking']}
                                        </div>
                                    </>
                                )}
                                {game.next && (
                                    <>
                                        <div> 답 : </div>
                                        <div> {list[game.index]['value']} </div>
                                    </>
                                )}
                            </div>
                            <div>
                                <div> 설명 : </div>
                                <div> {list[game.index]['content']} </div>
                            </div>

                            <div>
                                {!game.next && (
                                    <button onClick={confirmAnswer}>
                                        정답 확인
                                    </button>
                                )}
                                {game.next && (
                                    <button onClick={nextQuestion}>다음</button>
                                )}
                            </div>
                        </>
                    )}

                    {game.status == 'end' && (
                        <>
                            <div>
                                <div>end</div>
                                {result.map((item, index) => (
                                    <>
                                        <div key={index}>
                                            문제 {index + 1} :
                                        </div>
                                        <div>{item.value}</div>
                                    </>
                                ))}
                                <div>
                                    <button onClick={goContinuing}>
                                        이어하기
                                    </button>
                                    <button>처음으로</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        );
    }
}

export default Saying;
