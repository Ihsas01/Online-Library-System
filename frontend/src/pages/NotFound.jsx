import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center animate-fade-in">
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary-600 opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
              <p className="text-gray-600 mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                <HomeIcon className="h-5 w-5" />
                Return Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium text-gray-900 mb-2">Popular Books</h3>
            <p className="text-sm text-gray-600">Check out our most popular titles</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium text-gray-900 mb-2">New Arrivals</h3>
            <p className="text-sm text-gray-600">Discover our latest additions</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
            <p className="text-sm text-gray-600">Browse by genre or topic</p>
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