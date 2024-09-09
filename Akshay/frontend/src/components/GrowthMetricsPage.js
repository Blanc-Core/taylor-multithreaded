import React, { useState, useEffect, createContext } from 'react';
import { Layout, Typography, Row, Col, Card, Statistic, Select, DatePicker, Table, Tag, Progress, Button, Modal, Checkbox, notification, Input, Tabs, Tooltip, Avatar } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined, UserOutlined, DollarOutlined, ShoppingOutlined, PercentageOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

// Create Context for Metrics
const MetricContext = createContext();

const GrowthMetricsPage = () => {
  const [selectedStartup, setSelectedStartup] = useState('Startup A');
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [comparisonModalVisible, setComparisonModalVisible] = useState(false);
  const [metricTypes, setMetricTypes] = useState(['Revenue', 'User Growth']);
  const [threshold, setThreshold] = useState(100);
  const [notifications, setNotifications] = useState([]);

  const [activeTab, setActiveTab] = useState('1');

  const [comparisonData, setComparisonData] = useState([]);
  const [goalProgress, setGoalProgress] = useState(75);

  // Dummy data (replace with actual API calls)
  const startups = ['Startup A', 'Startup B', 'Startup C'];
  const dummyData = {
    metrics: [
      { id: 1, name: 'Monthly Active Users', value: 12500, threshold: 10000, achievements: 1 },
      { id: 2, name: 'Revenue', value: 325000, threshold: 300000, achievements: 2 },
      { id: 3, name: 'Customer Acquisition Cost', value: 125, threshold: 150, achievements: 3 },
      { id: 4, name: 'Churn Rate', value: 2.1, threshold: 3, achievements: 2 },
    ],
  };

  const dummyDataMetrics = {
    'Startup A': { revenue: [150000, 180000, 220000, 260000, 290000, 325000], userGrowth: [5000, 6200, 8100, 9800, 11200, 12500] },
    'Startup B': { revenue: [220000, 250000, 280000, 310000, 340000, 370000], userGrowth: [7000, 8500, 10000, 11500, 13000, 14500] },
    'Startup C': { revenue: [180000, 210000, 240000, 270000, 300000, 330000], userGrowth: [6000, 7500, 9000, 10500, 12000, 13500] }
  };

  useEffect(() => {
    updateChartData();
    updateComparisonData();
  }, [selectedStartup, dateRange, selectedMetrics]);

  const updateChartData = () => {
    const data = dummyDataMetrics[selectedStartup];
    checkThresholds(data);
  };

  const checkThresholds = (data) => {
    const revenueExceed = data.revenue.some(value => value > threshold);
    const userGrowthExceed = data.userGrowth.some(value => value > threshold);
    
    if (revenueExceed) {
      setNotifications(prev => [...prev, 'Revenue exceeded threshold!']);
    }
    if (userGrowthExceed) {
      setNotifications(prev => [...prev, 'User Growth exceeded threshold!']);
    }
  };

  const updateComparisonData = () => {
    const selectedMetricsData = dummyData.metrics.filter(metric => selectedMetrics.includes(metric.id));
    setComparisonData(selectedMetricsData);
  };

  const handleMetricChange = (metricId) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metricId)) {
        return prev.filter(m => m !== metricId);
      } else if (prev.length < 2) {
        return [...prev, metricId];
      } else {
        notification.warning({ message: 'You can only select up to two metrics for comparison.' });
        return prev;
      }
    });
  };

  const openComparisonModal = () => {
    if (selectedMetrics.length !== 2) {
      notification.warning({ message: 'Please select exactly two metrics to compare.' });
    } else {
      setComparisonModalVisible(true);
    }
  };

  const getChartOption = (title, data, color) => ({
    title: { text: title, left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { type: 'value' },
    series: [{
      data: data,
      type: 'line',
      smooth: true,
      lineStyle: { color: color, width: 4 },
      areaStyle: { color: color, opacity: 0.2 },
      symbol: 'circle',
      symbolSize: 10,
    }],
  });

  const MetricCard = ({ metric }) => (
    <Card hoverable style={{ height: '100%' }}>
      <Statistic
        title={
          <Tooltip title="Click to select for comparison">
            <Checkbox
              checked={selectedMetrics.includes(metric.id)}
              onChange={() => handleMetricChange(metric.id)}
            >
              {metric.name}
            </Checkbox>
          </Tooltip>
        }
        value={metric.value}
        precision={metric.name === 'Churn Rate' ? 1 : 0}
        valueStyle={{ color: metric.value >= metric.threshold ? '#3f8600' : '#cf1322' }}
        prefix={metric.value >= metric.threshold ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix={metric.name === 'Revenue' ? '$' : metric.name === 'Churn Rate' ? '%' : null}
      />
      <Progress percent={(metric.value / metric.threshold) * 100} status={metric.value >= metric.threshold ? "success" : "active"} />
      {metric.value >= metric.threshold && <Tag color="green">🏆 Badge Unlocked!</Tag>}
    </Card>
  );

  const ComparisonModal = ({ visible, onClose }) => {
    const getMetricData = (metricName) => {
      switch(metricName) {
        case 'Monthly Active Users':
          return dummyDataMetrics[selectedStartup].userGrowth;
        case 'Revenue':
          return dummyDataMetrics[selectedStartup].revenue;
        case 'Customer Acquisition Cost':
          return Array(6).fill(0).map((_, i) => 125 * (1 - i * 0.05));
        case 'Churn Rate':
          return Array(6).fill(0).map((_, i) => 2.1 + i * 0.1);
        default:
          return Array(6).fill(0).map((_, i) => comparisonData.find(m => m.name === metricName).value * (1 + i * 0.1));
      }
    };

    const option = {
      title: { text: 'Metric Comparison', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: comparisonData.map(m => m.name), bottom: 0 },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yAxis: comparisonData.map((metric, index) => ({
        type: 'value',
        name: metric.name,
        position: index === 0 ? 'left' : 'right',
        axisLabel: {
          formatter: (value) => {
            if (metric.name === 'Revenue') return `$${value}`;
            if (metric.name === 'Churn Rate') return `${value}%`;
            return value;
          }
        }
      })),
      series: comparisonData.map((metric, index) => ({
        name: metric.name,
        type: 'line',
        yAxisIndex: index,
        data: getMetricData(metric.name),
        smooth: true,
      }))
    };

    return (
      <Modal 
        title="Metric Comparison" 
        visible={visible} 
        onCancel={onClose} 
        footer={null} 
        width={800}
      >
        <ReactECharts option={option} style={{ height: 400 }} />
        <Table 
          dataSource={comparisonData}
          columns={[
            { title: 'Metric', dataIndex: 'name', key: 'name' },
            { 
              title: 'Current Value', 
              dataIndex: 'value', 
              key: 'value', 
              render: (value, record) => {
                if (record.name === 'Revenue') return `$${value}`;
                if (record.name === 'Churn Rate') return `${value}%`;
                return value;
              }
            },
            { 
              title: 'Threshold', 
              dataIndex: 'threshold', 
              key: 'threshold',
              render: (value, record) => {
                if (record.name === 'Revenue') return `$${value}`;
                if (record.name === 'Churn Rate') return `${value}%`;
                return value;
              }
            },
          ]}
          pagination={false}
        />
      </Modal>
    );
  };

  return (
    <MetricContext.Provider value={{ selectedMetrics, setSelectedMetrics }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} theme="light">
          <div style={{ padding: '20px' }}>
            <Title level={4}>Filters</Title>
            <Select
              style={{ width: '100%', marginBottom: '10px' }}
              value={selectedStartup}
              onChange={setSelectedStartup}
            >
              {startups.map(startup => (
                <Option key={startup} value={startup}>{startup}</Option>
              ))}
            </Select>
            <RangePicker style={{ width: '100%' }} value={dateRange} onChange={setDateRange} />
          </div>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 20px' }}>
            <Title level={2}>Growth Metrics Dashboard</Title>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Overview" key="1">
                <Row gutter={[16, 16]}>
                  {dummyData.metrics.map(metric => (
                    <Col key={metric.id} xs={24} sm={12} md={6}>
                      <MetricCard metric={metric} />
                    </Col>
                  ))}
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col span={24}>
                    <Button type="primary" onClick={openComparisonModal}>Compare Selected Metrics</Button>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                  <Col xs={24} md={12}>
                    <Card title="Revenue Trend">
                      <ReactECharts option={getChartOption('Revenue Trend', dummyDataMetrics[selectedStartup].revenue, '#1890ff')} style={{ height: 300 }} />
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card title="User Growth Trend">
                      <ReactECharts option={getChartOption('User Growth Trend', dummyDataMetrics[selectedStartup].userGrowth, '#52c41a')} style={{ height: 300 }} />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                  <Col span={24}>
                    <Card title="Goal Progress">
                      <Progress type="dashboard" percent={goalProgress} />
                      <Text strong style={{ marginLeft: 20 }}>Overall Goal Progress: {goalProgress}%</Text>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Detailed Metrics" key="2">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Metric Types">
                      {metricTypes.map(metric => (
                        <Checkbox
                          key={metric}
                          checked={selectedMetrics.includes(metric)}
                          onChange={() => handleMetricChange(metric)}
                        >
                          {metric}
                        </Checkbox>
                      ))}
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Threshold Settings">
                      <Input
                        type="number"
                        value={threshold}
                        onChange={e => setThreshold(Number(e.target.value))}
                        style={{ width: 200 }}
                        prefix={<InfoCircleOutlined />}
                        suffix="Threshold"
                      />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                  <Col span={24}>
                    <Card title="Notifications">
                      {notifications.length > 0 ? (
                        notifications.map((note, index) => (
                          <Tag key={index} color="blue" style={{ margin: '5px' }}>{note}</Tag>
                        ))
                      ) : (
                        <Text type="secondary">No new notifications</Text>
                      )}
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Team Performance" key="3">
                <Row gutter={[16, 16]}>
                  {['Alice', 'Bob', 'Charlie', 'David'].map(name => (
                    <Col key={name} xs={24} sm={12} md={6}>
                      <Card>
                        <Card.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={name}
                          description={`Performance Score: ${Math.floor(Math.random() * 100)}%`}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Layout>
      <ComparisonModal
        visible={comparisonModalVisible}
        onClose={() => setComparisonModalVisible(false)}
      />
    </MetricContext.Provider>
  );
};

export default GrowthMetricsPage;

