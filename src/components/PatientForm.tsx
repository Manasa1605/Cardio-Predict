import React, { useState } from 'react';
import { User, Heart, Activity, AlertCircle } from 'lucide-react';
import { PatientData } from '../types/medical';

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    age: 50,
    gender: 'male',
    chestPainType: 'typical',
    restingBP: 120,
    cholesterol: 200,
    fastingBS: false,
    restingECG: 'normal',
    maxHeartRate: 150,
    exerciseAngina: false,
    oldpeak: 1.0,
    stSlope: 'flat',
    smoking: false,
    diabetes: false,
    familyHistory: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof PatientData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-blue-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Patient Assessment</h2>
              <p className="text-gray-600">Enter patient information for heart disease risk analysis</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Personal Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clinical Measurements */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Clinical Measurements</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resting Blood Pressure (mmHg)
                </label>
                <input
                  type="number"
                  min="80"
                  max="250"
                  value={formData.restingBP}
                  onChange={(e) => handleInputChange('restingBP', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cholesterol (mg/dl)
                </label>
                <input
                  type="number"
                  min="100"
                  max="500"
                  value={formData.cholesterol}
                  onChange={(e) => handleInputChange('cholesterol', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Heart Rate Achieved
                </label>
                <input
                  type="number"
                  min="60"
                  max="220"
                  value={formData.maxHeartRate}
                  onChange={(e) => handleInputChange('maxHeartRate', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chest Pain Type
                </label>
                <select
                  value={formData.chestPainType}
                  onChange={(e) => handleInputChange('chestPainType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="typical">Typical Angina</option>
                  <option value="atypical">Atypical Angina</option>
                  <option value="non-anginal">Non-Anginal Pain</option>
                  <option value="asymptomatic">Asymptomatic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resting ECG
                </label>
                <select
                  value={formData.restingECG}
                  onChange={(e) => handleInputChange('restingECG', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="normal">Normal</option>
                  <option value="st-t-abnormality">ST-T Abnormality</option>
                  <option value="left-ventricular-hypertrophy">Left Ventricular Hypertrophy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ST Depression (Oldpeak)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.oldpeak}
                  onChange={(e) => handleInputChange('oldpeak', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <span>Risk Factors</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'fastingBS', label: 'Fasting Blood Sugar > 120 mg/dl' },
                { key: 'exerciseAngina', label: 'Exercise Induced Angina' },
                { key: 'smoking', label: 'Current/Former Smoker' },
                { key: 'diabetes', label: 'Diabetes Mellitus' },
                { key: 'familyHistory', label: 'Family History of Heart Disease' }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={key}
                    checked={formData[key as keyof PatientData] as boolean}
                    onChange={(e) => handleInputChange(key as keyof PatientData, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={key} className="text-sm font-medium text-gray-700">
                    {label}
                  </label>
                </div>
              ))}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ST Slope
                </label>
                <select
                  value={formData.stSlope}
                  onChange={(e) => handleInputChange('stSlope', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="up">Upsloping</option>
                  <option value="flat">Flat</option>
                  <option value="down">Downsloping</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2"
            >
              <Heart className="h-5 w-5" />
              <span>Analyze Risk</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;