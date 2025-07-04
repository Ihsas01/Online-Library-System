import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/bookSlice';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
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
  ArrowUpIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";
import AnimatedCounter from '../components/AnimatedCounter';

// Enhanced featured books data with more details
const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age.",
    genre: "Classic Fiction",
    pages: 180,
    readTime: "3-4 hours",
    trending: true
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    description: "A classic of modern American literature, this novel deals with serious issues like rape and racial inequality.",
    genre: "Classic Fiction",
    pages: 281,
    readTime: "4-5 hours",
    trending: true
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.6,
    description: "A dystopian novel set in a totalitarian society where critical thought is suppressed.",
    genre: "Science Fiction",
    pages: 328,
    readTime: "5-6 hours",
    trending: false
  }
];

// Enhanced features data
const features = [
  {
    name: 'Extensive Collection',
    description: 'Access thousands of books across all genres, from classics to contemporary bestsellers.',
    icon: BookOpenIcon,
    color: 'from-blue-500 to-cyan-500',
    stats: '10,000+ Books'
  },
  {
    name: 'Expert Curation',
    description: 'Carefully selected books by our team of literary experts and librarians.',
    icon: AcademicCapIcon,
    color: 'from-purple-500 to-pink-500',
    stats: 'Expert Team'
  },
  {
    name: 'Personalized Experience',
    description: 'Get book recommendations tailored to your reading preferences.',
    icon: SparklesIcon,
    color: 'from-yellow-500 to-orange-500',
    stats: 'AI Powered'
  },
  {
    name: 'Passion for Reading',
    description: 'We believe in the transformative power of reading and lifelong learning.',
    icon: HeartIcon,
    color: 'from-red-500 to-pink-500',
    stats: 'Community Driven'
  },
];

// Enhanced categories with more details
const categories = [
  { name: 'Fiction', count: 2500, icon: BookOpenIcon, color: 'from-blue-500 to-cyan-500', trending: true },
  { name: 'Science', count: 1800, icon: AcademicCapIcon, color: 'from-green-500 to-emerald-500', trending: false },
  { name: 'History', count: 1200, icon: GlobeAltIcon, color: 'from-amber-500 to-orange-500', trending: true },
  { name: 'Biography', count: 900, icon: UserGroupIcon, color: 'from-purple-500 to-pink-500', trending: false },
];

// Enhanced testimonials
const testimonials = [
  {
    id: 1,
    content: "This digital library has transformed my reading experience. The collection is vast and the interface is intuitive.",
    author: "Sarah Johnson",
    role: "Book Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: 2,
    content: "As a student, having access to such a comprehensive library has been invaluable for my research and studies.",
    author: "Michael Chen",
    role: "Graduate Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: 3,
    content: "The personalized recommendations are spot-on! I've discovered so many new authors and genres.",
    author: "Emma Davis",
    role: "Librarian",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    rating: 5
  }
];

// Animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const dispatch = useDispatch();
  const { books = [], loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const heroRef = useRef(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    dispatch(fetchBooks({ limit: 6 }));
    
    // Auto-advance carousel with pause/resume functionality
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
      }, 5000);
    }
    
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, isPlaying]);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  // --- NEW: Scroll progress bar ---
  const { scrollYProgress: pageScrollY } = useScroll();
  const progressBarWidth = useTransform(pageScrollY, [0, 1], ['0%', '100%']);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-gray-900 mb-2">Error loading books</p>
          <p className="text-sm text-gray-600">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 overflow-x-hidden">
      {/* --- NEW: Scroll Progress Bar --- */}
      <motion.div
        style={{ width: progressBarWidth }}
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-[#00FFDE] via-[#4300FF] to-[#00CAFF] z-50 shadow-lg"
      />
      {/* Enhanced Hero Section with Parallax, Glassmorphism, and Animated SVGs */}
      <div ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
        {/* --- NEW: Animated SVG Blobs --- */}
        <motion.svg
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] z-0"
          viewBox="0 0 600 600"
          fill="none"
        >
          <motion.path
            d="M300,60C390,80,540,180,500,300C460,420,320,540,200,500C80,460,60,390,100,270C140,150,210,40,300,60Z"
            fill="url(#blobGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <defs>
            <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00FFDE" />
              <stop offset="100%" stopColor="#4300FF" />
            </linearGradient>
          </defs>
        </motion.svg>
        {/* --- NEW: Glassmorphism Card Overlay for Hero --- */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 100, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              opacity: { value: 0.6 },
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
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-[#4300FF] via-[#0065F8] to-[#00CAFF] opacity-90" 
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        {/* --- NEW: Glassy Card --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6 py-20 sm:py-32 relative z-10 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-gray-900 text-sm font-medium mb-4 shadow-lg">
                <SparklesIcon className="w-4 h-4 mr-2 animate-pulse text-[#00CAFF]" />
                Discover Your Next Favorite Book
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-xl"
            >
              <span className="block bg-gradient-to-r from-[#00FFDE] to-[#00CAFF] bg-clip-text text-transparent animate-gradient-x">
                Welcome to Our
              </span>
              <span className="block mt-2">Digital Library</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 leading-relaxed"
            >
              Discover thousands of books, connect with readers, and explore new worlds through literature. 
              Your journey into knowledge starts here.
            </motion.p>
            {/* Enhanced Search Bar with Glow and Micro-interactions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 max-w-2xl mx-auto" 
              ref={searchRef}
            >
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for books, authors, or genres..."
                  className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#00FFDE]/60 focus:ring-offset-2 focus:ring-offset-[#4300FF]/10 transition-all duration-300 group-hover:bg-white/30 text-lg shadow-xl border border-white/20"
                  onFocus={() => setIsSearchVisible(true)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#00FFDE] text-[#4300FF] hover:bg-white hover:text-[#00FFDE] shadow-lg transition-colors duration-300 animate-bounce"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              {user ? (
                <Link
                  to="/books"
                  className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
                    <ArrowRightIcon className="w-5 h-5" />
                  </span>
                  <span className="relative text-sm font-medium transition-all duration-300 group-hover:mr-4">
                    Browse Books
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200"
                  >
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
                      <ArrowRightIcon className="w-5 h-5" />
                    </span>
                    <span className="relative text-sm font-medium transition-all duration-300 group-hover:mr-4">
                      Join Now
                    </span>
                  </Link>
                  <Link
                    to="/login"
                    className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative text-sm font-medium">
                      Sign In
                    </span>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-500 text-sm">Books</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-500 text-sm">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-500 text-sm">Access</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Featured Books Carousel */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Featured Books
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of trending and must-read books
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                animate={{ x: `${-currentSlide * 100}%` }}
              >
                {featuredBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4">
                        {book.trending && (
                          <div className="flex items-center px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                            <FireIcon className="w-3 h-3 mr-1" />
                            Trending
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        <div className="relative group">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-48 h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                            <button className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white transition-colors duration-300">
                              <EyeIcon className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex-1 text-center lg:text-left">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h3>
                          <p className="text-gray-600 mb-4">by {book.author}</p>
                          
                          <div className="flex items-center justify-center lg:justify-start mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-gray-600">({book.rating})</span>
                          </div>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">{book.description}</p>
                          
                          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
                            <div className="flex items-center text-sm text-gray-500">
                              <BookOpenIcon className="w-4 h-4 mr-1" />
                              {book.pages} pages
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {book.readTime}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <BookmarkIcon className="w-4 h-4 mr-1" />
                              {book.genre}
                            </div>
                          </div>
                          
                          <Link
                            to={`/books/${book.id}`}
                            className="inline-flex items-center px-6 py-3 bg-[#4300FF] text-white rounded-full hover:bg-[#00FFDE] transition-colors duration-300 transform hover:scale-105"
                          >
                            Read More
                            <ArrowRightIcon className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Enhanced Carousel Controls */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <PlayIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                
                <div className="flex space-x-2">
                  {featuredBooks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? 'bg-[#4300FF] scale-125'
                          : 'bg-gray-300 hover:bg-[#4300FF]/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Categories Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Popular Categories
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore books by category and discover new genres that match your interests
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}
                    >
                      <category.icon className="h-6 w-6" />
                    </motion.div>
                    {category.trending && (
                      <div className="flex items-center text-xs text-red-500 font-medium">
                        <FireIcon className="w-3 h-3 mr-1" />
                        Trending
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.count.toLocaleString()} books</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#4300FF] to-[#00FFDE] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(category.count / 2500) * 100}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {Math.round((category.count / 2500) * 100)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Features Section with 3D Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Why Choose Our Library
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best digital library platform with cutting-edge features
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white inline-block`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                    
                    <div className="flex items-center text-sm font-medium text-[#4300FF]">
                      <span>{feature.stats}</span>
                      <ArrowTrendingUpIcon className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Testimonials Section with Modern Carousel */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                What Our Readers Say
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied readers who have transformed their reading experience
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
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
                      className="bg-white rounded-2xl p-8 shadow-lg relative border border-gray-100"
                    >
                      <div className="absolute -top-4 left-8">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#4300FF] to-[#00FFDE] rounded-full flex items-center justify-center">
                          <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                      
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#4300FF]/20"
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
            
            {/* Enhanced Carousel Navigation */}
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

      {/* Enhanced Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Library Statistics
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our growing community and extensive collection speak for themselves
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-6">
                  <BookOpenIcon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
                <p className="text-gray-600 mb-2">Books in our collection</p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-6">
                  <UserGroupIcon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
                <p className="text-gray-600 mb-2">Active readers</p>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white mb-6">
                  <GlobeAltIcon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Global</h3>
                <p className="text-gray-600 mb-2">Access from anywhere</p>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Call to Action Section */}
      <div className="py-24 bg-gradient-to-br from-[#4300FF] via-[#0065F8] to-[#00CAFF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-extrabold sm:text-5xl mb-6">
              <span className="bg-gradient-to-r from-[#00FFDE] to-[#00CAFF] bg-clip-text text-transparent">
                Start Your Reading Journey Today
              </span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90 mb-10 leading-relaxed">
              Join our community of readers and discover your next favorite book. 
              The world of literature awaits you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link
                  to="/books"
                  className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
                    <ArrowRightIcon className="w-5 h-5" />
                  </span>
                  <span className="relative text-sm font-medium transition-all duration-300 group-hover:mr-4">
                    Browse Books
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-[#4300FF] hover:bg-[#00FFDE] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0">
                      <ArrowRightIcon className="w-5 h-5" />
                    </span>
                    <span className="relative text-sm font-medium transition-all duration-300 group-hover:mr-4">
                      Join Now
                    </span>
                  </Link>
                  <Link
                    to="/login"
                    className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative text-sm font-medium">
                      Sign In
                    </span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
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
            className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-br from-[#4300FF] to-[#00FFDE] text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpIcon className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 
