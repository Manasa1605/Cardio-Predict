import React, { useState } from 'react';
import { Heart, Activity, Users, BarChart3, User, FileText } from 'lucide-react';
import PatientForm from './components/PatientForm';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import PatientList from './components/PatientList';
import { Patient, PredictionResult } from './types/medical';
import { predictHeartDisease } from './utils/mlModel';

function App() {
  const [activeTab, setActiveTab] = useState('predict');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);

  const handlePrediction = (patientData: Omit<Patient, 'id' | 'date'>) => {
    const result = predictHeartDisease(patientData);
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    setPatients(prev => [newPatient, ...prev]);
    setCurrentResult({ ...result, patient: newPatient });
    setActiveTab('results');
  };

  const navItems = [
    { id: 'predict', label: 'Risk Assessment', icon: Heart },
    { id: 'results', label: 'Results', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'patients', label: 'Patient History', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CardioPredict</h1>
                <p className="text-sm text-gray-600">Enhancing Cardiac Care with Predictive Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'predict' && (
          <PatientForm onSubmit={handlePrediction} />
        )}
        {activeTab === 'results' && currentResult && (
          <Results result={currentResult} />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard patients={patients} />
        )}
        {activeTab === 'patients' && (
          <PatientList patients={patients} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-600">
              <FileText className="h-4 w-4" />
              <span className="text-sm">
                This is for educational purposes. Always consult healthcare professionals.
              </span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 CardioPredict.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;