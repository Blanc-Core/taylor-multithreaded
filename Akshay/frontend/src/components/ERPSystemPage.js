import React, { useState } from 'react';
import 'antd/dist/reset.css';
import ReactECharts from 'echarts-for-react';
import { Layout, Input, Button, Table, Form, Modal, notification, Card, List, Tag, Avatar, Space, Tabs, Statistic, Row, Col, Typography, Progress, Tooltip, Popover, Select } from 'antd';
import { EditOutlined, BellOutlined, TeamOutlined, ProjectOutlined, CommentOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const ERPSystemPage = () => {
  const [startupName, setStartupName] = useState("Current Startup Name");
  const [missionStatement, setMissionStatement] = useState("Our mission is to empower businesses.");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingMission, setIsEditingMission] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState({ name: '', role: '', contact: '' });
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([{ userId: '1', feedback: 'Clear mission!' }]);
  const [milestones, setMilestones] = useState([{ milestone: 'Launch', status: 'Completed' }, { milestone: 'First 100 Users', status: 'In Progress' }]);
  const [notifications, setNotifications] = useState([{ type: 'update', message: 'Mission statement updated!', timestamp: '2023-10-01' }]);
  const [userGrowthData, setUserGrowthData] = useState([
    { month: 'Jan', users: 100 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 200 },
    { month: 'Apr', users: 180 },
    { month: 'May', users: 220 },
    { month: 'Jun', users: 270 }
  ]);
  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 7500 },
    { month: 'Mar', revenue: 10000 },
    { month: 'Apr', revenue: 9000 },
    { month: 'May', revenue: 11000 },
    { month: 'Jun', revenue: 13500 }
  ]);
  const [projectStatusData, setProjectStatusData] = useState([
    { name: 'Completed', value: 5 },
    { name: 'In Progress', value: 8 },
    { name: 'Planning', value: 3 }
  ]);
  const [dynamicMetrics, setDynamicMetrics] = useState([{ metric: 'User Growth', views: 200 }]);
  const [showNotification, setShowNotification] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([{ userId: '1', comment: 'Great initiative!' }]);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', email: 'john.doe@example.com', bio: 'Full stack developer with a passion for coding.', status: 'Available', rating: 4.5 },
    { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane.smith@example.com', bio: 'Creative designer with a love for UI/UX.', status: 'In a Meeting', rating: 4.0 },
    { id: 3, name: 'Alice Johnson', role: 'Project Manager', email: 'alice.johnson@example.com', bio: 'Experienced project manager focused on deliverables.', status: 'Available', rating: 5.0 }
  ]);

  const [activeTab, setActiveTab] = useState('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [memberComments, setMemberComments] = useState({});
  const [newComment, setNewComment] = useState('');

  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 60, description: 'Redesigning the company website for better UX', startDate: '2023-01-01', endDate: '2023-06-30', team: [1, 2] },
    { id: 2, name: 'Mobile App Development', status: 'Planning', progress: 20, description: 'Creating a mobile app for our main product', startDate: '2023-03-15', endDate: '2023-12-31', team: [1, 3] },
    { id: 3, name: 'Data Analytics Platform', status: 'Completed', progress: 100, description: 'Building an internal data analytics platform', startDate: '2022-09-01', endDate: '2023-02-28', team: [2, 3] },
  ]);

  const handleNameChange = (e) => {
    setStartupName(e.target.value);
  };

  const handleMissionChange = (e) => {
    setMissionStatement(e.target.value);
  };

  const addCollaborator = () => {
    if (newCollaborator.name && newCollaborator.role && newCollaborator.contact) {
      setCollaborators([...collaborators, { ...newCollaborator, id: Date.now() }]);
      setNewCollaborator({ name: '', role: '', contact: '' });
    }
  };

  const removeCollaborator = (id) => {
    setCollaborators(collaborators.filter(collab => collab.id !== id));
  };

  const handleFeedbackSubmit = () => {
    setFeedbackList([...feedbackList, { userId: `${feedbackList.length + 1}`, feedback }]);
    setFeedback('');
    notification.success({ message: 'Feedback submitted!' });
  };

  const getUserGrowthOption = () => ({
    title: { text: 'User Growth', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: userGrowthData.map(item => item.month) },
    yAxis: { type: 'value', name: 'Users' },
    series: [{
      data: userGrowthData.map(item => item.users),
      type: 'line',
      smooth: true,
      areaStyle: { opacity: 0.3 },
      itemStyle: { color: '#1890ff' }
    }]
  });

  const getRevenueOption = () => ({
    title: { text: 'Monthly Revenue', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: revenueData.map(item => item.month) },
    yAxis: { type: 'value', name: 'Revenue ($)' },
    series: [{
      data: revenueData.map(item => item.revenue),
      type: 'bar',
      itemStyle: { color: '#52c41a' }
    }]
  });

  const getProjectStatusOption = () => ({
    title: { text: 'Project Status', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [{
      name: 'Project Status',
      type: 'pie',
      radius: '50%',
      data: projectStatusData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // Save changes based on modalContent
    switch (modalContent.type) {
      case 'editStartup':
        setStartupName(modalContent.name);
        setMissionStatement(modalContent.mission);
        break;
      case 'editMember':
        setTeamMembers(teamMembers.map(member => 
          member.id === modalContent.id ? { ...member, ...modalContent.data } : member
        ));
        break;
      case 'editMilestone':
        setMilestones(milestones.map(milestone => 
          milestone.id === modalContent.id ? { ...milestone, ...modalContent.data } : milestone
        ));
        break;
      // Add more cases as needed
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    showModal({ type: 'editMember', id: member.id });
  };

  const handleUpdateMember = (updatedMember) => {
    setTeamMembers(prevMembers => prevMembers.map(member => 
      member.id === editingMember.id ? { ...member, ...updatedMember } : member
    ));
    setEditingMember(null);
    setIsModalVisible(false);
  };

  const handleAddComment = (memberId) => {
    if (newComment.trim()) {
      setMemberComments(prevComments => ({
        ...prevComments,
        [memberId]: [...(prevComments[memberId] || []), { id: Date.now(), text: newComment }]
      }));
      setNewComment('');
    }
  };

  const handleEditProject = (project) => {
    showModal({ type: 'editProject', id: project.id });
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(prevProjects => prevProjects.map(project => 
      project.id === updatedProject.id ? { ...project, ...updatedProject } : project
    ));
    setIsModalVisible(false);
  };

  const renderKPIs = () => (
    <Row gutter={16}>
      <Col span={6}>
        <Card hoverable onClick={() => showModal({ type: 'userDetails' })}>
          <Statistic 
            title="Total Users" 
            value={userGrowthData.reduce((sum, item) => sum + item.users, 0)}
            prefix={<TeamOutlined />} 
          />
          <Progress percent={75} showInfo={false} />
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable onClick={() => showModal({ type: 'milestoneDetails' })}>
          <Statistic 
            title="Completed Milestones" 
            value={milestones.filter(m => m.status === 'Completed').length}
            suffix={`/ ${milestones.length}`}
            prefix={<ProjectOutlined />}
          />
          <Progress percent={(milestones.filter(m => m.status === 'Completed').length / milestones.length) * 100} showInfo={false} />
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable onClick={() => setActiveTab('2')}>
          <Statistic 
            title="Team Members" 
            value={teamMembers.length}
            prefix={<TeamOutlined />}
          />
          <Progress percent={(teamMembers.length / 10) * 100} showInfo={false} />
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable onClick={() => setActiveTab('3')}>
          <Statistic 
            title="Active Projects" 
            value={milestones.filter(m => m.status === 'In Progress').length}
            prefix={<ProjectOutlined />}
          />
          <Progress percent={(milestones.filter(m => m.status === 'In Progress').length / milestones.length) * 100} showInfo={false} />
        </Card>
      </Col>
    </Row>
  );

  const renderDashboard = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {renderKPIs()}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <ReactECharts option={getUserGrowthOption()} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <ReactECharts option={getRevenueOption()} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <ReactECharts option={getProjectStatusOption()} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="Recent Notifications" 
            extra={<Button type="link" onClick={() => showModal({ type: 'allNotifications' })}>View All</Button>}
          >
            <List
              dataSource={notifications.slice(0, 3)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.message}
                    description={item.timestamp}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="Dynamic Metrics" 
            extra={<Button type="link" onClick={() => showModal({ type: 'allMetrics' })}>View All</Button>}
          >
            <List
              dataSource={dynamicMetrics.slice(0, 3)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.metric}`}
                    description={`${item.views} views`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );

  const renderTeam = () => (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={teamMembers}
      renderItem={member => (
        <List.Item>
          <Card
            hoverable
            actions={[
              <Tooltip title="Edit"><EditOutlined key="edit" onClick={() => handleEditMember(member)} /></Tooltip>,
              <Tooltip title="Comment"><CommentOutlined key="comment" onClick={() => showModal({ type: 'memberComments', id: member.id })} /></Tooltip>,
              <Tooltip title="View Details"><EyeOutlined key="view" onClick={() => setSelectedTeamMember(member)} /></Tooltip>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar size={64}>{member.name[0]}</Avatar>}
              title={member.name}
              description={
                <>
                  <p><strong>Role:</strong> {member.role}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Status:</strong> <Tag color={member.status === 'Available' ? 'green' : 'orange'}>{member.status}</Tag></p>
                </>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );

  const renderProjects = () => (
    <List
      dataSource={projects}
      renderItem={project => (
        <List.Item>
          <Card
            hoverable
            style={{ width: '100%' }}
            actions={[
              <Tooltip title="Edit"><Button type="link" icon={<EditOutlined />} onClick={() => handleEditProject(project)} /></Tooltip>,
              <Tooltip title="Delete"><Button type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteProject(project.id)} /></Tooltip>,
              <Tooltip title="View Details"><Button type="link" icon={<EyeOutlined />} onClick={() => setSelectedProject(project)} /></Tooltip>,
            ]}
          >
            <Card.Meta
              title={project.name}
              description={
                <>
                  <Tag color={getStatusColor(project.status)}>{project.status}</Tag>
                  <Progress percent={project.progress} size="small" status={getProgressStatus(project.progress)} />
                  <p>{project.description}</p>
                </>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );

  const renderModalContent = (content) => {
    switch (content.type) {
      case 'editStartup':
        return (
          <Form>
            <Form.Item label="Startup Name">
              <Input defaultValue={content.name} />
            </Form.Item>
            <Form.Item label="Mission Statement">
              <TextArea rows={4} defaultValue={content.mission} />
            </Form.Item>
          </Form>
        );
      case 'editMember':
        return (
          <Form onFinish={handleUpdateMember} initialValues={editingMember}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="Available">Available</Select.Option>
                <Select.Option value="In a Meeting">In a Meeting</Select.Option>
                <Select.Option value="On Leave">On Leave</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="bio" label="Bio">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Update Member</Button>
            </Form.Item>
          </Form>
        );
      case 'editMilestone':
        // Render form for editing milestone
        return null;
      case 'memberComments':
        return (
          <Space direction="vertical" style={{ width: '100%' }}>
            <List
              dataSource={memberComments[content.id] || []}
              renderItem={comment => (
                <List.Item>
                  <List.Item.Meta
                    title={`Comment ${comment.id}`}
                    description={comment.text}
                  />
                </List.Item>
              )}
            />
            <Input.TextArea 
              rows={4} 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a new comment..."
            />
            <Button type="primary" onClick={() => handleAddComment(content.id)}>Add Comment</Button>
          </Space>
        );
      case 'allNotifications':
        // Render all notifications
        return null;
      case 'allMetrics':
        // Render all dynamic metrics
        return null;
      case 'editProject':
        const project = projects.find(p => p.id === content.id);
        return (
          <Form onFinish={handleUpdateProject} initialValues={project}>
            <Form.Item name="name" label="Project Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="Planning">Planning</Select.Option>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="progress" label="Progress" rules={[{ required: true, type: 'number', min: 0, max: 100 }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="startDate" label="Start Date">
              <Input type="date" />
            </Form.Item>
            <Form.Item name="endDate" label="End Date">
              <Input type="date" />
            </Form.Item>
            <Form.Item name="team" label="Team Members">
              <Select mode="multiple">
                {teamMembers.map(member => (
                  <Select.Option key={member.id} value={member.id}>{member.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Update Project</Button>
            </Form.Item>
          </Form>
        );
      default:
        return null;
    }
  };

  const renderTeamMemberDetails = (member) => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Avatar size={128}>{member.name[0]}</Avatar>
      <Title level={4}>{member.name}</Title>
      <Paragraph><strong>Role:</strong> {member.role}</Paragraph>
      <Paragraph><strong>Email:</strong> {member.email}</Paragraph>
      <Paragraph><strong>Status:</strong> <Tag color={member.status === 'Available' ? 'green' : 'orange'}>{member.status}</Tag></Paragraph>
      <Paragraph><strong>Bio:</strong> {member.bio}</Paragraph>
      <Statistic title="Performance Rating" value={member.rating} suffix="/ 5" />
      {/* Add more details as needed */}
    </Space>
  );

  const renderProjectDetails = (project) => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={4}>{project.name}</Title>
      <Paragraph><strong>Status:</strong> <Tag color={getStatusColor(project.status)}>{project.status}</Tag></Paragraph>
      <Paragraph><strong>Description:</strong> {project.description}</Paragraph>
      <Progress percent={project.progress} status={getProgressStatus(project.progress)} />
      <Paragraph><strong>Start Date:</strong> {project.startDate}</Paragraph>
      <Paragraph><strong>End Date:</strong> {project.endDate}</Paragraph>
      <Paragraph><strong>Team Members:</strong></Paragraph>
      <List
        dataSource={teamMembers.filter(member => project.team.includes(member.id))}
        renderItem={member => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{member.name[0]}</Avatar>}
              title={member.name}
              description={member.role}
            />
          </List.Item>
        )}
      />
    </Space>
  );

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return 'blue';
      case 'In Progress': return 'orange';
      case 'Completed': return 'green';
      default: return 'default';
    }
  };

  const getProgressStatus = (progress) => {
    if (progress === 100) return 'success';
    if (progress >= 80) return 'active';
    return 'normal';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ margin: '0 16px' }}>{startupName}</Title>
        <Space>
          <Popover content={<Paragraph>{missionStatement}</Paragraph>} title="Mission Statement">
            <Button type="primary" icon={<EditOutlined />} onClick={() => showModal({ type: 'editStartup' })}>
              Edit Startup Info
            </Button>
          </Popover>
          <Button icon={<BellOutlined />} onClick={() => showModal({ type: 'notifications' })}>
            Notifications
          </Button>
        </Space>
      </Header>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Dashboard" key="1">
            {renderDashboard()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Team" key="2">
            {renderTeam()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Projects" key="3">
            {renderProjects()}
          </Tabs.TabPane>
        </Tabs>
      </Content>
      <Modal
        title={getModalTitle(modalContent)}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        {modalContent && renderModalContent(modalContent)}
      </Modal>
      <Modal
        title="Team Member Details"
        visible={!!selectedTeamMember}
        onOk={() => setSelectedTeamMember(null)}
        onCancel={() => setSelectedTeamMember(null)}
        width={600}
      >
        {selectedTeamMember && renderTeamMemberDetails(selectedTeamMember)}
      </Modal>
      <Modal
        title="Project Details"
        visible={!!selectedProject}
        onOk={() => setSelectedProject(null)}
        onCancel={() => setSelectedProject(null)}
        width={800}
      >
        {selectedProject && renderProjectDetails(selectedProject)}
      </Modal>
    </Layout>
  );
};

const getModalTitle = (content) => {
  if (!content) return "Edit Information";
  switch (content.type) {
    case 'editStartup': return "Edit Startup Information";
    case 'editMember': return "Edit Team Member";
    case 'editMilestone': return "Edit Project Milestone";
    case 'memberComments': return "Team Member Comments";
    case 'allNotifications': return "All Notifications";
    case 'allMetrics': return "All Dynamic Metrics";
    case 'editProject': return "Edit Project";
    default: return "Edit Information";
  }
};

export default ERPSystemPage;