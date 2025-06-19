import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  EyeIcon,
  CogIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
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

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 -mx-4 -my-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
          >
            <ShieldCheckIcon className="h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Learn about how we use cookies and similar technologies on our website.
          </p>
          <p className="text-sm opacity-75 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Introduction */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences, 
              analyzing how you use our site, and personalizing content.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains what cookies we use, why we use them, and how you can control them.
            </p>
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
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-lg flex items-center justify-center mr-3">
                      <cookie.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cookie.title}</h3>
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
                        <li key={exampleIndex} className="flex items-start text-sm text-gray-600">
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#4300FF] rounded-full mt-1.5 mr-2" />
                          {example}
                        </li>
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

          {/* How to Control Cookies */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Control Cookies</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Chrome: Settings → Privacy and security → Cookies and other site data</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Firefox: Options → Privacy & Security → Cookies and Site Data</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Safari: Preferences → Privacy → Manage Website Data</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Edge: Settings → Cookies and site permissions → Cookies</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Consent</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>You can manage your cookie preferences through our consent banner</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Essential cookies cannot be disabled as they are required for basic functionality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>Changes to cookie settings may affect website functionality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span>You can update your preferences at any time</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Third-Party Cookies */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may use third-party services that place cookies on your device. These services help us 
              provide better functionality and analyze website usage.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-[#4300FF] pl-4">
                <h3 className="font-semibold text-gray-900">Google Analytics</h3>
                <p className="text-sm text-gray-600">Used to analyze website traffic and user behavior</p>
              </div>
              <div className="border-l-4 border-[#00CAFF] pl-4">
                <h3 className="font-semibold text-gray-900">Social Media Platforms</h3>
                <p className="text-sm text-gray-600">Used for social sharing and integration features</p>
              </div>
              <div className="border-l-4 border-[#4300FF] pl-4">
                <h3 className="font-semibold text-gray-900">Payment Processors</h3>
                <p className="text-sm text-gray-600">Used to process secure payments and transactions</p>
              </div>
            </div>
          </motion.div>

          {/* Updates to Policy */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We will notify you of any material changes by posting the new Cookie Policy on this page 
              and updating the "Last updated" date at the top of this policy.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> privacy@onlinelibrary.com</p>
              <p><strong>Phone:</strong> +94 76 391 3526</p>
              <p><strong>Address:</strong> Colombo, Sri Lanka</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/privacy"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#4300FF] text-[#4300FF] rounded-lg hover:bg-[#4300FF] hover:text-white transition-all duration-300 font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#00CAFF] text-[#00CAFF] rounded-lg hover:bg-[#00CAFF] hover:text-white transition-all duration-300 font-medium"
            >
              Terms of Service
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white rounded-lg hover:from-[#00CAFF] hover:to-[#4300FF] transition-all duration-300 font-medium"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 