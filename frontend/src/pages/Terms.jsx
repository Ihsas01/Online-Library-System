import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserIcon,
  ScaleIcon,
  ClockIcon,
  ShieldCheckIcon,
  HandRaisedIcon,
} from '@heroicons/react/24/outline';

const termsSections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: CheckCircleIcon,
    content: [
      'By accessing and using Online Library, you accept and agree to be bound by these Terms of Service',
      'If you do not agree to these terms, please do not use our services',
      'We reserve the right to modify these terms at any time, with changes effective immediately upon posting',
      'Your continued use of the service after changes constitutes acceptance of the new terms'
    ]
  },
  {
    id: 'user-accounts',
    title: 'User Accounts',
    icon: UserIcon,
    content: [
      'You must register for an account to access certain features of our service',
      'You are responsible for maintaining the confidentiality of your account credentials',
      'You must provide accurate and complete information when creating your account',
      'You are responsible for all activities that occur under your account',
      'You must notify us immediately of any unauthorized use of your account'
    ]
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use Policy',
    icon: HandRaisedIcon,
    content: [
      'You may use our services only for lawful purposes and in accordance with these terms',
      'You agree not to use the service to transmit harmful, offensive, or illegal content',
      'You may not attempt to gain unauthorized access to our systems or other user accounts',
      'You may not use automated tools to access our services without permission',
      'You must respect intellectual property rights and not distribute copyrighted material'
    ]
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: ScaleIcon,
    content: [
      'All content on our website, including text, graphics, and software, is our property',
      'You may not reproduce, distribute, or create derivative works without permission',
      'Book content remains the property of their respective authors and publishers',
      'You may download books for personal use only, subject to copyright restrictions',
      'Trademarks and service marks are the property of their respective owners'
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy and Data Protection',
    icon: ShieldCheckIcon,
    content: [
      'Your privacy is important to us. Please review our Privacy Policy',
      'We collect and process personal data in accordance with applicable laws',
      'You consent to our collection and use of your information as described in our Privacy Policy',
      'We implement appropriate security measures to protect your personal information',
      'You have rights regarding your personal data as outlined in our Privacy Policy'
    ]
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers and Limitations',
    icon: ExclamationTriangleIcon,
    content: [
      'Our services are provided "as is" without warranties of any kind',
      'We do not guarantee uninterrupted access to our services',
      'We are not responsible for the accuracy or completeness of book content',
      'We disclaim liability for any damages arising from your use of our services',
      'Our liability is limited to the amount you paid for our services in the past 12 months'
    ]
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: ClockIcon,
    content: [
      'We may terminate or suspend your account at any time for violation of these terms',
      'You may terminate your account at any time by contacting us',
      'Upon termination, your right to use our services ceases immediately',
      'We may retain certain information as required by law or for legitimate business purposes',
      'Provisions that should survive termination will remain in effect'
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

export default function Terms() {
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
            <DocumentTextIcon className="h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Please read these terms carefully before using our Online Library services.
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
              These Terms of Service ("Terms") govern your use of the Online Library website and services 
              operated by Online Library ("we," "us," or "our"). By accessing or using our services, 
              you agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              These terms constitute a legally binding agreement between you and Online Library. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </motion.div>

          {/* Terms Sections */}
          {termsSections.map((section, index) => (
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

          {/* Governing Law */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#4300FF]/10 to-[#00CAFF]/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Sri Lanka. 
              Any disputes arising from these terms or your use of our services shall be subject to 
              the exclusive jurisdiction of the courts in Colombo, Sri Lanka.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If any provision of these Terms is found to be unenforceable, the remaining provisions 
              will continue to be valid and enforceable.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> legal@onlinelibrary.com</p>
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