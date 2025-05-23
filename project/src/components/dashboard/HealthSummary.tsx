import React from 'react';
import { 
  Activity, 
  Heart, 
  Droplets, 
  Scale,
  TrendingUp
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useHealthStore } from '../../stores/healthStore';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HealthSummary: React.FC = () => {
  const { symptoms, healthProfile } = useHealthStore();
  
  // Mock data for health metrics
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });
  
  const heartRateData: ChartData<'line'> = {
    labels: last7Days,
    datasets: [
      {
        label: 'Heart Rate',
        data: [72, 75, 71, 74, 73, 70, 72],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const bloodPressureData: ChartData<'line'> = {
    labels: last7Days,
    datasets: [
      {
        label: 'Systolic',
        data: [120, 122, 119, 121, 120, 118, 121],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Diastolic',
        data: [80, 82, 79, 81, 78, 79, 80],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Health Summary</h2>
        <span className="text-sm text-neutral-500">Last 7 days</span>
      </div>
      
      {/* Health Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary-50 rounded-lg p-3 flex flex-col">
          <div className="flex items-center mb-1">
            <Heart className="h-4 w-4 text-primary-600 mr-1" />
            <span className="text-xs font-medium text-primary-700">Heart Rate</span>
          </div>
          <span className="text-2xl font-semibold">72 <span className="text-xs text-neutral-500">bpm</span></span>
          <span className="text-xs text-success-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" /> Normal
          </span>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-3 flex flex-col">
          <div className="flex items-center mb-1">
            <Activity className="h-4 w-4 text-secondary-600 mr-1" />
            <span className="text-xs font-medium text-secondary-700">Blood Pressure</span>
          </div>
          <span className="text-2xl font-semibold">121/80</span>
          <span className="text-xs text-success-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" /> Normal
          </span>
        </div>
        
        <div className="bg-warning-50 rounded-lg p-3 flex flex-col">
          <div className="flex items-center mb-1">
            <Scale className="h-4 w-4 text-warning-600 mr-1" />
            <span className="text-xs font-medium text-warning-700">Weight</span>
          </div>
          <span className="text-2xl font-semibold">{healthProfile.weight || '-- '} <span className="text-xs text-neutral-500">kg</span></span>
          <span className="text-xs text-neutral-500 mt-1">No change</span>
        </div>
        
        <div className="bg-accent-50 rounded-lg p-3 flex flex-col">
          <div className="flex items-center mb-1">
            <Droplets className="h-4 w-4 text-accent-600 mr-1" />
            <span className="text-xs font-medium text-accent-700">Hydration</span>
          </div>
          <span className="text-2xl font-semibold">1.4 <span className="text-xs text-neutral-500">L</span></span>
          <span className="text-xs text-warning-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" /> Below target
          </span>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 flex-1">
        <div>
          <h3 className="text-sm font-medium mb-3 text-neutral-700">Heart Rate Trend</h3>
          <div className="h-60">
            <Line data={heartRateData} options={chartOptions} />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3 text-neutral-700">Blood Pressure Trend</h3>
          <div className="h-60">
            <Line data={bloodPressureData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Recent Symptoms */}
      {symptoms.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-neutral-700">Recent Symptoms</h3>
          <ul className="space-y-2">
            {symptoms.slice(0, 3).map((symptom) => (
              <li key={symptom.id} className="flex items-start">
                <span className={`h-2 w-2 rounded-full mt-1.5 mr-2 ${
                  symptom.severity === 'mild' ? 'bg-success-500' : 
                  symptom.severity === 'moderate' ? 'bg-warning-500' : 'bg-error-500'
                }`}></span>
                <div>
                  <p className="text-sm">{symptom.description}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(symptom.date).toLocaleDateString()} • 
                    <span className={`ml-1 ${
                      symptom.severity === 'mild' ? 'text-success-600' : 
                      symptom.severity === 'moderate' ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {symptom.severity.charAt(0).toUpperCase() + symptom.severity.slice(1)}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthSummary;