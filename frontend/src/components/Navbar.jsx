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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg'
          : 'bg-white'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <BookOpenIcon className="h-8 w-8 text-[#4300FF]" />
              </motion.div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent group-hover:from-[#00CAFF] group-hover:to-[#4300FF] transition-all duration-300">
                Online Library
              </span>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'text-[#4300FF]'
                      : 'text-gray-500 hover:text-[#4300FF]',
                    'inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 hover:scale-105'
                  )}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center"
                  >
                    <item.icon className="h-5 w-5 mr-1" />
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4300FF] focus:ring-offset-2 transition-all duration-200 hover:scale-105">
                    <span className="sr-only">Open user menu</span>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    </motion.div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 hover:text-[#4300FF] transition-colors duration-200'
                          )}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    {user?.role === 'admin' && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 hover:text-[#4300FF] transition-colors duration-200'
                            )}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4300FF] transition-colors duration-200'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-[#4300FF] text-sm font-medium rounded-lg text-[#4300FF] hover:bg-[#4300FF] hover:text-white transition-all duration-200"
                  >
                    Sign in
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#4300FF] hover:bg-[#00CAFF] transition-all duration-200"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </div>
            )}
            <div className="flex lg:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4300FF] transition-all duration-200"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-40" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Online Library</span>
              <BookOpenIcon className="h-8 w-8 text-[#4300FF]" />
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'text-[#4300FF]'
                        : 'text-gray-500 hover:text-[#4300FF]',
                      '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 transition-all duration-200'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center"
                    >
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-[#4300FF] transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </motion.header>
  );
} 