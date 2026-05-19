import express from 'express';
import { addComplaint, getAllComplaints, updateComplaintStatus, searchComplaintsByLocation, deleteComplaint } from '../controllers/complaintController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addComplaint);
router.get('/', protect, getAllComplaints);
router.get('/search', protect, searchComplaintsByLocation);
router.put('/:id', protect, updateComplaintStatus);
router.delete('/:id', protect, deleteComplaint);

export default router;
