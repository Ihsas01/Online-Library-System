# 📚 Online Library Management System

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18+-000000?style=for-the-badge&logo=express)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.1+-646CFF?style=for-the-badge&logo=vite)


</div>

---

## ✨ Features

### 🎯 Core Features
- **📖 Book Management**: Complete CRUD operations for books with rich metadata
- **👥 User Management**: Multi-role system (Students, Librarians, Admins)
- **🔍 Advanced Search**: Search and filter books by title, author, genre, availability
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🔐 Secure Authentication**: JWT-based authentication with role-based access
- **📊 Real-time Updates**: Live availability status and notifications

### 👨‍🎓 For Students/Readers
- 🔍 **Smart Search**: Find books quickly with advanced filters
- 📚 **Personal Bookshelf**: Track borrowed books and reading history
- ⏰ **Due Date Management**: Get notifications for upcoming due dates
- 💰 **Fine Tracking**: View and pay overdue fines
- ❤️ **Wishlist**: Save books for future reading
- 📱 **Mobile Friendly**: Access your library anywhere

### 👨‍💼 For Librarians
- 📚 **Catalog Management**: Add, edit, and remove books easily
- 👥 **User Management**: Handle user accounts and permissions
- 📊 **Analytics Dashboard**: Track borrowing patterns and popular books
- 🔔 **Notification System**: Automated overdue reminders
- 📈 **Reports**: Generate detailed reports and statistics

### 👨‍💻 For Administrators
- 🛠️ **System Management**: Complete control over the platform
- 📊 **Advanced Analytics**: Comprehensive system insights
- 👥 **User Administration**: Manage all user accounts and roles
- 🔧 **System Configuration**: Customize borrowing rules and policies
- 📦 **Bulk Operations**: Import/export books and user data

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **Vite** | 5.1.0 | Build Tool & Dev Server |
| **TailwindCSS** | 3.4.1 | Styling Framework |
| **Redux Toolkit** | 2.1.0 | State Management |
| **React Router** | 6.22.0 | Client-side Routing |
| **React Hook Form** | 7.50.1 | Form Management |
| **Axios** | 1.6.7 | HTTP Client |
| **Framer Motion** | 11.0.3 | Animations |
| **Headless UI** | 1.7.18 | Accessible Components |
| **Heroicons** | 2.1.1 | Icon Library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime Environment |
| **Express.js** | 4.18.2 | Web Framework |
| **MongoDB** | 7.0+ | Database |
| **Mongoose** | 7.0.3 | ODM |
| **JWT** | 9.0.0 | Authentication |
| **bcryptjs** | 2.4.3 | Password Hashing |
| **Express Validator** | 7.0.1 | Input Validation |
| **CORS** | 2.8.5 | Cross-origin Resource Sharing |
| **Morgan** | 1.10.0 | HTTP Request Logger |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v7.0 or higher)
- **npm** or **yarn** package manager

### Installation

**Clone the repository**
   ```bash
   git clone https://github.com/yourusername/online-library-system.git
   cd online-library-system
   ```

 **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

**Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```


 **Start Development Servers**

   **Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start at: `http://localhost:5000`

   **Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   App will start at: `http://localhost:5173`

 **Seed Database (Optional)**
   ```bash
   cd backend
   npm run seed
   ```

---

## 📁 Project Structure

```
📦 Online-Library-System/
├── 📂 backend/                    # Backend API Server
│   ├── 📂 controllers/            # Route Controllers
│   │   ├── 📄 bookController.js   # Book-related operations
│   │   └── 📄 userController.js   # User management
│   ├── 📂 middleware/             # Custom Middleware
│   │   └── 📄 auth.js            # Authentication middleware
│   ├── 📂 models/                 # Database Models
│   │   ├── 📄 Book.js            # Book schema
│   │   └── 📄 User.js            # User schema
│   ├── 📂 routes/                 # API Routes
│   │   ├── 📄 bookRoutes.js      # Book endpoints
│   │   └── 📄 userRoutes.js      # User endpoints
│   ├── 📄 package.json           # Backend dependencies
│   ├── 📄 server.js              # Express server setup
│   ├── 📄 seed.js                # Database seeding
│   └── 📄 seedData.js            # Sample data
│
├── 📂 frontend/                   # React Frontend Application
│   ├── 📂 public/                 # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/         # Reusable Components
│   │   │   ├── 📂 auth/          # Authentication components
│   │   │   ├── 📂 layout/        # Layout components
│   │   │   └── 📄 *.jsx          # Other components
│   │   ├── 📂 pages/             # Page Components
│   │   │   ├── 📄 Home.jsx       # Homepage
│   │   │   ├── 📄 Login.jsx      # Login page
│   │   │   ├── 📄 Register.jsx   # Registration page
│   │   │   ├── 📄 Dashboard.jsx  # User dashboard
│   │   │   ├── 📄 BookList.jsx   # Book catalog
│   │   │   └── 📄 *.jsx          # Other pages
│   │   ├── 📂 store/             # Redux Store
│   │   │   ├── 📂 slices/        # Redux slices
│   │   │   └── 📄 index.js       # Store configuration
│   │   ├── 📂 styles/            # Global styles
│   │   ├── 📄 App.jsx            # Main App component
│   │   └── 📄 main.jsx           # App entry point
│   ├── 📄 package.json           # Frontend dependencies
│   ├── 📄 vite.config.js         # Vite configuration
│   └── 📄 tailwind.config.js     # TailwindCSS configuration
│
├── 📄 README.md                   # Project documentation
└── 📄 BOOKS_SETUP.md             # Additional setup guide
```

---

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run test suite
npm run seed     # Seed database with sample data
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Books
- `GET /api/books` - Get all books (with filters)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book (Admin/Librarian)
- `PUT /api/books/:id` - Update book (Admin/Librarian)
- `DELETE /api/books/:id` - Delete book (Admin/Librarian)

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Borrowing
- `POST /api/books/:id/borrow` - Borrow a book
- `POST /api/books/:id/return` - Return a book
- `GET /api/users/:id/borrowed` - Get user's borrowed books

---

## 🎨 Screenshots

<div align="center">

### 🏠 Homepage
![Homepage](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Homepage+Screenshot)

### 📚 Book Catalog
![Book Catalog](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Book+Catalog+Screenshot)

### 👤 User Dashboard
![Dashboard](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=User+Dashboard+Screenshot)

### 🔐 Authentication
![Login](https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Login+Page+Screenshot)

</div>

---

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Add to backend/package.json
"engines": {
  "node": "18.x"
}

# Deploy to Heroku
heroku create your-library-app
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the project
cd frontend
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=dist
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **TailwindCSS** for the utility-first CSS framework
- **MongoDB** for the flexible database
- **Express.js** for the robust backend framework
- **Vite** for the lightning-fast build tool

---

## 📞 Support

- **Email**: support@librarysystem.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/online-library-system/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/online-library-system/wiki)

---

<div align="center">

**Made with ❤️ by [Your Name]**

[⬆ Back to Top](#-online-library-management-system)

</div>

