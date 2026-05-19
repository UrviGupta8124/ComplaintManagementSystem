# AI-Based Smart Complaint Management System

A full-stack MERN application that allows users to register complaints online. The system uses the OpenRouter AI API to intelligently analyze complaints, classify their priority, generate automated responses, and recommend the appropriate responsible department.

## Live Links
- **Frontend (Live App):** [https://complaint-frontend-0i7l.onrender.com](https://complaint-frontend-0i7l.onrender.com)
- **Backend API:** `https://complaint-backend-qste.onrender.com`

## Features
- **Secure Authentication:** JWT-based user login and registration.
- **Complaint Registration:** Submit detailed complaints with location and category mapping.
- **AI-Based Analysis:** Automatically detect complaint urgency, summarize the issue, and assign a department.
- **Complaint Tracking:** Dashboard to filter by category, search by location, and update statuses (Pending, In Progress, Resolved).
- **Modern UI/UX:** Built with React and Vite using a responsive, glassmorphism-inspired design system.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **AI Integration:** OpenRouter API
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

## Environment Variables
To run this project locally, you will need to add the following environment variables to your `backend/.env` file:

```env
PORT=5005
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UrviGupta8124/ComplaintManagementSystem.git
   cd ComplaintManagementSystem
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Start the Frontend:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## API Endpoints

### Authentication
- **Register User:** `POST /api/auth/register`
- **Login User:** `POST /api/auth/login`

### Complaints (Requires JWT Bearer Token)
- **Create Complaint:** `POST /api/complaints`
- **Get All Complaints:** `GET /api/complaints`
- **Search by Location:** `GET /api/complaints/search?location={location}`
- **Update Status:** `PUT /api/complaints/:id`
- **Delete Complaint:** `DELETE /api/complaints/:id`

### AI Integration
- **Analyze Complaint:** `POST /api/ai/analyze`
