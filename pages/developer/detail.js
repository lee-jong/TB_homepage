// # Library
import React from 'react';

// # Helper & Util
import { handelRouter } from '../../helpers/nextUtil';

// # Action
import { detailDeveloper } from '../../actions/developer';

class DeveloperDetail extends React.Component {
    static async getInitialProps({ query }) {
        let resData = {};
        try {
            resData = await detailDeveloper(query.index);
        } catch (err) {}

        return { resData };
    }

    render() {
        const { seq, title, content, sub_title } = this.props.resData.result[0];
        return (
            <>
                <div className="TB_developer">
                    <div className="TB_developer_detail">
                        <div className="TB_developer_detail_header">
                            No.{seq}-{title}
                        </div>
                        <div className="TB_developer_detail_content">
                            <iframe
                                className="TB_developer_detail_iframe"
                                src={`/developerNote/${sub_title}`}
                            ></iframe>
                            <div className="TB_developer_detail_font">
                                <div>{content}</div>
                                <button
                                    onClick={() => handelRouter('developer')}
                                >
                                    이전
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DeveloperDetail;
