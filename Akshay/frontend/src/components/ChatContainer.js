import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Layout, Menu, Avatar, Button, Badge, Input, List, Modal, Tooltip, Typography } from 'antd';
import { BellOutlined, UserOutlined, LikeOutlined, DislikeOutlined, SendOutlined, PushpinOutlined, SearchOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

const ChatContainer = () => {
  const dummyUser = {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/50',
  };

  const dummyProjectName = 'Project Alpha';

  const dummyNotifications = [
    { id: 1, message: 'New message from Alice', read: false },
    { id: 2, message: 'Project update available', read: false },
  ];

  const dummyFeedbackStats = {
    thumbsUp: 10,
    thumbsDown: 2,
  };

  const dummyMessages = [
    { id: 1, sender: 'Alice', content: 'Hello team!', timestamp: '2023-10-01T12:00:00Z', reactions: { thumbsUp: 2, heart: 1 }, thread: [] },
    { id: 2, sender: 'Bob', content: 'Hi Alice! How are you?', timestamp: '2023-10-01T12:05:00Z', reactions: { thumbsUp: 3, heart: 0 }, thread: [] },
  ];

  const dummyUsers = [
    { userId: 1, name: 'Alice' },
    { userId: 2, name: 'Bob' },
    { userId: 3, name: 'Charlie' },
  ];

  const activeProjects = [
    { id: 1, name: "Project Alpha", unreadMessages: 2 },
    { id: 2, name: "Project Beta", unreadMessages: 0 },
    { id: 3, name: "Project Gamma", unreadMessages: 1 },
    { id: 4, name: "Project Delta", unreadMessages: 3 }
  ];

  const [notifications, setNotifications] = useState(dummyNotifications);
  const [feedbackStats, setFeedbackStats] = useState(dummyFeedbackStats);
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedThread, setSelectedThread] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [pinnedProjects, setPinnedProjects] = useState([]);

  const handleFeedback = (type) => {
    if (type === 'up') {
      setFeedbackStats((prev) => ({ ...prev, thumbsUp: prev.thumbsUp + 1 }));
    } else {
      setFeedbackStats((prev) => ({ ...prev, thumbsDown: prev.thumbsDown + 1 }));
    }
    setShowModal(true);
  };

  const submitFeedback = () => {
    console.log('Feedback submitted:', feedbackComment);
    setFeedbackComment('');
    setShowModal(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const handleMessageSend = () => {
    const message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      reactions: { thumbsUp: 0, heart: 0 },
      thread: [],
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleReact = (messageId, reactionType) => {
    const updatedMessages = messages.map(message => {
      if (message.id === messageId) {
        const updatedReactions = { ...message.reactions, [reactionType]: (message.reactions[reactionType] || 0) + 1 };
        return { ...message, reactions: updatedReactions };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const handleThreadReply = (messageId) => {
    const threadContent = prompt('Reply to this thread:');
    if (threadContent) {
      const updatedMessages = messages.map(message => {
        if (message.id === messageId) {
          const newThread = { userId: 1, content: threadContent, timestamp: new Date().toISOString() };
          return { ...message, thread: [...message.thread, newThread] };
        }
        return message;
      });
      setMessages(updatedMessages);
    }
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
    logInteraction();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleFavorite = (projectId) => {
    setPinnedProjects((prev) => 
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]
    );
  };

  const logInteraction = () => {
    console.log(`User interacted with project ID: ${selectedProject}`);
  };

  const filteredProjects = activeProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProjects = pinnedProjects.map(id => activeProjects.find(project => project.id === id))
    .concat(filteredProjects.filter(project => !pinnedProjects.includes(project.id)));

  const chartOption = {
    title: { text: 'Task Completion Rate' },
    tooltip: {},
    xAxis: {
      data: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
    },
    yAxis: {},
    series: [
      {
        name: 'Completion Rate',
        type: 'bar',
        data: [5, 20, 36, 10, 10],
      },
    ],
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout>
        <Sider width={300} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '18px' }}>{dummyProjectName}</Text>
              <div>
                <Badge count={notifications.filter(n => !n.read).length}>
                  <Button type="text" icon={<BellOutlined />} onClick={toggleNotifications} />
                </Badge>
                <Avatar src={dummyUser.avatar} size="small" style={{ marginLeft: '8px', cursor: 'pointer' }} />
              </div>
            </div>
            <Input
              placeholder="Search Projects"
              value={searchQuery}
              onChange={handleSearchChange}
              prefix={<SearchOutlined />}
            />
          </div>
          <Menu
            mode="inline"
            style={{ height: 'calc(100% - 110px)', overflowY: 'auto' }}
          >
            {sortedProjects.map(project => (
              <Menu.Item key={project.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip title={project.name}>
                  <span onClick={() => handleProjectSelect(project.id)} style={{ flex: 1, cursor: 'pointer' }}>{project.name}</span>
                </Tooltip>
                {project.unreadMessages > 0 && <Badge count={project.unreadMessages} />}
                <Button type="link" onClick={(e) => { e.stopPropagation(); toggleFavorite(project.id); }}>
                  <PushpinOutlined rotate={pinnedProjects.includes(project.id) ? 0 : 45} />
                </Button>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
              <List
                dataSource={messages}
                renderItem={message => (
                  <List.Item key={message.id} style={{ borderBottom: 'none' }}>
                    <List.Item.Meta
                      avatar={<Avatar>{message.sender[0]}</Avatar>}
                      title={<span><strong>{message.sender}</strong> <span style={{ fontSize: '12px', color: '#888' }}>{new Date(message.timestamp).toLocaleString()}</span></span>}
                      description={
                        <div>
                          <p style={{ marginBottom: '8px' }}>{message.content}</p>
                          <div>
                            <Button type="text" size="small" onClick={() => handleReact(message.id, 'thumbsUp')}>👍 {message.reactions.thumbsUp || 0}</Button>
                            <Button type="text" size="small" onClick={() => handleReact(message.id, 'heart')}>❤️ {message.reactions.heart || 0}</Button>
                            <Button type="text" size="small" onClick={() => handleThreadReply(message.id)}>Reply</Button>
                          </div>
                          {message.thread.length > 0 && (
                            <List
                              dataSource={message.thread}
                              renderItem={reply => (
                                <List.Item style={{ borderBottom: 'none', paddingLeft: '24px' }}>
                                  <List.Item.Meta
                                    avatar={<Avatar size="small">{dummyUsers.find(user => user.userId === reply.userId).name[0]}</Avatar>}
                                    title={<span><strong>{dummyUsers.find(user => user.userId === reply.userId).name}</strong> <span style={{ fontSize: '12px', color: '#888' }}>{new Date(reply.timestamp).toLocaleString()}</span></span>}
                                    description={reply.content}
                                  />
                                </List.Item>
                              )}
                            />
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
              <Input.TextArea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                autoSize={{ minRows: 1, maxRows: 4 }}
                style={{ marginBottom: '8px' }}
              />
              <Button type="primary" icon={<SendOutlined />} onClick={handleMessageSend}>Send</Button>
            </div>
          </Content>
        </Layout>
      </Layout>
      {showNotifications && (
        <div style={{ position: 'absolute', right: '20px', top: '70px', width: '300px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.3)', zIndex: 1 }}>
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.message} description={item.read ? 'Read' : 'Unread'} />
              </List.Item>
            )}
          />
        </div>
      )}
      <Modal
        title="Submit Feedback"
        visible={showModal}
        onOk={submitFeedback}
        onCancel={() => setShowModal(false)}
      >
        <TextArea rows={4} value={feedbackComment} onChange={(e) => setFeedbackComment(e.target.value)} placeholder="Additional comments" />
      </Modal>
    </Layout>
  );
};

export default ChatContainer;