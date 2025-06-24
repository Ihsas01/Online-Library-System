# 📚 Online Library Management System

A full-stack web application for managing library operations, built with **React**, **Node.js**, **Express**, and **MongoDB**.

## ✨ Main Features
### Core
- **Book Management**: CRUD operations for books
- **User Management**: Roles (Students, Librarians, Admins)
- **Advanced Search**: Filter by title, author, genre, availability
- **Responsive Design**: Mobile-friendly UI
- **Secure Authentication**: JWT-based with role-based access
- **Real-time Updates**: Live availability and notifications

### Students
- **Smart Search**: Quick book filtering
- **Personal Bookshelf**: Track borrowed books/history
- **Due Date Management**: Notifications for due dates
- **Fine Tracking**: View/pay overdue fines
- **Wishlist**: Save books for later

### Librarians
- **Catalog Management**: Add/edit/remove books
- **User Management**: Handle accounts/permissions
- **Analytics Dashboard**: Track borrowing patterns

### Admins
- **System Management**: Full platform control
- **Advanced Analytics**: System insights
- **Bulk Operations**: Import/export data

## 🛠️ Tech Stack
### Frontend
- **React** (18.2.0), **Vite** (5.1.0), **TailwindCSS** (3.4.1)
- **Redux Toolkit**, **React Router**, **Axios**

### Backend
- **Node.js** (18+), **Express.js** (4.18.2), **MongoDB** (7.0+)
- **Mongoose**, **JWT**, **bcryptjs**

## 🚀 Quick Start
### Prerequisites
- Node.js (v18+)
- MongoDB (v7.0+)

### Installation
1. Clone repo:
   ```bash
   git clone https://github.com/Ihsas01/Online-Library-System.git
   cd online-library-system
   ```
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Start servers:
   ```bash
   cd backend && npm run dev  # http://localhost:5000
   cd ../frontend && npm run dev  # http://localhost:5173
   ```

## 🔐 API Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`
- **Books**: `/api/books`, `/api/books/:id` (CRUD)
- **Users**: `/api/users`, `/api/users/:id` (CRUD)
- **Borrowing**: `/api/books/:id/borrow`, `/api/books/:id/return`

## 🚀 Deployment
- **Backend**: Heroku
  ```bash
  heroku create your-library-app
  heroku config:set MONGODB_URI=your_mongodb_atlas_uri
  heroku config:set JWT_SECRET=your_jwt_secret
  git push heroku main
  ```
- **Frontend**: Vercel/Netlify
  ```bash
  cd frontend
  npm run build
  vercel --prod
  ```

## 📞 Support
- [GitHub Issues](https://github.com/Ihsas01/online-library-system/issues)
- Email: mohamedihsas001@gmail.com
