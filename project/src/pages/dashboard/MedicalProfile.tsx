import React, { useState } from 'react';
import { useHealthStore } from '../../stores/healthStore';
import { Edit, Save, Plus, X, User } from 'lucide-react';

const MedicalProfile: React.FC = () => {
  const { healthProfile, updateHealthProfile } = useHealthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    height: healthProfile.height || '',
    weight: healthProfile.weight || '',
    bloodType: healthProfile.bloodType || '',
    newAllergy: '',
    newCondition: '',
    newSurgery: { procedure: '', date: '' },
    newFamilyHistory: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSave = () => {
    const updatedProfile = {
      ...healthProfile,
      height: formData.height,
      weight: formData.weight,
      bloodType: formData.bloodType as any
    };
    
    updateHealthProfile(updatedProfile);
    setIsEditing(false);
  };
  
  const addAllergy = () => {
    if (formData.newAllergy.trim()) {
      const updatedProfile = {
        ...healthProfile,
        allergies: [...healthProfile.allergies, formData.newAllergy.trim()]
      };
      updateHealthProfile(updatedProfile);
      setFormData({ ...formData, newAllergy: '' });
    }
  };
  
  const removeAllergy = (index: number) => {
    const updatedAllergies = [...healthProfile.allergies];
    updatedAllergies.splice(index, 1);
    updateHealthProfile({ ...healthProfile, allergies: updatedAllergies });
  };
  
  const addCondition = () => {
    if (formData.newCondition.trim()) {
      const updatedProfile = {
        ...healthProfile,
        conditions: [...healthProfile.conditions, formData.newCondition.trim()]
      };
      updateHealthProfile(updatedProfile);
      setFormData({ ...formData, newCondition: '' });
    }
  };
  
  const removeCondition = (index: number) => {
    const updatedConditions = [...healthProfile.conditions];
    updatedConditions.splice(index, 1);
    updateHealthProfile({ ...healthProfile, conditions: updatedConditions });
  };
  
  const addSurgery = () => {
    if (formData.newSurgery.procedure.trim() && formData.newSurgery.date.trim()) {
      const updatedProfile = {
        ...healthProfile,
        surgeries: [...healthProfile.surgeries, { 
          procedure: formData.newSurgery.procedure.trim(), 
          date: formData.newSurgery.date 
        }]
      };
      updateHealthProfile(updatedProfile);
      setFormData({ ...formData, newSurgery: { procedure: '', date: '' } });
    }
  };
  
  const removeSurgery = (index: number) => {
    const updatedSurgeries = [...healthProfile.surgeries];
    updatedSurgeries.splice(index, 1);
    updateHealthProfile({ ...healthProfile, surgeries: updatedSurgeries });
  };
  
  const addFamilyHistory = () => {
    if (formData.newFamilyHistory.trim()) {
      const updatedProfile = {
        ...healthProfile,
        familyHistory: [...healthProfile.familyHistory, formData.newFamilyHistory.trim()]
      };
      updateHealthProfile(updatedProfile);
      setFormData({ ...formData, newFamilyHistory: '' });
    }
  };
  
  const removeFamilyHistory = (index: number) => {
    const updatedFamilyHistory = [...healthProfile.familyHistory];
    updatedFamilyHistory.splice(index, 1);
    updateHealthProfile({ ...healthProfile, familyHistory: updatedFamilyHistory });
  };

  return (
    <div className="dashboard-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medical Profile</h1>
        <p className="text-neutral-600">Manage your health information in one secure place</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="text-primary-600 hover:text-primary-700"
            >
              {isEditing ? (
                <Save className="h-5 w-5" />
              ) : (
                <Edit className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-neutral-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="height"
                  name="height"
                  type="text"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter height in cm"
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-neutral-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="text"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter weight in kg"
                />
              </div>
              
              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-neutral-700 mb-1">
                  Blood Type
                </label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button onClick={handleSave} className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">Height</span>
                <span className="font-medium">{healthProfile.height ? `${healthProfile.height} cm` : 'Not specified'}</span>
              </div>
              
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">Weight</span>
                <span className="font-medium">{healthProfile.weight ? `${healthProfile.weight} kg` : 'Not specified'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-neutral-500">Blood Type</span>
                <span className="font-medium">{healthProfile.bloodType || 'Not specified'}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Allergies */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Allergies</h2>
          
          <div className="space-y-4 mb-6">
            {healthProfile.allergies.length > 0 ? (
              <div className="space-y-2">
                {healthProfile.allergies.map((allergy, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 rounded-md">
                    <span>{allergy}</span>
                    <button 
                      onClick={() => removeAllergy(index)} 
                      className="text-neutral-400 hover:text-error-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-4">No allergies recorded</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={formData.newAllergy}
              onChange={(e) => setFormData({ ...formData, newAllergy: e.target.value })}
              className="input flex-1"
              placeholder="Add allergy"
            />
            <button 
              onClick={addAllergy} 
              disabled={!formData.newAllergy.trim()}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Medical Conditions */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Medical Conditions</h2>
          
          <div className="space-y-4 mb-6">
            {healthProfile.conditions.length > 0 ? (
              <div className="space-y-2">
                {healthProfile.conditions.map((condition, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 rounded-md">
                    <span>{condition}</span>
                    <button 
                      onClick={() => removeCondition(index)} 
                      className="text-neutral-400 hover:text-error-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-4">No medical conditions recorded</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={formData.newCondition}
              onChange={(e) => setFormData({ ...formData, newCondition: e.target.value })}
              className="input flex-1"
              placeholder="Add medical condition"
            />
            <button 
              onClick={addCondition} 
              disabled={!formData.newCondition.trim()}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Surgical History */}
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6">Surgical History</h2>
          
          <div className="space-y-4 mb-6">
            {healthProfile.surgeries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b border-neutral-200">
                    <tr>
                      <th className="pb-2 font-medium text-sm text-neutral-500">Procedure</th>
                      <th className="pb-2 font-medium text-sm text-neutral-500">Date</th>
                      <th className="pb-2 font-medium text-sm text-neutral-500"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {healthProfile.surgeries.map((surgery, index) => (
                      <tr key={index}>
                        <td className="py-3 pr-4">{surgery.procedure}</td>
                        <td className="py-3 pr-4">{surgery.date}</td>
                        <td className="py-3 text-right">
                          <button 
                            onClick={() => removeSurgery(index)} 
                            className="text-neutral-400 hover:text-error-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-4">No surgical history recorded</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-3">
              <input
                type="text"
                value={formData.newSurgery.procedure}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  newSurgery: { ...formData.newSurgery, procedure: e.target.value } 
                })}
                className="input w-full"
                placeholder="Procedure name"
              />
            </div>
            <div className="md:col-span-1">
              <input
                type="date"
                value={formData.newSurgery.date}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  newSurgery: { ...formData.newSurgery, date: e.target.value } 
                })}
                className="input w-full"
              />
            </div>
            <div className="md:col-span-1">
              <button 
                onClick={addSurgery} 
                disabled={!formData.newSurgery.procedure.trim() || !formData.newSurgery.date}
                className="btn-primary w-full"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Family History */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Family History</h2>
          
          <div className="space-y-4 mb-6">
            {healthProfile.familyHistory.length > 0 ? (
              <div className="space-y-2">
                {healthProfile.familyHistory.map((history, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 rounded-md">
                    <span>{history}</span>
                    <button 
                      onClick={() => removeFamilyHistory(index)} 
                      className="text-neutral-400 hover:text-error-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-4">No family history recorded</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={formData.newFamilyHistory}
              onChange={(e) => setFormData({ ...formData, newFamilyHistory: e.target.value })}
              className="input flex-1"
              placeholder="Add family health history"
            />
            <button 
              onClick={addFamilyHistory} 
              disabled={!formData.newFamilyHistory.trim()}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-600">
        <h3 className="font-medium mb-2">Privacy Information</h3>
        <p>
          Your health information is kept secure and private. This data is stored locally on your device 
          and is not shared with third parties without your explicit consent. You can delete your data 
          at any time from your account settings.
        </p>
      </div>
    </div>
  );
};

export default MedicalProfile;