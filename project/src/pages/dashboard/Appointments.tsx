import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  Edit2, 
  Trash2,
  Search,
  ChevronDown,
  X
} from 'lucide-react';
import { useHealthStore, Appointment } from '../../stores/healthStore';

const Appointments: React.FC = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useHealthStore();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'doctor'>('date');
  
  const [formData, setFormData] = useState<Omit<Appointment, 'id'>>({
    title: '',
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  });
  
  const resetForm = () => {
    setFormData({
      title: '',
      doctorName: '',
      specialty: '',
      date: '',
      time: '',
      location: '',
      notes: ''
    });
    setIsEditing(false);
    setEditId('');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleEditAppointment = (appointment: Appointment) => {
    setFormData({
      title: appointment.title,
      doctorName: appointment.doctorName,
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      notes: appointment.notes || ''
    });
    setIsEditing(true);
    setEditId(appointment.id);
    setShowForm(true);
  };
  
  const handleDeleteAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      updateAppointment(editId, formData);
    } else {
      addAppointment(formData);
    }
    
    resetForm();
    setShowForm(false);
  };
  
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };
  
  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter(appointment => {
      const searchLower = searchQuery.toLowerCase();
      return (
        appointment.title.toLowerCase().includes(searchLower) ||
        appointment.doctorName.toLowerCase().includes(searchLower) ||
        appointment.specialty.toLowerCase().includes(searchLower) ||
        appointment.location.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return a.doctorName.localeCompare(b.doctorName);
      }
    });

  // Group appointments by date
  const appointmentsByDate: Record<string, Appointment[]> = {};
  
  filteredAppointments.forEach(appointment => {
    if (!appointmentsByDate[appointment.date]) {
      appointmentsByDate[appointment.date] = [];
    }
    appointmentsByDate[appointment.date].push(appointment);
  });
  
  // Sort dates
  const sortedDates = Object.keys(appointmentsByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div className="dashboard-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Appointments</h1>
        <p className="text-neutral-600">Manage your medical appointments and check-ups</p>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
        <div className="flex items-center relative md:w-64">
          <Search className="absolute left-3 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-neutral-400 hover:text-neutral-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'doctor')}
              className="input pr-10 appearance-none"
            >
              <option value="date">Sort by Date</option>
              <option value="doctor">Sort by Doctor</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 pointer-events-none" />
          </div>
          
          <button 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn-primary"
          >
            <Plus size={18} className="mr-2" />
            New Appointment
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-6">
            {isEditing ? 'Edit Appointment' : 'New Appointment'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                  Appointment Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="E.g., Annual Check-up"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="doctorName" className="block text-sm font-medium text-neutral-700 mb-1">
                  Doctor Name
                </label>
                <input
                  id="doctorName"
                  name="doctorName"
                  type="text"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Dr. Name"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-neutral-700 mb-1">
                  Specialty
                </label>
                <input
                  id="specialty"
                  name="specialty"
                  type="text"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="E.g., Cardiology"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-neutral-700 mb-1">
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                className="input"
                placeholder="Address or facility name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="input min-h-20"
                placeholder="Any additional information about this appointment"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {isEditing ? 'Update Appointment' : 'Save Appointment'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {filteredAppointments.length > 0 ? (
        <div className="space-y-8">
          {sortedDates.map(date => (
            <div key={date}>
              <h3 className="font-medium text-lg mb-4 border-b border-neutral-200 pb-2">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointmentsByDate[date].map(appointment => (
                  <div key={appointment.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-semibold text-lg">{appointment.title}</h3>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditAppointment(appointment)} 
                          className="text-neutral-500 hover:text-primary-600"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteAppointment(appointment.id)} 
                          className="text-neutral-500 hover:text-error-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-neutral-700">
                        <User size={18} className="mr-2 text-neutral-500" />
                        <span>Dr. {appointment.doctorName}</span>
                        <span className="text-sm text-neutral-500 ml-2">({appointment.specialty})</span>
                      </div>
                      
                      <div className="flex items-center text-neutral-700">
                        <Clock size={18} className="mr-2 text-neutral-500" />
                        <span>{appointment.time}</span>
                      </div>
                      
                      <div className="flex items-center text-neutral-700">
                        <MapPin size={18} className="mr-2 text-neutral-500" />
                        <span>{appointment.location}</span>
                      </div>
                      
                      {appointment.notes && (
                        <div className="pt-2 mt-2 border-t border-neutral-100 text-sm text-neutral-600">
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-neutral-700 mb-2">No Appointments Found</h3>
          <p className="text-neutral-500 mb-8">
            {searchQuery 
              ? "No appointments match your search criteria" 
              : "You haven't scheduled any appointments yet"}
          </p>
          <button 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn-primary"
          >
            <Plus size={18} className="mr-2" />
            Schedule Your First Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointments;