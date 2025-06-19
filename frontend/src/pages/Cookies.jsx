import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  EyeIcon,
  CogIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CircleStackIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

const cookieTypes = [
  {
    id: 'essential',
    title: 'Essential Cookies',
    icon: ShieldCheckIcon,
    description: 'These cookies are necessary for the website to function properly.',
    examples: [
      'Authentication cookies to keep you logged in',
      'Session cookies to maintain your browsing session',
      'Security cookies to protect against fraud',
      'Load balancing cookies for performance'
    ],
    duration: 'Session or up to 1 year',
    canDisable: false
  },
  {
    id: 'analytics',
    title: 'Analytics Cookies',
    icon: InformationCircleIcon,
    description: 'These cookies help us understand how visitors interact with our website.',
    examples: [
      'Google Analytics to track page views and user behavior',
      'Performance monitoring to improve site speed',
      'Error tracking to identify and fix issues',
      'User journey analysis to optimize user experience'
    ],
    duration: 'Up to 2 years',
    canDisable: true
  },
  {
    id: 'functional',
    title: 'Functional Cookies',
    icon: CogIcon,
    description: 'These cookies enable enhanced functionality and personalization.',
    examples: [
      'Language preference cookies',
      'Theme and layout preferences',
      'Bookmark and favorite settings',
      'Form auto-fill preferences'
    ],
    duration: 'Up to 1 year',
    canDisable: true
  },
  {
    id: 'marketing',
    title: 'Marketing Cookies',
    icon: EyeIcon,
    description: 'These cookies are used to deliver relevant advertisements and track marketing campaigns.',
    examples: [
      'Social media integration cookies',
      'Advertising network cookies',
      'Email marketing tracking',
      'Retargeting and remarketing cookies'
    ],
    duration: 'Up to 2 years',
    canDisable: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Cookies() {
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    analytics: true,
    functional: true,
    marketing: false
  });
  const [showCookieManager, setShowCookieManager] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save cookie preferences
  const saveCookiePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowCookieManager(false);
    // Here you would typically update your cookie consent management
  };

  // Accept all cookies
  const acceptAllCookies = () => {
    const allAccepted = {
      analytics: true,
      functional: true,
      marketing: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setShowCookieManager(false);
  };

  // Reject non-essential cookies
  const rejectNonEssential = () => {
    const essentialOnly = {
      analytics: false,
      functional: false,
      marketing: false
    };
    setCookiePreferences(essentialOnly);
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    setShowCookieManager(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-[#00CAFF]/10 to-[#4300FF]/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white py-16 overflow-hidden"
      >
        {/* Header Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm"
          >
            <CircleStackIcon className="h-10 w-10" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
          >
            Cookie Policy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            Learn about how we use cookies and similar technologies on our website.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm opacity-75 mt-6 flex items-center justify-center gap-2"
          >
            <span>Last updated:</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8" ref={containerRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Introduction */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-lg flex items-center justify-center">
                <InformationCircleIcon className="h-5 w-5 text-white" />
              </div>
              What Are Cookies?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our site, and personalizing content.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                This Cookie Policy explains what cookies we use, why we use them, and how you can control them.
              </p>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Cookies We Use</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {cookieTypes.map((cookie, index) => (
                <motion.div
                  key={cookie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <cookie.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#4300FF] transition-colors duration-300">
                        {cookie.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{cookie.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{cookie.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Examples:</h4>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, exampleIndex) => (
                        <motion.li 
                          key={exampleIndex} 
                          className="flex items-start text-sm text-gray-600 group/item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + exampleIndex * 0.05 }}
                        >
                          <motion.div 
                            className="flex-shrink-0 w-1.5 h-1.5 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-full mt-1.5 mr-2 group-hover/item:scale-125 transition-transform duration-300"
                            whileHover={{ scale: 1.5 }}
                          />
                          {example}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {cookie.canDisable ? 'Can be disabled' : 'Required for functionality'}
                    </span>
                    {cookie.canDisable ? (
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cookie Management */}
          <motion.div 
            variants={itemVariants} 
            className="bg-gradient-to-r from-[#4300FF]/5 to-[#00CAFF]/5 rounded-2xl p-8 border border-[#4300FF]/20"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <CogIcon className="h-8 w-8 text-[#4300FF]" />
              Manage Your Cookie Preferences
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              You have control over which cookies you accept. Essential cookies are always required for the website to function properly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => setShowCookieManager(true)}
                className="flex-1 bg-white text-[#4300FF] px-6 py-3 rounded-xl font-medium hover:bg-[#4300FF]/5 transition-all duration-300 border border-[#4300FF]/20 hover:border-[#4300FF]/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Customize Settings
              </motion.button>
              <motion.button
                onClick={acceptAllCookies}
                className="flex-1 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white px-6 py-3 rounded-xl font-medium hover:from-[#00CAFF] hover:to-[#4300FF] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Accept All Cookies
              </motion.button>
            </div>
          </motion.div>

          {/* How to Control Cookies */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <ShieldCheckIcon className="h-8 w-8 text-[#4300FF]" />
              How to Control Cookies
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Most browsers allow you to control cookies through their settings</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>You can delete existing cookies and prevent new ones from being set</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Some browsers offer "Do Not Track" functionality</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Tools</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Use browser extensions to manage cookies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Privacy-focused browsers with built-in cookie controls</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>VPN services that can help protect your privacy</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            variants={itemVariants} 
            className="bg-gradient-to-r from-[#4300FF]/5 to-[#00CAFF]/5 rounded-2xl p-8 border border-[#4300FF]/20"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-[#4300FF]" />
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.a
                href="mailto:privacy@onlinelibrary.com"
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <EnvelopeIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">privacy@onlinelibrary.com</p>
                </div>
              </motion.a>
              
              <motion.a
                href="tel:+94763913526"
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PhoneIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">+94 76 391 3526</p>
                </div>
              </motion.a>
              
              <motion.div
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-lg flex items-center justify-center">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">Colombo, Sri Lanka</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Related Links */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/privacy"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-[#4300FF]/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-[#4300FF]" />
                  <span className="font-medium text-gray-900">Privacy Policy</span>
                </div>
                <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 group-hover:text-[#4300FF] transition-colors duration-300" />
              </Link>
              
              <Link
                to="/terms"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-[#4300FF]/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <DocumentTextIcon className="h-6 w-6 text-[#4300FF]" />
                  <span className="font-medium text-gray-900">Terms of Service</span>
                </div>
                <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 group-hover:text-[#4300FF] transition-colors duration-300" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cookie Manager Modal */}
      {showCookieManager && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCookieManager(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Cookie Preferences</h2>
                <button
                  onClick={() => setShowCookieManager(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Choose which types of cookies you want to allow. Essential cookies are always required.
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              {cookieTypes.filter(cookie => cookie.canDisable).map((cookie) => (
                <div key={cookie.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <cookie.icon className="h-6 w-6 text-[#4300FF]" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{cookie.title}</h3>
                      <p className="text-sm text-gray-600">{cookie.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences[cookie.id]}
                      onChange={(e) => setCookiePreferences(prev => ({
                        ...prev,
                        [cookie.id]: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4300FF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4300FF]"></div>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <button
                onClick={rejectNonEssential}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={saveCookiePreferences}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white rounded-lg hover:from-[#00CAFF] hover:to-[#4300FF] transition-all duration-300"
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronUpIcon className="h-6 w-6" />
      </motion.button>

      {/* Floating Action Button */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="fixed bottom-8 left-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-white text-[#4300FF] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-[#4300FF]/20"
        >
          <ChatBubbleLeftRightIcon className="h-8 w-8" />
        </motion.button>
      </motion.div>
    </div>
  );
} 