import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Modal, Button, Input, Rate, Select, notification, Card, Row, Col, Tooltip, Progress, Statistic, DatePicker, Typography, Table, Tag, Space } from 'antd';
import { saveAs } from 'file-saver';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, DownloadOutlined, PlusOutlined, UserOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";

const { Option } = Select;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Dummy data for productivity trends
const dummyProductivityData = [
  { date: '2023-01-01', value: 10 },
  { date: '2023-01-02', value: 15 },
  { date: '2023-01-03', value: 12 },
  { date: '2023-01-04', value: 20 },
  { date: '2023-01-05', value: 18 },
];

const dummyGoals = [
  { description: 'Increase output', target: 25, progress: 15 },
];

// New dummy data for team performance
const teamPerformanceData = [
  { name: 'Alice', tasksCompleted: 45, efficiency: 92 },
  { name: 'Bob', tasksCompleted: 38, efficiency: 88 },
  { name: 'Charlie', tasksCompleted: 52, efficiency: 95 },
];

// PerformanceDashboard component
const PerformanceDashboard = () => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedback, setFeedback] = useState({ comment: '', rating: 0 });
  const [goal, setGoal] = useState({ description: '', target: 0 });
  const [goalProgress, setGoalProgress] = useState(dummyGoals[0]);
  const [performanceData, setPerformanceData] = useState(dummyProductivityData);
  const [selectedData, setSelectedData] = useState([true]);
  const [dummyData, setDummyData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    setDummyData(dummyProductivityData);
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (value) => {
    setFeedback({ ...feedback, rating: value });
  };

  const submitFeedback = () => {
    notification.success({ message: 'Feedback Submitted!', description: `Comment: ${feedback.comment}, Rating: ${feedback.rating}` });
    setFeedbackVisible(false);
    setFeedback({ comment: '', rating: 0 });
  };

  const toggleDataSet = () => {
    setSelectedData([!selectedData[0]]);
  };

  const setGoalHandler = () => {
    setGoalProgress({ ...goalProgress, description: goal.description, target: goal.target });
    setGoal({ description: '', target: 0 });
    notification.success({ message: 'Goal Set!', description: `Goal: ${goal.description}, Target: ${goal.target}` });
  };

  const getChartOption = () => {
    const baseOption = {
      title: { text: 'Productivity Trends' },
      tooltip: { trigger: 'axis' },
      xAxis: [{
        type: 'category',
        data: dummyProductivityData.map(item => item.date),
      }],
      yAxis: [{ type: 'value' }],
    };

    const seriesData = {
      name: 'Productivity',
      data: dummyProductivityData.map(item => item.value),
      itemStyle: { color: selectedData[0] ? '#5470C6' : '#FF0000' },
    };

    switch (chartType) {
      case 'bar':
        return { ...baseOption, series: [{ ...seriesData, type: 'bar' }] };
      case 'pie':
        return {
          title: { text: 'Productivity Distribution' },
          tooltip: { trigger: 'item' },
          series: [{
            type: 'pie',
            data: dummyProductivityData.map(item => ({ name: item.date, value: item.value })),
          }],
        };
      default:
        return { ...baseOption, series: [{ ...seriesData, type: 'line' }] };
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Tasks Completed', dataIndex: 'tasksCompleted', key: 'tasksCompleted' },
    { 
      title: 'Efficiency', 
      dataIndex: 'efficiency', 
      key: 'efficiency',
      render: (efficiency) => (
        <Tag color={efficiency > 90 ? 'green' : efficiency > 80 ? 'blue' : 'orange'}>
          {efficiency}%
        </Tag>
      ),
    },
  ];

  const exportData = () => {
    const csvData = [
      'Metric,Value',
      'Completed Tasks,75'
    ].join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'kpi_data.csv');
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Performance Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Tasks Completed"
              value={75}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Team Efficiency"
              value={92}
              suffix="%"
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={8}
              prefix={<PieChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Team Members"
              value={12}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Card title="Performance Metrics" extra={
            <Space>
              <Select defaultValue="line" style={{ width: 120 }} onChange={(value) => setChartType(value)}>
                <Option value="line">Line Chart</Option>
                <Option value="bar">Bar Chart</Option>
                <Option value="pie">Pie Chart</Option>
              </Select>
              <RangePicker onChange={(dates) => setDateRange(dates)} />
              <Button type="primary" icon={<DownloadOutlined />} onClick={exportData}>Export</Button>
            </Space>
          }>
            <ReactECharts option={getChartOption()} style={{ height: '400px', width: '100%' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Goal Progress" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setFeedbackVisible(true)}>Set New Goal</Button>}>
            {goalProgress && (
              <div>
                <Text strong>{goalProgress.description}</Text>
                <Progress percent={(goalProgress.progress / goalProgress.target) * 100} status="active" />
                <Text type="secondary">{goalProgress.progress} / {goalProgress.target}</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Team Performance">
            <Table dataSource={teamPerformanceData} columns={columns} />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Set New Goal"
        visible={feedbackVisible}
        onOk={setGoalHandler}
        onCancel={() => setFeedbackVisible(false)}
      >
        <Input placeholder="Goal Description" value={goal.description} onChange={(e) => setGoal({ ...goal, description: e.target.value })} style={{ marginBottom: '10px' }} />
        <Input placeholder="Goal Target" type="number" value={goal.target} onChange={(e) => setGoal({ ...goal, target: parseInt(e.target.value) })} style={{ marginBottom: '10px' }} />
        <Rate value={feedback.rating} onChange={handleRatingChange} />
      </Modal>
    </div>
  );
};

export default PerformanceDashboard;