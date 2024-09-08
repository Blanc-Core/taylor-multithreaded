import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Modal, Button, Tooltip, Input, Card, List, Progress, Row, Col, Typography, Tag, Avatar, Timeline, Statistic } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import { UserOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';

// Dummy Data
const projectData = {
  name: "Project Alpha",
  description: "This project aims to improve the overall efficiency of our ERP system.",
  status: "In Progress",
  milestones: [
    { date: '2023-01-01', title: 'Kick-off', description: 'Project initiated.' },
    { date: '2023-02-15', title: 'Phase 1 Complete', description: 'Completion of initial phase.' },
    { date: '2023-04-10', title: 'Phase 2 Complete', description: 'Second phase completed.' },
  ],
  notifications: [
    "New update available for Phase 2.",
    "Resource allocation has been adjusted.",
    "Milestone for Phase 1 has been achieved.",
  ],
  resourceAllocation: { "Development": 40, "Testing": 20, "Design": 30, "Management": 10 },
  progressData: [10, 30, 50, 70, 90, 100],
};

const milestonesData = [
  { id: '1', name: 'Launch Product', dueDate: '2023-10-30', status: 'on track', completionPercentage: 75 },
  { id: '2', name: 'Market Research', dueDate: '2023-11-15', status: 'at risk', completionPercentage: 50 },
  { id: '3', name: 'User Testing', dueDate: '2023-12-01', status: 'delayed', completionPercentage: 30 },
  { id: '4', name: 'Final Release', dueDate: '2023-12-15', status: 'on track', completionPercentage: 90 },
];

const initialTasks = [
  {
    id: '1',
    description: "Complete the report",
    assignedTo: "John Doe",
    status: "in progress",
    dueDate: "2023-10-10",
    comments: [{ user: "Jane Doe", text: "Great start!" }],
    completionPercentage: 50
  },
  {
    id: '2',
    description: "Prepare presentation",
    assignedTo: "Alice Smith",
    status: "not started",
    dueDate: "2023-10-12",
    comments: [],
    completionPercentage: 0
  },
  {
    id: '3',
    description: "Conduct team meeting",
    assignedTo: "Bob Johnson",
    status: "completed",
    dueDate: "2023-10-08",
    comments: [{ user: "Alice Smith", text: "Meeting was productive!" }],
    completionPercentage: 100
  }
];

const { Title, Text } = Typography;

const ProjectOverviewContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [latestUpdate, setLatestUpdate] = useState(new Date().toLocaleString());
  const [selectedTask, setSelectedTask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState('list');
  const [filteredMilestones, setFilteredMilestones] = useState(milestonesData);

  const handleStatusClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const pieChartOptions = {
    title: {
      text: 'Resource Allocation',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Resources',
        type: 'pie',
        radius: '50%',
        data: Object.entries(projectData.resourceAllocation).map(([key, value]) => ({ name: key, value })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const lineChartOptions = {
    title: {
      text: 'Project Progress Over Time',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: projectData.progressData,
      type: 'line',
      smooth: true
    }]
  };

  const handleViewChange = () => {
    setView(view === 'list' ? 'calendar' : 'list');
  };

  const getMilestoneColor = (status) => {
    switch (status) {
      case 'on track':
        return 'green';
      case 'at risk':
        return 'orange';
      case 'delayed':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getGanttChartOption = () => {
    return {
      title: { text: 'Gantt Chart' },
      tooltip: {},
      xAxis: {
        data: milestonesData.map(m => m.name),
        name: 'Milestones',
      },
      yAxis: {
        type: 'value',
        name: 'Days',
      },
      series: [
        {
          name: 'Completion',
          type: 'bar',
          data: milestonesData.map(m => m.completionPercentage),
        },
      ],
    };
  };

  const notify = (message) => {
    toast(message);
  };

  const handleTaskUpdate = (task) => {
    notify(`Task "${task.description}" is now updated!`);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  const handleCommentSubmit = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: [...task.comments, { user: "Current User", text: newComment }]
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setNewComment("");
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  useEffect(() => {
    setLatestUpdate(new Date().toLocaleString());
  }, [latestUpdate]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card bordered={false}>
            <Row align="middle" justify="space-between">
              <Col>
                <Title level={2}>{projectData.name}</Title>
                <Text type="secondary">{projectData.description}</Text>
              </Col>
              <Col>
                <Tooltip title="Click for detailed report">
                  <Button onClick={handleStatusClick} type={projectData.status === "In Progress" ? "primary" : "default"}>
                    {projectData.status}
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Project Statistics" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Tasks Completed" value={tasks.filter(t => t.status === 'completed').length} suffix={`/ ${tasks.length}`} />
              </Col>
              <Col span={12}>
                <Statistic title="Overall Progress" value={Math.round(tasks.reduce((acc, task) => acc + task.completionPercentage, 0) / tasks.length)} suffix="%" />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Notifications" bordered={false}>
            <List
              dataSource={projectData.notifications}
              renderItem={notification => (
                <List.Item>
                  <Text>{notification}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Resource Allocation" bordered={false}>
            <ReactECharts option={pieChartOptions} style={{ height: '300px' }} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Project Progress" bordered={false}>
            <ReactECharts option={lineChartOptions} style={{ height: '300px' }} />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Milestones" extra={<Button onClick={handleViewChange}>Switch to {view === 'list' ? 'Calendar' : 'List'} View</Button>} bordered={false}>
            {view === 'list' ? (
              <Timeline mode="alternate">
                {filteredMilestones.map(milestone => (
                  <Timeline.Item key={milestone.id} color={getMilestoneColor(milestone.status)}>
                    <Card size="small" title={milestone.name} extra={<Tag color={getMilestoneColor(milestone.status)}>{milestone.status}</Tag>}>
                      <p><CalendarOutlined /> Due Date: {milestone.dueDate}</p>
                      <Progress percent={milestone.completionPercentage} status={milestone.status === 'delayed' ? 'exception' : 'active'} />
                    </Card>
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <ReactECharts option={getGanttChartOption()} style={{ height: '400px', width: '100%' }} />
            )}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Tasks" extra={<Button onClick={() => notify('Tasks updated')}>Refresh Tasks</Button>} bordered={false}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <List
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    itemLayout="horizontal"
                    dataSource={tasks}
                    renderItem={(task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <List.Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                          >
                            <List.Item.Meta
                              avatar={<Avatar icon={<UserOutlined />} />}
                              title={<a href="#">{task.description}</a>}
                              description={
                                <>
                                  <Tag color={task.status === 'completed' ? 'green' : task.status === 'in progress' ? 'blue' : 'default'}>{task.status}</Tag>
                                  <Tag icon={<CalendarOutlined />}>{task.dueDate}</Tag>
                                  <Tag icon={<UserOutlined />}>{task.assignedTo}</Tag>
                                </>
                              }
                            />
                            <Progress percent={task.completionPercentage} size="small" />
                          </List.Item>
                        )}
                      </Draggable>
                    )}
                  />
                )}
              </Droppable>
            </DragDropContext>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Project Timeline"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Timeline>
          {projectData.milestones.map((milestone, index) => (
            <Timeline.Item key={index} color={index === projectData.milestones.length - 1 ? 'green' : 'blue'}>
              <p><strong>{milestone.title}</strong> - {milestone.date}</p>
              <p>{milestone.description}</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Modal>

      {selectedTask && (
        <Modal
          title="Task Details"
          visible={!!selectedTask}
          onCancel={() => setSelectedTask(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedTask(null)}>
              Close
            </Button>,
            <Button key="update" type="primary" onClick={() => handleTaskUpdate(selectedTask)}>
              Update Task
            </Button>,
          ]}
        >
          <p><strong>Description:</strong> {selectedTask.description}</p>
          <p><strong>Assigned to:</strong> {selectedTask.assignedTo}</p>
          <p><strong>Status:</strong> <Tag color={selectedTask.status === 'completed' ? 'green' : selectedTask.status === 'in progress' ? 'blue' : 'default'}>{selectedTask.status}</Tag></p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
          <Progress percent={selectedTask.completionPercentage} />
          <Title level={4} style={{ marginTop: 16 }}>Comments</Title>
          <List
            itemLayout="horizontal"
            dataSource={selectedTask.comments}
            renderItem={comment => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={comment.user}
                  description={comment.text}
                />
              </List.Item>
            )}
          />
          <Input.TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            style={{ marginTop: 16 }}
          />
          <Button onClick={() => handleCommentSubmit(selectedTask.id)} type="primary" style={{ marginTop: 8 }}>
            Add Comment
          </Button>
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProjectOverviewContainer;