// # Library
import React from 'react';

// # Action
import { getDeveloperList } from '../../actions/developer';

// # Component
import DeveloperList from '../../components/dump/developer/DeveloperList';
import P_Developer from '../../components/popup/P_Developer';

class Developer extends React.Component {
  static async getInitialProps({}) {
    let developerList = {};
    let data = {
      active: 1
    };

    try {
      developerList = await getDeveloperList(data);
    } catch (err) {
      developerList = { result: [], total: 0 };
    }
    return { developerList };
  }

  state = {
    res: {
      list: this.props.developerList.result,
      total: this.props.developerList.total
    },
    popup: {
      developer: false
    }
  };

  openPopup = name => {
    this.setState({
      popup: {
        ...this.state.popup,
        [name]: true
      }
    });
  };

  render() {
    const { res, popup } = this.state;
    console.log('this', this.state);
    return (
      <>
        <div className="TB_developer">
          <div className="TB_developer_main">
            <div className="TB_developer_header">Developer Note</div>
            <DeveloperList res={res} openPopup={this.openPopup} />
          </div>
          {popup.developer && <P_Developer />}
        </div>
      </>
    );
  }
}

export default Developer;
