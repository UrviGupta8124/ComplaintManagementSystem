import Complaint from '../models/Complaint.js';

export const addComplaint = async (req, res) => {
  try {
    const { name, email, title, description, category, location, aiAnalysis } = req.body;
    if (!title) return res.status(400).json({ message: "Validation error: Title is required" });
    
    const complaintData = { name, email, title, description, category, location };
    if (aiAnalysis) {
      complaintData.urgency = aiAnalysis.priority;
      complaintData.department = aiAnalysis.department;
      complaintData.summary = aiAnalysis.summary;
      complaintData.autoResponse = aiAnalysis.autoResponse;
    }

    const newComplaint = await Complaint.create(complaintData);
    res.status(201).json({ message: "Complaint stored successfully", complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedComplaint) return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchComplaintsByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    const complaints = await Complaint.find({ location: new RegExp(location, 'i') });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json({ message: "Complaint removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
