import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#f8f9fa', width: '1920px', height: '100px' }}>
            <h1 style={{ margin: 0 }}>Purchase Order Management</h1>
            <nav>
                <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
                    <li style={{ marginRight: '20px' }}><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/help">Help</Link></li>
                </ul>
            </nav>
            <div style={{ position: 'relative' }}>
                <button onClick={toggleDropdown}>Profile</button>
                {isDropdownOpen && (
                    <div style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', zIndex: 100 }}>
                        <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
                            <li style={{ marginBottom: '10px' }}><Link to="/edit-profile">Edit Profile</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

const PurchaseOrderForm = ({ setOrders }) => {
    const [supplier, setSupplier] = useState('');
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let validationErrors = {};
        if (!supplier) validationErrors.supplier = "Supplier is required.";
        if (!item) validationErrors.item = "Item is required.";
        if (quantity <= 0) validationErrors.quantity = "Quantity must be greater than zero.";
        if (price < 0) validationErrors.price = "Price cannot be negative.";
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newOrder = { id: Date.now(), supplier, item, quantity, price, date: new Date().toLocaleDateString() };
            setOrders(prevOrders => [...prevOrders, newOrder]);
            resetForm();
        }
    };

    const resetForm = () => {
        setSupplier('');
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
            <span>{errors.supplier}</span>
            <input type="text" placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)} />
            <span>{errors.item}</span>
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <span>{errors.quantity}</span>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <span>{errors.price}</span>
            <button type="submit">Submit</button>
        </form>
    );
};

const PurchaseOrderTable = ({ orders, setOrders }) => {
    const handleEdit = (id) => {
        const orderToEdit = orders.find(order => order.id === id);
        // Logic for editing would go here (e.g., open modal with pre-filled data)
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            setOrders(orders.filter(order => order.id !== id));
        }
    };

    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Supplier</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="6">No orders available.</td>
                        </tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.supplier}</td>
                                <td>{order.item}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.date}</td>
                                <td>
                                    <button onClick={() => handleEdit(order.id)}>Edit</button>
                                    <button onClick={() => handleDelete(order.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const ExportButton = ({ orders }) => {
    const convertToCSV = (data) => {
        if (!data || data.length === 0) return '';
        const headers = Object.keys(data[0]).join(",") + "\n";
        const rows = data.map(row => Object.values(row).join(",")).join("\n");
        return headers + rows;
    };

    const downloadCSV = () => {
        if (!orders || orders.length === 0) {
            alert("No data available to export.");
            return;
        }
        const csvData = convertToCSV(orders);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'purchase_orders.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={downloadCSV}>
            Export
        </button>
    );
};

const PurchaseOrderManagement = () => {
    const [orders, setOrders] = useState([]);

    return (
        <div style={{ width: '1920px', height: '1080px', padding: '20px' }}>
            <Header />
            <PurchaseOrderForm setOrders={setOrders} />
            <PurchaseOrderTable orders={orders} setOrders={setOrders} />
            <ExportButton orders={orders} />
        </div>
    );
};

export default PurchaseOrderManagement;