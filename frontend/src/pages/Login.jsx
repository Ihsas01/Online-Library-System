import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { login, clearError } from '../store/slices/authSlice';
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  XMarkIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  BookOpenIcon,
  HomeIcon,
  StarIcon as StarOutlineIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const watchedPassword = watch('password', '');

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (watchedPassword.length >= 8) strength += 1;
    if (/[a-z]/.test(watchedPassword)) strength += 1;
    if (/[A-Z]/.test(watchedPassword)) strength += 1;
    if (/[0-9]/.test(watchedPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(watchedPassword)) strength += 1;
    setPasswordStrength(strength);
  }, [watchedPassword]);

  const onSubmit = async (data) => {
    const result = await dispatch(login({ ...data, rememberMe }));
    if (!result.error) {
      navigate('/');
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const socialLoginOptions = [
    { name: 'Google', color: 'from-red-500 to-red-600', icon: '🔍' },
    { name: 'Facebook', color: 'from-blue-500 to-blue-600', icon: '📘' },
    { name: 'Apple', color: 'from-gray-800 to-gray-900', icon: '🍎' },
  ];

  // Testimonials/Benefits
  const benefits = [
    {
      icon: <StarIcon className="h-6 w-6 text-yellow-400" />,
      title: 'Access 10,000+ Books',
      desc: 'Explore a vast digital library with new titles every week.'
    },
    {
      icon: <SparklesIcon className="h-6 w-6 text-[#4300FF]" />,
      title: 'Personalized Recommendations',
      desc: 'Get book suggestions tailored to your interests.'
    },
    {
      icon: <BookOpenIcon className="h-6 w-6 text-[#00CAFF]" />,
      title: 'Track Your Reading',
      desc: 'Save favorites, track progress, and set reading goals.'
    },
  ];

  const testimonials = [
    {
      quote: '“The Online Library changed the way I read. The interface is beautiful and easy to use!”',
      name: 'Ava R.',
    },
    {
      quote: '“I love the recommendations and the huge selection of books!”',
      name: 'James K.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/10 via-[#00FFDE]/5 to-[#FF6B6B]/10 relative overflow-hidden flex flex-col lg:flex-row">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#4300FF]/20 to-[#00FFDE]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#00FFDE]/20 to-[#FF6B6B]/20 rounded-full blur-3xl"
        />
        {/* Extra floating shapes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 360] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            className="absolute text-2xl opacity-10"
            style={{ left: `${10 + i * 20}%`, top: `${20 + i * 15}%` }}
          >
            <BookOpenIcon className="w-10 h-10 text-[#4300FF]" />
          </motion.div>
        ))}
      </div>

      {/* Left Panel (Desktop/Tablet) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex flex-col justify-center items-start w-1/2 px-12 py-16 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpenIcon className="h-12 w-12 text-[#4300FF] drop-shadow-lg" />
            <span className="text-3xl font-bold bg-gradient-to-r from-[#4300FF] via-[#00CAFF] to-[#4300FF] bg-clip-text text-transparent">Online Library</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome to Your Next Chapter</h2>
          <p className="text-lg text-gray-600 max-w-md mb-6">Sign in to unlock a world of books, personalized recommendations, and a vibrant reading community.</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 mb-10">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200"
            >
              <div>{b.icon}</div>
              <div>
                <div className="font-semibold text-gray-800">{b.title}</div>
                <div className="text-sm text-gray-500">{b.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Testimonials */}
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10 rounded-xl p-4 shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-700 font-medium">{t.name}</span>
              </div>
              <div className="text-gray-600 italic text-sm">{t.quote}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Login Card */}
      <div className="relative z-10 min-h-screen flex flex-1 items-center justify-center px-4 py-12">
        {/* Back to Home */}
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-[#4300FF] transition-colors duration-200 text-sm font-medium">
          <HomeIcon className="h-5 w-5" /> Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-md"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4300FF] via-[#00FFDE] to-[#FF6B6B]" />
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 bg-gradient-to-r from-[#4300FF] to-[#00FFDE] rounded-full flex items-center justify-center"
              >
                <SparklesIcon className="w-4 h-4 text-white" />
              </motion.div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#4300FF] to-[#00FFDE] rounded-2xl mb-4">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-[#4300FF] to-[#00FFDE] bg-clip-text text-transparent"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-2 text-sm text-gray-600"
              >
                Sign in to your account to continue your reading journey
              </motion.p>
            </div>

            {/* Social Login Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6"
            >
              <div className="grid grid-cols-3 gap-3">
                {socialLoginOptions.map((option, index) => (
                  <motion.button
                    key={option.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${option.color} text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="hidden sm:inline">{option.name}</span>
                  </motion.button>
                ))}
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 backdrop-blur-sm text-gray-500">or continue with email</span>
                </div>
              </div>
            </motion.div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4"
                >
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      className="ml-2 p-1 rounded-lg bg-red-100 hover:bg-red-200 transition-colors duration-200"
                      onClick={() => dispatch(clearError())}
                    >
                      <XMarkIcon className="h-4 w-4 text-red-600" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                    isFocused.email ? 'text-[#4300FF]' : 'text-gray-400'
                  }`}>
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full pl-12 pr-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 ${
                      isFocused.email 
                        ? 'border-[#4300FF] ring-4 ring-[#4300FF]/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${errors.email ? 'border-red-300 ring-red-100' : ''}`}
                    onFocus={() => setIsFocused({ ...isFocused, email: true })}
                    onBlur={() => setIsFocused({ ...isFocused, email: false })}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                  {!errors.email && isFocused.email && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    </motion.div>
                  )}
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#4300FF] hover:text-[#4300FF]/80 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                    isFocused.password ? 'text-[#4300FF]' : 'text-gray-400'
                  }`}>
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`block w-full pl-12 pr-12 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 ${
                      isFocused.password 
                        ? 'border-[#4300FF] ring-4 ring-[#4300FF]/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${errors.password ? 'border-red-300 ring-red-100' : ''}`}
                    onFocus={() => setIsFocused({ ...isFocused, password: true })}
                    onBlur={() => setIsFocused({ ...isFocused, password: false })}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseEnter={() => setShowPasswordTooltip(true)}
                    onMouseLeave={() => setShowPasswordTooltip(false)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {showPasswordTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg z-20"
                      >
                        {showPassword ? 'Hide password' : 'Show password'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Password Strength Indicator */}
                {watchedPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500">Password strength:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i < passwordStrength
                                ? passwordStrength <= 2
                                  ? 'bg-red-500'
                                  : passwordStrength <= 3
                                  ? 'bg-yellow-500'
                                  : passwordStrength <= 4
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {passwordStrength <= 2 && 'Weak password'}
                      {passwordStrength === 3 && 'Fair password'}
                      {passwordStrength === 4 && 'Good password'}
                      {passwordStrength === 5 && 'Strong password'}
                    </p>
                  </motion.div>
                )}
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remember Me Toggle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  aria-pressed={rememberMe}
                  onClick={() => setRememberMe((v) => !v)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none ${
                    rememberMe ? 'bg-gradient-to-r from-[#4300FF] to-[#00CAFF] border-[#4300FF]' : 'bg-white border-gray-300'
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: rememberMe ? 1 : 0 }}
                    className="w-3 h-3 rounded-full bg-white shadow"
                  />
                </button>
                <span className="text-sm text-gray-700 select-none">Remember me</span>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !isValid}
                  className="w-full flex justify-center items-center gap-3 px-6 py-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-[#4300FF] to-[#00FFDE] hover:from-[#4300FF]/90 hover:to-[#00FFDE]/90 focus:outline-none focus:ring-4 focus:ring-[#4300FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Sign In
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-[#4300FF] hover:text-[#4300FF]/80 transition-colors duration-200"
                >
                  Create one now
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 