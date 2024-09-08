import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Input, Select, Button, Modal, Badge, Tooltip, Progress } from 'antd';
import "antd/dist/reset.css";

const { Option } = Select;

const TeamProfilesContainer = () => {
    const [profiles, setProfiles] = useState([]);
    const [endorsements, setEndorsements] = useState({});
    const [showModal, setShowModal] = useState({ isOpen: false, profileId: null });
    const [notifications, setNotifications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedWorkload, setSelectedWorkload] = useState(null);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [nominations, setNominations] = useState({});

    const dummyProfiles = [
        {
            id: '1',
            name: 'John Doe',
            role: 'Software Engineer',
            skills: ['JavaScript', 'React', 'Node.js'],
            workload: 75,
            performanceMetrics: {
                tasksCompleted: 20,
                averageCompletionTime: 5,
            },
            badges: ['Best Performer', 'Team Player'],
        },
        {
            id: '2',
            name: 'Jane Smith',
            role: 'Project Manager',
            skills: ['Leadership', 'Communication'],
            workload: 50,
            performanceMetrics: {
                tasksCompleted: 15,
                averageCompletionTime: 7,
            },
            badges: ['Top Manager'],
        },
    ];

    useEffect(() => {
        setProfiles(dummyProfiles);
        setFilteredProfiles(dummyProfiles);
    }, []);

    useEffect(() => {
        const filterProfiles = () => {
            return profiles.filter(member => {
                const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesRole = selectedRole ? member.role === selectedRole : true;
                const matchesSkill = selectedSkill ? member.skills.includes(selectedSkill) : true;
                const matchesWorkload = selectedWorkload ? member.workload === selectedWorkload : true;
                return matchesSearch && matchesRole && matchesSkill && matchesWorkload;
            });
        };
        setFilteredProfiles(filterProfiles());
    }, [searchTerm, selectedRole, selectedSkill, selectedWorkload, profiles]);

    const handleEndorse = (profileId, skill) => {
        setEndorsements(prev => {
            const updated = { ...prev };
            if (!updated[profileId]) updated[profileId] = [];
            if (!updated[profileId].includes(skill)) {
                updated[profileId].push(skill);
                setNotifications(prev => [...prev, `Endorsed ${skill} for ${profiles.find(p => p.id === profileId).name}`]);
            }
            return updated;
        });
    };

    const handleDelete = (profileId) => {
        if (window.confirm('Are you sure you want to delete this profile?')) {
            const profileName = profiles.find(p => p.id === profileId).name;
            setProfiles(prev => prev.filter(profile => profile.id !== profileId));
            setFilteredProfiles(prev => prev.filter(profile => profile.id !== profileId));
            setNotifications(prev => [...prev, `Deleted profile of ${profileName}`]);
        }
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleRoleChange = (value) => setSelectedRole(value);
    const handleSkillChange = (value) => setSelectedSkill(value);
    const handleWorkloadChange = (value) => setSelectedWorkload(value);

    const roleOptions = [...new Set(profiles.map(member => member.role))];
    const skillOptions = [...new Set(profiles.flatMap(member => member.skills))];
    const workloadOptions = [...new Set(profiles.map(member => member.workload))];

    const getOption = (profile) => ({
        title: {
            text: `Performance Metrics for ${profile.name}`,
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['Tasks Completed', 'Avg Completion Time'],
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            name: 'Metrics',
            type: 'bar',
            data: [profile.performanceMetrics.tasksCompleted, profile.performanceMetrics.averageCompletionTime],
        }],
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '40px', boxSizing: 'border-box', backgroundColor: '#f0f2f5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <Input
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '300px' }}
                />
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Select placeholder="Select Role" style={{ width: '200px' }} onChange={handleRoleChange} allowClear>
                        {roleOptions.map(role => <Option key={role} value={role}>{role}</Option>)}
                    </Select>
                    <Select placeholder="Select Skill" style={{ width: '200px' }} onChange={handleSkillChange} allowClear>
                        {skillOptions.map(skill => <Option key={skill} value={skill}>{skill}</Option>)}
                    </Select>
                    <Select placeholder="Select Workload" style={{ width: '200px' }} onChange={handleWorkloadChange} allowClear>
                        {workloadOptions.map(workload => <Option key={workload} value={workload}>{workload}</Option>)}
                    </Select>
                </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredProfiles.map(profile => (
                    <div key={profile.id} style={{ border: '1px solid #d9d9d9', marginBottom: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h2>{profile.name}</h2>
                        <p><strong>Role:</strong> {profile.role}</p>
                        <div>
                            {profile.skills.map((skill, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <Tooltip title={`Endorse ${skill}`}>
                                        <Button type="primary" shape="round" onClick={() => handleEndorse(profile.id, skill)}>{skill}</Button>
                                    </Tooltip>
                                    <Badge count={endorsements[profile.id] ? endorsements[profile.id].filter(e => e === skill).length : 0} style={{ backgroundColor: '#52c41a', marginLeft: '10px' }} />
                                </div>
                            ))}
                        </div>
                        <Progress percent={profile.workload} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
                        <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                            <Button type="primary" onClick={() => setShowModal({ isOpen: true, profileId: profile.id })}>View Performance</Button>
                            <Button type="danger" onClick={() => handleDelete(profile.id)}>Delete</Button>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            {profile.badges.map((badge, index) => (
                                <Tooltip title={`Details about ${badge}`} key={index}>
                                    <Badge color="#108ee9" text={badge} style={{ marginRight: '10px', cursor: 'pointer' }} />
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                title="Performance Metrics"
                visible={showModal.isOpen}
                onCancel={() => setShowModal({ isOpen: false, profileId: null })}
                footer={null}
            >
                {showModal.isOpen && (
                    <ReactECharts option={getOption(profiles.find(p => p.id === showModal.profileId))} style={{ height: '400px' }} />
                )}
            </Modal>
            <div style={{
                position: 'fixed', bottom: '20px', right: '20px', width: '300px', maxHeight: '300px', overflow: 'auto',
                background: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}>
                {notifications.map((notification, index) => (
                    <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>{notification}</div>
                ))}
            </div>
        </div>
    );
};

export default TeamProfilesContainer;