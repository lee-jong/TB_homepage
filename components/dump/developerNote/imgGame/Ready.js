import React from 'react';

class Ready extends React.Component {
  render() {
    const { battle } = this.props.option;
    const { handleChange } = this.props;
    return (
      <>
        <div className="TB_Customize_header">옵션 설정</div>
        <div className="TB_Customize_option">
          <div className="TB_Customize_option_title">
            <div> 주제 </div>
            <select onChange={handleChange} name="title">
              <option value=""> 선택해주세요 </option>
              <option value="1">인물</option>
              <option value="2">동물</option>
              <option value="3">사물</option>
            </select>
          </div>
          <div className="TB_Customize_option_time">
            <div>시간 설정</div>
            <input
              type="text"
              onChange={handleChange}
              name="time"
              placeholder="초 단위 입력"
            />
          </div>
          <div className="TB_Customize_option_checked">
            <div>같은 주제 대결</div>
            {battle && (
              <img
                onClick={handleChange}
                name="battle"
                src="/static/images/yes.png"
              />
            )}
            {!battle && (
              <img
                onClick={handleChange}
                name="battle"
                src="/static/images/no.png"
              />
            )}
          </div>
        </div>
        <div className="TB_Customize_footer">
          <button onClick={handleChange} name="start">
            시작하기
          </button>
        </div>
      </>
    );
  }
}

export default Ready;
