// File PATH: App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderDetailContainer from './OrderDetailContainer';
import DashboardContainer from './DashboardContainer';

const App = () => {
    return (
        <Router>
            <div style={{ width: '1920px', height: '1080px' }}>
                <Routes>
                    <Route path="/" element={<DashboardContainer />} />
                    <Route path="/order-details" element={<OrderDetailContainer />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
