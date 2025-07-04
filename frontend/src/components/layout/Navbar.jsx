import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  HomeIcon,
  BookOpenIcon as BooksIcon,
  UserIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { logout } from '../../store/slices/authSlice';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Books', href: '/books', icon: BooksIcon },
  { name: 'About', href: '/about', icon: InformationCircleIcon },
  { name: 'Contact', href: '/contact', icon: PhoneIcon },
];
const userNavigation = [
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <BookOpenIcon className="h-8 w-8 text-[#4300FF] drop-shadow-lg" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-full opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-[#4300FF] via-[#00CAFF] to-[#4300FF] bg-clip-text text-transparent group-hover:from-[#00CAFF] group-hover:to-[#4300FF] transition-all duration-500 bg-size-200 animate-gradient">
                Online Library
              </span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden ml-10 space-x-1 lg:block">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'text-[#4300FF] bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10'
                      : 'text-gray-600 hover:text-[#4300FF] hover:bg-gray-50',
                    'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 relative group'
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <item.icon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    {item.name}
                    {location.pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4300FF] to-[#00CAFF]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden lg:block"
                >
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search books..."
                      className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4300FF] focus:border-transparent transition-all duration-200"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Search Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden lg:flex p-2 text-gray-600 hover:text-[#4300FF] hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </motion.button>
            {/* User/Notifications */}
            {isAuthenticated ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4300FF] focus:ring-offset-2 shadow hover:shadow-lg transition-all duration-200">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#4300FF] to-[#00CAFF] flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user?.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#4300FF] transition-all duration-200'
                            )}
                          >
                            <item.icon className="h-5 w-5 mr-2" />
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 transition-all duration-200'
                          )}
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-[#4300FF] px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white hover:from-[#00CAFF] hover:to-[#4300FF] px-3 py-2 rounded-lg text-sm font-medium shadow hover:shadow-lg transition-all duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-[#4300FF] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4300FF]"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={classNames(
                      location.pathname === item.href
                        ? 'text-[#4300FF] bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10'
                        : 'text-gray-600 hover:text-[#4300FF] hover:bg-gray-50',
                      'block px-4 py-2 text-base font-medium rounded-lg transition-all duration-200'
                    )}
                  >
                    <span className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </span>
                  </Link>
                ))}
                {isAuthenticated && (
                  <>
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-[#4300FF] hover:bg-gray-50 rounded-lg transition-all duration-200"
                      >
                        <span className="flex items-center">
                          <item.icon className="h-5 w-5 mr-2" />
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                      <span className="flex items-center">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />Sign out
                      </span>
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-[#4300FF] hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-base font-medium bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white hover:from-[#00CAFF] hover:to-[#4300FF] rounded-lg shadow hover:shadow-lg transition-all duration-200"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
} 