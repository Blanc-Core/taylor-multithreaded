
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Drawer, Button } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  DashboardOutlined,
  TeamOutlined,
  MessageOutlined,
  BarChartOutlined
} from '@ant-design/icons';

import DashboardContainer from './components/DashboardContainer';
import ProjectOverviewContainer from './components/ProjectOverviewContainer';
import ChatContainer from './components/ChatContainer';
import TeamProfilesContainer from './components/TeamProfilesContainer';
import PerformanceDashboard from './PerformanceDashboard';

const { Header, Content } = Layout;

const App = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
          <Button type="primary" onClick={toggleDrawer} style={{ marginRight: '16px' }}>
            Menu
          </Button>
          <h1 style={{ color: '#fff', margin: 0 }}>App</h1>
        </Header>

        <Drawer
          title="Navigation"
          placement="left"
          onClose={toggleDrawer}
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<InfoCircleOutlined />}>
              <Link to="/dashboard" onClick={toggleDrawer}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ContactsOutlined />}>
              <Link to="/project-overview" onClick={toggleDrawer}>Project Overview</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<MessageOutlined />}>
              <Link to="/chat" onClick={toggleDrawer}>Chat</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<TeamOutlined />}>
              <Link to="/team-profiles" onClick={toggleDrawer}>Team Profiles</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<DashboardOutlined />}>
              <Link to="/performance-dashboard" onClick={toggleDrawer}>Performance Dashboard</Link>
            </Menu.Item>
          </Menu>
        </Drawer>

        <Layout className="site-layout" style={{ marginLeft: 0, marginTop: '64px' }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<h2>Welcome to Home</h2>} />
                <Route path="/dashboard" element={<DashboardContainer />} />
                <Route path="/project-overview" element={<ProjectOverviewContainer />} />
                <Route path="/chat" element={<ChatContainer />} />
                <Route path="/team-profiles" element={<TeamProfilesContainer />} />
                <Route path="/performance-dashboard" element={<PerformanceDashboard />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;