import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManagerContainer from './components/TaskManagerContainer';
import ComplianceReportContainer from './components/ComplianceReportContainer';
import BudgetTrackingPage from './components/BudgetTrackingPage';
import ExperimentalResults from './components/ExperimentalResults';
import DashboardContainer from './components/DashboardContainer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardContainer />} />
        <Route path="/task-manager" element={<TaskManagerContainer />} />
        <Route path="/compliance-report" element={<ComplianceReportContainer />} />
        <Route path="/budget-tracking" element={<BudgetTrackingPage />} />
        <Route path="/experimental-results" element={<ExperimentalResults />} />
      </Routes>
    </Router>
  );
};

export default App;