import React, { useState } from 'react';
import { Layout, Card, Table, Form, Input, Button, Switch, DatePicker, Modal, Tooltip, List, Typography, Alert, Space } from 'antd';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';

const { Content } = Layout;
const { Title } = Typography;

const ClientProfilePage = () => {
  // Dummy data
  const clientMetrics = [
    { key: '1', metric: 'Satisfaction Score', value: 85 },
    { key: '2', metric: 'Last Contact', value: '2 days ago' },
    { key: '3', metric: 'Next Follow-up', value: '3 days' }
  ];

  const communicationLogs = [
    { key: '1', type: 'Email', date: '2023-10-01', participants: 'John Doe' },
    { key: '2', type: 'Call', date: '2023-10-05', participants: 'Jane Smith' },
  ];

  const feedbackData = {
    satisfactionTrends: [
      ['2023-01', 80], ['2023-02', 85], ['2023-03', 90]
    ],
    feedbackCategories: [
      { category: 'Service', score: 70 },
      { category: 'Product', score: 80 }
    ]
  };

  const [preferences, setPreferences] = useState({
    contactMethod: 'Email',
    communicationFrequency: 'Weekly'
  });

  const [tasks, setTasks] = useState([
    { key: '1', task: 'Follow-up with client', dueDate: '2023-10-10', priority: 'High' }
  ]);

  const handleTaskAdd = (task) => {
    setTasks([...tasks, { ...task, key: tasks.length + 1 }]);
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
    },
  ];

  // Feedback chart options
  const lineChartOption = {
    xAxis: {
      type: 'category',
      data: feedbackData.satisfactionTrends.map(item => item[0])
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: feedbackData.satisfactionTrends.map(item => item[1]),
      type: 'line'
    }]
  };

  const barChartOption = {
    xAxis: {
      type: 'category',
      data: feedbackData.feedbackCategories.map(item => item.category)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: feedbackData.feedbackCategories.map(item => item.score),
      type: 'bar'
    }]
  };

  return (
    <Layout style={{ backgroundColor: '#f0f2f5', height: '100vh', padding: '20px' }}>
      <Content>
        <Title level={2}>Client Overview Dashboard</Title>
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {clientMetrics.map(metric => (
            <Card key={metric.key} title={metric.metric} bordered={false}>
              <Tooltip title={`Details for ${metric.metric}`}>
                <p>{metric.value}</p>
              </Tooltip>
            </Card>
          ))}
          
          <Alert message="Upcoming Follow-up: 3 days" type="info" showIcon />

          <Title level={3}>Interactive Communication Log</Title>
          <Table columns={columns} dataSource={communicationLogs} pagination={{ pageSize: 5 }} />

          <Title level={3}>Feedback Metrics Visualization</Title>
          <ReactECharts option={lineChartOption} style={{ height: 300, width: '100%' }} />
          <ReactECharts option={barChartOption} style={{ height: 300, width: '100%' }} />

          <Title level={3}>Client Preferences Customization</Title>
          <Form layout="vertical">
            <Form.Item label="Preferred Contact Method">
              <Input value={preferences.contactMethod} onChange={e => setPreferences({ ...preferences, contactMethod: e.target.value })} />
            </Form.Item>
            <Form.Item label="Communication Frequency">
              <Input value={preferences.communicationFrequency} onChange={e => setPreferences({ ...preferences, communicationFrequency: e.target.value })} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => Modal.success({ content: 'Preferences updated successfully!' })}>Save Preferences</Button>
            </Form.Item>
          </Form>

          <Title level={3}>Task Management Tool</Title>
          <List
            bordered
            dataSource={tasks}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>{item.priority}</Typography.Text> {item.task} - Due: {moment(item.dueDate).format('YYYY-MM-DD')}
              </List.Item>
            )}
          />
          <Button type="dashed" onClick={() => handleTaskAdd({ task: 'New Task', dueDate: '2023-10-12', priority: 'Medium' })}>Add Task</Button>
        </Space>
      </Content>
    </Layout>
  );
};

export default ClientProfilePage;