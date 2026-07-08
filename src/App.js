import React, { useState } from 'react';
import './App.css'; // We'll create this CSS file

export default function ComprehensiveDiseasePredictor() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Demographics
    age: '',
    gender: '',
    ethnicity: '',
    occupation: '',
    
    // Medical History
    pastIllnesses: {
      diabetes: false,
      hypertension: false,
      asthma: false,
      heartDisease: false,
      cancer: false
    },
    familyHistory: '',
    previousSurgeries: '',
    allergies: '',
    
    // Symptoms
    symptoms: {
      fever: false,
      cough: false,
      fatigue: false,
      headache: false,
      chestPain: false,
      shortnessOfBreath: false,
      dizziness: false,
      nausea: false
    },
    symptomDuration: '',
    symptomSeverity: '',
    
    // Vital Signs
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    
    // Lab Results
    bloodGlucose: '',
    cholesterol: '',
    hemoglobin: '',
    whiteBloodCells: '',
    
    // Lifestyle
    diet: '',
    physicalActivity: '',
    smoking: '',
    alcohol: '',
    sleepHours: '',
    
    // Environmental
    location: '',
    travelHistory: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedData = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const predictDisease = () => {
  setAnalyzing(true);
  setPrediction(null);

  // Call Flask backend API
  fetch('https://diseasebackend-1.onrender.com/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Backend not responding');
      }
      return response.json();
    })
    .then(data => {
      setPrediction({
        disease: data.disease,
        confidence: data.confidence,
        riskFactors: data.riskFactors,
        recommendations: data.recommendations,
        bmi: data.bmi,
        riskLevel: data.riskLevel
      });
      setAnalyzing(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setAnalyzing(false);
      alert('Failed to connect to backend. Please try again in a moment.');
    });
};

  const steps = [
    { num: 1, title: 'Demographics' },
    { num: 2, title: 'Medical History' },
    { num: 3, title: 'Symptoms' },
    { num: 4, title: 'Vital Signs' },
    { num: 5, title: 'Lab Results' },
    { num: 6, title: 'Lifestyle' },
    { num: 7, title: 'Results' }
  ];

  return (
    <div className="medical-app">
      {/* Background Effects */}
      <div className="floating-background">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-dot"
            style={{
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
  animationDuration: `${5 + Math.random() * 10}s`
}}


          />
        ))}
      </div>

      <div className="app-container">
        {/* Header */}
        <div className="header">
          <div className="header-icon">
            <div className="icon-circle">⚕</div>
          </div>
          <h1 className="app-title">ML Disease Prediction System</h1>
          <p className="app-subtitle"> Health Assessment & Analysis</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-container">
          <div className="steps-wrapper">
            {steps.map((step) => (
              <div key={step.num} className="step-item">
                <div
                  className={`step-circle ${
                    currentStep === step.num
                      ? 'step-active'
                      : currentStep > step.num
                      ? 'step-completed'
                      : 'step-inactive'
                  }`}
                >
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                <span
                  className={`step-label ${
                    currentStep === step.num ? 'step-label-active' : 'step-label-inactive'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="form-container">
          {/* Step 1: Demographics */}
          {currentStep === 1 && (
            <div className="form-step fade-in">
              <h2 className="step-title">
                <span className="step-icon">👤</span>
                Patient Demographics
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    className="form-input"
                    placeholder="Enter age"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => updateFormData('gender', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Ethnicity</label>
                  <input
                    type="text"
                    value={formData.ethnicity}
                    onChange={(e) => updateFormData('ethnicity', e.target.value)}
                    className="form-input"
                    placeholder="e.g., Caucasian, Asian, African"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => updateFormData('occupation', e.target.value)}
                    className="form-input"
                    placeholder="Current occupation"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Medical History */}
          {currentStep === 2 && (
            <div className="form-step fade-in">
              <h2 className="step-title">
                <span className="step-icon">📋</span>
                Medical History
              </h2>

              <div className="form-section">
                <label className="form-label">Past Chronic Conditions</label>
                <div className="conditions-grid">
                  {Object.keys(formData.pastIllnesses).map((illness) => (
                    <button
                      key={illness}
                      onClick={() => updateNestedData('pastIllnesses', illness, !formData.pastIllnesses[illness])}
                      className={`condition-button ${
                        formData.pastIllnesses[illness] ? 'condition-active' : 'condition-inactive'
                      }`}
                    >
                      <span className="condition-text">{illness}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Family History of Diseases</label>
                <textarea
                  value={formData.familyHistory}
                  onChange={(e) => updateFormData('familyHistory', e.target.value)}
                  className="form-textarea"
                  rows="3"
                  placeholder="e.g., Mother had diabetes, father had heart disease"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Previous Surgeries</label>
                <input
                  type="text"
                  value={formData.previousSurgeries}
                  onChange={(e) => updateFormData('previousSurgeries', e.target.value)}
                  className="form-input"
                  placeholder="List any previous surgeries"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Known Allergies</label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => updateFormData('allergies', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Penicillin, peanuts, pollen"
                />
              </div>
            </div>
          )}

          {/* Step 3: Symptoms */}
          {currentStep === 3 && (
            <div className="form-step fade-in">
              <h2 className="step-title">
                <span className="step-icon">🤒</span>
                Current Symptoms
              </h2>

              <div className="form-section">
                <label className="form-label">Select All Applicable Symptoms</label>
                <div className="symptoms-grid">
                  {Object.keys(formData.symptoms).map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => updateNestedData('symptoms', symptom, !formData.symptoms[symptom])}
                      className={`symptom-button ${
                        formData.symptoms[symptom] ? 'symptom-active' : 'symptom-inactive'
                      }`}
                    >
                      <span className="symptom-text">
                        {symptom.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Symptom Duration</label>
                  <select
                    value={formData.symptomDuration}
                    onChange={(e) => updateFormData('symptomDuration', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select duration</option>
                    <option value="<24hours">Less than 24 hours</option>
                    <option value="1-3days">1-3 days</option>
                    <option value="4-7days">4-7 days</option>
                    <option value=">1week">More than 1 week</option>
                    <option value=">1month">More than 1 month</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Symptom Severity</label>
                  <select
                    value={formData.symptomSeverity}
                    onChange={(e) => updateFormData('symptomSeverity', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select severity</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Vital Signs */}
          {currentStep === 4 && (
            <div className="form-step fade-in">
              <h2 className="step-title">
                <span className="step-icon">❤</span>
                Vital Signs
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Blood Pressure (mmHg)</label>
                  <input
                    type="text"
                    value={formData.bloodPressure}
                    onChange={(e) => updateFormData('bloodPressure', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 120/80"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => updateFormData('heartRate', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 72"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => updateFormData('temperature', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 98.6"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Respiratory Rate (breaths/min)</label>
                  <input
                    type="number"
                    value={formData.respiratoryRate}
                    onChange={(e) => updateFormData('respiratoryRate', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 16"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Oxygen Saturation (%)</label>
                  <input
                    type="number"
                    value={formData.oxygenSaturation}
                    onChange={(e) => updateFormData('oxygenSaturation', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 98"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Lab Results */}
          {currentStep === 5 && (
            <div className="form-step fade-in">
              <h2 className="step-title">
                <span className="step-icon">🧪</span>
                Laboratory Test Results
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Blood Glucose (mg/dL)</label>
                  <input
                    type="number"
                    value={formData.bloodGlucose}
                    onChange={(e) => updateFormData('bloodGlucose', e.target.value)}
                    className="form-input"
                    placeholder="Normal: 70-100 (fasting)"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Cholesterol (mg/dL)</label>
                  <input
                    type="number"
                    value={formData.cholesterol}
                    onChange={(e) => updateFormData('cholesterol', e.target.value)}
                    className="form-input"
                    placeholder="Desirable: <200"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hemoglobin (g/dL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.hemoglobin}
                    onChange={(e) => updateFormData('hemoglobin', e.target.value)}
                    className="form-input"
                    placeholder="Normal: 12-17"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">White Blood Cells (cells/μL)</label>
                  <input
                    type="number"
                    value={formData.whiteBloodCells}
                    onChange={(e) => updateFormData('whiteBloodCells', e.target.value)}
                    className="form-input"
                    placeholder="Normal: 4,000-11,000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Lifestyle */}
          {currentStep === 6 && (
            <div className="form-step fade-in">
              <h2 className="step-title">
                <span className="step-icon">🍎</span>
                Lifestyle & Environmental Factors
              </h2>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Diet Quality</label>
                  <select
                    value={formData.diet}
                    onChange={(e) => updateFormData('diet', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select diet quality</option>
                    <option value="excellent">Excellent (balanced, organic)</option>
                    <option value="good">Good (mostly healthy)</option>
                    <option value="fair">Fair (some processed foods)</option>
                    <option value="poor">Poor (mostly processed)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Physical Activity Level</label>
                  <select
                    value={formData.physicalActivity}
                    onChange={(e) => updateFormData('physicalActivity', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select activity level</option>
                    <option value="high">High (more than 5 days/week)</option>
                    <option value="moderate">Moderate (3-4 days/week)</option>
                    <option value="low">Low (1-2 days/week)</option>
                    <option value="sedentary">Sedentary</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Smoking Status</label>
                  <select
                    value={formData.smoking}
                    onChange={(e) => updateFormData('smoking', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select status</option>
                    <option value="never">Never</option>
                    <option value="former">Former smoker</option>
                    <option value="yes">Current smoker</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Alcohol Consumption</label>
                  <select
                    value={formData.alcohol}
                    onChange={(e) => updateFormData('alcohol', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select frequency</option>
                    <option value="none">None</option>
                    <option value="occasional">Occasional (1-2/week)</option>
                    <option value="moderate">Moderate (3-5/week)</option>
                    <option value="heavy">Heavy (daily)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sleep (hours/night)</label>
                  <input
                    type="number"
                    value={formData.sleepHours}
                    onChange={(e) => updateFormData('sleepHours', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 7"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location Type</label>
                  <select
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select location</option>
                    <option value="urban">Urban (high pollution)</option>
                    <option value="suburban">Suburban</option>
                    <option value="rural">Rural (low pollution)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Recent Travel History</label>
                  <input
                    type="text"
                    value={formData.travelHistory}
                    onChange={(e) => updateFormData('travelHistory', e.target.value)}
                    className="form-input"
                    placeholder="Countries visited in last 3 months"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 7: Results */}
          {currentStep === 7 && (
            <div className="form-step fade-in">
              <h2 className="step-title">
                <span className="step-icon">🧠</span>
                ML Prediction Results
              </h2>

              {!prediction && !analyzing && (
                <div className="results-placeholder">
                  <div className="placeholder-icon">📊</div>
                  <p className="placeholder-text">Ready to analyze your health data</p>
                  <button
                    onClick={predictDisease}
                    className="analyze-button"
                  >
                    Generate ML Prediction
                  </button>
                </div>
              )}

              {analyzing && (
                <div className="analyzing-state">
                  <div className="loading-spinner"></div>
                  <p className="analyzing-text">Analyzing health data...</p>
                  <p className="analyzing-subtext">Processing neural network analysis</p>
                </div>
              )}

              {prediction && !analyzing && (
                <div className="results-container">
                  {/* Main Prediction Card */}
                  <div className="prediction-card">
                    <div className="prediction-header">
                      <div>
                        <h3 className="prediction-title">Predicted Condition</h3>
                        <p className="prediction-disease">{prediction.disease}</p>
                      </div>
                      <div className={`risk-badge risk-${prediction.riskLevel.toLowerCase()}`}>
                        {prediction.riskLevel} Risk
                      </div>
                    </div>
                  
                    <div className="confidence-section">
                      <div className="confidence-header">
                        <span className="confidence-label">Confidence Level</span>
                        <span className="confidence-value">{prediction.confidence}%</span>
                      </div>
                      <div className="confidence-bar">
                        <div
                          className="confidence-progress"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                    </div>

                    {prediction.bmi && (
                      <div className="bmi-section">
                        <span className="bmi-label">Estimated BMI: </span>
                        <span className="bmi-value">{prediction.bmi}</span>
                      </div>
                    )}
                  </div>

                  {/* Risk Factors */}
                  <div className="risk-factors-card">
                    <h4 className="card-title">
                      <span className="warning-icon">⚠</span>
                      Identified Risk Factors
                    </h4>
                    <ul className="risk-list">
                      {prediction.riskFactors.map((factor, idx) => (
                        <li key={idx} className="risk-item">
                          <span className="risk-bullet">•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="recommendations-card">
                    <h4 className="card-title">
                      <span className="trend-icon">📈</span>
                      Medical Recommendations
                    </h4>
                    <ul className="recommendations-list">
                      {prediction.recommendations.map((rec, idx) => (
                        <li key={idx} className="recommendation-item">
                          <span className="recommendation-number">{idx + 1}</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button
                      onClick={() => {
                        setPrediction(null);
                        setCurrentStep(1);
                      }}
                      className="new-assessment-button"
                    >
                      New Assessment
                    </button>
                    <button
                      onClick={predictDisease}
                      className="reanalyze-button"
                    >
                      Reanalyze
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 7 && (
          <div className="navigation-buttons">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="nav-button prev-button"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
              className="nav-button next-button"
            >
              {currentStep === 6 ? 'View Results' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
