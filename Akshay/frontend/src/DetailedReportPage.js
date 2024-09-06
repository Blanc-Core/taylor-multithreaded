import React, { useState, useEffect } from 'react';
import { Layout, Menu, DatePicker, Select, Checkbox, Button, Modal, Rate, message } from 'antd';
import { LineChartOutlined, BarChartOutlined, CloudUploadOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import 'antd/dist/antd.css';

const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const DetailedReportPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState(false);
  const [insights, setInsights] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = () => {
      const dummyData = Array.from({ length: 10 }, (_, i) => ({
        date: `2023-11-${i + 1}`,
        metric: Math.floor(Math.random() * 100),
      }));
      setData(dummyData);
      setFilteredData(dummyData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        const updatedData = data.map(item => ({
          ...item,
          metric: item.metric + Math.floor(Math.random() * 5) - 2,
        }));
        setFilteredData(updatedData);
        generateInsights(updatedData);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [realTimeUpdates, data]);

  const generateInsights = (data) => {
    const insights = data.map(item => ({
      date: item.date,
      recommendation: item.metric > 50 ? 'Consider increasing stock' : 'Maintain current levels',
    }));
    setInsights(insights);
  };

  const handleFilterChange = (dates, selectedCategories) => {
    let filtered = data;
    if (dates) {
      filtered = filtered.filter(item => dates[0].isBefore(item.date) && dates[1].isAfter(item.date));
    }
    if (selectedCategories.length) {
      // Add category filtering logic
    }
    setFilteredData(filtered);
    generateInsights(filtered);
  };

  const exportReport = () => {
    message.success('Report exported successfully');
    setModalVisible(false);
  };

  const chartOptions = {
    xAxis: {
      type: 'category',
      data: filteredData.map(item => item.date),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: filteredData.map(item => item.metric),
        type: 'line',
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} style={{ backgroundColor: '#2E3B4E' }}>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<LineChartOutlined />}>
            Line Chart
          </Menu.Item>
          <Menu.Item key="2" icon={<BarChartOutlined />}>
            Bar Chart
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#4A90E2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: '1.5rem' }}>Detailed Report</div>
          <div>
            <Button icon={<CloudUploadOutlined />} onClick={() => setModalVisible(true)}>Export</Button>
          </div>
        </Header>
        <Content style={{ margin: '16px', padding: '24px', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <RangePicker onChange={(dates) => handleFilterChange(dates)} />
            <Select mode="multiple" style={{ width: 200 }} placeholder="Select categories" onChange={(value) => handleFilterChange(null, value)}>
              <Option key="1" value="Category 1">Category 1</Option>
              <Option key="2" value="Category 2">Category 2</Option>
            </Select>
            <Checkbox onChange={(e) => setRealTimeUpdates(e.target.checked)}>Real-time Updates</Checkbox>
          </div>
          <ReactECharts option={chartOptions} style={{ height: '400px' }} />
          <div style={{ marginTop: '16px' }}>
            <h3>Insights & Recommendations</h3>
            <ul>
              {insights.map((insight, index) => (
                <li key={index}>{insight.date}: {insight.recommendation}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Rate onChange={setSelectedRating} value={selectedRating} />
          </div>
        </Content>
      </Layout>
      <Modal
        title="Export and Share"
        visible={modalVisible}
        onOk={exportReport}
        onCancel={() => setModalVisible(false)}
      >
        <p>Select export format and share options</p>
      </Modal>
    </Layout>
  );
};

export default DetailedReportPage;