import React from 'react';

class Home extends React.Component {
    render() {
        const { handleChange, handleChangePage } = this.props;
        return (
            <>
                <div>
                    <div> 옵션 : </div>
                    <select onChange={handleChange} name="event">
                        <option value="default">선택해주세요.</option>
                        <option value="capital">수도</option>
                        <option value="idiom">사자성어(고사성어)</option>
                        <option value="saying">속담 이어 말하기</option>
                        <option value="movie">영화 초성 맞추기</option>
                    </select>
                </div>
                <div>
                    <button onClick={() => handleChangePage('game')}>
                        시작하기
                    </button>
                </div>
            </>
        );
    }
}

export default Home;
