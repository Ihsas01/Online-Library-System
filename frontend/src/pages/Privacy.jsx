import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon,
  DocumentTextIcon,
  UserIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const privacySections = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    icon: DocumentTextIcon,
    content: [
      'Personal information (name, email, address) when you register or make purchases',
      'Usage data including books borrowed, reading preferences, and search history',
      'Device information such as IP address, browser type, and operating system',
      'Cookies and similar tracking technologies to enhance your experience'
    ]
  },
  {
    id: 'information-usage',
    title: 'How We Use Your Information',
    icon: CogIcon,
    content: [
      'Provide and maintain our library services',
      'Process transactions and send order confirmations',
      'Send newsletters and promotional materials (with your consent)',
      'Improve our services and develop new features',
      'Comply with legal obligations and protect our rights'
    ]
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    icon: UserIcon,
    content: [
      'We do not sell, trade, or rent your personal information to third parties',
      'We may share information with trusted service providers who assist in operating our website',
      'Information may be disclosed if required by law or to protect our rights',
      'Aggregated, non-personal information may be shared for research purposes'
    ]
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: LockClosedIcon,
    content: [
      'We implement appropriate security measures to protect your personal information',
      'Your data is encrypted during transmission using SSL technology',
      'We regularly review and update our security practices',
      'Access to personal information is restricted to authorized personnel only'
    ]
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    icon: ShieldCheckIcon,
    content: [
      'Access and review your personal information',
      'Request correction of inaccurate information',
      'Request deletion of your personal information',
      'Opt-out of marketing communications',
      'Withdraw consent for data processing'
    ]
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    icon: EyeIcon,
    content: [
      'We use cookies to enhance your browsing experience',
      'Essential cookies are required for basic functionality',
      'Analytics cookies help us understand how you use our site',
      'You can control cookie settings through your browser preferences'
    ]
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

export default function Privacy() {
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
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information.
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At Online Library, we respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website and use our services.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </motion.div>

          {/* Privacy Sections */}
          {privacySections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-[#4300FF] rounded-full mt-2 mr-3" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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
              to="/terms"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#4300FF] text-[#4300FF] rounded-lg hover:bg-[#4300FF] hover:text-white transition-all duration-300 font-medium"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#00CAFF] text-[#00CAFF] rounded-lg hover:bg-[#00CAFF] hover:text-white transition-all duration-300 font-medium"
            >
              Cookie Policy
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