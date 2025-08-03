export interface PatientData {
  name: string;
  age: number;
  gender: 'male' | 'female';
  chestPainType: 'typical' | 'atypical' | 'non-anginal' | 'asymptomatic';
  restingBP: number;
  cholesterol: number;
  fastingBS: boolean;
  restingECG: 'normal' | 'st-t-abnormality' | 'left-ventricular-hypertrophy';
  maxHeartRate: number;
  exerciseAngina: boolean;
  oldpeak: number;
  stSlope: 'up' | 'flat' | 'down';
  smoking: boolean;
  diabetes: boolean;
  familyHistory: boolean;
}

export interface Patient extends PatientData {
  id: string;
  date: string;
}

export interface PredictionResult {
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  probability: number;
  riskScore: number;
  recommendations: string[];
  riskFactors: string[];
  patient: Patient;
}

export interface RiskFactor {
  name: string;
  value: number | string | boolean;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
}