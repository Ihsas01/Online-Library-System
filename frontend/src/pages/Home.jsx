import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/bookSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  AcademicCapIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";

// Featured books data (you can replace this with your actual data)
const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age."
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    description: "A classic of modern American literature, this novel deals with serious issues like rape and racial inequality."
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.6,
    description: "A dystopian novel set in a totalitarian society where critical thought is suppressed."
  }
];

// Features data
const features = [
  {
    name: 'Extensive Collection',
    description: 'Access thousands of books across all genres, from classics to contemporary bestsellers.',
    icon: BookOpenIcon,
  },
  {
    name: 'Expert Curation',
    description: 'Carefully selected books by our team of literary experts and librarians.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Personalized Experience',
    description: 'Get book recommendations tailored to your reading preferences.',
    icon: SparklesIcon,
  },
  {
    name: 'Passion for Reading',
    description: 'We believe in the transformative power of reading and lifelong learning.',
    icon: HeartIcon,
  },
];

// Trending categories
const categories = [
  { name: 'Fiction', count: 2500, icon: BookOpenIcon },
  { name: 'Science', count: 1800, icon: AcademicCapIcon },
  { name: 'History', count: 1200, icon: GlobeAltIcon },
  { name: 'Biography', count: 900, icon: UserGroupIcon },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    content: "This digital library has transformed my reading experience. The collection is vast and the interface is intuitive.",
    author: "Sarah Johnson",
    role: "Book Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    content: "As a student, having access to such a comprehensive library has been invaluable for my research and studies.",
    author: "Michael Chen",
    role: "Graduate Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    content: "The personalized recommendations are spot-on! I've discovered so many new authors and genres.",
    author: "Emma Davis",
    role: "Librarian",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  }
];

export default function Home() {
  const dispatch = useDispatch();
  const { books = [], loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchRef = useRef(null);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    dispatch(fetchBooks({ limit: 6 }));
    
    // Auto-advance carousel
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
    }, 5000);
    
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    // Auto-advance testimonials
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Handle click outside search
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#4300FF] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error loading books</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
      {/* Hero Section with Particles */}
      <div className="relative overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              opacity: { value: 0.5 },
              size: { value: 3 },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              }
            },
            retina_detect: true
          }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF] via-[#0065F8] to-[#00CAFF] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative"
        >
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl"
            >
              <span className="block bg-gradient-to-r from-[#00FFDE] to-[#00CAFF] bg-clip-text text-transparent">
                Welcome to Our Digital Library
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-white/90"
            >
              Discover thousands of books, connect with readers, and explore new worlds through literature.
            </motion.p>
            
            {/* Enhanced Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 max-w-xl mx-auto" 
              ref={searchRef}
            >
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for books, authors, or genres..."
                  className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#00FFDE] transition-all duration-300 group-hover:bg-white/20"
                  onFocus={() => setIsSearchVisible(true)}
                />
                <MagnifyingGlassIcon className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex justify-center gap-4"
            >
              {user ? (
                <Link
                  to="/books"
                  className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
                    <ArrowRightIcon className="w-5 h-5" />
                  </span>
                  <span className="relative text-sm font-medium transition-all duration-300 group-hover:mr-4">
                    Browse Books
                  </span>
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
                    <ArrowRightIcon className="w-5 h-5" />
                  </span>
                  <span className="relative text-sm font-medium transition-all duration-300 group-hover:mr-4">
                    Join Now
                  </span>
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Categories Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Popular Categories
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/10 to-[#00FFDE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <category.icon className="h-12 w-12 text-[#4300FF] mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} books</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-[#4300FF] text-white shadow-lg hover:bg-[#00FFDE] transition-colors duration-300 z-50"
          >
            <ArrowUpIcon className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Features Section with 3D Cards */}
      <div className="py-20 bg-gradient-to-br from-white to-[#4300FF]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Why Choose Our Library
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative mb-4"
                  >
                    <feature.icon className="h-12 w-12 text-[#4300FF]" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section with Modern Carousel */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                What Our Readers Say
              </span>
            </h2>
          </motion.div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                animate={{ x: `${-currentTestimonial * 100}%` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl p-8 shadow-lg relative"
                    >
                      <div className="absolute -top-4 left-8">
                        <div className="w-8 h-8 bg-[#4300FF] rounded-full flex items-center justify-center">
                          <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-gray-900">{testimonial.author}</h4>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-[#4300FF] scale-125'
                      : 'bg-gray-300 hover:bg-[#4300FF]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Enhanced UI */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/10 to-[#00FFDE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[#4300FF] to-[#00CAFF] text-white mb-6">
                  <BookOpenIcon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
                <p className="text-gray-600">Books in our collection</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/10 to-[#00FFDE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[#4300FF] to-[#00CAFF] text-white mb-6">
                  <UserGroupIcon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50,000+</h3>
                <p className="text-gray-600">Active readers</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/10 to-[#00FFDE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[#4300FF] to-[#00CAFF] text-white mb-6">
                  <GlobeAltIcon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Global</h3>
                <p className="text-gray-600">Access from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action Section */}
      <div className="py-24 bg-gradient-to-br from-[#4300FF] via-[#0065F8] to-[#00CAFF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white animate-fade-in">
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              <span className="bg-gradient-to-r from-[#00FFDE] to-[#00CAFF] bg-clip-text text-transparent">
                Start Your Reading Journey Today
              </span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
              Join our community of readers and discover your next favorite book.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              {user ? (
                <Link
                  to="/books"
                  className="btn bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white group transition-all duration-300 transform hover:scale-105"
                >
                  Browse Books
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="btn bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white group transition-all duration-300 transform hover:scale-105"
                >
                  Join Now
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
