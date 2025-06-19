import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchBookDetails, borrowBook, returnBook } from '../store/slices/bookSlice';
import {
  ArrowLeftIcon,
  BookOpenIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [borrowDuration, setBorrowDuration] = useState('7');

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  const handleBorrow = async () => {
    try {
      await dispatch(borrowBook({ bookId: id, duration: parseInt(borrowDuration) }));
      setShowBorrowModal(false);
    } catch (error) {
      console.error('Failed to borrow book:', error);
    }
  };

  const handleReturn = async () => {
    try {
      await dispatch(returnBook(id));
    } catch (error) {
      console.error('Failed to return book:', error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author} on our library!`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      setShowShareModal(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#4300FF] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Book</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/books')}
            className="px-6 py-3 bg-[#4300FF] text-white rounded-lg font-medium hover:bg-[#4300FF]/90 transition-colors duration-200"
          >
            Back to Books
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/books')}
          className="flex items-center gap-2 text-[#4300FF] hover:text-[#4300FF]/80 transition-colors duration-200 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Books
        </motion.button>

        {/* Book Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Book Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600">by {book.author}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(book.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">({book.rating || 0})</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {book.available ? 'Available' : 'Borrowed'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <TagIcon className="h-5 w-5" />
                  <span>{book.genre}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Published: {new Date(book.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpenIcon className="h-5 w-5" />
                  <span>{book.pages} pages</span>
                </div>
              </div>

              <p className="text-gray-600">{book.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {user ? (
                  book.available ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowBorrowModal(true)}
                      className="flex-1 px-6 py-3 bg-[#4300FF] text-white rounded-lg font-medium hover:bg-[#4300FF]/90 transition-colors duration-200"
                    >
                      Borrow Book
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReturn}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-600/90 transition-colors duration-200"
                    >
                      Return Book
                    </motion.button>
                  )
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="flex-1 px-6 py-3 bg-[#4300FF] text-white rounded-lg font-medium hover:bg-[#4300FF]/90 transition-colors duration-200"
                  >
                    Login to Borrow
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg ${
                    isFavorite
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } transition-colors duration-200`}
                >
                  <HeartIcon className="h-6 w-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                >
                  <ShareIcon className="h-6 w-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                >
                  <BookmarkIcon className="h-6 w-6" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Borrow Modal */}
        <AnimatePresence>
          {showBorrowModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Borrow Book</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Borrow Duration (days)
                    </label>
                    <select
                      value={borrowDuration}
                      onChange={(e) => setBorrowDuration(e.target.value)}
                      className="w-full rounded-lg border-gray-300 focus:border-[#4300FF] focus:ring-[#4300FF]/20"
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="21">21 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="h-5 w-5" />
                    <span>Return by: {new Date(Date.now() + parseInt(borrowDuration) * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowBorrowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBorrow}
                    className="flex-1 px-4 py-2 bg-[#4300FF] text-white rounded-lg font-medium hover:bg-[#4300FF]/90 transition-colors duration-200"
                  >
                    Confirm
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Share Book</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
                  />
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setShowShareModal(false);
                      }}
                      className="px-4 py-2 bg-[#4300FF] text-white rounded-lg font-medium hover:bg-[#4300FF]/90 transition-colors duration-200"
                    >
                      Copy Link
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 