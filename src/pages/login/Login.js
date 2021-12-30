import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import userData from '../../mocks/user-mock.json';
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isError: false,
            errorMessage: "",
            email: "",
            password: "",
            submitted: false
        }
    }

    componentDidMount(){
        if(localStorage.getItem('user')){
            this.setState({isLoggedIn:true})
        }
        window.addEventListener('keypress', (e)=>{
            if(e.key === "Enter"){
                this.submit();
            }
        })
    }

    submit = () => {
        this.setState({ submitted: true })
        const { email, password } = this.state;
        if (!(email, password)) {
            this.setState({ isError: true, errorMessage: "Please enter email or password" });
            return;
        }
        let found = userData.findIndex(user => user.email === email);
        if (found !== -1) {
            localStorage.setItem("user", JSON.stringify(userData[found]));
            this.setState({ isLoggedIn: true, isError: false, submitted: false });
        } else {
            this.setState({ isError: true, errorMessage: "Incorrect credentials" });
        }
    }

    render() {
        const { submitted, isError, errorMessage, email, password, isLoggedIn } = this.state;
        if (isLoggedIn) {
            return <Navigate to="/marvel" />
        }
        return (
            <div className="loginBg">
                <div className="loginContainer">
                    <div className="loginTitle">Marvel Universe</div>
                    <Space style={{ width: '100%' }}>
                        <Input style={{ width: '100%' }} placeholder="Enter email" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </Space>
                    <Space style={{ width: '100%' }}>
                        <Input.Password
                            style={{ width: '100%' }}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Space>
                    <Space>
                        <Button type="primary" onClick={this.submit} htmlType="button">
                            Submit
                        </Button>
                    </Space>
                    <Space>
                        <span className="errorMsg">{submitted && isError && errorMessage}</span>
                    </Space>
                </div>
            </div>
        );
    }
}

export default Login;