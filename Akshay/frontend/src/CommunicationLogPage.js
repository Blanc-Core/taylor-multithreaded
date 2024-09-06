import React, { useState } from 'react';
import { Layout, Menu, Card, Modal, Button, Form, Input, Select, Tooltip, notification } from 'antd';
import { BellOutlined, PlusOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

export default function CommunicationLogPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Follow up with Client A', overdue: true },
    { id: 2, message: 'Overdue: Meeting with Client B', overdue: true },
  ]);

  const openNotification = (message) => {
    notification.open({
      message: 'Notification',
      description: message,
      icon: <BellOutlined style={{ color: '#E74C3C' }} />,
    });
  };

  const handleNotificationClick = (id) => {
    const notification = notifications.find((note) => note.id === id);
    openNotification(notification.message);
  };

  const handleLogCommunication = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    notification.success({
      message: 'Communication Logged',
      description: 'Your communication has been logged successfully.',
    });
  };

  const chartOptions = {
    title: {
      text: 'Communication Frequency',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', label: 'Dashboard' },
            { key: '2', label: 'Notifications' },
            { key: '3', label: 'Settings' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#2C3E50', padding: 0 }}>
          <Tooltip title="Notifications">
            <Button
              shape="circle"
              icon={<BellOutlined />}
              style={{ float: 'right', margin: '16px', color: '#ECF0F1' }}
              onClick={() => handleNotificationClick(notifications[0].id)}
            />
          </Tooltip>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            <Card title="Communication Insights" bordered={false}>
              <ReactECharts option={chartOptions} style={{ height: 400 }} />
            </Card>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleLogCommunication}
              style={{ marginTop: '16px' }}
            >
              Log Communication
            </Button>
          </div>
        </Content>
      </Layout>

      <Modal
        title="Log New Communication"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Date" required>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Client" required>
            <Select placeholder="Select a client" allowClear>
              <Option value="clientA">Client A</Option>
              <Option value="clientB">Client B</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Type of Communication" required>
            <Select placeholder="Select type" allowClear>
              <Option value="email">Email</Option>
              <Option value="meeting">Meeting</Option>
              <Option value="call">Call</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Notes">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}