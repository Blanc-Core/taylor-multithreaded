import React, { useState } from 'react';
import { Layout, Menu, Button, Modal, Input, Timeline, Card, Row, Col, Badge, notification } from 'antd';
import { BellOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import EChartsReact from 'echarts-for-react';
// Remove this line:
// import 'antd/dist/reset.css';

// Add this line instead:
import 'antd/dist/antd.css';

const { Header, Content, Sider } = Layout;

// Dummy data for events
const eventsData = [
  { id: 1, name: 'Event 1', start: '2023-10-01', end: '2023-10-05', budget: 5000, spent: 3000, status: 'On Track' },
  { id: 2, name: 'Event 2', start: '2023-10-10', end: '2023-10-15', budget: 8000, spent: 5000, status: 'Delayed' },
];

const EventDashboard = () => {
  const [visible, setVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Budget updated for Event 1', date: '2023-10-02' },
    { id: 2, message: 'Event 2 is delayed', date: '2023-10-11' },
  ]);

  const showEventDetails = (event) => {
    setSelectedEvent(event);
    setVisible(true);
  };

  const hideEventDetails = () => {
    setVisible(false);
    setSelectedEvent(null);
  };

  const handleNotificationClick = () => {
    notification.open({
      message: 'Notifications',
      description: notifications.map(n => <div key={n.id}>{n.message} - {n.date}</div>),
    });
  };

  const budgetOptions = (event) => ({
    title: { text: 'Budget Allocation' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: event.spent, name: 'Spent' },
          { value: event.budget - event.spent, name: 'Remaining' },
        ],
      },
    ],
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Events</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Input prefix={<SearchOutlined />} placeholder="Search events" style={{ width: 200 }} />
            </Col>
            <Col>
              <Badge count={notifications.length}>
                <BellOutlined style={{ fontSize: '24px' }} onClick={handleNotificationClick} />
              </Badge>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '24px', background: '#fff' }}>
          <Row gutter={16}>
            {eventsData.map(event => (
              <Col span={8} key={event.id}>
                <Card
                  title={event.name}
                  extra={<Button type="link" onClick={() => showEventDetails(event)}>Details</Button>}
                >
                  <p>Status: {event.status}</p>
                  <EChartsReact option={budgetOptions(event)} style={{ height: '200px' }} />
                </Card>
              </Col>
            ))}
          </Row>
          <Timeline mode="alternate" style={{ marginTop: '24px' }}>
            {eventsData.map(event => (
              <Timeline.Item key={event.id}>
                {event.name}: {event.start} to {event.end}
              </Timeline.Item>
            ))}
          </Timeline>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EventDashboard;