import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Form, Input, Button, Select, Modal, Progress, Tooltip } from 'antd';
import { BarChartOutlined, FilePdfOutlined, UserAddOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import jsPDF from 'jspdf';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const BudgetTrackerPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const dummyData = {
    budgetCategories: [
      { name: 'Food', value: 400 },
      { name: 'Transport', value: 300 },
      { name: 'Accommodation', value: 500 },
      { name: 'Miscellaneous', value: 200 },
    ],
    expenses: [
      { month: 'Jan', amount: 300 },
      { month: 'Feb', amount: 250 },
      { month: 'Mar', amount: 400 },
    ],
    totalBudget: 2000,
    remainingBudget: 600,
  };

  const getPieChartOption = () => ({
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        data: dummyData.budgetCategories.map((item) => ({
          name: item.name,
          value: item.value,
        })),
      },
    ],
  });

  const getBarChartOption = () => ({
    xAxis: {
      type: 'category',
      data: dummyData.expenses.map((item) => item.month),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: dummyData.expenses.map((item) => item.amount),
        type: 'bar',
      },
    ],
  });

  const handleAddExpense = (values) => {
    console.log('Add Expense:', values);
    setExpenseModalVisible(false);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Budget Report', 10, 10);
    doc.save('report.pdf');
    setReportModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#004080' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="dashboard" icon={<BarChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="addExpense" icon={<BarChartOutlined />} onClick={() => setExpenseModalVisible(true)}>
            Add Expense
          </Menu.Item>
          <Menu.Item key="generateReport" icon={<FilePdfOutlined />} onClick={() => setReportModalVisible(true)}>
            Generate Report
          </Menu.Item>
          <Menu.Item key="collaborate" icon={<UserAddOutlined />}>
            Collaborate
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#0080FF', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {selectedMenu === 'dashboard' && (
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Budget Overview">
                    <ReactEcharts option={getPieChartOption()} style={{ height: '300px' }} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Monthly Expenses">
                    <ReactEcharts option={getBarChartOption()} style={{ height: '300px' }} />
                  </Card>
                </Col>
                <Col span={24} style={{ marginTop: '16px' }}>
                  <Card title="Total Budget">
                    <Progress percent={(dummyData.remainingBudget / dummyData.totalBudget) * 100} />
                    <Tooltip title="Remaining Budget">
                      <span>{dummyData.remainingBudget}</span>
                    </Tooltip>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Budget Tracker ©2023</Footer>
      </Layout>

      <Modal
        title="Add Expense"
        visible={expenseModalVisible}
        onCancel={() => setExpenseModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddExpense}>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input a description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Select placeholder="Select a category">
              {dummyData.budgetCategories.map((category) => (
                <Option key={category.name} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Add Expense</Button>
        </Form>
      </Modal>

      <Modal
        title="Generate Report"
        visible={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        onOk={generateReport}
      >
        <p>Select report type and click generate.</p>
      </Modal>
    </Layout>
  );
};

export default BudgetTrackerPage;