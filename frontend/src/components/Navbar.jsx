import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BookOpenIcon,
  HomeIcon,
  InformationCircleIcon,
  PhoneIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  BellIcon,
  HeartIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { logout } from '../store/slices/authSlice';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Books', href: '/books', icon: BookOpenIcon },
  { name: 'About', href: '/about', icon: InformationCircleIcon },
  { name: 'Contact', href: '/contact', icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, message: 'New book added: "The Great Gatsby"', time: '2 min ago', read: false },
    { id: 2, message: 'Your borrowed book is due tomorrow', time: '1 hour ago', read: false },
  ]);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
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
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                  animate={{ opacity: 1, width: "auto" }}
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

            {/* Notifications */}
            {isAuthenticated && (
              <Menu as="div" className="relative">
                <Menu.Button className="relative p-2 text-gray-600 hover:text-[#4300FF] hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <BellIcon className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {unreadNotifications}
                    </motion.span>
                  )}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <Menu.Item key={notification.id}>
                        {({ active }) => (
                          <div className={`px-4 py-3 ${active ? 'bg-gray-50' : ''} ${!notification.read ? 'bg-blue-50' : ''}`}>
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <UserCircleIcon className="h-8 w-8 text-gray-400 group-hover:text-[#4300FF] transition-colors duration-200" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-full opacity-0 group-hover:opacity-20 blur-md"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-[#4300FF] transition-colors duration-200">
                    {user?.name || 'User'}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-[#4300FF] transition-colors duration-200" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-50 text-[#4300FF]' : 'text-gray-700'} transition-colors duration-200`}
                        >
                          <UserIcon className="h-4 w-4 mr-3" />
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    {user?.role === 'admin' && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-50 text-[#4300FF]' : 'text-gray-700'} transition-colors duration-200`}
                          >
                            <ChartBarIcon className="h-4 w-4 mr-3" />
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/favorites"
                          className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-50 text-[#4300FF]' : 'text-gray-700'} transition-colors duration-200`}
                        >
                          <HeartIcon className="h-4 w-4 mr-3" />
                          Favorites
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-50 text-[#4300FF]' : 'text-gray-700'} transition-colors duration-200`}
                        >
                          <Cog6ToothIcon className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <div className="border-t border-gray-100 my-1" />
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`flex items-center w-full px-4 py-2 text-sm ${active ? 'bg-gray-50 text-red-600' : 'text-gray-700'} transition-colors duration-200`}
                        >
                          <div className="flex items-center">
                            <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                            Sign out
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="hidden lg:flex lg:items-center lg:space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-[#4300FF] text-sm font-medium rounded-lg text-[#4300FF] hover:bg-[#4300FF] hover:text-white transition-all duration-300 hover:shadow-lg"
                  >
                    Sign in
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#4300FF] to-[#00CAFF] hover:from-[#00CAFF] hover:to-[#4300FF] transition-all duration-300 hover:shadow-lg"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4300FF] transition-all duration-200"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 backdrop-blur-xl px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Online Library</span>
              <BookOpenIcon className="h-8 w-8 text-[#4300FF]" />
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="-m-2.5 rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </motion.div>
          
          {/* Mobile Search */}
          <div className="mt-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4300FF] focus:border-transparent transition-all duration-200"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </form>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 flow-root"
          >
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? 'text-[#4300FF] bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10'
                          : 'text-gray-500 hover:text-[#4300FF] hover:bg-gray-50',
                        '-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 transition-all duration-200'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Link
                        to="/profile"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 mr-3" />
                          Your Profile
                        </div>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/dashboard"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <ChartBarIcon className="h-5 w-5 mr-3" />
                            Dashboard
                          </div>
                        </Link>
                      )}
                      <Link
                        to="/favorites"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <HeartIcon className="h-5 w-5 mr-3" />
                          Favorites
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        <div className="flex items-center">
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                          Sign out
                        </div>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="space-y-3"
                  >
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-gradient-to-r from-[#4300FF] to-[#00CAFF] hover:from-[#00CAFF] hover:to-[#4300FF] transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </Dialog.Panel>
      </Dialog>
    </motion.header>
  );
} 