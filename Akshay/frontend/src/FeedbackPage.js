import React, { useState } from 'react';
import { Layout, Form, Input, Button, message, Rate, Card, List, Tooltip, Select, Badge, Progress } from 'antd';
import ReactECharts from 'echarts-for-react';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [npsScore, setNpsScore] = useState(0);
  const [form] = Form.useForm();

  const handleFeedbackSubmit = (values) => {
    setFeedbackList([...feedbackList, values]);
    message.success('Feedback submitted successfully');
    form.resetFields();
  };

  const handleNpsChange = (value) => {
    setNpsScore(value);
  };

  const dummyChartData = {
    pieData: [{ value: 40, name: 'Positive' }, { value: 30, name: 'Neutral' }, { value: 30, name: 'Negative' }],
    lineData: [
      { value: 80, name: 'Week 1' },
      { value: 70, name: 'Week 2' },
      { value: 90, name: 'Week 3' },
    ],
    barData: [
      { value: 20, name: 'Service 1' },
      { value: 50, name: 'Service 2' },
      { value: 30, name: 'Service 3' },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
        <Card title="Real-time Feedback Submission" bordered={false} style={{ marginBottom: '24px' }}>
          <Form form={form} layout="vertical" onFinish={handleFeedbackSubmit}>
            <Form.Item name="feedback" label="Feedback" rules={[{ required: true, message: 'Please provide your feedback!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please rate us!' }]}>
              <Rate />
            </Form.Item>
            <Button type="primary" htmlType="submit">Submit Feedback</Button>
          </Form>
        </Card>

        <Card title="Dynamic Data Visualization Dashboard" bordered={false} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <ReactECharts
              option={{
                title: { text: 'Feedback Sentiments', left: 'center' },
                series: [{
                  name: 'Sentiments',
                  type: 'pie',
                  radius: '50%',
                  data: dummyChartData.pieData,
                }],
              }}
              style={{ height: '300px', width: '300px' }}
            />
            <ReactECharts
              option={{
                title: { text: 'Feedback Over Time', left: 'center' },
                xAxis: { type: 'category', data: ['Week 1', 'Week 2', 'Week 3'] },
                yAxis: { type: 'value' },
                series: [{
                  data: dummyChartData.lineData,
                  type: 'line',
                }],
              }}
              style={{ height: '300px', width: '300px' }}
            />
            <ReactECharts
              option={{
                title: { text: 'Service Ratings', left: 'center' },
                xAxis: { type: 'category', data: ['Service 1', 'Service 2', 'Service 3'] },
                yAxis: { type: 'value' },
                series: [{
                  data: dummyChartData.barData,
                  type: 'bar',
                }],
              }}
              style={{ height: '300px', width: '300px' }}
            />
          </div>
        </Card>

        <Card title="NPS (Net Promoter Score) Widget" bordered={false} style={{ marginBottom: '24px' }}>
          <Tooltip title={`Your NPS Score: ${npsScore}`}>
            <Progress type="circle" percent={npsScore * 10} />
          </Tooltip>
          <div style={{ marginTop: '16px' }}>
            <Rate count={10} onChange={handleNpsChange} value={npsScore} />
          </div>
        </Card>

        <Card title="Client Segmentation and Filtering Tools" bordered={false} style={{ marginBottom: '24px' }}>
          <Select mode="multiple" style={{ width: '100%' }} placeholder="Select filters">
            <Option value="age">Age Group</Option>
            <Option value="service">Service Type</Option>
            <Option value="location">Location</Option>
          </Select>
        </Card>

        <Card title="Feedback Analysis and Insights" bordered={false} style={{ marginBottom: '24px' }}>
          <List
            dataSource={feedbackList}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={<div>Rating: {item.rating}</div>}
                  description={item.feedback}
                />
                <Badge status={item.rating >= 4 ? 'success' : 'warning'} />
              </List.Item>
            )}
          />
        </Card>

        <Card title="User Engagement Features" bordered={false}>
          <Progress percent={feedbackList.length * 10} />
          <p style={{ marginTop: '16px' }}>Submit feedback to earn badges!</p>
        </Card>
      </Content>
    </Layout>
  );
};

export default FeedbackPage;