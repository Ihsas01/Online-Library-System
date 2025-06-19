import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './store';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// React Router future flags to suppress warnings
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

function PrivateRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Provider store={store}>
      <Router {...router}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute adminOnly>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
