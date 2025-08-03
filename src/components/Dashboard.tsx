import React from 'react';
import { BarChart3, TrendingUp, Users, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Patient } from '../types/medical';

interface DashboardProps {
  patients: Patient[];
}

const Dashboard: React.FC<DashboardProps> = ({ patients }) => {
  // Calculate statistics
  const totalPatients = patients.length;
  const avgAge = patients.length > 0 ? 
    Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length) : 0;
  
  const riskDistribution = patients.reduce((acc, patient) => {
    // Simple risk calculation for demo
    let riskScore = 0;
    if (patient.age > 60) riskScore += 20;
    if (patient.restingBP > 140) riskScore += 15;
    if (patient.cholesterol > 240) riskScore += 15;
    if (patient.smoking) riskScore += 20;
    if (patient.diabetes) riskScore += 15;
    if (patient.familyHistory) riskScore += 10;
    
    if (riskScore < 25) acc.low++;
    else if (riskScore < 50) acc.moderate++;
    else if (riskScore < 75) acc.high++;
    else acc.veryHigh++;
    
    return acc;
  }, { low: 0, moderate: 0, high: 0, veryHigh: 0 });

  const genderDistribution = patients.reduce((acc, p) => {
    acc[p.gender]++;
    return acc;
  }, { male: 0, female: 0 });

  const recentPatients = patients.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Risk</p>
              <p className="text-3xl font-bold text-green-600">{riskDistribution.low}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-3xl font-bold text-orange-600">{riskDistribution.high + riskDistribution.veryHigh}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Age</p>
              <p className="text-3xl font-bold text-purple-600">{avgAge}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Risk Level Distribution</span>
          </h3>
          
          <div className="space-y-4">
            {[
              { label: 'Low Risk', count: riskDistribution.low, color: 'bg-green-500', total: totalPatients },
              { label: 'Moderate Risk', count: riskDistribution.moderate, color: 'bg-yellow-500', total: totalPatients },
              { label: 'High Risk', count: riskDistribution.high, color: 'bg-orange-500', total: totalPatients },
              { label: 'Very High Risk', count: riskDistribution.veryHigh, color: 'bg-red-500', total: totalPatients }
            ].map(({ label, count, color, total }) => (
              <div key={label} className="flex items-center space-x-3">
                <div className="w-20 text-sm text-gray-600">{label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${color} transition-all duration-500`}
                    style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }}
                  />
                </div>
                <div className="w-8 text-sm font-semibold text-gray-700">{count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Heart className="h-5 w-5 text-blue-600" />
            <span>Gender Distribution</span>
          </h3>
          
          <div className="space-y-4">
            {[
              { label: 'Male', count: genderDistribution.male, color: 'bg-blue-500' },
              { label: 'Female', count: genderDistribution.female, color: 'bg-pink-500' }
            ].map(({ label, count, color }) => (
              <div key={label} className="flex items-center space-x-3">
                <div className="w-16 text-sm text-gray-600">{label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${color} transition-all duration-500`}
                    style={{ width: totalPatients > 0 ? `${(count / totalPatients) * 100}%` : '0%' }}
                  />
                </div>
                <div className="w-8 text-sm font-semibold text-gray-700">{count}</div>
                <div className="w-12 text-sm text-gray-500">
                  {totalPatients > 0 ? `${Math.round((count / totalPatients) * 100)}%` : '0%'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Assessments */}
      {recentPatients.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Recent Assessments</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    BP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cholesterol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{patient.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.restingBP}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.cholesterol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(patient.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPatients === 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-12 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patient Data Yet</h3>
          <p className="text-gray-600">Start by conducting a risk assessment to see analytics here.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;