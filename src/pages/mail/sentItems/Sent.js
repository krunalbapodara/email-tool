import React, { Component } from 'react';
import { Input, Table } from 'antd';
import {
    ReloadOutlined,
    EyeOutlined,
    ExclamationOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    PaperClipOutlined
} from '@ant-design/icons';
import mailData from '../../../mocks/emails-mock.json';
import CategoryColor from '../CategoryColor';
import Moment from 'react-moment';
import ViewMail from '../ViewMail';

const { Search } = Input;
const columns = [
    {
        title: 'To',
        dataIndex: 'to',
        render: (text) => <span style={{ fontWeight: '500' }}>{text}</span>
    },
    {
        title: 'Category',
        dataIndex: 'category',
        width: 10,
        render: (text) => <CategoryColor type="tag" text={text} />,
    },
    {
        title: 'Subject',
        dataIndex: 'subject'
    },
    {
        title: 'Attachments',
        dataIndex: 'attachments',
        render: () => <PaperClipOutlined />
    },
    {
        title: 'Date',
        dataIndex: 'date',
        render: (text) => <Moment fromNow ago>{text}</Moment>
    }
];
class Sent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            viewMail: false,
            viewData: {}
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email) {
            let filter = mailData.filter(email => email.from === user.email);

            let localMails = JSON.parse(localStorage.getItem('emails') || '[]');
            let filterFromLocalStorage = localMails.filter(email => email.from === user.email);
            if (filterFromLocalStorage.length > 0) {
                filter = [...filterFromLocalStorage, ...filter];
            }
            this.setState({ emails: filter });
        }
    }

    render() {
        const { emails, viewMail, viewData } = this.state;
        if (viewMail) {
            return <ViewMail viewData={viewData} type="sent" onBack={() => this.setState({ viewMail: false, viewData: {} })} />
        }
        return (
            <div className="inboxContainer">
                <div className="inboxHeader">
                    <div style={{ marginBottom: 15 }}>
                        <span style={{ fontSize: 20 }}>Sent Items</span>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="medium"
                            style={{ width: 200, float: 'right' }}
                            onSearch={() => { }}
                        />
                    </div>
                    <div>
                        <span className="inboxHeaderIcon"><ReloadOutlined /> Refresh</span>
                        <span className="inboxHeaderIcon"><EyeOutlined /></span>
                        <span className="inboxHeaderIcon"><ExclamationOutlined /></span>
                        <span className="inboxHeaderIcon"><DeleteOutlined /></span>
                        <span className="inboxHeaderIconRight">
                            <span className="inboxHeaderIcon"><ArrowLeftOutlined /></span>
                            <span className="inboxHeaderIcon"><ArrowRightOutlined /></span>
                        </span>

                    </div>
                </div>

                <div className="inboxContent">
                    <Table
                        rowSelection={{
                            onChange: (selectedRowKeys, selectedRows) => {
                                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                            }
                        }}
                        rowKey={record => record.id}
                        onRow={(record) => {
                            return {
                                onClick: event => {
                                    this.setState({ viewMail: true, viewData: record })
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={emails}
                        showHeader={false}
                        pagination={false}
                    />
                </div>
            </div>
        );
    }
}

export default Sent;