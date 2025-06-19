import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchBooks } from '../store/slices/bookSlice';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon, 
  XMarkIcon,
  BookOpenIcon,
  UserIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function BookList() {
  const dispatch = useDispatch();
  const { books, loading, totalPages, currentPage } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    availability: '',
    sortBy: 'title',
    minRating: '',
  });

  useEffect(() => {
    dispatch(fetchBooks({ page: currentPage, ...filters, search: searchTerm }));
  }, [dispatch, currentPage, filters, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchBooks({ page: 1, ...filters, search: searchTerm }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (page) => {
    dispatch(fetchBooks({ page, ...filters, search: searchTerm }));
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      availability: '',
      sortBy: 'title',
      minRating: '',
    });
    setSearchTerm('');
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
              Explore Our Collection
            </span>
          </h1>
          <p className="text-lg text-gray-600">Discover thousands of books across various genres</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, author, or genre..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200"
                />
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </motion.div>
            </form>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4300FF]/10 to-[#00FFDE]/10 hover:from-[#4300FF]/20 hover:to-[#00FFDE]/20 transition-all duration-200"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-[#4300FF]" />
              <span className="text-[#4300FF] font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-[#4300FF] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden"
              >
                <motion.select
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  className="input rounded-xl border-gray-200 focus:border-[#4300FF] focus:ring-[#4300FF]/20"
                >
                  <option value="">All Genres</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="biography">Biography</option>
                </motion.select>

                <motion.select
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  name="availability"
                  value={filters.availability}
                  onChange={handleFilterChange}
                  className="input rounded-xl border-gray-200 focus:border-[#4300FF] focus:ring-[#4300FF]/20"
                >
                  <option value="">All Books</option>
                  <option value="available">Available</option>
                  <option value="borrowed">Borrowed</option>
                </motion.select>

                <motion.select
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="input rounded-xl border-gray-200 focus:border-[#4300FF] focus:ring-[#4300FF]/20"
                >
                  <option value="title">Sort by Title</option>
                  <option value="author">Sort by Author</option>
                  <option value="date">Sort by Date</option>
                  <option value="rating">Sort by Rating</option>
                </motion.select>

                <motion.select
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  name="minRating"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                  className="input rounded-xl border-gray-200 focus:border-[#4300FF] focus:ring-[#4300FF]/20"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </motion.select>

                {activeFiltersCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="col-span-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#4300FF] hover:text-[#4300FF]/80 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                    Clear all filters
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#4300FF] border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {books.map((book) => (
                <motion.div
                  key={book._id}
                  variants={item}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-4"
                    >
                      <Link
                        to={`/books/${book._id}`}
                        className="inline-block w-full px-4 py-2 text-center bg-white text-[#4300FF] rounded-lg font-medium hover:bg-[#4300FF] hover:text-white transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(book.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.available
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {book.available ? 'Available' : 'Borrowed'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
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
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </motion.button>
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                      key={index + 1}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === index + 1
                          ? 'bg-[#4300FF] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 