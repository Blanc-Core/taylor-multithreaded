import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { Modal, Button, Select, Input, DatePicker, notification, Typography, Card, Row, Col, Space, List, Checkbox, Slider, Avatar, Tag, Tooltip, Progress } from 'antd';
import { EditOutlined, SaveOutlined, PlusOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, CommentOutlined, TeamOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

const InvestorProfileContainer = () => {
  const [investorData, setInvestorData] = useState({
    name: 'John Doe',
    organization: 'Finance Corp',
    title: 'Senior Investor',
    contact: 'john.doe@example.com',
  });
  const [comments, setComments] = useState(['Great investor to work with!', 'Follow up on recent investment.']);
  const [newComment, setNewComment] = useState('');
  const [tasks, setTasks] = useState([{ id: 1, task: 'Schedule meeting', completed: false }]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [fundingRange, setFundingRange] = useState([10000, 5000000]);
  const [locations, setLocations] = useState([]);
  const [stages, setStages] = useState([]);
  const [error, setError] = useState('');
  const [engagements, setEngagements] = useState([
    { date: '2023-10-01', type: 'Meeting', summary: 'Discussed quarterly performance', category: 'High Priority' },
    { date: '2023-10-05', type: 'Call', summary: 'Follow-up on investment', category: 'Follow-up' },
    { date: '2023-10-10', type: 'Email', summary: 'Sent updated reports', category: 'Low Priority' },
  ]);
  const [visible, setVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({ date: '', type: '', summary: '', category: '' });
  const [filter, setFilter] = useState({ type: '', category: '' });
  const [filteredData, setFilteredData] = useState([
    { name: "Tech Innovators", description: "A startup focusing on AI solutions.", sector: "Technology", fundingStage: "Seed", geographicFocus: "North America", relevanceScore: 85 },
    { name: "Eco Green", description: "Sustainable energy solutions.", sector: "Environment", fundingStage: "Series A", geographicFocus: "Europe", relevanceScore: 78 },
  ]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('comments');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvestorData({ ...investorData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, idx) => idx !== index);
    setComments(updatedComments);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleTaskToggle = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const getOption = () => ({
    title: { text: 'Investment Overview', textStyle: { fontFamily: 'Arial', fontSize: 16 } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { 
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisLine: { lineStyle: { color: '#999' } },
      axisLabel: { color: '#666' }
    },
    yAxis: { 
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#666' }
    },
    series: [{
      name: 'Investments',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20, 30],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      }
    }],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  });

  const sectorOptions = ["Technology", "Healthcare", "Finance", "Education"];
  const locationOptions = ["North America", "Europe", "Asia"];
  const stageOptions = ["Seed", "Series A", "Series B", "IPO"];

  const handleSectorChange = (sector) => {
    setSectors((prev) =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
  };

  const handleLocationChange = (location) => {
    setLocations((prev) =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const handleStageChange = (stage) => {
    setStages((prev) =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const handlePreferencesSave = () => {
    if (sectors.length === 0 || locations.length === 0 || stages.length === 0) {
      setError('Please select at least one sector, location, and stage.');
      return;
    }
    if (fundingRange[0] >= fundingRange[1]) {
      setError('Minimum funding must be less than maximum funding.');
      return;
    }
    setError('');
    setIsEditable(false);
  };

  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);
  
  const handleInputChangeEntry = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setNewEntry({ ...newEntry, date: dateString });
  };

  const handleSubmit = () => {
    setEngagements([...engagements, newEntry]);
    notification.success({ message: 'Engagement added successfully!' });
    setVisible(false);
    setNewEntry({ date: '', type: '', summary: '', category: '' });
  };

  const filteredEngagements = engagements.filter(e =>
    (filter.type ? e.type === filter.type : true) &&
    (filter.category ? e.category === filter.category : true)
  );

  const notifyUser = (message) => {
    notification.info({
      message: 'Notification',
      description: message,
      placement: 'topRight',
    });
  };

  const handleCardClick = (startup) => {
    setSelectedStartup(startup);
    notifyUser(`You are viewing ${startup.name}`);
  };

  return (
    <div style={{ padding: '20px', overflow: 'auto', backgroundColor: '#f0f2f5' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card 
            title={<Space><Avatar size="large" src="https://example.com/investor-avatar.jpg" />{investorData.name}</Space>}
            extra={
              isEditing ? 
                <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>Save</Button> :
                <Button type="default" icon={<EditOutlined />} onClick={handleEditToggle}>Edit</Button>
            }
            bordered={false}
            style={{ height: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {isEditing ? (
                <>
                  <Input prefix={<Text type="secondary">Organization:</Text>} name="organization" value={investorData.organization} onChange={handleInputChange} />
                  <Input prefix={<Text type="secondary">Title:</Text>} name="title" value={investorData.title} onChange={handleInputChange} />
                  <Input prefix={<Text type="secondary">Contact:</Text>} name="contact" value={investorData.contact} onChange={handleInputChange} />
                </>
              ) : (
                <>
                  <Paragraph><Text strong>Organization:</Text> {investorData.organization}</Paragraph>
                  <Paragraph><Text strong>Title:</Text> {investorData.title}</Paragraph>
                  <Paragraph><Text strong>Contact:</Text> {investorData.contact}</Paragraph>
                </>
              )}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card
            bordered={false}
            tabList={[
              { key: 'comments', tab: 'Comments' },
              { key: 'tasks', tab: 'Tasks' },
              { key: 'engagements', tab: 'Engagements' },
            ]}
            activeTabKey={activeTab}
            onTabChange={setActiveTab}
            tabBarExtraContent={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                if (activeTab === 'comments') handleAddComment();
                else if (activeTab === 'tasks') handleAddTask();
                else showModal();
              }}>
                Add {activeTab === 'engagements' ? 'Entry' : activeTab.slice(0, -1)}
              </Button>
            }
          >
            <div style={{ height: '400px', overflowY: 'auto' }}>
              {activeTab === 'comments' && (
                <>
                  <Input.TextArea 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    rows={3} 
                    style={{ marginBottom: '10px' }} 
                  />
                  <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <List
                      itemLayout="horizontal"
                      dataSource={comments}
                      renderItem={(comment, index) => (
                        <List.Item
                          actions={[<Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteComment(index)} />]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar icon={<CommentOutlined />} />}
                            title={`Comment ${index + 1}`}
                            description={comment}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </>
              )}
              {activeTab === 'tasks' && (
                <>
                  <Input 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                    style={{ marginBottom: '10px' }} 
                  />
                  <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <List
                      itemLayout="horizontal"
                      dataSource={tasks}
                      renderItem={task => (
                        <List.Item
                          actions={[
                            <Checkbox checked={task.completed} onChange={() => handleTaskToggle(task.id)}>
                              {task.completed ? <CheckOutlined /> : <CloseOutlined />}
                            </Checkbox>
                          ]}
                        >
                          <List.Item.Meta
                            title={<Text delete={task.completed}>{task.task}</Text>}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </>
              )}
              {activeTab === 'engagements' && (
                <>
                  <Space direction="horizontal" style={{ marginBottom: '20px' }}>
                    <Select placeholder="Filter by Type" onChange={(value) => setFilter({ ...filter, type: value })} style={{ width: 150 }}>
                      <Option value="Meeting">Meeting</Option>
                      <Option value="Call">Call</Option>
                      <Option value="Email">Email</Option>
                    </Select>
                    <Select placeholder="Filter by Category" onChange={(value) => setFilter({ ...filter, category: value })} style={{ width: 150 }}>
                      <Option value="High Priority">High Priority</Option>
                      <Option value="Follow-up">Follow-up</Option>
                      <Option value="Low Priority">Low Priority</Option>
                    </Select>
                  </Space>
                  <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <List
                      itemLayout="horizontal"
                      dataSource={filteredEngagements}
                      renderItem={(engagement) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={engagement.type === 'Meeting' ? <TeamOutlined /> : engagement.type === 'Call' ? <PhoneOutlined /> : <MailOutlined />} />}
                            title={<Text strong>{engagement.date} - {engagement.type}</Text>}
                            description={
                              <>
                                <Paragraph>{engagement.summary}</Paragraph>
                                <Tag color={engagement.category === 'High Priority' ? 'red' : engagement.category === 'Follow-up' ? 'blue' : 'green'}>
                                  {engagement.category}
                                </Tag>
                              </>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="Investment Overview" bordered={false}>
            <ReactECharts option={getOption()} style={{ height: '400px' }} />
          </Card>
        </Col>

        <Col xs={24}>
          <Card 
            title="Investor Preferences" 
            extra={
              isEditable ?
                <Space>
                  <Button type="primary" onClick={handlePreferencesSave}>Save Changes</Button>
                  <Button onClick={() => setIsEditable(false)}>Cancel</Button>
                </Space> :
                <Button type="default" onClick={() => setIsEditable(true)}>Edit Preferences</Button>
            }
            bordered={false}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {error && <Paragraph type="danger">{error}</Paragraph>}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Title level={5}>Sectors</Title>
                  {sectorOptions.map((sector) => (
                    <Tag.CheckableTag
                      key={sector}
                      checked={sectors.includes(sector)}
                      onChange={() => handleSectorChange(sector)}
                      disabled={!isEditable}
                    >
                      {sector}
                    </Tag.CheckableTag>
                  ))}
                </Col>
                <Col xs={24} md={12}>
                  <Title level={5}>Funding Range</Title>
                  <Slider
                    range
                    min={10000}
                    max={5000000}
                    value={fundingRange}
                    onChange={setFundingRange}
                    disabled={!isEditable}
                    tipFormatter={value => `$${value.toLocaleString()}`}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <Title level={5}>Geographical Locations</Title>
                  {locationOptions.map((location) => (
                    <Tag.CheckableTag
                      key={location}
                      checked={locations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                      disabled={!isEditable}
                    >
                      {location}
                    </Tag.CheckableTag>
                  ))}
                </Col>
                <Col xs={24} md={12}>
                  <Title level={5}>Investment Stages</Title>
                  {stageOptions.map((stage) => (
                    <Tag.CheckableTag
                      key={stage}
                      checked={stages.includes(stage)}
                      onChange={() => handleStageChange(stage)}
                      disabled={!isEditable}
                    >
                      {stage}
                    </Tag.CheckableTag>
                  ))}
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="Startups" bordered={false}>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
              dataSource={filteredData}
              renderItem={(startup) => (
                <List.Item>
                  <Card
                    hoverable
                    cover={<img alt={startup.name} src={`https://example.com/${startup.name.toLowerCase().replace(' ', '-')}.jpg`} />}
                    onClick={() => handleCardClick(startup)}
                  >
                    <Card.Meta
                      title={startup.name}
                      description={
                        <>
                          <Paragraph ellipsis={{ rows: 2 }}>{startup.description}</Paragraph>
                          <Space>
                            <Tag color="blue">{startup.sector}</Tag>
                            <Tag color="green">{startup.fundingStage}</Tag>
                            <Tag color="orange">{startup.geographicFocus}</Tag>
                          </Space>
                          <Tooltip title="Relevance Score">
                            <Progress percent={startup.relevanceScore} size="small" />
                          </Tooltip>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="New Engagement"
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>Add Engagement</Button>,
        ]}
      >
        <DatePicker onChange={handleDateChange} style={{ width: '100%', marginBottom: '10px' }} />
        <Select placeholder="Type" onChange={(value) => handleSelectChange('type', value)} style={{ width: '100%', marginBottom: '10px' }}>
          <Option value="Meeting">Meeting</Option>
          <Option value="Call">Call</Option>
          <Option value="Email">Email</Option>
        </Select>
        <Input.TextArea placeholder="Summary" name="summary" onChange={handleInputChangeEntry} style={{ width: '100%', marginBottom: '10px' }} />
        <Select placeholder="Category" onChange={(value) => handleSelectChange('category', value)} style={{ width: '100%' }}>
          <Option value="High Priority">High Priority</Option>
          <Option value="Follow-up">Follow-up</Option>
          <Option value="Low Priority">Low Priority</Option>
        </Select>
      </Modal>

      {selectedStartup && (
        <Modal
          title={selectedStartup.name}
          visible={!!selectedStartup}
          onCancel={() => setSelectedStartup(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedStartup(null)}>Close</Button>,
            <Button key="book" type="primary">Book a Meeting</Button>
          ]}
        >
          <Paragraph>{selectedStartup.description}</Paragraph>
          <Paragraph><Text strong>Sector:</Text> {selectedStartup.sector}</Paragraph>
          <Paragraph><Text strong>Funding Stage:</Text> {selectedStartup.fundingStage}</Paragraph>
          <Paragraph><Text strong>Geographic Focus:</Text> {selectedStartup.geographicFocus}</Paragraph>
          <Paragraph><Text strong>Relevance Score:</Text> {selectedStartup.relevanceScore}</Paragraph>
        </Modal>
      )}

      {notifications.map((notificationMessage, index) => (
        <div key={index} style={{ position: 'fixed', top: `${20 + index * 50}px`, right: '20px', background: 'lightyellow', padding: '10px', borderRadius: '5px' }}>
          {notificationMessage}
        </div>
      ))}
    </div>
  );
};

export default InvestorProfileContainer;

