import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { useHealthStore } from '../../stores/healthStore';

const UpcomingAppointments: React.FC = () => {
  const { appointments } = useHealthStore();
  
  // Sort appointments by date, closest first
  const upcomingAppointments = [...appointments]
    .filter(app => new Date(app.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        <Link 
          to="/dashboard/appointments" 
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View all
        </Link>
      </div>
      
      {upcomingAppointments.length > 0 ? (
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="border border-neutral-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
              <h3 className="font-medium mb-2">{appointment.title}</h3>
              
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-neutral-500" />
                  <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-neutral-500" />
                  <span>{appointment.time}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-neutral-500" />
                  <span>{appointment.location}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-neutral-100">
                <p className="text-sm text-neutral-700">Dr. {appointment.doctorName}</p>
                <p className="text-xs text-neutral-500">{appointment.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto text-neutral-300 mb-3" />
          <p className="text-neutral-600 mb-4">No upcoming appointments</p>
          <Link to="/dashboard/appointments" className="btn-primary">
            <Plus className="h-4 w-4 mr-1" />
            Schedule Appointment
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;