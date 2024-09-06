import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Card, Form, Input, Button, Checkbox, Table, Slider, Alert } from 'antd';
import { PieChartOutlined, DollarOutlined, CalendarOutlined, CheckSquareOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Header, Content, Sider } = Layout;

const dummyMilestones = [
  { name: 'Venue Booked', date: '2023-01-10' },
  { name: 'Vendors Confirmed', date: '2023-02-15' },
  { name: 'Final Payments Due', date: '2023-03-30' },
];

const dummyVendors = [
  { key: '1', name: 'Vendor A', price: 1000, rating: 4.5, services: 'Catering' },
  { key: '2', name: 'Vendor B', price: 1500, rating: 4.0, services: 'Decor' },
  { key: '3', name: 'Vendor C', price: 1200, rating: 4.2, services: 'Music' },
];

const dummyClientPreferences = {
  catering: 50,
  decor: 30,
  music: 20,
};

const EventDetailPage = () => {
  const [budget, setBudget] = useState({ venue: 0, catering: 0, decor: 0 });
  const [checklist, setChecklist] = useState(['Book venue', 'Hire caterer', 'Order flowers']);
  const [newTask, setNewTask] = useState('');

  const budgetTotal = Object.values(budget).reduce((acc, cur) => acc + Number(cur), 0);

  const timelineOption = {
    xAxis: { type: 'category', data: dummyMilestones.map(m => m.name) },
    yAxis: { type: 'value' },
    series: [{ data: dummyMilestones.map(m => new Date(m.date).getTime()), type: 'bar' }],
  };

  const preferenceOption = {
    series: [
      {
        type: 'pie',
        data: Object.entries(dummyClientPreferences).map(([key, value]) => ({ value, name: key })),
      },
    ],
  };

  const handleBudgetChange = (field, value) => {
    setBudget({ ...budget, [field]: value });
  };

  const handleAddTask = () => {
    if (newTask) {
      setChecklist([...checklist, newTask]);
      setNewTask('');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>Timeline</Menu.Item>
          <Menu.Item key="2" icon={<DollarOutlined />}>Budget</Menu.Item>
          <Menu.Item key="3" icon={<CalendarOutlined />}>Vendors</Menu.Item>
          <Menu.Item key="4" icon={<CheckSquareOutlined />}>Checklist</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Event</Breadcrumb.Item>
            <Breadcrumb.Item>Details</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Card title="Interactive Timeline" bordered={false}>
              <ReactECharts option={timelineOption} style={{ height: 300 }} />
            </Card>
            <Card title="Budget Calculator" bordered={false}>
              <Form layout="vertical">
                <Form.Item label="Venue">
                  <Input prefix="$" value={budget.venue} onChange={(e) => handleBudgetChange('venue', e.target.value)} />
                </Form.Item>
                <Form.Item label="Catering">
                  <Input prefix="$" value={budget.catering} onChange={(e) => handleBudgetChange('catering', e.target.value)} />
                </Form.Item>
                <Form.Item label="Decor">
                  <Input prefix="$" value={budget.decor} onChange={(e) => handleBudgetChange('decor', e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <Alert message={`Total Budget: $${budgetTotal}`} type="info" showIcon />
                </Form.Item>
              </Form>
            </Card>
            <Card title="Vendor Comparison Tool" bordered={false}>
              <Table dataSource={dummyVendors} columns={[
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Price', dataIndex: 'price', key: 'price' },
                { title: 'Rating', dataIndex: 'rating', key: 'rating' },
                { title: 'Services', dataIndex: 'services', key: 'services' }
              ]} />
            </Card>
            <Card title="Client Preferences Dashboard" bordered={false}>
              <ReactECharts option={preferenceOption} style={{ height: 300 }} />
            </Card>
            <Card title="Event Checklist" bordered={false}>
              <Form layout="inline" onFinish={handleAddTask}>
                <Form.Item>
                  <Input placeholder="New Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
              </Form>
              <div style={{ marginTop: 16 }}>
                {checklist.map((task, index) => (
                  <Checkbox key={index} style={{ display: 'block', margin: '8px 0' }}>{task}</Checkbox>
                ))}
              </div>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EventDetailPage;