import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById, addReview } from '../store/slices/bookSlice';
import { StarIcon, HeartIcon, BookOpenIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/20/solid';

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

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    dispatch(addReview({ bookId: id, rating, comment: review }));
    setRating(0);
    setReview('');
  };

  const handleBorrow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Implement borrow logic
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Book not found</h2>
          <p className="mt-2 text-gray-600">The book you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
                >
                  {isWishlisted ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Book Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                  <p className="mt-2 text-xl text-gray-600">by {book.author}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(book.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({book.rating || 0} rating)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpenIcon className="h-5 w-5" />
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon className="h-5 w-5" />
                    <span>Published {new Date(book.publishedYear).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      book.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {book.available ? 'Available' : 'Borrowed'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    {book.genre}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleBorrow}
                    disabled={!book.available}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {book.available ? 'Borrow Book' : 'Currently Unavailable'}
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex">
              {['details', 'reviews', 'similar'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'details' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">{book.description}</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  {user && (
                    <form onSubmit={handleReviewSubmit} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                      <div className="flex items-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <StarIcon
                              className={`h-6 w-6 ${
                                star <= rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        rows="4"
                      />
                      <button
                        type="submit"
                        disabled={rating === 0}
                        className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}

                  <div className="space-y-6">
                    {book.reviews?.map((review) => (
                      <div key={review._id} className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserGroupIcon className="h-6 w-6 text-gray-500" />
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
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'similar' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Similar books would be rendered here */}
                  <p className="text-gray-600">Similar books will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.7s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
} 