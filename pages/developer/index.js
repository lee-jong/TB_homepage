// # Library
import React from 'react';

// # Action
import { getDeveloperList, insertDeveloper } from '../../actions/developer';

// # Component
import DeveloperList from '../../components/dump/developer/DeveloperList';
import CreateDeveloper from '../../components/dump/developer/CreateDeveloper';

class Developer extends React.Component {
    static async getInitialProps({}) {
        let developerList = {};
        let data = {
            active: 1,
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
            total: this.props.developerList.total,
        },
        page: {
            detail: false,
        },
        insertData: {
            title: '',
            place: '', //developer note file name
            content: '',
        },
        active: 1,
    };

    handelPopup = (name) => {
        this.setState({
            page: {
                ...this.state.page,
                [name]: !this.state.page[name],
            },
        });
    };

    handleChange = (e) => {
        this.setState({
            insertData: {
                ...this.state.insertData,
                [e.target.name]: e.target.value,
            },
        });
    };

    handlePage = (num) => {
        this.setState({
            active: num,
        });
    };

    createDeveloperNote = async () => {
        const { title, place, content } = this.state.insertData;

        const requestData = {
            title,
            place,
            content,
        };

        try {
            let responseData = await insertDeveloper(requestData);
            if (responseData.status === 200) {
                alert('등록이 완료되었습니다.');
                this.handelPopup('detail');
            }
        } catch (err) {
            console.log('create developer note error message :::', err);
        }
    };

    render() {
        const { res, page, active } = this.state;
        return (
            <>
                <div className="TB_developer">
                    <div className="TB_developer_main">
                        <div className="TB_developer_header">
                            {page.detail && 'Developer Note Create'}
                            {!page.detail && 'Developer Note'}
                        </div>
                        {page.detail && (
                            <CreateDeveloper
                                closePopup={this.handelPopup}
                                handleChange={this.handleChange}
                                createDeveloperNote={this.createDeveloperNote}
                            />
                        )}

                        {!page.detail && (
                            <DeveloperList
                                res={res}
                                active={active}
                                openPopup={this.handelPopup}
                                handlePage={this.handlePage}
                            />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default Developer;
