import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Clock, AlertCircle, Plus } from 'lucide-react';
import { useHealthStore } from '../../stores/healthStore';

const MedicationReminders: React.FC = () => {
  const { medications } = useHealthStore();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter active medications (started but not ended or no end date)
  const activeMedications = medications.filter(med => {
    const hasStarted = med.startDate <= today;
    const hasNotEnded = !med.endDate || med.endDate >= today;
    return hasStarted && hasNotEnded;
  });

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Medication Reminders</h2>
        <Link 
          to="/dashboard/medications" 
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Manage medications
        </Link>
      </div>
      
      {activeMedications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left border-b border-neutral-200">
              <tr>
                <th className="pb-2 font-medium text-sm text-neutral-500">Medication</th>
                <th className="pb-2 font-medium text-sm text-neutral-500">Dosage</th>
                <th className="pb-2 font-medium text-sm text-neutral-500">Frequency</th>
                <th className="pb-2 font-medium text-sm text-neutral-500">Next Dose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {activeMedications.map((medication) => {
                // For demo purposes, just show the first time as the next dose
                const nextDoseTime = medication.time[0];
                
                return (
                  <tr key={medication.id} className="hover:bg-neutral-50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-warning-100 flex items-center justify-center mr-3">
                          <Pill className="h-4 w-4 text-warning-600" />
                        </div>
                        <span className="font-medium">{medication.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-neutral-700">{medication.dosage}</td>
                    <td className="py-3 pr-4 text-neutral-700">{medication.frequency}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-neutral-500 mr-1" />
                        <span>{nextDoseTime}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <Pill className="h-12 w-12 mx-auto text-neutral-300 mb-3" />
          <p className="text-neutral-600 mb-4">No medication reminders</p>
          <Link to="/dashboard/medications" className="btn-primary">
            <Plus className="h-4 w-4 mr-1" />
            Add Medication
          </Link>
        </div>
      )}
      
      {activeMedications.length > 0 && (
        <div className="mt-4 p-3 border border-warning-200 bg-warning-50 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-warning-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-warning-700">
            Always take medications as prescribed by your healthcare provider. These reminders are for assistance only.
          </p>
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;