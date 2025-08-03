import { PatientData, PredictionResult, RiskFactor } from '../types/medical';

/**
 * Heart Disease Prediction Model
 * This implements a rule-based classification system inspired by clinical guidelines
 * and research findings. In a real application, this would be replaced with a
 * trained machine learning model (e.g., logistic regression, random forest, etc.)
 */

export function predictHeartDisease(patient: PatientData): Omit<PredictionResult, 'patient'> {
  const riskFactors: RiskFactor[] = [];
  let totalRiskScore = 0;

  // Age factor (Framingham Risk Score inspired)
  if (patient.age >= 70) {
    riskFactors.push({ name: 'Advanced age (≥70)', value: patient.age, impact: 'negative', weight: 25 });
    totalRiskScore += 25;
  } else if (patient.age >= 60) {
    riskFactors.push({ name: 'Older age (60-69)', value: patient.age, impact: 'negative', weight: 15 });
    totalRiskScore += 15;
  } else if (patient.age >= 50) {
    riskFactors.push({ name: 'Middle age (50-59)', value: patient.age, impact: 'negative', weight: 10 });
    totalRiskScore += 10;
  } else if (patient.age >= 40) {
    totalRiskScore += 5;
  }

  // Gender factor
  if (patient.gender === 'male' && patient.age < 65) {
    riskFactors.push({ name: 'Male gender (higher risk at younger age)', value: patient.gender, impact: 'negative', weight: 8 });
    totalRiskScore += 8;
  }

  // Blood pressure (AHA guidelines)
  if (patient.restingBP >= 180) {
    riskFactors.push({ name: 'Severe hypertension (≥180 mmHg)', value: patient.restingBP, impact: 'negative', weight: 20 });
    totalRiskScore += 20;
  } else if (patient.restingBP >= 140) {
    riskFactors.push({ name: 'High blood pressure (140-179 mmHg)', value: patient.restingBP, impact: 'negative', weight: 15 });
    totalRiskScore += 15;
  } else if (patient.restingBP >= 130) {
    riskFactors.push({ name: 'Elevated blood pressure (130-139 mmHg)', value: patient.restingBP, impact: 'negative', weight: 8 });
    totalRiskScore += 8;
  }

  // Cholesterol levels
  if (patient.cholesterol >= 300) {
    riskFactors.push({ name: 'Very high cholesterol (≥300 mg/dl)', value: patient.cholesterol, impact: 'negative', weight: 20 });
    totalRiskScore += 20;
  } else if (patient.cholesterol >= 240) {
    riskFactors.push({ name: 'High cholesterol (240-299 mg/dl)', value: patient.cholesterol, impact: 'negative', weight: 15 });
    totalRiskScore += 15;
  } else if (patient.cholesterol >= 200) {
    riskFactors.push({ name: 'Borderline high cholesterol (200-239 mg/dl)', value: patient.cholesterol, impact: 'negative', weight: 8 });
    totalRiskScore += 8;
  }

  // Chest pain type (clinical significance)
  switch (patient.chestPainType) {
    case 'typical':
      riskFactors.push({ name: 'Typical angina chest pain', value: patient.chestPainType, impact: 'negative', weight: 20 });
      totalRiskScore += 20;
      break;
    case 'atypical':
      riskFactors.push({ name: 'Atypical angina chest pain', value: patient.chestPainType, impact: 'negative', weight: 12 });
      totalRiskScore += 12;
      break;
    case 'non-anginal':
      totalRiskScore += 5;
      break;
    case 'asymptomatic':
      // No immediate risk, but could be concerning if other factors present
      break;
  }

  // Fasting blood sugar
  if (patient.fastingBS) {
    riskFactors.push({ name: 'Elevated fasting blood sugar (>120 mg/dl)', value: patient.fastingBS, impact: 'negative', weight: 10 });
    totalRiskScore += 10;
  }

  // Resting ECG abnormalities
  if (patient.restingECG === 'left-ventricular-hypertrophy') {
    riskFactors.push({ name: 'Left ventricular hypertrophy on ECG', value: patient.restingECG, impact: 'negative', weight: 15 });
    totalRiskScore += 15;
  } else if (patient.restingECG === 'st-t-abnormality') {
    riskFactors.push({ name: 'ST-T wave abnormalities on ECG', value: patient.restingECG, impact: 'negative', weight: 10 });
    totalRiskScore += 10;
  }

  // Maximum heart rate achieved (age-adjusted)
  const expectedMaxHR = 220 - patient.age;
  const hrReserve = patient.maxHeartRate / expectedMaxHR;
  
  if (hrReserve < 0.75) {
    riskFactors.push({ name: 'Poor exercise capacity (low max heart rate)', value: patient.maxHeartRate, impact: 'negative', weight: 12 });
    totalRiskScore += 12;
  } else if (hrReserve < 0.85) {
    totalRiskScore += 6;
  }

  // Exercise-induced angina
  if (patient.exerciseAngina) {
    riskFactors.push({ name: 'Exercise-induced angina', value: patient.exerciseAngina, impact: 'negative', weight: 15 });
    totalRiskScore += 15;
  }

  // ST depression (Oldpeak)
  if (patient.oldpeak >= 3.0) {
    riskFactors.push({ name: 'Severe ST depression (≥3.0)', value: patient.oldpeak, impact: 'negative', weight: 18 });
    totalRiskScore += 18;
  } else if (patient.oldpeak >= 2.0) {
    riskFactors.push({ name: 'Moderate ST depression (2.0-2.9)', value: patient.oldpeak, impact: 'negative', weight: 12 });
    totalRiskScore += 12;
  } else if (patient.oldpeak >= 1.0) {
    riskFactors.push({ name: 'Mild ST depression (1.0-1.9)', value: patient.oldpeak, impact: 'negative', weight: 6 });
    totalRiskScore += 6;
  }

  // ST slope
  if (patient.stSlope === 'down') {
    riskFactors.push({ name: 'Downsloping ST segment', value: patient.stSlope, impact: 'negative', weight: 15 });
    totalRiskScore += 15;
  } else if (patient.stSlope === 'flat') {
    riskFactors.push({ name: 'Flat ST segment', value: patient.stSlope, impact: 'negative', weight: 8 });
    totalRiskScore += 8;
  }

  // Lifestyle and comorbidity factors
  if (patient.smoking) {
    riskFactors.push({ name: 'Current or former smoker', value: patient.smoking, impact: 'negative', weight: 20 });
    totalRiskScore += 20;
  }

  if (patient.diabetes) {
    riskFactors.push({ name: 'Diabetes mellitus', value: patient.diabetes, impact: 'negative', weight: 18 });
    totalRiskScore += 18;
  }

  if (patient.familyHistory) {
    riskFactors.push({ name: 'Family history of heart disease', value: patient.familyHistory, impact: 'negative', weight: 12 });
    totalRiskScore += 12;
  }

  // Cap the total risk score at 100
  totalRiskScore = Math.min(totalRiskScore, 100);

  // Calculate probability (sigmoid-like function)
  const probability = 1 / (1 + Math.exp(-(totalRiskScore - 40) / 15));

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  if (totalRiskScore < 25) {
    riskLevel = 'low';
  } else if (totalRiskScore < 50) {
    riskLevel = 'moderate';
  } else if (totalRiskScore < 75) {
    riskLevel = 'high';
  } else {
    riskLevel = 'very-high';
  }

  // Generate recommendations based on risk factors and level
  const recommendations = generateRecommendations(patient, riskLevel, riskFactors);
  
  // Extract risk factor descriptions
  const riskFactorDescriptions = riskFactors.map(factor => factor.name);

  return {
    riskLevel,
    probability,
    riskScore: totalRiskScore,
    recommendations,
    riskFactors: riskFactorDescriptions
  };
}

function generateRecommendations(
  patient: PatientData, 
  riskLevel: string, 
  riskFactors: RiskFactor[]
): string[] {
  const recommendations: string[] = [];

  // Universal recommendations
  recommendations.push('Schedule regular check-ups with your cardiologist');
  
  if (riskLevel === 'low') {
    recommendations.push('Continue maintaining a healthy lifestyle');
    recommendations.push('Exercise regularly (150 minutes moderate activity per week)');
    recommendations.push('Follow a heart-healthy diet rich in fruits and vegetables');
  } else {
    recommendations.push('Consult with a cardiologist for comprehensive evaluation');
    
    if (riskLevel === 'very-high' || riskLevel === 'high') {
      recommendations.push('Consider immediate medical evaluation');
      recommendations.push('May require cardiac stress testing or imaging');
    }
  }

  // Specific recommendations based on risk factors
  if (patient.restingBP > 140) {
    recommendations.push('Blood pressure management is critical - discuss medications with your doctor');
    recommendations.push('Reduce sodium intake and maintain healthy weight');
  }

  if (patient.cholesterol > 240) {
    recommendations.push('Cholesterol management required - consider statin therapy');
    recommendations.push('Follow a low-cholesterol, low-saturated fat diet');
  }

  if (patient.smoking) {
    recommendations.push('Smoking cessation is the single most important step');
    recommendations.push('Consider nicotine replacement therapy or counseling');
  }

  if (patient.diabetes) {
    recommendations.push('Optimal diabetes control is essential for heart health');
    recommendations.push('Monitor HbA1c levels regularly');
  }

  if (patient.exerciseAngina || patient.oldpeak > 2) {
    recommendations.push('Avoid strenuous exercise until cleared by cardiologist');
    recommendations.push('Consider cardiac rehabilitation program');
  }

  if (patient.age > 60) {
    recommendations.push('Consider annual cardiac screening');
    recommendations.push('Monitor for symptoms: chest pain, breathlessness, fatigue');
  }

  // Lifestyle recommendations
  if (riskLevel !== 'low') {
    recommendations.push('Adopt Mediterranean diet or DASH diet');
    recommendations.push('Maintain healthy weight (BMI 18.5-25)');
    recommendations.push('Limit alcohol consumption');
    recommendations.push('Manage stress through relaxation techniques');
  }

  return recommendations;
}