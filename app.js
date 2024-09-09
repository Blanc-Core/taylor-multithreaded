```javascript
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

// Import components for different pages
import MentorDashboard from "./components/MentorDashboard";
import MetricsOverview from "./components/GrowthMetricsPage";
import InvestorProfileContainer from "./components/InvestorProfileContainer";
import ERPSystemPage from "./components/ERPSystemPage";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Define routes with appropriate paths and icons
  const routes = [
    { path: "/", name: "Home", icon: <HomeOutlined /> },
    { path: "/mentor-dashboard", name: "Mentor Dashboard", icon: <UsergroupAddOutlined /> },
    { path: "/growth-metrics", name: "Growth Metrics", icon: <BarChartOutlined /> },
    { path: "/investor-profile", name: "Investor Profile", icon: <FundProjectionScreenOutlined /> },
    { path: "/erp-system", name: "ERP System", icon: <InfoCircleOutlined /> },
    { path: "/contact", name: "Contact", icon: <MailOutlined /> },
  ];

  return (
    <Router>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
        >
          <div className="logo" style={{ padding: "16px", textAlign: "center", color: "#fff" }}>
            {collapsed ? "Logo" : "My App"}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            {routes.map((route, index) => (
              <Menu.Item key={index} icon={route.icon}>
                <Link to={route.path}>{route.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: "0 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button type="primary" onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div style={{ color: "#fff", fontSize: "18px" }}>My App Header</div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<h1>Home Page</h1>} />
              <Route path="/mentor-dashboard" element={<MentorDashboard />} />
              <Route path="/growth-metrics" element={<MetricsOverview />} />
              <Route path="/investor-profile" element={<InvestorProfileContainer />} />
              <Route path="/erp-system" element={<ERPSystemPage />} />
              <Route path="/contact" element={<h1>Contact Page</h1>} />
              {/* Add more routes as necessary */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
```
