import React, { useState, useEffect, createContext, useContext } from 'react';
import { Badge, Tooltip, Modal, Switch, Calendar, Tag, Rate, Input, Button, Layout, Row, Col, Card, Checkbox, Select, Avatar, Statistic, Timeline, Progress, message, Drawer } from 'antd';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, BellOutlined, SettingOutlined, StarOutlined, TeamOutlined, RiseOutlined, CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import 'antd/dist/reset.css';
import moment from 'moment';

const GlobalContext = createContext();

const MentorDashboard = () => {
  const [availability, setAvailability] = useState([
    { status: 'available', time: '09:00 - 10:00' },
    { status: 'busy', time: '10:00 - 11:00' },
    { status: 'booked', time: '11:00 - 12:00' },
  ]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [availabilityData, setAvailabilityData] = useState([0, 0, 0, 0, 0]);
  const [expertiseAreas] = useState([
    'Marketing',
    'Product Management',
    'Data Analysis',
    'Software Development',
    'UI/UX Design',
    'Business Strategy',
  ]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [expertiseFilter, setExpertiseFilter] = useState('');
  const [availabilityFilters, setAvailabilityFilters] = useState({
    availableNow: false,
    busy: false,
    booked: false,
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [totalSessions, setTotalSessions] = useState(93);
  const [completedSessions, setCompletedSessions] = useState(78);
  const [upcomingSessions, setUpcomingSessions] = useState(15);
  const [mentorRating, setMentorRating] = useState(4.7);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsModalVisible, setEventDetailsModalVisible] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, type: 'success', content: 'Session: John', date: moment().add(Math.floor(Math.random() * 14), 'days'), time: '10:00 AM - 11:00 AM', description: 'One-on-one mentoring session focusing on React basics with John Doe.', mentor: 'John Doe', topic: 'React Basics' },
    { id: 2, type: 'warning', content: 'Workshop', date: moment().add(Math.floor(Math.random() * 14), 'days'), time: '2:00 PM - 4:00 PM', description: 'Group workshop covering React fundamentals and best practices. Open to all skill levels.', attendees: 15, topic: 'React Fundamentals' },
    { id: 3, type: 'error', content: 'Unavailable', date: moment().add(Math.floor(Math.random() * 14), 'days'), time: 'All Day', description: 'Not available for mentoring sessions on this day. Personal time off.' },
    { id: 4, type: 'default', content: 'Open Slots', date: moment().add(Math.floor(Math.random() * 14), 'days'), time: '9:00 AM - 5:00 PM', description: 'Multiple slots available for booking mentoring sessions. First come, first served.' },
    { id: 5, type: 'success', content: 'Session: Emma', date: moment().add(Math.floor(Math.random() * 14), 'days'), time: '3:00 PM - 4:00 PM', description: 'Career guidance session with Emma Watson. Focusing on transitioning to a tech role.', mentor: 'You', topic: 'Career Guidance' },
  ]);

  const mentors = [
    { id: 1, name: 'John Doe', expertise: 'Software Development', status: 'Available Now', rating: 4.8, sessions: 120 },
    { id: 2, name: 'Jane Smith', expertise: 'Marketing', status: 'Busy', rating: 4.9, sessions: 98 },
    { id: 3, name: 'Alice Johnson', expertise: 'Data Analysis', status: 'Booked', rating: 4.7, sessions: 85 },
    { id: 4, name: 'Bob Brown', expertise: 'UI/UX Design', status: 'Available Now', rating: 4.6, sessions: 72 },
    { id: 5, name: 'Emma Wilson', expertise: 'Product Management', status: 'Available Now', rating: 4.9, sessions: 110 },
    { id: 6, name: 'Michael Chen', expertise: 'Business Strategy', status: 'Busy', rating: 4.8, sessions: 95 },
    { id: 7, name: 'Sarah Lee', expertise: 'Software Development', status: 'Booked', rating: 4.7, sessions: 88 },
    { id: 8, name: 'David Garcia', expertise: 'Marketing', status: 'Available Now', rating: 4.5, sessions: 65 },
  ];

  useEffect(() => {
    const filtered = mentors.filter((mentor) => {
      const searchMatch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase());
      const expertiseMatch = selectedExpertise.length === 0 || selectedExpertise.includes(mentor.expertise);
      const availabilityMatch = (availabilityFilters.availableNow && mentor.status === 'Available Now') ||
        (availabilityFilters.busy && mentor.status === 'Busy') ||
        (availabilityFilters.booked && mentor.status === 'Booked') ||
        (!availabilityFilters.availableNow && !availabilityFilters.busy && !availabilityFilters.booked);
      return searchMatch && expertiseMatch && availabilityMatch;
    });
    setFilteredMentors(filtered);
  }, [searchQuery, selectedExpertise, availabilityFilters]);

  const randomizeAvailability = () => {
    const randomStatus = ['available', 'busy', 'booked'];
    const newAvailability = availability.map(slot => ({
      ...slot,
      status: randomStatus[Math.floor(Math.random() * randomStatus.length)],
    }));
    setAvailability(newAvailability);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'busy':
        return 'error';
      case 'booked':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleBookingClick = () => {
    setPoints(points + 1);
    message.success(`Session booked! You've earned a point. Total: ${points + 1}`);
  };

  const handleMentorClick = (mentor) => {
    setSelectedMentor(mentor);
    setDrawerVisible(true);
  };

  const StyledLayout = styled(Layout)`
    min-height: 100vh;
    background: #f0f2f5;
  `;

  const StyledContent = styled(Layout.Content)`
    padding: 24px;
    margin: 0;
    min-height: 280px;
  `;

  const StyledCard = styled(Card)`
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    border-radius: 8px;
    margin-bottom: 24px;
  `;

  const StyledStatisticCard = styled(StyledCard)`
    text-align: center;
    .ant-statistic-title {
      font-size: 16px;
      margin-bottom: 8px;
    }
    .ant-statistic-content {
      font-size: 24px;
      font-weight: bold;
    }
  `;

  const StyledTag = styled(Tag)`
    margin: 5px;
    padding: 5px 10px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  `;

  const MentorCard = ({ mentor }) => (
    <StyledCard hoverable onClick={() => handleMentorClick(mentor)}>
      <Card.Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        title={mentor.name}
        description={
          <>
            <Tag color="blue">{mentor.expertise}</Tag>
            <Badge status={getStatusColor(mentor.status)} text={mentor.status} />
            <Rate disabled defaultValue={mentor.rating} style={{ fontSize: 16 }} />
            <p>Sessions: {mentor.sessions}</p>
          </>
        }
      />
    </StyledCard>
  );

  const AvailabilityTimeline = () => (
    <Timeline mode="left">
      {availability.map((slot, index) => (
        <Timeline.Item
          key={index}
          color={getStatusColor(slot.status)}
          label={slot.time}
        >
          {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
        </Timeline.Item>
      ))}
    </Timeline>
  );

  const chartOptions = {
    title: { 
      text: 'Weekly Session Overview',
      textStyle: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'normal'
      }
    },
    tooltip: { 
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: { 
      data: ['Completed', 'Upcoming'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: { 
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    },
    yAxis: { 
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      { 
        name: 'Completed', 
        type: 'bar', 
        data: [5, 7, 3, 8, 6, 2, 4],
        itemStyle: {
          color: '#91cc75'
        }
      },
      { 
        name: 'Upcoming', 
        type: 'bar', 
        data: [2, 1, 4, 3, 3, 5, 2],
        itemStyle: {
          color: '#5470c6'
        }
      }
    ]
  };

  const handleExpertiseChange = (value) => {
    setExpertiseFilter(value);
  };

  const handleAvailabilityChange = (e) => {
    const { name, checked } = e.target;
    setAvailabilityFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const useGlobalState = () => {
    const [feedback, setFeedback] = useState({ ratings: [] });
    const [notifications, setNotifications] = useState([]);
    const [preferences, setPreferences] = useState({ dashboardWidgets: [] });

    const submitFeedback = (rating) => {
      setFeedback((prev) => ({ ratings: [...prev.ratings, rating] }));
    };

    const addNotification = (message) => {
      setNotifications((prev) => [...prev, message]);
    };

    const toggleWidget = (widget) => {
      setPreferences((prev) => ({
        dashboardWidgets: prev.dashboardWidgets.includes(widget)
          ? prev.dashboardWidgets.filter(w => w !== widget)
          : [...prev.dashboardWidgets, widget]
      }));
    };

    return { feedback, submitFeedback, notifications, addNotification, preferences, toggleWidget };
  };

  const FeedbackButtons = ({ onFeedback }) => {
    return (
      <div>
        <Button onClick={() => onFeedback('thumbs up')} type="primary" shape="round">Thumbs Up</Button>
        <Button onClick={() => onFeedback('thumbs down')} type="danger" shape="round" style={{ marginLeft: '10px' }}>Thumbs Down</Button>
      </div>
    );
  };

  const Dashboard = () => {
    const chartOption = {
      title: { text: 'Mentor Statistics' },
      tooltip: {},
      xAxis: { data: ['Mentors', 'Sessions'] },
      yAxis: {},
      series: [{
        name: 'Count',
        type: 'bar',
        data: [2, 15],
      }]
    };

    return (
      <div style={{ marginTop: '20px' }}>
        <h2>Dashboard</h2>
        <ReactECharts option={chartOption} style={{ height: '400px' }} />
      </div>
    );
  };

  const MentorOverview = () => {
    const { submitFeedback } = useContext(GlobalContext);
    const dummyMentors = [
      { id: 1, name: 'John Doe', sessions: 10 },
      { id: 2, name: 'Jane Smith', sessions: 5 },
    ];

    const handleFeedback = (rating) => {
      submitFeedback(rating);
    };

    return (
      <div style={{ padding: '20px' }}>
        <h1>Mentor Overview</h1>
        <FeedbackButtons onFeedback={handleFeedback} />
        <Dashboard />
        {dummyMentors.map(mentor => (
          <div key={mentor.id}>
            <h2>{mentor.name}</h2>
            <p>Sessions: {mentor.sessions}</p>
          </div>
        ))}
      </div>
    );
  };

  const MentorProfile = () => {
    const dummyMentor = { id: 1, name: 'John Doe', details: 'Experienced mentor specializing in React.' };

    return (
      <div style={{ padding: '20px' }}>
        <h1>Mentor Profile</h1>
        <h2>{dummyMentor.name}</h2>
        <p>{dummyMentor.details}</p>
      </div>
    );
  };

  const TopMentorsCard = () => (
    <StyledCard title="Top Rated Mentors">
      {mentors
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
        .map((mentor) => (
          <div key={mentor.id} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={32} icon={<UserOutlined />} style={{ marginRight: 8 }} />
              <span style={{ marginRight: 8 }}>{mentor.name}</span>
            </div>
            <div>
              <Rate disabled defaultValue={mentor.rating} style={{ fontSize: 14 }} />
              <span style={{ marginLeft: 8 }}>{mentor.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
    </StyledCard>
  );

  const getListData = (value) => {
    return events.filter(event => moment(event.date).isSame(value, 'day'));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item) => (
          <li key={item.id} onClick={(e) => {
            e.stopPropagation();
            setSelectedEvent(item);
            setEventDetailsModalVisible(true);
          }} style={{ cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const CalendarModal = () => (
    <Modal
      title="Full Schedule"
      visible={calendarModalVisible}
      onCancel={() => setCalendarModalVisible(false)}
      footer={null}
      width={1000}
    >
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        fullscreen={true}
      />
    </Modal>
  );

  const EventDetailsModal = () => (
    <Modal
      title="Event Details"
      visible={eventDetailsModalVisible}
      onCancel={() => setEventDetailsModalVisible(false)}
      footer={[
        <Button key="close" onClick={() => setEventDetailsModalVisible(false)}>
          Close
        </Button>,
      ]}
    >
      {selectedEvent && (
        <div>
          <h2>{selectedEvent.content}</h2>
          <p><strong>Date:</strong> {moment(selectedEvent.date).format('MMMM D, YYYY')}</p>
          <p><strong>Time:</strong> {selectedEvent.time}</p>
          <p><strong>Type:</strong> <Badge status={selectedEvent.type} text={selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)} /></p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          {selectedEvent.mentor && <p><strong>Mentor:</strong> {selectedEvent.mentor}</p>}
          {selectedEvent.topic && <p><strong>Topic:</strong> {selectedEvent.topic}</p>}
          {selectedEvent.attendees && <p><strong>Attendees:</strong> {selectedEvent.attendees}</p>}
        </div>
      )}
    </Modal>
  );

  const monthCellRender = (value) => {
    const listData = getListData(value);
    return listData.length ? (
      <div className="notes-month">
        <section>{listData.length} events</section>
        <span>
          <Badge status={listData[0].type} text={listData[0].content} />
        </span>
      </div>
    ) : null;
  };

  return (
    <GlobalContext.Provider value={useGlobalState()}>
      <StyledLayout>
        <StyledContent>
          <Row gutter={24}>
            <Col span={6}>
              <StyledStatisticCard>
                <Statistic title="Total Sessions" value={totalSessions} prefix={<ClockCircleOutlined />} />
              </StyledStatisticCard>
            </Col>
            <Col span={6}>
              <StyledStatisticCard>
                <Statistic title="Completed" value={completedSessions} prefix={<CheckCircleOutlined />} />
              </StyledStatisticCard>
            </Col>
            <Col span={6}>
              <StyledStatisticCard>
                <Statistic title="Upcoming" value={upcomingSessions} prefix={<CalendarOutlined />} />
              </StyledStatisticCard>
            </Col>
            <Col span={6}>
              <StyledStatisticCard>
                <Statistic title="Mentor Rating" value={mentorRating} prefix={<StarOutlined />} suffix="/ 5" precision={1} />
              </StyledStatisticCard>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={16}>
              <StyledCard title="Session Overview">
                <ReactECharts option={chartOptions} style={{ height: '300px' }} />
              </StyledCard>
              <TopMentorsCard />
            </Col>
            <Col span={8}>
              <StyledCard title="Today's Availability">
                <AvailabilityTimeline />
              </StyledCard>
              <StyledCard title="Quick Actions">
                <Button type="primary" block style={{ marginBottom: 16 }} onClick={handleBookingClick}>Book a Session</Button>
                <Button block onClick={() => setCalendarModalVisible(true)}>View Full Schedule</Button>
              </StyledCard>
            </Col>
          </Row>
          
          <StyledCard title="Mentor Search" extra={
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <Input
                placeholder="Search mentors"
                prefix={<SearchOutlined />}
                style={{ width: 200, marginRight: 16, marginBottom: 16 }}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <Select
                mode="multiple"
                style={{ width: 300, marginRight: 16, marginBottom: 16 }}
                placeholder="Select expertise"
                onChange={setSelectedExpertise}
                value={selectedExpertise}
              >
                {expertiseAreas.map(area => (
                  <Select.Option key={area} value={area}>{area}</Select.Option>
                ))}
              </Select>
              <Checkbox.Group
                options={[
                  { label: 'Available Now', value: 'availableNow' },
                  { label: 'Busy', value: 'busy' },
                  { label: 'Booked', value: 'booked' },
                ]}
                onChange={(checkedValues) => {
                  setAvailabilityFilters({
                    availableNow: checkedValues.includes('availableNow'),
                    busy: checkedValues.includes('busy'),
                    booked: checkedValues.includes('booked'),
                  });
                }}
                value={Object.entries(availabilityFilters)
                  .filter(([_, value]) => value)
                  .map(([key, _]) => key)}
              />
            </div>
          }>
            <Row gutter={16}>
              {filteredMentors.map((mentor) => (
                <Col key={mentor.id} xs={24} sm={12} md={8} lg={6}>
                  <MentorCard mentor={mentor} />
                </Col>
              ))}
            </Row>
          </StyledCard>
        </StyledContent>
      </StyledLayout>
      
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        {selectedMentor && (
          <>
            <p style={{ marginBottom: 24 }}>
              <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: 16 }} />
              <span style={{ fontSize: 24, fontWeight: 'bold' }}>{selectedMentor.name}</span>
            </p>
            <p><strong>Expertise:</strong> {selectedMentor.expertise}</p>
            <p><strong>Status:</strong> {selectedMentor.status}</p>
            <p><strong>Rating:</strong> <Rate disabled defaultValue={selectedMentor.rating} /></p>
            <Button type="primary" onClick={() => {
              message.success(`Booked a session with ${selectedMentor.name}`);
              setDrawerVisible(false);
            }}>
              Book a Session
            </Button>
          </>
        )}
      </Drawer>
      
      <CalendarModal />
      <EventDetailsModal />
    </GlobalContext.Provider>
  );
};

export default MentorDashboard;




