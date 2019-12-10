import React from 'react';

class CreateDeveloper extends React.Component {
  render() {
    const { closePopup, handleChange, createDeveloperNote } = this.props;
    return (
      <>
        <div className="TB_developer_create">
          <table className="TB_developer_create_content">
            <tbody>
              <tr className="TB_developer_create_content_item">
                <td className="TB_developer_create_content_item_key">
                  <div>TITLE</div>
                </td>
                <td>
                  <input type="text" name="title" onChange={handleChange} />
                </td>
              </tr>
              <tr className="TB_developer_create_content_item">
                <td className="TB_developer_create_content_item_key">
                  <div>URL</div>
                </td>
                <td>
                  <input type="text" name="place" onChange={handleChange} />
                </td>
              </tr>
              <tr className="TB_developer_create_content_item">
                <td className="TB_developer_create_content_item_key">
                  <div className="TB_developer_create_content_item_textarea">
                    CONTENT
                  </div>
                </td>
                <td>
                  <textarea name="content" onChange={handleChange} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="TB_developer_create_footer">
            <button onClick={() => closePopup('detail')}>취소</button>
            <button onClick={() => createDeveloperNote()}>완료</button>
          </div>
        </div>
      </>
    );
  }
}

export default CreateDeveloper;
