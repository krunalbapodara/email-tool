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
import "./Inbox.css";
import mailData from '../../../mocks/emails-mock.json';
import CategoryColor from '../CategoryColor';
import Moment from 'react-moment';
import ViewMail from '../ViewMail';

const { Search } = Input;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
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

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            count: 0,
            viewMail: false,
            viewData: {}
        }
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email) {
            let filter = mailData.filter(email => email.to.includes(user.email));

            let localMails = JSON.parse(localStorage.getItem('emails') || '[]');
            let filterFromLocalStorage = localMails.filter(email => email.to.includes(user.email));
            if (filterFromLocalStorage.length > 0) {
                let temp = [];
                filterFromLocalStorage.forEach(element => {
                    if (filter.findIndex(e => e.id !== element.id)) {
                        temp.push(element);
                    }
                });
                filter = [...temp, ...filter];
            }
            this.setState({ emails: filter, count: filter.filter(c => c.isRead).length });
        }
    }

    openMail = (record) => {
        const emails = JSON.parse(localStorage.getItem('emails') || '[]');
        let index = emails.findIndex(e => e.id === record.id && !e.isRead);
        if (index !== -1) {
            //update in localstorage
            emails[index].isRead = true;
            localStorage.setItem('emails', JSON.stringify(emails));

            let em = [...this.state.emails];
            let ind = em.findIndex(e => e.id === record.id);
            em[ind].isRead = true;
            this.setState({ emails: em });
        }
        this.setState({ viewMail: true, viewData: record });
    }

    render() {
        const { emails, count, viewMail, viewData } = this.state;
        if (viewMail) {
            return <ViewMail viewData={viewData} type="inbox" onBack={() => this.setState({ viewMail: false, viewData: {} })} />
        }
        return (
            <div className="inboxContainer">
                <div className="inboxHeader">
                    <div style={{ marginBottom: 15 }}>
                        <span style={{ fontSize: 20 }}>Inbox ({count})</span>
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
                        rowClassName={record => record.isRead ? 'read' : 'unread'}
                        onRow={(record) => {
                            return {
                                onClick: event => {
                                    this.openMail(record);
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

export default Inbox;