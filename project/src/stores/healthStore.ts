import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';
import * as tf from '@tensorflow/tfjs';
import * as ml5 from 'ml5';
import * as faceapi from 'face-api.js';

// Types
export interface Symptom {
  id: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  date: string;
  images?: string[];
  measurements?: {
    temperature?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    heartRate?: number;
    oxygenLevel?: number;
  };
}

export interface VitalSigns {
  temperature: number;
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
  oxygenLevel: number;
  timestamp: string;
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  results: { parameter: string; value: string; normalRange: string }[];
  status: 'pending' | 'completed';
  doctorNotes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
  sideEffects?: string[];
  interactions?: string[];
  refillReminder?: boolean;
  pharmacy?: {
    name: string;
    address: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  title: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  followUp?: boolean;
  documents?: { name: string; url: string }[];
}

export interface HealthProfile {
  height?: string;
  weight?: string;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string[];
  conditions: string[];
  surgeries: {
    procedure: string;
    date: string;
    hospital?: string;
    surgeon?: string;
    notes?: string;
  }[];
  familyHistory: string[];
  lifestyle: {
    smoking?: 'never' | 'former' | 'current';
    alcohol?: 'never' | 'occasional' | 'regular';
    exercise?: 'sedentary' | 'light' | 'moderate' | 'active';
    diet?: string[];
  };
  vaccinations: {
    name: string;
    date: string;
    nextDue?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
  attachments?: { type: string; url: string }[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface HealthState {
  symptoms: Symptom[];
  medications: Medication[];
  appointments: Appointment[];
  healthProfile: HealthProfile;
  chatHistory: ChatMessage[];
  vitalSigns: VitalSigns[];
  labResults: LabResult[];
  
  // Advanced health monitoring
  startVitalMonitoring: () => Promise<void>;
  stopVitalMonitoring: () => void;
  processHealthImage: (imageData: string) => Promise<{
    analysis: string;
    confidence: number;
    recommendations: string[];
  }>;
  
  // Symptom actions
  addSymptom: (symptom: Omit<Symptom, 'id' | 'date'>) => void;
  updateSymptom: (id: string, symptom: Partial<Symptom>) => void;
  deleteSymptom: (id: string) => void;
  analyzeSymptomTrends: () => Promise<{
    patterns: string[];
    recommendations: string[];
  }>;
  
  // Medication actions
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, medication: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  checkMedicationInteractions: (medications: string[]) => Promise<{
    interactions: string[];
    severity: 'low' | 'moderate' | 'high';
  }>;
  
  // Appointment actions
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  startTelemedicineSession: (appointmentId: string) => Promise<{
    sessionUrl: string;
    token: string;
  }>;
  
  // Health profile actions
  updateHealthProfile: (profile: Partial<HealthProfile>) => void;
  generateHealthReport: () => Promise<{
    summary: string;
    recommendations: string[];
    riskFactors: string[];
  }>;
  
  // Lab results
  addLabResult: (result: Omit<LabResult, 'id'>) => void;
  updateLabResult: (id: string, result: Partial<LabResult>) => void;
  deleteLabResult: (id: string) => void;
  analyzeLabResults: () => Promise<{
    trends: string[];
    abnormalities: string[];
    recommendations: string[];
  }>;
  
  // Chat actions
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;
  analyzeChatSentiment: () => Promise<{
    overallSentiment: string;
    concerns: string[];
  }>;

  // AI diagnosis
  getDiagnosis: (symptoms: string) => Promise<{
    possibleConditions: { name: string; probability: number }[];
    recommendation: string;
    urgency: 'low' | 'medium' | 'high';
    differentialDiagnosis: string[];
    suggestedTests: string[];
  }>;
  
  // Advanced analytics
  generateHealthInsights: () => Promise<{
    trends: string[];
    predictions: string[];
    recommendations: string[];
    riskAssessment: {
      category: string;
      level: 'low' | 'moderate' | 'high';
      factors: string[];
    }[];
  }>;
}

// Initialize TensorFlow.js
tf.ready().then(() => {
  console.log('TensorFlow.js initialized');
});

// Initial health profile
const initialHealthProfile: HealthProfile = {
  allergies: [],
  conditions: [],
  surgeries: [],
  familyHistory: [],
  lifestyle: {},
  vaccinations: []
};

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      symptoms: [],
      medications: [],
      appointments: [],
      healthProfile: initialHealthProfile,
      chatHistory: [],
      vitalSigns: [],
      labResults: [],
      
      // Advanced health monitoring
      startVitalMonitoring: async () => {
        // Implementation would connect to health devices/sensors
        console.log('Started vital monitoring');
      },
      
      stopVitalMonitoring: () => {
        console.log('Stopped vital monitoring');
      },
      
      processHealthImage: async (imageData: string) => {
        // Mock image processing with face-api.js
        await faceapi.loadSsdMobilenetv1Model('/models');
        await faceapi.loadFaceExpressionModel('/models');
        
        return {
          analysis: "Skin condition analysis complete",
          confidence: 0.85,
          recommendations: ["Consult dermatologist", "Apply moisturizer"]
        };
      },
      
      // Symptom actions
      addSymptom: (symptom) => {
        const newSymptom = {
          ...symptom,
          id: Math.random().toString(36).substring(2, 9),
          date: new Date().toISOString()
        };
        set(state => ({ symptoms: [...state.symptoms, newSymptom] }));
      },
      
      updateSymptom: (id, updatedSymptom) => {
        set(state => ({
          symptoms: state.symptoms.map(symptom => 
            symptom.id === id ? { ...symptom, ...updatedSymptom } : symptom
          )
        }));
      },
      
      deleteSymptom: (id) => {
        set(state => ({
          symptoms: state.symptoms.filter(symptom => symptom.id !== id)
        }));
      },
      
      analyzeSymptomTrends: async () => {
        const symptoms = get().symptoms;
        // Mock trend analysis
        return {
          patterns: ["Headaches more frequent in evenings"],
          recommendations: ["Consider stress management techniques"]
        };
      },
      
      // Medication actions
      addMedication: (medication) => {
        const newMedication = {
          ...medication,
          id: Math.random().toString(36).substring(2, 9)
        };
        set(state => ({ medications: [...state.medications, newMedication] }));
      },
      
      updateMedication: (id, updatedMedication) => {
        set(state => ({
          medications: state.medications.map(medication => 
            medication.id === id ? { ...medication, ...updatedMedication } : medication
          )
        }));
      },
      
      deleteMedication: (id) => {
        set(state => ({
          medications: state.medications.filter(medication => medication.id !== id)
        }));
      },
      
      checkMedicationInteractions: async (medications: string[]) => {
        // Mock medication interaction check
        return {
          interactions: ["Avoid taking medication A with medication B"],
          severity: "moderate" as const
        };
      },
      
      // Appointment actions
      addAppointment: (appointment) => {
        const newAppointment = {
          ...appointment,
          id: Math.random().toString(36).substring(2, 9)
        };
        set(state => ({ appointments: [...state.appointments, newAppointment] }));
      },
      
      updateAppointment: (id, updatedAppointment) => {
        set(state => ({
          appointments: state.appointments.map(appointment => 
            appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
          )
        }));
      },
      
      deleteAppointment: (id) => {
        set(state => ({
          appointments: state.appointments.filter(appointment => appointment.id !== id)
        }));
      },
      
      startTelemedicineSession: async (appointmentId: string) => {
        // Mock telemedicine session creation
        return {
          sessionUrl: `https://telemedicine.example.com/session/${appointmentId}`,
          token: "mock-session-token"
        };
      },
      
      // Health profile actions
      updateHealthProfile: (profile) => {
        set(state => ({
          healthProfile: { ...state.healthProfile, ...profile }
        }));
      },
      
      generateHealthReport: async () => {
        const profile = get().healthProfile;
        // Mock health report generation
        return {
          summary: "Overall health status is good",
          recommendations: ["Increase physical activity", "Improve diet"],
          riskFactors: ["Family history of heart disease"]
        };
      },
      
      // Lab results actions
      addLabResult: (result) => {
        const newResult = {
          ...result,
          id: Math.random().toString(36).substring(2, 9)
        };
        set(state => ({ labResults: [...state.labResults, newResult] }));
      },
      
      updateLabResult: (id, updatedResult) => {
        set(state => ({
          labResults: state.labResults.map(result => 
            result.id === id ? { ...result, ...updatedResult } : result
          )
        }));
      },
      
      deleteLabResult: (id) => {
        set(state => ({
          labResults: state.labResults.filter(result => result.id !== id)
        }));
      },
      
      analyzeLabResults: async () => {
        const results = get().labResults;
        // Mock lab results analysis
        return {
          trends: ["Cholesterol levels improving"],
          abnormalities: ["Vitamin D slightly low"],
          recommendations: ["Consider vitamin D supplementation"]
        };
      },
      
      // Chat actions
      addChatMessage: (message) => {
        const newMessage = {
          ...message,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString()
        };
        set(state => ({ chatHistory: [...state.chatHistory, newMessage] }));
      },
      
      clearChatHistory: () => {
        set({ chatHistory: [] });
      },
      
      analyzeChatSentiment: async () => {
        const history = get().chatHistory;
        // Mock sentiment analysis
        return {
          overallSentiment: "positive",
          concerns: ["Stress levels", "Sleep quality"]
        };
      },
      
      // AI diagnosis
      getDiagnosis: async (symptoms: string) => {
        // Mock AI-powered diagnosis
        const lowerSymptoms = symptoms.toLowerCase();
        
        if (lowerSymptoms.includes('headache') || lowerSymptoms.includes('head pain')) {
          return {
            possibleConditions: [
              { name: 'Tension Headache', probability: 0.7 },
              { name: 'Migraine', probability: 0.5 },
              { name: 'Sinusitis', probability: 0.3 }
            ],
            recommendation: 'Rest in a quiet, dark room. Stay hydrated and consider over-the-counter pain relievers. If headaches persist for more than 3 days or are severe, consult your doctor.',
            urgency: 'low' as const,
            differentialDiagnosis: ['Cluster Headache', 'Temporal Arteritis'],
            suggestedTests: ['Physical Examination', 'Neurological Assessment']
          };
        } else if (lowerSymptoms.includes('chest pain') || lowerSymptoms.includes('heart')) {
          return {
            possibleConditions: [
              { name: 'Anxiety/Panic Attack', probability: 0.4 },
              { name: 'Acid Reflux', probability: 0.3 },
              { name: 'Angina', probability: 0.2 }
            ],
            recommendation: 'Seek immediate medical attention for chest pain, especially if severe or accompanied by shortness of breath.',
            urgency: 'high' as const,
            differentialDiagnosis: ['Myocardial Infarction', 'Pulmonary Embolism'],
            suggestedTests: ['ECG', 'Cardiac Enzymes', 'Chest X-ray']
          };
        } else {
          return {
            possibleConditions: [
              { name: 'Common Cold', probability: 0.3 },
              { name: 'Seasonal Allergies', probability: 0.3 },
              { name: 'Viral Infection', probability: 0.2 }
            ],
            recommendation: 'Monitor symptoms and rest. If conditions worsen or persist, consult healthcare provider.',
            urgency: 'low' as const,
            differentialDiagnosis: ['Upper Respiratory Infection', 'Bronchitis'],
            suggestedTests: ['Physical Examination', 'Temperature Check']
          };
        }
      },
      
      // Advanced analytics
      generateHealthInsights: async () => {
        const profile = get().healthProfile;
        const symptoms = get().symptoms;
        const medications = get().medications;
        
        // Mock advanced health analytics
        return {
          trends: [
            "Symptom frequency decreasing",
            "Medication adherence improving"
          ],
          predictions: [
            "Low risk of cardiovascular issues",
            "Moderate risk of vitamin D deficiency"
          ],
          recommendations: [
            "Increase daily water intake",
            "Consider stress management techniques"
          ],
          riskAssessment: [
            {
              category: "Cardiovascular",
              level: "low" as const,
              factors: ["Regular exercise", "Healthy diet"]
            },
            {
              category: "Mental Health",
              level: "moderate" as const,
              factors: ["Work stress", "Sleep patterns"]
            }
          ]
        };
      }
    }),
    {
      name: 'health-storage',
    }
  )
);