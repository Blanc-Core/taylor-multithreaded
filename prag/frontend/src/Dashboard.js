import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Header Component
const Header = () => {
    const navigationLinks = [
        { name: 'Home', route: '/' },
        { name: 'Reports', route: '/reports' },
        { name: 'Purchase Orders', route: '/purchase-orders' }
    ];

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header style={{ position: 'sticky', top: 0, backgroundColor: '#fff', padding: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h1>Purchase Order Dashboard</h1>
            <nav aria-label="Main Navigation">
                {navigationLinks.map(link => (
                    <Link 
                        key={link.route} 
                        to={link.route} 
                        style={{ margin: '0 15px', textDecoration: 'none', color: '#007bff' }} 
                        aria-current={currentPath === link.route ? 'page' : undefined}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

// SummaryStats Component
const SummaryStats = () => {
    const [data, setData] = useState([
        { id: 1, value: 100 },
        { id: 2, value: 200 },
        { id: 3, value: 150 },
    ]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalExpenditure, setTotalExpenditure] = useState(0);
    const [averageOrderValue, setAverageOrderValue] = useState(0);

    useEffect(() => {
        const total = data.length;
        const expenditure = data.reduce((acc, order) => acc + order.value, 0);
        const average = total > 0 ? expenditure / total : 0;

        setTotalOrders(total);
        setTotalExpenditure(expenditure);
        setAverageOrderValue(average);
    }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: '100vh' }}>
            {data.length > 0 ? (
                <>
                    <Card title="Total Orders" value={totalOrders} />
                    <Card title="Total Expenditure" value={`$${totalExpenditure}`} />
                    <Card title="Average Order Value" value={`$${averageOrderValue.toFixed(2)}`} />
                </>
            ) : (
                <p>No purchase orders available.</p>
            )}
        </div>
    );
};

const Card = ({ title, value }) => (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '200px', textAlign: 'center' }}>
        <h3>{title}</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
);

// TrendsChart Component
const TrendsChart = () => {
    const fakeData = [
        { date: '2023-01-01', orders: 10 },
        { date: '2023-01-02', orders: 15 },
        { date: '2023-01-03', orders: 8 },
        { date: '2023-01-04', orders: 12 },
        { date: '2023-01-05', orders: 18 },
        { date: '2023-01-06', orders: 25 },
        { date: '2023-01-07', orders: 30 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fakeData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                        return (
                            <div className="custom-tooltip">
                                <p>{`Date: ${label}`}</p>
                                <p>{`Orders: ${payload[0].value}`}</p>
                            </div>
                        );
                    }
                    return null;
                }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

// OrderFilter Component
const OrderFilter = ({ updateDashboardData }) => {
    const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
    const [selectedSupplier, setSelectedSupplier] = useState('Supplier A');
    const [availableSuppliers, setAvailableSuppliers] = useState([]);
    const [availableDateRanges, setAvailableDateRanges] = useState([]);

    useEffect(() => {
        const suppliers = ['Supplier A', 'Supplier B', 'Supplier C'];
        const dateRanges = ['Last 7 Days', 'Last 30 Days', 'This Year'];

        setAvailableSuppliers(suppliers);
        setAvailableDateRanges(dateRanges);
    }, []);

    const handleDateRangeChange = (selectedOption) => {
        setSelectedDateRange(selectedOption.value);
        updateDashboardData(selectedOption.value, selectedSupplier);
    };

    const handleSupplierChange = (selectedOption) => {
        setSelectedSupplier(selectedOption.value);
        updateDashboardData(selectedDateRange, selectedOption.value);
    };

    return (
        <div style={{ width: '100%', maxWidth: '1920px', margin: '0 auto', padding: '20px' }}>
            <Select
                options={availableSuppliers.map(supplier => ({ value: supplier, label: supplier }))}
                onChange={handleSupplierChange}
                placeholder="Select Supplier"
            />
            <Select
                options={availableDateRanges.map(range => ({ value: range, label: range }))}
                onChange={handleDateRangeChange}
                placeholder="Select Date Range"
            />
        </div>
    );
};

// Dashboard Component
const Dashboard = () => {
    const updateDashboardData = (dateRange, supplier) => {
        console.log("Updated data based on:", dateRange, supplier);
    };

    return (
        <div>
            <Header />
            <OrderFilter updateDashboardData={updateDashboardData} />
            <SummaryStats />
            <TrendsChart />
        </div>
    );
};

export default Dashboard;