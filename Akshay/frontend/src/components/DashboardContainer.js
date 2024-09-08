import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import { Layout, Card, Button, Table, Input, Select, Slider, Tooltip, Alert, notification, Row, Col, Statistic, Progress, List, Tag, Badge } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, BellOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";

const { Header, Content, Sider } = Layout;
const { Option } = Select;

const DashboardContainer = () => {
  const [feedback, setFeedback] = useState([]);
  const [teamWorkloadData, setTeamWorkloadData] = useState([]);
  const [projectAssignments, setProjectAssignments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [theme, setTheme] = useState('light');
  const [kpis, setKpis] = useState({
    projectCompletion: 75,
    teamEfficiency: 88,
    budgetUtilization: 62,
    customerSatisfaction: 4.2
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTeamWorkloadData([
      { team: 'Team A', workload: 80 },
      { team: 'Team B', workload: 30 },
      { team: 'Team C', workload: 60 },
      { team: 'Team D', workload: 50 },
      { team: 'Team E', workload: 90 },
    ]);

    setProjectAssignments([
      { id: 1, name: 'Project Alpha', team: 'Team A', workload: 80, status: 'ongoing' },
      { id: 2, name: 'Project Beta', team: 'Team B', workload: 60, status: 'ongoing' },
      { id: 3, name: 'Project Gamma', team: 'Team C', workload: 50, status: 'completed' },
      { id: 4, name: 'Project Delta', team: 'Team A', workload: 40, status: 'on-hold' },
    ]);

    setAlerts([
      { teamName: 'Team A', workload: 85, threshold: 70, severity: 'critical', id: 1 },
      { teamName: 'Team B', workload: 65, threshold: 60, severity: 'warning', id: 2 },
      { teamName: 'Team C', workload: 45, threshold: 50, severity: 'normal', id: 3 },
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTeamWorkloadData(prevData => 
        prevData.map(item => ({ ...item, workload: Math.floor(Math.random() * 100) }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFeedbackSubmit = (feedbackData) => {
    setFeedback((prev) => [...prev, feedbackData]);
    notification.success({
      message: 'Feedback Submitted',
      description: 'Your feedback has been successfully submitted.',
    });
  };

  const handleThemeChange = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ backgroundColor: theme === 'light' ? '#fff' : '#001529', color: theme === 'light' ? '#000' : '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'inherit', margin: 0 }}>Resource Allocation Dashboard</h2>
        <Button onClick={handleThemeChange} type="link" style={{ color: 'inherit' }}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </Button>
      </Header>
      <Layout>
        <Sider width={300} theme={theme}>
          <AlertsNotification alerts={alerts} />
          <QuickActions />
        </Sider>
        <Content style={{ padding: '20px', backgroundColor: theme === 'light' ? '#f0f2f5' : '#001529', overflowY: 'auto' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Project Completion" value={kpis.projectCompletion} suffix="%" color="#1890ff" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Team Efficiency" value={kpis.teamEfficiency} suffix="%" color="#52c41a" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Budget Utilization" value={kpis.budgetUtilization} suffix="%" color="#faad14" />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Customer Satisfaction" value={kpis.customerSatisfaction} suffix="/5" color="#eb2f96" />
            </Col>
            <Col xs={24}>
              <Card title="Team Workload">
                <TeamWorkloadChart data={teamWorkloadData} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Project Assignments">
                <ProjectAssignmentsList projects={projectAssignments} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Resource Utilization">
                <ResourceUtilization />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Task Management">
                <TaskManagement />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Performance Trends">
                <PerformanceTrendsChart />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Feedback">
                <FeedbackWidget onSubmit={handleFeedbackSubmit} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Simulation Control">
                <SimulationControl />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

const TeamWorkloadChart = ({ data }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleClick = (params) => {
    const teamData = data[params.dataIndex];
    setSelectedTeam(teamData.team);
    notification.info({
      message: `Filtering by ${teamData.team}`,
      placement: 'bottomRight',
    });
  };

  const getOption = () => ({
    title: {
      text: 'Team Workload Heatmap',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[2]}%`,
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.team),
    },
    yAxis: {
      type: 'category',
      data: ['Workload'],
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    series: [
      {
        name: 'Workload',
        type: 'heatmap',
        data: data.map((item, index) => [index, 0, item.workload]),
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
      },
    ],
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactECharts
        option={getOption()}
        onEvents={{
          click: handleClick,
        }}
      />
      {selectedTeam && (
        <Alert
          message={`Filtered by: ${selectedTeam}`}
          type="info"
          closable
          onClose={() => setSelectedTeam(null)}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        />
      )}
    </div>
  );
};

const KPICard = ({ title, value, suffix, color }) => (
  <Card>
    <Statistic
      title={title}
      value={value}
      precision={2}
      valueStyle={{ color }}
      prefix={<ArrowUpOutlined />}
      suffix={suffix}
    />
  </Card>
);

const ProjectAssignmentsList = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editedWorkload, setEditedWorkload] = useState({});

  const filteredData = useMemo(() => {
    return projects.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? item.status === statusFilter : true)
    );
  }, [searchTerm, statusFilter, projects]);

  const handleEdit = (id, newWorkload) => {
    const totalWorkload = filteredData.reduce((sum, item) => sum + (editedWorkload[item.id] || item.workload), 0);
    if (totalWorkload - (editedWorkload[id] || filteredData.find(item => item.id === id).workload) + newWorkload <= 100) {
      setEditedWorkload(prev => ({ ...prev, [id]: newWorkload }));
    } else {
      alert('Total workload cannot exceed 100%');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Assigned Team',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Workload (%)',
      dataIndex: 'workload',
      key: 'workload',
      render: (text, record) => (
        <Input
          defaultValue={text}
          onBlur={(e) => handleEdit(record.id, Number(e.target.value))}
        />
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Input
        placeholder="Search Projects"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px' }}
      />
      <Select
        placeholder="Filter by Status"
        style={{ width: 200, marginBottom: '10px' }}
        onChange={handleStatusChange}
      >
        <Option value="">All Statuses</Option>
        <Option value="ongoing">Ongoing</Option>
        <Option value="completed">Completed</Option>
        <Option value="on-hold">On Hold</Option>
      </Select>
      <Table columns={columns} dataSource={filteredData} rowKey="id" pagination={false} />
    </div>
  );
};

const ResourceUtilization = () => {
  const resources = [
    { name: 'CPU', utilization: 78 },
    { name: 'Memory', utilization: 65 },
    { name: 'Storage', utilization: 42 },
    { name: 'Network', utilization: 89 },
  ];

  return (
    <List
      dataSource={resources}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={item.name}
            description={
              <Progress
                percent={item.utilization}
                status={item.utilization > 80 ? 'exception' : 'normal'}
                strokeColor={item.utilization > 80 ? '#ff4d4f' : '#1890ff'}
              />
            }
          />
        </List.Item>
      )}
    />
  );
};

const TaskManagement = () => {
  const tasks = [
    { id: 1, name: 'Design UI mockups', status: 'In Progress', priority: 'High' },
    { id: 2, name: 'Implement backend API', status: 'To Do', priority: 'Medium' },
    { id: 3, name: 'Write unit tests', status: 'In Progress', priority: 'Low' },
    { id: 4, name: 'Deploy to staging', status: 'Done', priority: 'High' },
  ];

  const columns = [
    { title: 'Task', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status',
      render: status => (
        <Tag color={status === 'Done' ? 'green' : status === 'In Progress' ? 'blue' : 'orange'}>
          {status}
        </Tag>
      )
    },
    { title: 'Priority', dataIndex: 'priority', key: 'priority',
      render: priority => (
        <Tag color={priority === 'High' ? 'red' : priority === 'Medium' ? 'yellow' : 'green'}>
          {priority}
        </Tag>
      )
    },
  ];

  return <Table columns={columns} dataSource={tasks} pagination={false} />;
};

const PerformanceTrendsChart = () => {
  const option = {
    title: { text: 'Performance Trends' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['Productivity', 'Quality', 'Efficiency'] },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [
      { name: 'Productivity', type: 'line', data: [120, 132, 101, 134, 90, 230, 210] },
      { name: 'Quality', type: 'line', data: [220, 182, 191, 234, 290, 330, 310] },
      { name: 'Efficiency', type: 'line', data: [150, 232, 201, 154, 190, 330, 410] },
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

const QuickActions = () => {
  const actions = [
    { title: 'Add New Project', onClick: () => console.log('Add New Project') },
    { title: 'Generate Report', onClick: () => console.log('Generate Report') },
    { title: 'Schedule Meeting', onClick: () => console.log('Schedule Meeting') },
    { title: 'Review Assignments', onClick: () => console.log('Review Assignments') },
  ];

  return (
    <List
      header={<h3>Quick Actions</h3>}
      dataSource={actions}
      renderItem={item => (
        <List.Item>
          <Button type="link" onClick={item.onClick}>{item.title}</Button>
        </List.Item>
      )}
    />
  );
};

const AlertsNotification = ({ alerts }) => {
  const [collapsed, setCollapsed] = useState(true);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#ff4d4f';
      case 'warning':
        return '#faad14';
      default:
        return '#52c41a';
    }
  };

  const handleClick = (alert) => {
    notification.info({
      message: `Alert Details for ${alert.teamName}`,
      description: `Workload: ${alert.workload}%, Threshold: ${alert.threshold}%`,
      placement: 'bottomRight',
    });
  };

  return (
    <div style={{ padding: '10px' }}>
      <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <h3 style={{ margin: 0, marginRight: '10px' }}>Alerts</h3>
        <Badge count={alerts.length} style={{ backgroundColor: alerts.length > 0 ? '#ff4d4f' : '#52c41a' }} />
        <BellOutlined style={{ marginLeft: '10px' }} />
      </div>
      {!collapsed && (
        <List
          size="small"
          dataSource={alerts}
          renderItem={(alert) => (
            <List.Item
              onClick={() => handleClick(alert)}
              style={{ cursor: 'pointer', padding: '5px', margin: '5px 0', backgroundColor: getSeverityColor(alert.severity), borderRadius: '4px' }}
            >
              <span style={{ color: 'white' }}>{`${alert.teamName}: ${alert.workload}%`}</span>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

const FeedbackWidget = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
  };

  return (
    <div>
      <Input.TextArea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your feedback here..."
        rows={4}
      />
      <Button onClick={handleSubmit} type="primary" style={{ marginTop: '10px' }}>
        Submit Feedback
      </Button>
    </div>
  );
};

const SimulationControl = () => {
  const [resources, setResources] = useState({ cpu: 50, memory: 50 });

  const handleChange = (value, type) => {
    setResources(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div>
      <h3>Resource Allocation Simulation</h3>
      <Tooltip title={`CPU Allocation: ${resources.cpu}%`}>
        <Slider
          min={0}
          max={100}
          value={resources.cpu}
          onChange={(value) => handleChange(value, 'cpu')}
        />
      </Tooltip>
      <Tooltip title={`Memory Allocation: ${resources.memory}%`}>
        <Slider
          min={0}
          max={100}
          value={resources.memory}
          onChange={(value) => handleChange(value, 'memory')}
        />
      </Tooltip>
      <p>Current Allocation: {`CPU: ${resources.cpu}%, Memory: ${resources.memory}%`}</p>
    </div>
  );
};

export default DashboardContainer;