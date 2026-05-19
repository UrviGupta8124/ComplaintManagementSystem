import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      let url = 'http://127.0.0.1:5005/api/complaints';
      if (searchTerm) {
        url = `http://127.0.0.1:5005/api/complaints/search?location=${searchTerm}`;
      }
      const { data } = await axios.get(url, config);
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [searchTerm]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://127.0.0.1:5005/api/complaints/${id}`, { status: newStatus }, config);
      fetchComplaints(); // Refresh list
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const filteredComplaints = filterCategory 
    ? complaints.filter(c => c.category === filterCategory) 
    : complaints;

  return (
    <div className="page-container dashboard">
      <div className="dashboard-header">
        <h2>Complaints Dashboard</h2>
        <div className="controls">
          <input 
            type="text" 
            placeholder="Search by location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Roads">Roads</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading complaints...</div>
      ) : (
        <div className="complaints-grid">
          {filteredComplaints.length === 0 ? (
            <p className="no-data">No complaints found.</p>
          ) : (
            filteredComplaints.map(complaint => (
              <div key={complaint._id} className="complaint-card glass-panel">
                <div className="card-header">
                  <h3>{complaint.title}</h3>
                  <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="card-body">
                  <p><strong>Category:</strong> {complaint.category}</p>
                  <p><strong>Location:</strong> {complaint.location}</p>
                  <p className="desc">{complaint.description}</p>
                  
                  {complaint.urgency && (
                    <div className="ai-insights-inline">
                      <h4>AI Analysis</h4>
                      <p><strong>Urgency:</strong> <span className={`priority ${complaint.urgency.toLowerCase()}`}>{complaint.urgency}</span></p>
                      <p><strong>Department:</strong> {complaint.department}</p>
                      <p><strong>Summary:</strong> {complaint.summary}</p>
                      <p><strong>Auto-Response:</strong> <em>{complaint.autoResponse}</em></p>
                    </div>
                  )}

                  <p className="date"><small>Submitted by {complaint.name} on {new Date(complaint.createdAt).toLocaleDateString()}</small></p>
                </div>
                <div className="card-footer">
                  <label>Update Status: </label>
                  <select 
                    value={complaint.status} 
                    onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
