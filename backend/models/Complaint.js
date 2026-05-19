import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  description: String,
  category: String,
  location: String,
  status: {
    type: String,
    default: "Pending"
  },
  urgency: String,
  department: String,
  summary: String,
  autoResponse: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Complaint', ComplaintSchema);
