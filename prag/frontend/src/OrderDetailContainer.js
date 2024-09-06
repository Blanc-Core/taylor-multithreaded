import React, { useState } from 'react';

const SupplierInfo = ({ supplier }) => (
    <div>
        <h3>Supplier Information</h3>
        <p><strong>Name:</strong> {supplier.name || 'N/A'}</p>
        <p><strong>Contact:</strong> {supplier.contact || 'N/A'}</p>
    </div>
);

const ItemList = ({ items }) => (
    <div>
        <h3>Item Details</h3>
        {items.length > 0 ? (
            items.map((item, index) => (
                <div key={index}>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>SKU:</strong> {item.sku}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}</p>
                </div>
            ))
        ) : (
            <p>No items in this order.</p>
        )}
    </div>
);

const OrderStatus = ({ status }) => (
    <div>
        <h3>Order Status</h3>
        <p>{status || 'Status not available'}</p>
    </div>
);

const AdditionalInfo = ({ info }) => (
    <div>
        <h3>Additional Information</h3>
        <p>{info || 'No additional information.'}</p>
    </div>
);

const OrderDetail = ({ order }) => {
    if (!order) {
        console.error("Order data is missing");
        return <p>Error: Order data is not available.</p>;
    }

    return (
        <div>
            <SupplierInfo supplier={order.supplier} />
            <ItemList items={order.items} />
            <OrderStatus status={order.status} />
            <AdditionalInfo info={order.additionalInfo} />
        </div>
    );
};

// EditOrderForm component
const EditOrderForm = ({ orderDetails }) => {
    const [quantity, setQuantity] = useState(orderDetails.items[0].quantity);
    const [price, setPrice] = useState(orderDetails.items[0].unitPrice);
    const [error, setError] = useState('');

    const validateInputs = () => {
        if (quantity <= 0 || price <= 0) {
            setError('Quantity and Price must be positive numbers.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateInputs()) {
            console.log('Order Updated:', { quantity, price });
            alert('Order details updated successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Quantity:
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit">Update Order</button>
        </form>
    );
};

// BackButton component
const BackButton = ({ onClick }) => (
    <button onClick={onClick}>
        Back
    </button>
);

// Main OrderDetailContainer component
const OrderDetailContainer = () => {
    const [order, setOrder] = useState(dummyOrderData); // Replace with dummy data
    const [isEditing, setEditing] = useState(false);

    const toggleEditing = () => setEditing(prev => !prev);
    
    const navigateBack = () => {
        console.log("Navigating back to the dashboard...");
    };

    return (
        <div style={{ width: '1920px', height: '1080px' }}>
            <OrderDetail order={order} />
            {isEditing ? <EditOrderForm orderDetails={order} /> : null}
            <BackButton onClick={navigateBack} />
            <button onClick={toggleEditing}>{isEditing ? 'Cancel' : 'Edit'}</button>
        </div>
    );
};

// Dummy data for demonstration
const dummyOrderData = {
    supplier: {
        name: "Supplier Inc.",
        contact: "contact@supplier.com"
    },
    items: [
        { description: "Item 1", sku: "SKU001", quantity: 5, unitPrice: 10.00 },
        { description: "Item 2", sku: "SKU002", quantity: 3, unitPrice: 15.00 }
    ],
    status: "Pending",
    additionalInfo: "Please deliver by end of the week."
};

// Example usage of OrderDetailContainer component
const App = () => <OrderDetailContainer />;

export default App;