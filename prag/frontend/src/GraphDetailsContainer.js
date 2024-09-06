import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const GraphDetailsContainer = () => {
    const { graphId } = useParams();
    const [graphData, setGraphData] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            const data = generateDummyData(graphId);
            setGraphData(data);
            setLoading(false);
        };

        fetchData();
    }, [graphId]);

    const handleBackButtonClick = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!graphData) {
        return <div>Error: Graph data not found.</div>;
    }

    return (
        <div>
            <button onClick={handleBackButtonClick}>Back</button>
            <DetailedGraph data={graphData.dataPoints} graphType="line" />
            <MetricsSummary data={graphData.dataPoints} />
        </div>
    );
};

const generateDummyData = (id) => {
    return {
        id: id,
        dataPoints: [
            { name: 'Point A', value: Math.random() * 100 },
            { name: 'Point B', value: Math.random() * 100 },
            { name: 'Point C', value: Math.random() * 100 },
            { name: 'Point D', value: Math.random() * 100 },
            { name: 'Point E', value: Math.random() * 100 },
        ]
    };
};

const DetailedGraph = ({ data, graphType }) => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [hoveredDataPoint, setHoveredDataPoint] = useState(null);

    const handleZoomIn = () => setZoomLevel(zoomLevel + 0.1);
    const handleZoomOut = () => setZoomLevel(zoomLevel - 0.1 < 1 ? 1 : zoomLevel - 0.1);

    const handleMouseEnter = (data) => {
        setHoveredDataPoint(data);
    };

    const handleMouseLeave = () => {
        setHoveredDataPoint(null);
    };

    const renderGraph = () => {
        switch (graphType) {
            case 'bar':
                return (
                    <BarChart data={data} width={1920} height={1080}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<DataPointTooltip data={hoveredDataPoint} />} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                );
            case 'pie':
                return (
                    <PieChart width={1920} height={1080}>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`#${(Math.random() * 0xFFFFFF << 0).toString(16)}`} />
                            ))}
                        </Pie>
                        <Tooltip content={<DataPointTooltip data={hoveredDataPoint} />} />
                        <Legend />
                    </PieChart>
                );
            case 'line':
            default:
                return (
                    <LineChart data={data} width={1920} height={1080}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<DataPointTooltip data={hoveredDataPoint} />} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </LineChart>
                );
        }
    };

    return (
        <div>
            <div>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
            </div>
            {data.length === 0 ? (
                <p>No data available to display.</p>
            ) : (
                renderGraph()
            )}
        </div>
    );
};

const DataPointTooltip = ({ data }) => {
    if (!data) return null;
    return (
        <div>
            <p>{data.name}: {data.value}</p>
        </div>
    );
};

const MetricsSummary = ({ data }) => {
    const [metrics, setMetrics] = useState({ total: 0, average: 0, min: null, max: null });

    const calculateMetrics = (data) => {
        if (data.length === 0) return { total: 0, average: 0, min: null, max: null };
        
        const total = data.reduce((acc, curr) => acc + curr.value, 0);
        const average = total / data.length;
        const min = Math.min(...data.map(d => d.value));
        const max = Math.max(...data.map(d => d.value));
        return { total, average, min, max };
    };

    useEffect(() => {
        const metrics = calculateMetrics(data);
        setMetrics(metrics);
    }, [data]);

    return (
        <div className="metrics-summary">
            <h3>Metrics Summary</h3>
            {metrics.total === 0 ? (
                <p>No data available</p>
            ) : (
                <>
                    <p>Total: {metrics.total}</p>
                    <p>Average: {metrics.average}</p>
                    <p>Min: {metrics.min}</p>
                    <p>Max: {metrics.max}</p>
                </>
            )}
        </div>
    );
};

export default GraphDetailsContainer;