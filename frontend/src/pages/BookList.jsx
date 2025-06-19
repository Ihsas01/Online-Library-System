import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fetchBooks } from '../store/slices/bookSlice';
import axios from 'axios';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon, 
  XMarkIcon,
  BookOpenIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  FunnelIcon,
  ViewColumnsIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FireIcon,
  StarIcon as StarIconOutline,
  EyeIcon,
  BookmarkIcon,
  ClockIcon,
  ArrowUpIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import LoadingSkeleton from '../components/LoadingSkeleton';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const filterVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export default function BookList() {
  const dispatch = useDispatch();
  const { books, loading, totalPages, currentPage } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    availability: '',
    sortBy: 'title',
    minRating: '',
    year: '',
    language: ''
  });

  // Enhanced filter options
  const genreOptions = [
    { value: 'fiction', label: 'Fiction', color: 'from-blue-500 to-cyan-500' },
    { value: 'non-fiction', label: 'Non-Fiction', color: 'from-green-500 to-emerald-500' },
    { value: 'science', label: 'Science', color: 'from-purple-500 to-pink-500' },
    { value: 'history', label: 'History', color: 'from-amber-500 to-orange-500' },
    { value: 'biography', label: 'Biography', color: 'from-red-500 to-pink-500' },
    { value: 'mystery', label: 'Mystery', color: 'from-indigo-500 to-purple-500' },
    { value: 'romance', label: 'Romance', color: 'from-pink-500 to-rose-500' },
    { value: 'fantasy', label: 'Fantasy', color: 'from-violet-500 to-purple-500' }
  ];

  const sortOptions = [
    { value: 'title', label: 'Title A-Z', icon: '📚' },
    { value: 'author', label: 'Author A-Z', icon: '✍️' },
    { value: 'date', label: 'Publication Date', icon: '📅' },
    { value: 'rating', label: 'Highest Rated', icon: '⭐' },
    { value: 'popularity', label: 'Most Popular', icon: '🔥' }
  ];

  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, ...filters, search: searchTerm }));
    
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, currentPage, filters, searchTerm]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    dispatch(fetchBooks({ page: 1, ...filters, search: searchTerm }));
  }, [dispatch, filters, searchTerm]);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePageChange = useCallback((page) => {
    dispatch(fetchBooks({ page, ...filters, search: searchTerm }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, filters, searchTerm]);

  const clearFilters = useCallback(() => {
    setFilters({
      genre: '',
      availability: '',
      sortBy: 'title',
      minRating: '',
      year: '',
      language: ''
    });
    setSearchTerm('');
  }, []);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSeedDatabase = async () => {
    try {
      setSeeding(true);
      await axios.post('http://localhost:5000/api/books/seed');
      // Refresh the books list after seeding
      dispatch(fetchBooks({ page: 1, ...filters, search: searchTerm }));
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      setSeeding(false);
    }
  };

  // Loading skeleton for books
  const renderLoadingSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <LoadingSkeleton key={index} type="card" className="h-80" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-4">
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Discover Your Next Read
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
              Our Book Collection
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore thousands of books across all genres. Find your next favorite read with our advanced search and filtering options.
          </p>

          {/* Seed Database Button - Only show if no books */}
          {books.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <button
                onClick={handleSeedDatabase}
                disabled={seeding}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                {seeding ? 'Adding Sample Books...' : 'Add Sample Books'}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Click to populate the database with sample books for testing
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 w-full">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative group"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, author, or genre..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200 text-lg"
                />
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 group-hover:text-[#4300FF] transition-colors duration-200" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-[#4300FF] text-white hover:bg-[#00FFDE] transition-colors duration-200"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </button>
              </motion.div>
            </form>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#4300FF] shadow-sm' 
                    : 'text-gray-600 hover:text-[#4300FF]'
                }`}
              >
                <ViewColumnsIcon className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#4300FF] shadow-sm' 
                    : 'text-gray-600 hover:text-[#4300FF]'
                }`}
              >
                <Bars3Icon className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#4300FF]/10 to-[#00FFDE]/10 hover:from-[#4300FF]/20 hover:to-[#00FFDE]/20 transition-all duration-200 border border-[#4300FF]/20"
            >
              <FunnelIcon className="h-5 w-5 text-[#4300FF]" />
              <span className="text-[#4300FF] font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-[#4300FF] text-white text-xs font-bold px-2 py-1 rounded-full"
                >
                  {activeFiltersCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Enhanced Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {/* Genre Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Genre</label>
                    <motion.select
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      name="genre"
                      value={filters.genre}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200"
                    >
                      <option value="">All Genres</option>
                      {genreOptions.map((genre) => (
                        <option key={genre.value} value={genre.value}>
                          {genre.label}
                        </option>
                      ))}
                    </motion.select>
                  </div>

                  {/* Availability Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Availability</label>
                    <motion.select
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      name="availability"
                      value={filters.availability}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200"
                    >
                      <option value="">All Books</option>
                      <option value="available">Available</option>
                      <option value="borrowed">Borrowed</option>
                    </motion.select>
                  </div>

                  {/* Sort By Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Sort By</label>
                    <motion.select
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      name="sortBy"
                      value={filters.sortBy}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </motion.select>
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Minimum Rating</label>
                    <motion.select
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      name="minRating"
                      value={filters.minRating}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200"
                    >
                      <option value="">Any Rating</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                    </motion.select>
                  </div>

                  {/* Year Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Publication Year</label>
                    <motion.select
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200"
                    >
                      <option value="">Any Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </motion.select>
                  </div>

                  {/* Language Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Language</label>
                    <motion.select
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      name="language"
                      value={filters.language}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200"
                    >
                      <option value="">All Languages</option>
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </motion.select>
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="flex items-center justify-center gap-2 px-6 py-3 text-sm text-[#4300FF] hover:text-[#4300FF]/80 transition-colors duration-200 bg-[#4300FF]/5 rounded-lg hover:bg-[#4300FF]/10"
                    >
                      <XMarkIcon className="h-5 w-5" />
                      Clear all filters ({activeFiltersCount})
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Summary */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#4300FF]">{books.length}</span> books
              {activeFiltersCount > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  (filtered from {totalPages * 12} total)
                </span>
              )}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BookOpenIcon className="h-4 w-4" />
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </motion.div>
        )}

        {/* Books Grid/List */}
        {loading ? (
          renderLoadingSkeletons()
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  variants={itemVariants}
                  whileHover="hover"
                  className={
                    viewMode === 'grid'
                      ? "group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                      : "group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                  }
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Book Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {book.rating?.average >= 4.5 && (
                            <div className="flex items-center px-2 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium">
                              <StarIcon className="h-3 w-3 mr-1" />
                              Top Rated
                            </div>
                          )}
                          {book.availableCopies > 0 && (
                            <div className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                              Available
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                          initial={{ y: 100, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 p-4"
                        >
                          <div className="flex gap-2">
                            <Link
                              to={`/books/${book._id}`}
                              className="flex-1 px-4 py-2 text-center bg-white text-[#4300FF] rounded-lg font-medium hover:bg-[#4300FF] hover:text-white transition-colors duration-200"
                            >
                              View Details
                            </Link>
                            <button className="p-2 bg-white/90 text-gray-700 rounded-lg hover:bg-white transition-colors duration-200">
                              <BookmarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.round(book.rating?.average || 0) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-xs text-gray-500">
                              ({book.rating?.average?.toFixed(1) || '0.0'})
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              book.availableCopies > 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {book.availableCopies > 0 ? 'Available' : 'Borrowed'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpenIcon className="h-3 w-3" />
                            <span>{book.pages || 'N/A'} pages</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{book.publishedYear || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex gap-4 p-4">
                      <div className="relative w-20 h-28 flex-shrink-0">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {book.rating?.average >= 4.5 && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <StarIcon className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                        
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.round(book.rating?.average || 0) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500">({book.rating?.average?.toFixed(1) || '0.0'})</span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              book.availableCopies > 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {book.availableCopies > 0 ? 'Available' : 'Borrowed'}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {book.description || 'No description available.'}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <BookOpenIcon className="h-3 w-3" />
                              <span>{book.pages || 'N/A'} pages</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{book.publishedYear || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TagIcon className="h-3 w-3" />
                              <span>{Array.isArray(book.genre) ? book.genre[0] : book.genre || 'N/A'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/books/${book._id}`}
                              className="px-4 py-2 bg-[#4300FF] text-white rounded-lg font-medium hover:bg-[#00FFDE] transition-colors duration-200"
                            >
                              View Details
                            </Link>
                            <button className="p-2 text-gray-600 hover:text-[#4300FF] transition-colors duration-200">
                              <BookmarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 flex justify-center"
              >
                <nav className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    Previous
                  </motion.button>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                            currentPage === pageNum
                              ? 'bg-[#4300FF] text-white shadow-lg'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}
                    
                    {totalPages > 5 && (
                      <>
                        <span className="px-2 text-gray-500">...</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePageChange(totalPages)}
                          className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                            currentPage === totalPages
                              ? 'bg-[#4300FF] text-white shadow-lg'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {totalPages}
                        </motion.button>
                      </>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </>
        )}
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