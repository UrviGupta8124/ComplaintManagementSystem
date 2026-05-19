import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SubmitComplaint = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: '',
    description: '',
    category: '',
    location: ''
  });
  
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const analyzeWithAI = async () => {
    if (!formData.description) {
      setError("Please provide a description to analyze.");
      return;
    }
    setAnalyzing(true);
    setError('');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('https://complaint-backend-qste.onrender.com/api/ai/analyze', { text: formData.description }, config);
      setAiAnalysis(data);
    } catch (err) {
      setError("Failed to analyze complaint with AI.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const payload = { ...formData, aiAnalysis };
      await axios.post('https://complaint-backend-qste.onrender.com/api/complaints', payload, config);
      
      // Automatic response alert
      const responseMsg = aiAnalysis?.autoResponse || "Your complaint has been forwarded to the concerned department.";
      alert(responseMsg);
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-layout glass-panel">
        <div className="form-section">
          <h2>Register Complaint</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Electricity">Electricity</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Roads">Roads</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea>
            </div>
            
            <div className="action-buttons">
              <button type="button" onClick={analyzeWithAI} disabled={analyzing} className="btn-secondary">
                {analyzing ? 'Analyzing...' : 'AI Analysis'}
              </button>
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </form>
        </div>

        <div className="ai-section">
          <h3>AI Insights</h3>
          {aiAnalysis ? (
            <div className="ai-results">
              <div className="ai-card">
                <strong>Priority:</strong> <span className={`priority ${aiAnalysis.priority?.toLowerCase()}`}>{aiAnalysis.priority}</span>
              </div>
              <div className="ai-card">
                <strong>Suggested Dept:</strong> {aiAnalysis.department}
              </div>
              <div className="ai-card">
                <strong>Summary:</strong>
                <p>{aiAnalysis.summary}</p>
              </div>
              <div className="ai-card">
                <strong>Auto Response:</strong>
                <p><em>"{aiAnalysis.autoResponse}"</em></p>
              </div>
            </div>
          ) : (
            <div className="ai-placeholder">
              Click 'AI Analysis' to let our smart system analyze your complaint before submission.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
