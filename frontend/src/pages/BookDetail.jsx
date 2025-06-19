import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fetchBookById, addReview } from '../store/slices/bookSlice';
import { 
  StarIcon, 
  HeartIcon, 
  BookOpenIcon, 
  ClockIcon, 
  UserGroupIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  TagIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  FireIcon,
  StarIcon as StarIconOutline,
  ChevronRightIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/20/solid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AnimatedCounter from '../components/AnimatedCounter';

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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3
    }
  }
};

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBook: book, loading } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    dispatch(fetchBookById(id));
    
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, id]);

  const handleReviewSubmit = useCallback((e) => {
    e.preventDefault();
    if (rating === 0) return;
    dispatch(addReview({ bookId: id, rating, comment: review }));
    setRating(0);
    setReview('');
  }, [dispatch, id, rating, review]);

  const handleBorrow = useCallback(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Implement borrow logic
    console.log('Borrowing book:', book?.title);
  }, [user, navigate, book]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title,
          text: `Check out "${book?.title}" by ${book?.author}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 2000);
    }
  }, [book]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Similar books data (mock data)
  const similarBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.5
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.8
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.6
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <LoadingSkeleton type="card" className="h-96" />
            <div className="lg:col-span-2 space-y-4">
              <LoadingSkeleton type="text" lines={3} height="h-8" />
              <LoadingSkeleton type="text" lines={2} height="h-6" />
              <LoadingSkeleton type="text" lines={4} height="h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md"
        >
          <div className="text-red-500 text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
          <Link
            to="/books"
            className="inline-flex items-center px-6 py-3 bg-[#4300FF] text-white rounded-lg hover:bg-[#00FFDE] transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Books
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-[#4300FF] hover:text-[#00FFDE] transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Books
          </button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Book Cover */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Book Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {book.rating >= 4.5 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center px-3 py-1 rounded-full bg-yellow-500 text-white text-sm font-medium"
                    >
                      <StarIcon className="h-4 w-4 mr-1" />
                      Top Rated
                    </motion.div>
                  )}
                  {book.available && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium"
                    >
                      Available
                    </motion.div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-lg"
                  >
                    {isWishlisted ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-600" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-lg"
                  >
                    <ShareIcon className="h-6 w-6 text-gray-600" />
                  </motion.button>
                </div>

                {/* Quick View Overlay */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-4"
                >
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-medium hover:bg-white transition-colors duration-200">
                      <EyeIcon className="h-4 w-4 mr-2 inline" />
                      Quick View
                    </button>
                    <button className="p-2 bg-white/90 text-gray-900 rounded-lg hover:bg-white transition-colors duration-200">
                      <BookmarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Book Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-2"
                  >
                    {book.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600"
                  >
                    by {book.author}
                  </motion.p>
                </div>

                {/* Rating and Stats */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`h-6 w-6 ${
                            i < Math.round(book.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">({book.rating || 0})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpenIcon className="h-5 w-5" />
                    <span>{book.pages || 'N/A'} pages</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon className="h-5 w-5" />
                    <span>Published {new Date(book.publishedYear).getFullYear()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <GlobeAltIcon className="h-5 w-5" />
                    <span>English</span>
                  </div>
                </motion.div>

                {/* Status and Genre */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-4"
                >
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      book.available
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}
                  >
                    {book.available ? 'Available for Borrow' : 'Currently Unavailable'}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium border border-blue-200">
                    {book.genre}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium border border-purple-200">
                    <AcademicCapIcon className="h-4 w-4 inline mr-1" />
                    Fiction
                  </span>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBorrow}
                    disabled={!book.available}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#4300FF] to-[#00FFDE] text-white rounded-xl font-medium hover:from-[#00FFDE] hover:to-[#4300FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {book.available ? 'Borrow Book' : 'Currently Unavailable'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="px-8 py-4 border-2 border-[#4300FF] text-[#4300FF] rounded-xl font-medium hover:bg-[#4300FF] hover:text-white transition-all duration-300"
                  >
                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </motion.button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4300FF]">
                      <AnimatedCounter end={book.rating || 0} suffix="★" />
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4300FF]">
                      <AnimatedCounter end={book.pages || 0} />
                    </div>
                    <div className="text-sm text-gray-600">Pages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4300FF]">
                      <AnimatedCounter end={book.reviews?.length || 0} />
                    </div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4300FF]">
                      <AnimatedCounter end={2024 - (book.publishedYear || 2024)} suffix="y" />
                    </div>
                    <div className="text-sm text-gray-600">Years Old</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: 'details', label: 'Details', icon: BookOpenIcon },
                { id: 'reviews', label: 'Reviews', icon: ChatBubbleLeftRightIcon },
                { id: 'similar', label: 'Similar Books', icon: FireIcon }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#4300FF] text-[#4300FF] bg-[#4300FF]/5'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="p-6"
              >
                {activeTab === 'details' && (
                  <div className="prose max-w-none">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{book.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Book Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">ISBN:</span>
                              <span className="font-medium">{book.isbn || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Publisher:</span>
                              <span className="font-medium">{book.publisher || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Language:</span>
                              <span className="font-medium">English</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Format:</span>
                              <span className="font-medium">Hardcover</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Library Info</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium">Main Library</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shelf:</span>
                              <span className="font-medium">Fiction A-Z</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Copies:</span>
                              <span className="font-medium">3 available</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Borrow Period:</span>
                              <span className="font-medium">14 days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    {user && (
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleReviewSubmit}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
                      >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                        <div className="flex items-center gap-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setRating(star)}
                              className="focus:outline-none"
                            >
                              <StarIcon
                                className={`h-6 w-6 ${
                                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            </motion.button>
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                          </span>
                        </div>
                        <textarea
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          placeholder="Share your thoughts about this book..."
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4300FF] focus:ring-2 focus:ring-[#4300FF]/20 transition-all duration-200 resize-none"
                          rows="4"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={rating === 0}
                          className="mt-4 px-6 py-3 bg-[#4300FF] text-white rounded-lg font-medium hover:bg-[#00FFDE] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          Submit Review
                        </motion.button>
                      </motion.form>
                    )}

                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Reviews ({book.reviews?.length || 0})
                      </h3>
                      {book.reviews?.length > 0 ? (
                        book.reviews.map((review, index) => (
                          <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#4300FF] to-[#00FFDE] flex items-center justify-center">
                                <UserGroupIcon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{review.user.name}</p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIconSolid
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No reviews yet. Be the first to review this book!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'similar' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Similar Books</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {similarBooks.map((similarBook, index) => (
                        <motion.div
                          key={similarBook.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                        >
                          <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                            <img
                              src={similarBook.cover}
                              alt={similarBook.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {similarBook.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{similarBook.author}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.round(similarBook.rating) ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500">({similarBook.rating})</span>
                            </div>
                            <Link
                              to={`/books/${similarBook.id}`}
                              className="text-[#4300FF] hover:text-[#00FFDE] transition-colors duration-200"
                            >
                              <ChevronRightIcon className="h-5 w-5" />
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Share Success Message */}
        <AnimatePresence>
          {isSharing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            >
              Link copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
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