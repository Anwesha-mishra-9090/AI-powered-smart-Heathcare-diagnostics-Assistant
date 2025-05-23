import React, { useState } from 'react';
import { 
  Search, 
  Loader2, 
  Activity,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useHealthStore } from '../../stores/healthStore';

interface DiagnosisResult {
  possibleConditions: { name: string; probability: number }[];
  recommendation: string;
  urgency: 'low' | 'medium' | 'high';
}

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [showSymptomsForm, setShowSymptomsForm] = useState(false);
  const [newSymptom, setNewSymptom] = useState({ description: '', severity: 'mild' as 'mild' | 'moderate' | 'severe' });
  
  const { symptoms: reportedSymptoms, addSymptom, getDiagnosis } = useHealthStore();

  const handleCheckSymptoms = async () => {
    if (!symptoms.trim()) return;
    
    setIsLoading(true);
    try {
      const diagnosis = await getDiagnosis(symptoms);
      setDiagnosisResult(diagnosis);
    } catch (error) {
      console.error('Error getting diagnosis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSymptom = () => {
    if (newSymptom.description.trim()) {
      addSymptom(newSymptom);
      setNewSymptom({ description: '', severity: 'mild' });
      setShowSymptomsForm(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'medium':
        return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'high':
        return 'text-error-600 bg-error-50 border-error-200';
      default:
        return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return <AlertCircle className="h-5 w-5 text-success-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-warning-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-error-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-neutral-500" />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Symptom Checker</h1>
        <p className="text-neutral-600">Describe your symptoms to get AI-powered health insights</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Check Your Symptoms</h2>
            <p className="text-neutral-600 mb-6">
              Describe your symptoms in detail below. The more specific you are, the more accurate 
              our AI can be in providing health insights.
            </p>
            
            <div className="mb-4">
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Example: I've been experiencing a headache for the past two days, with pain mostly on the right side. I also have slight nausea in the morning."
                className="input min-h-32"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleCheckSymptoms}
                disabled={isLoading || !symptoms.trim()}
                className="btn-primary"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Check Symptoms
                  </>
                )}
              </button>
            </div>
          </div>
          
          {diagnosisResult && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Health Insights</h2>
              
              <div className={`mb-6 p-4 border rounded-lg flex items-start ${getUrgencyColor(diagnosisResult.urgency)}`}>
                <div className="mr-3 mt-0.5">
                  {getUrgencyIcon(diagnosisResult.urgency)}
                </div>
                <div>
                  <h3 className="font-medium mb-1">
                    {diagnosisResult.urgency === 'low' ? 'Low Urgency' : 
                     diagnosisResult.urgency === 'medium' ? 'Medium Urgency' : 'High Urgency'}
                  </h3>
                  <p className="text-sm">
                    {diagnosisResult.recommendation}
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-3">Possible Conditions</h3>
              <div className="space-y-3 mb-6">
                {diagnosisResult.possibleConditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                    <span className="font-medium">{condition.name}</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-neutral-200 rounded-full mr-3">
                        <div 
                          className="h-full bg-primary-500 rounded-full" 
                          style={{ width: `${condition.probability * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {Math.round(condition.probability * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg text-sm text-neutral-700">
                <p className="font-medium mb-1">Important Disclaimer</p>
                <p>
                  This is not a medical diagnosis. The information provided is for informational 
                  purposes only and should not replace professional medical advice. Always consult 
                  with a healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-medium mb-3">Save These Symptoms</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Would you like to save these symptoms to your health record for tracking purposes?
                </p>
                <button 
                  onClick={() => setShowSymptomsForm(true)} 
                  className="btn-outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to My Symptoms
                </button>
              </div>
            </div>
          )}
          
          {showSymptomsForm && (
            <div className="card mt-6">
              <h3 className="text-lg font-medium mb-4">Add Symptom</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="symptomDescription" className="block text-sm font-medium text-neutral-700 mb-1">
                    Symptom Description
                  </label>
                  <input
                    id="symptomDescription"
                    type="text"
                    value={newSymptom.description}
                    onChange={(e) => setNewSymptom({ ...newSymptom, description: e.target.value })}
                    className="input"
                    placeholder="Describe your symptom"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Severity
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="severity"
                        checked={newSymptom.severity === 'mild'}
                        onChange={() => setNewSymptom({ ...newSymptom, severity: 'mild' })}
                        className="h-4 w-4 text-primary-600 mr-2"
                      />
                      Mild
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="severity"
                        checked={newSymptom.severity === 'moderate'}
                        onChange={() => setNewSymptom({ ...newSymptom, severity: 'moderate' })}
                        className="h-4 w-4 text-primary-600 mr-2"
                      />
                      Moderate
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="severity"
                        checked={newSymptom.severity === 'severe'}
                        onChange={() => setNewSymptom({ ...newSymptom, severity: 'severe' })}
                        className="h-4 w-4 text-primary-600 mr-2"
                      />
                      Severe
                    </label>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-2">
                  <button onClick={handleAddSymptom} className="btn-primary">
                    Save Symptom
                  </button>
                  <button 
                    onClick={() => setShowSymptomsForm(false)} 
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Symptoms</h2>
              <button 
                onClick={() => setShowSymptomsForm(true)} 
                className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
            
            {reportedSymptoms.length > 0 ? (
              <div className="space-y-4">
                {reportedSymptoms.map((symptom) => (
                  <div key={symptom.id} className="border border-neutral-200 rounded-lg p-4 flex items-start">
                    <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                      symptom.severity === 'mild' ? 'bg-success-500' : 
                      symptom.severity === 'moderate' ? 'bg-warning-500' : 'bg-error-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="mb-1">{symptom.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-medium ${
                          symptom.severity === 'mild' ? 'text-success-600' : 
                          symptom.severity === 'moderate' ? 'text-warning-600' : 'text-error-600'
                        }`}>
                          {symptom.severity.charAt(0).toUpperCase() + symptom.severity.slice(1)}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {new Date(symptom.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="ml-2 text-neutral-400 hover:text-primary-600">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto text-neutral-300 mb-3" />
                <p className="text-neutral-600 mb-4">No symptoms recorded</p>
                <button 
                  onClick={() => setShowSymptomsForm(true)} 
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Symptom
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;