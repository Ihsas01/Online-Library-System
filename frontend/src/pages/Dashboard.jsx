import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../store/slices/bookSlice';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
    coverImage: '',
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement add/edit functionality
    setIsAddingBook(false);
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      description: '',
      genre: '',
      publishedYear: '',
      coverImage: '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await dispatch(deleteBook(id));
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage your library's books and users</p>
              </div>
              <button
                onClick={() => setIsAddingBook(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                <PlusIcon className="h-5 w-5" />
                Add New Book
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpenIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Books</p>
                  <p className="text-2xl font-bold text-gray-900">{books.length}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <span className="ml-1">12% increase</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <span className="ml-1">8% increase</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Borrowed Books</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-purple-600">
                <ArrowTrendingDownIcon className="h-4 w-4" />
                <span className="ml-1">3% decrease</span>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-600">Overdue Books</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-orange-600">
                <ArrowTrendingDownIcon className="h-4 w-4" />
                <span className="ml-1">5% decrease</span>
              </div>
            </div>
          </div>

          {/* Add/Edit Book Form */}
          {(isAddingBook || editingBook) && (
            <div className="p-8 border-t border-gray-200">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {isAddingBook ? 'Add New Book' : 'Edit Book'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                        Genre
                      </label>
                      <select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      >
                        <option value="">Select a genre</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="biography">Biography</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
                        Published Year
                      </label>
                      <input
                        type="number"
                        id="publishedYear"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        id="coverImage"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingBook(false);
                        setEditingBook(null);
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
                    >
                      {isAddingBook ? 'Add Book' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Books Table */}
          <div className="p-8 border-t border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Genre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="h-10 w-10 rounded object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{book.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {book.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            book.available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {book.available ? 'Available' : 'Borrowed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setEditingBook(book)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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