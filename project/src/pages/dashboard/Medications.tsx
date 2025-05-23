import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  Calendar, 
  Plus, 
  Edit2, 
  Trash2,
  AlertCircle,
  Search,
  ChevronDown,
  X
} from 'lucide-react';
import { useHealthStore, Medication } from '../../stores/healthStore';

const Medications: React.FC = () => {
  const { medications, addMedication, updateMedication, deleteMedication } = useHealthStore();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<Omit<Medication, 'id'>>({
    name: '',
    dosage: '',
    frequency: '',
    time: [''],
    startDate: today,
    endDate: '',
    notes: ''
  });
  
  const resetForm = () => {
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      time: [''],
      startDate: today,
      endDate: '',
      notes: ''
    });
    setIsEditing(false);
    setEditId('');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'time') {
      // Handle single time input for simplicity
      setFormData({ ...formData, time: [value] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleEditMedication = (medication: Medication) => {
    setFormData({
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      time: medication.time,
      startDate: medication.startDate,
      endDate: medication.endDate || '',
      notes: medication.notes || ''
    });
    setIsEditing(true);
    setEditId(medication.id);
    setShowForm(true);
  };
  
  const handleDeleteMedication = (id: string) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      deleteMedication(id);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      updateMedication(editId, formData);
    } else {
      addMedication(formData);
    }
    
    resetForm();
    setShowForm(false);
  };
  
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };
  
  // Filter medications based on search and status
  const filteredMedications = medications
    .filter(medication => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = (
        medication.name.toLowerCase().includes(searchLower) ||
        medication.dosage.toLowerCase().includes(searchLower) ||
        medication.frequency.toLowerCase().includes(searchLower) ||
        (medication.notes && medication.notes.toLowerCase().includes(searchLower))
      );
      
      if (!matchesSearch) return false;
      
      // Filter by status
      if (filterStatus === 'all') return true;
      
      const hasStarted = medication.startDate <= today;
      const hasNotEnded = !medication.endDate || medication.endDate >= today;
      const isActive = hasStarted && hasNotEnded;
      
      return filterStatus === 'active' ? isActive : !isActive;
    });

  return (
    <div className="dashboard-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medications</h1>
        <p className="text-neutral-600">Track and manage your prescriptions and medications</p>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
        <div className="flex items-center relative md:w-64">
          <Search className="absolute left-3 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search medications..."
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'completed')}
              className="input pr-10 appearance-none"
            >
              <option value="all">All Medications</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
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
            Add Medication
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-6">
            {isEditing ? 'Edit Medication' : 'Add New Medication'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Medication Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="E.g., Amoxicillin"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="dosage" className="block text-sm font-medium text-neutral-700 mb-1">
                  Dosage
                </label>
                <input
                  id="dosage"
                  name="dosage"
                  type="text"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="E.g., 500mg"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-neutral-700 mb-1">
                  Frequency
                </label>
                <input
                  id="frequency"
                  name="frequency"
                  type="text"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="E.g., Twice daily"
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
                  value={formData.time[0]}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
                  End Date (Optional)
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate}
                  className="input"
                />
              </div>
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
                placeholder="E.g., Take with food, special instructions, etc."
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
                {isEditing ? 'Update Medication' : 'Save Medication'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {filteredMedications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMedications.map(medication => {
            const hasStarted = medication.startDate <= today;
            const hasNotEnded = !medication.endDate || medication.endDate >= today;
            const isActive = hasStarted && hasNotEnded;
            
            return (
              <div 
                key={medication.id} 
                className={`card hover:shadow-lg transition-shadow ${
                  isActive ? '' : 'opacity-75'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full ${
                      isActive ? 'bg-warning-100' : 'bg-neutral-100'
                    } flex items-center justify-center mr-3`}>
                      <Pill className={`h-5 w-5 ${
                        isActive ? 'text-warning-600' : 'text-neutral-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{medication.name}</h3>
                      <p className="text-sm text-neutral-600">{medication.dosage}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditMedication(medication)} 
                      className="text-neutral-500 hover:text-primary-600"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteMedication(medication.id)} 
                      className="text-neutral-500 hover:text-error-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-neutral-700">
                    <Clock size={16} className="mr-2 text-neutral-500" />
                    <span>{medication.frequency}</span>
                    <span className="ml-2 text-sm text-neutral-500">
                      at {medication.time.join(', ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-neutral-700">
                    <Calendar size={16} className="mr-2 text-neutral-500" />
                    <span>
                      {new Date(medication.startDate).toLocaleDateString()}
                      {medication.endDate && ` - ${new Date(medication.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                  
                  {medication.notes && (
                    <div className="pt-3 mt-3 border-t border-neutral-100 text-sm text-neutral-600">
                      {medication.notes}
                    </div>
                  )}
                  
                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                        Active
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Pill className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-neutral-700 mb-2">No Medications Found</h3>
          <p className="text-neutral-500 mb-8">
            {searchQuery || filterStatus !== 'all'
              ? "No medications match your search criteria" 
              : "You haven't added any medications yet"}
          </p>
          <button 
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn-primary"
          >
            <Plus size={18} className="mr-2" />
            Add Your First Medication
          </button>
        </div>
      )}
      
      {medications.length > 0 && (
        <div className="mt-8 p-4 bg-warning-50 border border-warning-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-warning-500 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-warning-700">
            <p className="font-medium mb-1">Important Reminder</p>
            <p>
              Always take medications as prescribed by your healthcare provider. This tool is meant to help 
              you track your medications, but it does not replace professional medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;