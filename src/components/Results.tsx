import React from 'react';
import { AlertTriangle, CheckCircle, Heart, TrendingUp, FileText, User } from 'lucide-react';
import { PredictionResult } from '../types/medical';

interface ResultsProps {
  result: PredictionResult;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'very-high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle className="h-8 w-8" />;
      case 'moderate': return <AlertTriangle className="h-8 w-8" />;
      case 'high': return <AlertTriangle className="h-8 w-8" />;
      case 'very-high': return <AlertTriangle className="h-8 w-8" />;
      default: return <Heart className="h-8 w-8" />;
    }
  };

  const formatRiskLevel = (riskLevel: string) => {
    return riskLevel.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Patient Info Header */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{result.patient.name}</h2>
              <p className="text-gray-600">
                {result.patient.age} years old • {result.patient.gender} • 
                Assessed on {new Date(result.patient.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Risk Score</div>
            <div className="text-3xl font-bold text-gray-900">{result.riskScore}/100</div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`bg-white rounded-xl shadow-lg border p-6 ${getRiskColor(result.riskLevel)}`}>
          <div className="flex items-center space-x-4 mb-4">
            {getRiskIcon(result.riskLevel)}
            <div>
              <h3 className="text-2xl font-bold">Risk Level: {formatRiskLevel(result.riskLevel)}</h3>
              <p className="text-lg">Probability: {(result.probability * 100).toFixed(1)}%</p>
            </div>
          </div>
          
          {/* Risk Level Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Risk Assessment</span>
              <span>{(result.probability * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  result.riskLevel === 'low' ? 'bg-green-500' :
                  result.riskLevel === 'moderate' ? 'bg-yellow-500' :
                  result.riskLevel === 'high' ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${result.probability * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Key Metrics</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.patient.restingBP}</div>
              <div className="text-sm text-gray-600">Resting BP</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{result.patient.cholesterol}</div>
              <div className="text-sm text-gray-600">Cholesterol</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{result.patient.maxHeartRate}</div>
              <div className="text-sm text-gray-600">Max HR</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{result.patient.oldpeak}</div>
              <div className="text-sm text-gray-600">ST Depression</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Risk Factors Identified</span>
          </h3>
          
          {result.riskFactors.length > 0 ? (
            <ul className="space-y-3">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="bg-red-100 p-1 rounded-full mt-0.5">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  </div>
                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">No significant risk factors identified.</p>
          )}
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Recommendations</span>
          </h3>
          
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span>Clinical Summary</span>
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">
            Based on the machine learning analysis of {result.patient.name}'s clinical data, 
            the model predicts a <strong>{formatRiskLevel(result.riskLevel)}</strong> risk level 
            for heart disease with a probability of <strong>{(result.probability * 100).toFixed(1)}%</strong>. 
            The risk score of <strong>{result.riskScore}/100</strong> is calculated using multiple 
            clinical parameters including cardiovascular metrics, medical history, and lifestyle factors.
          </p>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This assessment is for educational and research purposes only. 
              It should not replace professional medical advice, diagnosis, or treatment. 
              Please consult with healthcare professionals for proper medical evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;