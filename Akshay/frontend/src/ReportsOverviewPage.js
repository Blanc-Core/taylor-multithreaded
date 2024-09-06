import React, { useState } from 'react';
import { Layout, Card, Row, Col, DatePicker, Checkbox, Button, Tooltip, Input, Form, Modal, notification } from 'antd';
import ReactECharts from 'echarts-for-react';
import { FilePdfOutlined, FileExcelOutlined, BellOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;
const { Search } = Input;

// Dummy Data
const dummyKPIData = [
  { title: 'Satisfaction Score', value: '85%', trend: 'up' },
  { title: 'Number of Events', value: '120', trend: 'steady' },
];

const dummyChartData = {
  satisfactionBreakdown: [{ value: 335, name: 'Positive' }, { value: 310, name: 'Neutral' }, { value: 234, name: 'Negative' }],
  trendData: [820, 932, 901, 934, 1290, 1330, 1320],
};

const ReportsOverviewPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const showNotification = () => {
    notification.open({
      message: 'New Report Available',
      description: 'Check out the latest report on event performance metrics.',
      icon: <BellOutlined style={{ color: '#4A90E2' }} />,
    });
  };

  const handleModalOpen = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);

  const handleDownload = (type) => {
    notification.success({
      message: `Report Downloaded`,
      description: `Your report has been downloaded as a ${type}.`,
    });
  };

  return (
    <Layout style={{ height: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <Header style={{ background: '#2E3B4E', padding: '0 16px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <h1 style={{ color: '#fff' }}>Reports Overview</h1>
          </Col>
          <Col>
            <Button icon={<BellOutlined />} onClick={showNotification} />
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider width={300} style={{ background: '#fff', padding: '24px' }}>
          <Form layout="vertical">
            <Form.Item label="Date Range">
              <RangePicker />
            </Form.Item>
            <Form.Item label="Event Type">
              <Checkbox.Group options={['Conference', 'Workshop', 'Webinar']} />
            </Form.Item>
            <Form.Item label="Satisfaction Score">
              <Checkbox.Group options={['High', 'Medium', 'Low']} />
            </Form.Item>
            <Button type="primary" block style={{ marginTop: '16px' }}>Apply Filters</Button>
            <Button block style={{ marginTop: '8px' }}>Reset Filters</Button>
          </Form>
        </Sider>
        <Content style={{ padding: '24px', background: '#F5F5F5' }}>
          <Row gutter={[16, 16]}>
            {dummyKPIData.map((kpi, index) => (
              <Col span={6} key={index}>
                <Card>
                  <h3>{kpi.title}</h3>
                  <p>{kpi.value}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col span={12}>
              <Card>
                <ReactECharts
                  option={{
                    title: { text: 'Satisfaction Breakdown', left: 'center' },
                    series: [{ type: 'pie', data: dummyChartData.satisfactionBreakdown }],
                  }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <ReactECharts
                  option={{
                    title: { text: 'Trend Over Time', left: 'center' },
                    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                    yAxis: { type: 'value' },
                    series: [{ type: 'line', data: dummyChartData.trendData }],
                  }}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col span={12}>
              <Button icon={<FilePdfOutlined />} onClick={() => handleDownload('PDF')} style={{ width: '100%' }}>
                Download as PDF
              </Button>
            </Col>
            <Col span={12}>
              <Button icon={<FileExcelOutlined />} onClick={() => handleDownload('CSV')} style={{ width: '100%' }}>
                Download as CSV
              </Button>
            </Col>
          </Row>
          <Modal title="Submit Feedback" visible={isModalVisible} onCancel={handleModalClose} footer={null}>
            <Form layout="vertical">
              <Form.Item label="Rating">
                <Checkbox.Group options={['1', '2', '3', '4', '5']} />
              </Form.Item>
              <Form.Item label="Comments">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Button type="primary" onClick={handleModalClose}>Submit</Button>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ReportsOverviewPage;

