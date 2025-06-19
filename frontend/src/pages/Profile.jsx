import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProfile } from '../store/slices/authSlice';
import {
  UserCircleIcon,
  BookOpenIcon,
  ClockIcon,
  HeartIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }
    await dispatch(updateProfile(formData));
    setIsEditing(false);
    setFormData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                    <UserCircleIcon className="h-24 w-24 text-gray-400" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <BookOpenIcon className="h-5 w-5" />
                    <span>{user?.borrowedBooks?.length || 0} Books Borrowed</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <HeartIcon className="h-5 w-5" />
                    <span>{user?.wishlist?.length || 0} Books in Wishlist</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <ClockIcon className="h-5 w-5" />
                    <span>Member since {new Date(user?.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Profile Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      {isEditing ? (
                        <>
                          <XMarkIcon className="h-5 w-5" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <PencilIcon className="h-5 w-5" />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        />
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="currentPassword"
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            />
                          </div>

                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <input
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            />
                          </div>

                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                        >
                          <CheckIcon className="h-5 w-5" />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="mt-1 text-gray-900">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                        <p className="mt-1 text-gray-900">{user?.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Borrowed Books */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Borrowed Books</h3>
                  {user?.borrowedBooks?.length > 0 ? (
                    <div className="space-y-4">
                      {user.borrowedBooks.map((book) => (
                        <div
                          key={book._id}
                          className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
                        >
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="h-16 w-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{book.title}</h4>
                            <p className="text-sm text-gray-600">Due: {new Date(book.dueDate).toLocaleDateString()}</p>
                          </div>
                          <Link
                            to={`/books/${book._id}`}
                            className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                          >
                            View Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">You haven't borrowed any books yet.</p>
                  )}
                </div>

                {/* Wishlist */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Wishlist</h3>
                  {user?.wishlist?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {user.wishlist.map((book) => (
                        <div
                          key={book._id}
                          className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
                        >
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="h-16 w-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{book.title}</h4>
                            <p className="text-sm text-gray-600">{book.author}</p>
                          </div>
                          <Link
                            to={`/books/${book._id}`}
                            className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                          >
                            View Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Your wishlist is empty.</p>
                  )}
                </div>
              </div>
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