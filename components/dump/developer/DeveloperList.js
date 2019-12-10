import React from 'react';

// # Utill & Module
import Pagintaion from '../../../helpers/module/pagination';
import { getDate } from '../../../helpers/utils';
import { handelRouterIndex } from '../../../helpers/nextUtil';
import { getDeveloperLimit } from '../../../helpers/setting';

class DeveloperList extends React.Component {
  render() {
    const { res, openPopup, active, handlePage } = this.props;
    return (
      <>
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
              {res.list.map(item => (
                <tr
                  onClick={() =>
                    handelRouterIndex('developer/detail', item.seq)
                  }
                  className="TB_developer_table_tr"
                >
                  <td className="TB_developer_table_td">{item.seq}</td>
                  <td className="TB_developer_table_td">{item.title}</td>
                  <td className="TB_developer_table_td">{item.content}</td>
                  <td className="TB_developer_table_td">
                    {getDate(item.date, 'YYMMDD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="TB_developer_footer">
            <div className="TB_pagination">
              <Pagintaion
                total={res.total}
                activeProps={active}
                dataPerPage={getDeveloperLimit}
                handleChangePage={handlePage}
              />
            </div>
            <div className="TB_developer_create_button">
              <button onClick={() => openPopup('detail')}>생성</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DeveloperList;
