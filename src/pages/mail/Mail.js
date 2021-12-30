import React, { Component } from 'react';
import { Divider, Menu, Modal, Select, Input, Switch } from 'antd';
import { Link } from "react-router-dom";
import { InboxOutlined, MailOutlined, StarOutlined, FormOutlined, DeleteOutlined, TagOutlined } from '@ant-design/icons';
import './Mail.css';
import MailRouter from './MailRouter';
import CategoryColor from './CategoryColor';

const { Option } = Select;
const { TextArea } = Input;

class Mail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            activeKey: window.location.pathname,
            newMail: {
                name: "",
                email: "",
                from: "",
                subject: "",
                to: "",
                cc: "",
                body: "",
                attachments: false,
                category: "",
                date: "",
                isRead: false
            }
        }
    }

    componentDidMount() {
        this.resetMailData();
    }

    resetMailData = () => {
        let user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email) {
            this.setState({
                newMail: {
                    name: user.name,
                    email: user.email,
                    from: user.email,
                    subject: "",
                    to: "",
                    cc: "",
                    body: "",
                    category: "",
                    attachments: false,
                    date: "",
                    isRead: false
                }
            })
        }
    }

    setIsModalVisible = (bool) => {
        this.setState({ isModalVisible: bool });
    }

    showModal = () => {
        this.setIsModalVisible(true);
    };

    handleOk = () => {
        const newMail = { ...this.state.newMail };
        newMail['date'] = new Date();
        newMail['id'] = Math.random().toString();
        if (!localStorage.getItem('emails')) {
            localStorage.setItem('emails', '[]');
        }
        let localEmails = JSON.parse(localStorage.getItem('emails'));
        localEmails.unshift(newMail);
        localStorage.setItem('emails', JSON.stringify(localEmails));
        this.handleCancel(false);
    };

    handleCancel = () => {
        this.resetMailData();
        this.setIsModalVisible(false);
        window.location.reload();
    };

    composeMail = (e, type) => {
        const newMail = { ...this.state.newMail };
        if (type === 'to' || type === 'cc') {
            newMail[type] = e.join(',');
        } else {
            newMail[type] = e;
        }
        this.setState({ newMail });
    }

    setActiveKey = (key) => {
        this.setState({ activeKey: key })
    }

    render() {
        const { isModalVisible, newMail, activeKey } = this.state;
        return (
            <div className="mail-container">
                <div className="mailMenu">
                    <div className='composeButton' onClick={this.showModal}>Compose Mail</div>
                    <h5>Folders</h5>
                    <Menu
                        mode="inline"
                        className="mailMenuList"
                        selectedKeys={[activeKey]}
                    >
                        <Menu.Item key="/marvel/mails" onClick={() => this.setActiveKey("/marvel/mails")}>
                            <Link to="/marvel/mails">
                                <InboxOutlined /> Inbox <span className="badge">2</span>
                            </Link>
                        </Menu.Item>
                        <Divider />
                        <Menu.Item key="/marvel/mails/sentmails" onClick={() => this.setActiveKey("/marvel/mails/sentmails")}>
                            <Link to="/marvel/mails/sentmails">
                                <MailOutlined /> Sent Mails
                            </Link>
                        </Menu.Item>
                        <Divider />
                        <Menu.Item key="3">
                            <StarOutlined /> Important
                        </Menu.Item>
                        <Divider />
                        <Menu.Item key="4">
                            <FormOutlined /> Drafts <span className="badge">2</span>
                        </Menu.Item>
                        <Divider />
                        <Menu.Item key="5">
                            <DeleteOutlined /> Trash
                        </Menu.Item>
                        <Divider />
                    </Menu>
                    <br />

                    <h5>Categories</h5>
                    <Menu
                        mode="inline"
                        className="mailMenuList"
                    >
                        <Menu.Item key="1">
                            <CategoryColor text='work' /> Work
                        </Menu.Item>
                        <Menu.Item key="2">
                            <CategoryColor text='document' /> Document
                        </Menu.Item>
                        <Menu.Item key="3">
                            <CategoryColor text='social' /> Social
                        </Menu.Item>
                        <Menu.Item key="4">
                            <CategoryColor text='advertising' /> Advertising
                        </Menu.Item>
                        <Menu.Item key="5">
                            <CategoryColor text='clients' /> Clients
                        </Menu.Item>
                    </Menu>
                    <br />

                    <h5>Labels</h5>
                    <div className="labels">
                        {['Family', 'Work', 'Home', 'Children', 'Holidays', 'Music', 'Photography', 'Film'].map((tag, index) => (
                            <div className='tagItem' key={index}>
                                <TagOutlined /> {tag}
                            </div>
                        ))}
                    </div>
                </div>
                <Modal
                    title="New Mail"
                    centered
                    visible={isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>
                        <Select value={newMail.to ? newMail.to.split(',') : []} mode="tags" style={{ width: '100%' }} placeholder="To" onChange={(e) => this.composeMail(e, 'to')}>
                        </Select>
                    </p>
                    <p>
                        <Select value={newMail.cc ? newMail.cc.split(',') : []} mode="tags" style={{ width: '100%' }} placeholder="Cc" onChange={(e) => this.composeMail(e, 'cc')}>
                        </Select>
                    </p>
                    <p>
                        <Input placeholder="Subject" value={newMail.subject} onChange={(e) => this.composeMail(e.target.value, 'subject')} />
                    </p>
                    <p>
                        <TextArea rows={4} value={newMail.body} onChange={(e) => this.composeMail(e.target.value, 'body')} />
                    </p>
                    <p>
                        <Select defaultValue="disabled" value={newMail.category} style={{ width: '100%' }} onChange={(e) => this.composeMail(e, 'category')}>
                            <Option value="disabled" disabled>Select Category</Option>
                            <Option value="work">Work</Option>
                            <Option value="document">Document</Option>
                            <Option value="social">Social</Option>
                            <Option value="advertising">Advertising</Option>
                            <Option value="clients">Clients</Option>
                        </Select>
                    </p>
                    <p>
                        Attachments : <Switch defaultChecked={newMail.attachments} onChange={(e) => this.composeMail(e, 'attachment')} />
                    </p>
                </Modal>
                <div className="mailContent">
                    <MailRouter />
                </div>
            </div>
        );
    }
}

export default Mail;