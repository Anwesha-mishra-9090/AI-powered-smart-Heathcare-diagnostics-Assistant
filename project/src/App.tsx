import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import SymptomChecker from './pages/dashboard/SymptomChecker';
import MedicalProfile from './pages/dashboard/MedicalProfile';
import Appointments from './pages/dashboard/Appointments';
import Medications from './pages/dashboard/Medications';
import HealthChat from './pages/dashboard/HealthChat';

// Public Landing Page
import LandingPage from './pages/LandingPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="symptom-checker" element={<SymptomChecker />} />
        <Route path="medical-profile" element={<MedicalProfile />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="medications" element={<Medications />} />
        <Route path="health-chat" element={<HealthChat />} />
      </Route>
      
      {/* Catch all - redirect to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;