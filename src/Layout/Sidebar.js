import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import "./Layout.css";

const { Sider } = Layout;


const Sidebar = (props) => {
    const decideKey = (key) => {
        if(window.location.pathname.includes("/marvel/mails")){
            return "/marvel/mails";
        }
        return key;
    }

    const [activeKey, setActiveKey] = useState(decideKey(window.location.pathname));
    return (
        <Sider trigger={null} collapsible collapsed={props.collapsed}>
            <div className="logo" >IN+</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeKey]}>
                <Menu.Item key="/marvel" icon={<UserOutlined />} onClick={() => setActiveKey("/marvel")}>
                    <Link to="/marvel">Home</Link>
                </Menu.Item>
                <Menu.Item key="/marvel/mails" icon={<VideoCameraOutlined />} onClick={() => setActiveKey("/marvel/mails")}>
                    <Link to="/marvel/mails">Mails</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                    nav 1
                </Menu.Item>
                <Menu.Item key="5" icon={<VideoCameraOutlined />}>
                    nav 2
                </Menu.Item>
                <Menu.Item key="6" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
                <Menu.Item key="7" icon={<UserOutlined />}>
                    nav 1
                </Menu.Item>
                <Menu.Item key="8" icon={<VideoCameraOutlined />}>
                    nav 2
                </Menu.Item>
                <Menu.Item key="9" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default Sidebar;