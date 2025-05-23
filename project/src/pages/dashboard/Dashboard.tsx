import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Calendar, 
  Pill, 
  MessageSquare,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useHealthStore } from '../../stores/healthStore';
import { useAuthStore } from '../../stores/authStore';
import UpcomingAppointments from '../../components/dashboard/UpcomingAppointments';
import MedicationReminders from '../../components/dashboard/MedicationReminders';
import HealthSummary from '../../components/dashboard/HealthSummary';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { symptoms, appointments, medications } = useHealthStore();
  
  // Get current date and time for greeting
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }

  return (
    <div className="dashboard-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{greeting}, {user?.firstName}!</h1>
        <p className="text-neutral-600">Here's an overview of your health today.</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/dashboard/symptom-checker" className="card bg-primary-50 hover:bg-primary-100 transition-colors flex items-center p-4">
          <Activity className="h-10 w-10 text-primary-600 mr-4" />
          <div>
            <h3 className="font-medium">Symptom Checker</h3>
            <p className="text-sm text-neutral-600">Check your symptoms</p>
          </div>
        </Link>
        
        <Link to="/dashboard/appointments" className="card bg-secondary-50 hover:bg-secondary-100 transition-colors flex items-center p-4">
          <Calendar className="h-10 w-10 text-secondary-600 mr-4" />
          <div>
            <h3 className="font-medium">Appointments</h3>
            <p className="text-sm text-neutral-600">Manage your appointments</p>
          </div>
        </Link>
        
        <Link to="/dashboard/medications" className="card bg-warning-50 hover:bg-warning-100 transition-colors flex items-center p-4">
          <Pill className="h-10 w-10 text-warning-600 mr-4" />
          <div>
            <h3 className="font-medium">Medications</h3>
            <p className="text-sm text-neutral-600">Track your medications</p>
          </div>
        </Link>
        
        <Link to="/dashboard/health-chat" className="card bg-accent-50 hover:bg-accent-100 transition-colors flex items-center p-4">
          <MessageSquare className="h-10 w-10 text-accent-600 mr-4" />
          <div>
            <h3 className="font-medium">Health Chat</h3>
            <p className="text-sm text-neutral-600">Talk to your AI assistant</p>
          </div>
        </Link>
      </div>
      
      {/* Health Alerts */}
      {symptoms.length > 0 && (
        <div className="mb-8 p-4 border border-warning-300 bg-warning-50 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-warning-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-warning-800">Active Health Concerns</h3>
              <p className="text-sm text-warning-700 mb-2">
                You have {symptoms.length} active symptom{symptoms.length > 1 ? 's' : ''} reported. 
                Consider checking with your healthcare provider.
              </p>
              <Link 
                to="/dashboard/symptom-checker" 
                className="text-sm font-medium text-warning-700 hover:text-warning-800 inline-flex items-center"
              >
                Review symptoms <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Summary */}
        <div className="lg:col-span-2">
          <HealthSummary />
        </div>
        
        {/* Upcoming Appointments */}
        <div>
          <UpcomingAppointments />
        </div>
      </div>
      
      {/* Medication Reminders */}
      <div className="mt-6">
        <MedicationReminders />
      </div>
    </div>
  );
};

export default Dashboard;