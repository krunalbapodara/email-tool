import React, { useState } from 'react';
import { Layout } from 'antd';
import PageRouter from './PageRouter';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';

const { Content } = Layout;

function Page() {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <Navbar toggle={toggle} />
        <Content
          style={{
            margin: '15px',
            padding: 10,
            minHeight: 280
          }}
        >
          <PageRouter />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Page;
