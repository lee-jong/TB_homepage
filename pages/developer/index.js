// # Library
import React from 'react';

// # Utill & Module
import Pagintaion from '../../helpers/module/pagination';

class Developer extends React.Component {
  render() {
    return (
      <>
        <div className="TB_developer">
          <div className="TB_developer_main">
            <div className="TB_developer_header">Developer Note</div>
            <div className="TB_developer_content">
              <table className="TB_developer_table">
                <thead>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">No.</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">1</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">2</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">3</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">4</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">5</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">6</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">7</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">8</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">9</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                  <tr className="TB_developer_table_tr">
                    <td className="TB_developer_table_td">10</td>
                    <td className="TB_developer_table_td">Title</td>
                    <td className="TB_developer_table_td">Content</td>
                    <td className="TB_developer_table_td">Date</td>
                  </tr>
                </tbody>
              </table>

              <div className="TB_pagination">
                <Pagintaion total={1} activeProps={1} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Developer;
