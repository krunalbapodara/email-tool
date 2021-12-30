import React, { useState } from 'react';
import { Layout, Input } from 'antd';
import { Navigate } from 'react-router-dom';
import {
    MenuOutlined,
    LogoutOutlined,
    BellOutlined,
    MailOutlined
} from '@ant-design/icons';
import "./Layout.css";

const { Header } = Layout;

const Navbar = (props) => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    if(isLoggedOut){
        return <Navigate to="/login"/>
    }
    return (
        <Header className="navbar" style={{ padding: 0 }}>
            <div className="navContainer">
                <div className="leftSide">
                    <span className="toggleIcon">
                        {React.createElement(MenuOutlined, {
                            className: 'trigger',
                            onClick: props.toggle,
                        })}
                    </span>
                    <span>
                        <Input placeholder="Search for something..." bordered={false} />
                    </span>
                </div>
                <div className="rightSide">
                    <span className="rightIcon">
                        {React.createElement(MailOutlined, {})}
                    </span>
                    <span className="rightIcon">
                        {React.createElement(BellOutlined, {})}
                    </span>
                    <span className="rightIcon" onClick={()=> {
                        localStorage.removeItem('user');
                        setIsLoggedOut(true);
                    }}>
                        {React.createElement(LogoutOutlined, {})}
                        <span style={{ fontSize: 13 }}>Log out</span>
                    </span>
                </div>
            </div>

        </Header>
    )
}

export default Navbar;