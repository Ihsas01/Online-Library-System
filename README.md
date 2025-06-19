# 📚 Online Library Management System

A full-featured online library management system built with React, Node.js, and MongoDB.

## 🌟 Features

### For Users (Students/Readers)
- Search and filter books by title, author, genre, availability
- View detailed book descriptions with cover images
- Check real-time availability and reserve books
- Borrow and return books online
- Manage current loans, due dates, and fines
- Personal bookshelf and wishlist
- User dashboard with borrowing history

### For Librarians
- Manage book catalog (add, update, remove)
- Set borrowing limits and fine rules
- Track user activities
- Handle book reservations
- Manage overdue notifications

### For Admins
- User management (students, librarians, admins)
- Platform analytics
- Content moderation
- Bulk book import/export
- System-wide notifications

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Redux Toolkit
- React Router
- React Hook Form
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Express Validator

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Online-Library
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=your_jwt_secret
```

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 📁 Project Structure

```
Online-Library/
├── backend/           # Node.js + Express backend
│   ├── controllers/   # Route controllers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── utils/         # Utility functions
│
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
```

## 🔐 Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation

