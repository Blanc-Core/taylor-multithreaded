import React, { useState } from 'react';
import { Layout, Menu, Modal, Form, Input, DatePicker, Button, Table, Rate, Card, Row, Col, Tooltip, message } from 'antd';
import { UserOutlined, CalendarOutlined, LineChartOutlined, FilterOutlined, StarOutlined, DashboardOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Content } = Layout;
const { RangePicker } = DatePicker;

// Dummy Data for Vendors
const vendors = [
  { key: '1', name: 'Vendor A', price: 1000, services: 'Catering', rating: 4, availableDates: ['2023-12-01', '2023-12-10'], eventsServed: 20 },
  { key: '2', name: 'Vendor B', price: 1500, services: 'Decoration', rating: 3, availableDates: ['2023-12-05', '2023-12-15'], eventsServed: 15 },
  { key: '3', name: 'Vendor C', price: 1200, services: 'Photography', rating: 5, availableDates: ['2023-12-08', '2023-12-20'], eventsServed: 30 },
  { key: '4', name: 'Vendor D', price: 2000, services: 'Music', rating: 2, availableDates: ['2023-12-02', '2023-12-12'], eventsServed: 10 },
  { key: '5', name: 'Vendor E', price: 1800, services: 'Lighting', rating: 4, availableDates: ['2023-12-03', '2023-12-18'], eventsServed: 25 },
];

const VendorManagement = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const [calendarDates, setCalendarDates] = useState([]);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const handleVendorSelection = (selectedKeys) => setSelectedVendors(selectedKeys);
  const showComparison = () => setComparisonVisible(true);
  const hideComparison = () => setComparisonVisible(false);
  const handleCalendarChange = (dates) => setCalendarDates(dates);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price },
    { title: 'Services', dataIndex: 'services', key: 'services' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating', render: (rating) => <Rate disabled defaultValue={rating} /> },
  ];

  const renderComparisonGrid = () => (
    <Modal
      title="Vendor Comparison"
      visible={comparisonVisible}
      onCancel={hideComparison}
      footer={null}
      width={800}
    >
      <Table dataSource={vendors.filter(v => selectedVendors.includes(v.key))} columns={columns} pagination={false} />
    </Modal>
  );

  const renderAvailabilityCalendar = () => (
    <Card title="Vendor Availability" style={{ marginBottom: '16px' }}>
      <RangePicker onChange={handleCalendarChange} />
      <Row gutter={16} style={{ marginTop: '16px' }}>
        {vendors.map((vendor) => (
          <Col key={vendor.key} span={8}>
            <Tooltip title={`Available on: ${vendor.availableDates.join(', ')}`}>
              <Card>
                <p>{vendor.name}</p>
                <p>Available Dates: {vendor.availableDates.filter(date => calendarDates.length && date >= calendarDates[0].format('YYYY-MM-DD') && date <= calendarDates[1].format('YYYY-MM-DD')).join(', ')}</p>
              </Card>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Card>
  );

  const renderPerformanceDashboard = () => {
    const option = {
      title: { text: 'Vendor Performance' },
      tooltip: {},
      legend: { data: ['Performance'] },
      xAxis: { data: vendors.map(vendor => vendor.name) },
      yAxis: {},
      series: [{
        name: 'Events Served',
        type: 'bar',
        data: vendors.map(vendor => vendor.eventsServed),
      }],
    };

    return (
      <Card title="Vendor Performance">
        <ReactECharts option={option} style={{ height: 400 }} />
      </Card>
    );
  };

  const renderClientPreferenceForm = () => (
    <Card title="Client Preferences" style={{ marginBottom: '16px' }}>
      <Form layout="vertical">
        <Form.Item label="Budget">
          <Input placeholder="Enter your budget" />
        </Form.Item>
        <Form.Item label="Preferred Services">
          <Input placeholder="Enter preferred services" />
        </Form.Item>
        <Button type="primary" icon={<FilterOutlined />}>Filter Vendors</Button>
      </Form>
    </Card>
  );

  const renderReviewSystem = () => {
    const handleReviewSubmit = (values) => {
      message.success('Review submitted successfully!');
      setReviewModalVisible(false);
    };

    return (
      <Card title="Vendor Reviews">
        <Button type="primary" icon={<StarOutlined />} onClick={() => setReviewModalVisible(true)}>Submit Review</Button>
        <Modal
          title="Submit Review"
          visible={reviewModalVisible}
          onCancel={() => setReviewModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleReviewSubmit}>
            <Form.Item name="vendor" label="Vendor" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
              <Rate />
            </Form.Item>
            <Form.Item name="review" label="Review" rules={[{ required: true, message: 'Please input your review!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>
        </Modal>
      </Card>
    );
  };

  const renderUserDashboard = () => (
    <Card title="User Dashboard" style={{ marginBottom: '16px' }}>
      <p>Saved Vendors</p>
      <p>Upcoming Events</p>
      <Button type="primary" icon={<DashboardOutlined />}>Manage Dashboard</Button>
    </Card>
  );

  return (
    <Layout style={{ backgroundColor: '#ECF0F1', fontFamily: 'Roboto, sans-serif' }}>
      <Content style={{ padding: '24px', maxWidth: '1200px', margin: 'auto' }}>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ marginBottom: '24px' }}>
          <Menu.Item key="1" icon={<UserOutlined />} onClick={showComparison}>Vendor Comparison</Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>Availability Calendar</Menu.Item>
          <Menu.Item key="3" icon={<LineChartOutlined />}>Performance Dashboard</Menu.Item>
          <Menu.Item key="4" icon={<FilterOutlined />}>Client Preferences</Menu.Item>
          <Menu.Item key="5" icon={<StarOutlined />}>Reviews</Menu.Item>
          <Menu.Item key="6" icon={<DashboardOutlined />}>User Dashboard</Menu.Item>
        </Menu>
        {renderComparisonGrid()}
        {renderAvailabilityCalendar()}
        {renderPerformanceDashboard()}
        {renderClientPreferenceForm()}
        {renderReviewSystem()}
        {renderUserDashboard()}
      </Content>
    </Layout>
  );
};

export default VendorManagement;