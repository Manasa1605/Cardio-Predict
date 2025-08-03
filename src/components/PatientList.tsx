import React, { useState } from 'react';
import { Search, Filter, User, Calendar, Heart, TrendingUp } from 'lucide-react';
import { Patient } from '../types/medical';

interface PatientListProps {
  patients: Patient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'age' | 'risk'>('date');

  const calculateRiskLevel = (patient: Patient): { level: string; score: number; color: string } => {
    let score = 0;
    
    // Age factor
    if (patient.age > 65) score += 25;
    else if (patient.age > 55) score += 15;
    else if (patient.age > 45) score += 10;
    
    // Blood pressure
    if (patient.restingBP > 140) score += 20;
    else if (patient.restingBP > 130) score += 10;
    
    // Cholesterol
    if (patient.cholesterol > 240) score += 15;
    else if (patient.cholesterol > 200) score += 8;
    
    // Risk factors
    if (patient.smoking) score += 20;
    if (patient.diabetes) score += 15;
    if (patient.familyHistory) score += 10;
    if (patient.exerciseAngina) score += 10;
    
    // Chest pain type
    if (patient.chestPainType === 'typical') score += 15;
    else if (patient.chestPainType === 'atypical') score += 10;
    
    // ECG abnormalities
    if (patient.restingECG !== 'normal') score += 8;
    
    // ST depression
    if (patient.oldpeak > 2) score += 10;
    else if (patient.oldpeak > 1) score += 5;
    
    // Gender factor (men typically higher risk at younger ages)
    if (patient.gender === 'male' && patient.age < 65) score += 5;
    
    // Max heart rate (lower is worse for age)
    const expectedMaxHR = 220 - patient.age;
    if (patient.maxHeartRate < expectedMaxHR * 0.8) score += 10;
    
    let level = 'Low';
    let color = 'text-green-600 bg-green-50';
    
    if (score >= 75) {
      level = 'Very High';
      color = 'text-red-600 bg-red-50';
    } else if (score >= 50) {
      level = 'High';
      color = 'text-orange-600 bg-orange-50';
    } else if (score >= 30) {
      level = 'Moderate';
      color = 'text-yellow-600 bg-yellow-50';
    }
    
    return { level, score: Math.min(score, 100), color };
  };

  const filteredAndSortedPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = filterGender === 'all' || patient.gender === filterGender;
      return matchesSearch && matchesGender;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return b.age - a.age;
        case 'risk':
          return calculateRiskLevel(b).score - calculateRiskLevel(a).score;
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value as 'all' | 'male' | 'female')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'age' | 'risk')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="age">Sort by Age</option>
              <option value="risk">Sort by Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Cards */}
      {filteredAndSortedPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPatients.map((patient) => {
            const risk = calculateRiskLevel(patient);
            return (
              <div key={patient.id} className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {patient.age} years • {patient.gender}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${risk.color}`}>
                    {risk.level} Risk
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Blood Pressure</span>
                    <span className={`text-sm font-semibold ${
                      patient.restingBP > 140 ? 'text-red-600' : 
                      patient.restingBP > 130 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {patient.restingBP} mmHg
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cholesterol</span>
                    <span className={`text-sm font-semibold ${
                      patient.cholesterol > 240 ? 'text-red-600' : 
                      patient.cholesterol > 200 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {patient.cholesterol} mg/dl
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Max Heart Rate</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {patient.maxHeartRate} bpm
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Risk Score</span>
                      <span className="text-sm font-semibold">{risk.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          risk.level === 'Low' ? 'bg-green-500' :
                          risk.level === 'Moderate' ? 'bg-yellow-500' :
                          risk.level === 'High' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${risk.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(patient.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-3">
                        {patient.smoking && <span className="text-red-500">🚬</span>}
                        {patient.diabetes && <span className="text-red-500">🩸</span>}
                        {patient.familyHistory && <span className="text-orange-500">👥</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : patients.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-12 text-center">
          <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patients Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-12 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patients Yet</h3>
          <p className="text-gray-600">Start by conducting risk assessments to build your patient database.</p>
        </div>
      )}
    </div>
  );
};

export default PatientList;