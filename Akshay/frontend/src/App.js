import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import all your pages
import ReportsOverviewPage from './ReportsOverviewPage';
import VendorManagement from './VendorManagement';
import DetailedReportPage from './DetailedReportPage';
import BudgetTrackerPage from './BudgetTrackerPage';
import FeedbackPage from './FeedbackPage';
import EventDetailPage from './EventDetailPage';
import EventDashboard from './EventDashboard';
import ClientProfilePage from './ClientProfilePage';
import CommunicationLogPage from './CommunicationLogPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home page or root page */}
        <Route path="/" element={<ReportsOverviewPage />} />

        {/* Routes for each of your components */}
        <Route path="/reports-overview" element={<ReportsOverviewPage />} />
        <Route path="/vendor-management" element={<VendorManagement />} />
        <Route path="/detailed-report" element={<DetailedReportPage />} />
        <Route path="/budget-tracker" element={<BudgetTrackerPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/event-detail" element={<EventDetailPage />} />
        <Route path="/event-dashboard" element={<EventDashboard />} />
        <Route path="/client-profile" element={<ClientProfilePage />} />
        <Route path="/communication-log" element={<CommunicationLogPage />} />
      </Routes>
    </Router>
  );
};

export default App;