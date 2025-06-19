import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BookOpenIcon,
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

export default function Terms() {
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    termsSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <DocumentTextIcon className="h-10 w-10" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
          >
            Terms of Service
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            Please read these terms carefully before using our Online Library services.
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

      {/* Table of Contents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpenIcon className="h-6 w-6 text-[#4300FF]" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {termsSections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 hover:bg-[#4300FF]/5 hover:scale-105 ${
                  activeSection === section.id ? 'bg-[#4300FF]/10 text-[#4300FF]' : 'text-gray-600 hover:text-[#4300FF]'
                }`}
              >
                <section.icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">{section.title}</span>
              </motion.a>
            ))}
          </div>
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
                <DocumentTextIcon className="h-5 w-5 text-white" />
              </div>
              Introduction
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">
                These Terms of Service ("Terms") govern your use of the Online Library website and services 
                operated by Online Library ("we," "us," or "our"). By accessing or using our services, 
                you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                These terms constitute a legally binding agreement between you and Online Library. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </motion.div>

          {/* Terms Sections */}
          {termsSections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <section.icon className="h-7 w-7 text-white" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-[#4300FF] transition-colors duration-300">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
                    className="flex items-start group/item"
                  >
                    <motion.div 
                      className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-gray-600 leading-relaxed text-lg group-hover/item:text-gray-800 transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Important Notice */}
          <motion.div 
            variants={itemVariants} 
            className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Important Notice</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  By using our Online Library services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                  These terms are legally binding and govern your relationship with us.
                </p>
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
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.a
                href="mailto:legal@onlinelibrary.com"
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <EnvelopeIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">legal@onlinelibrary.com</p>
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
                to="/cookies"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-[#4300FF]/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-[#4300FF]" />
                  <span className="font-medium text-gray-900">Cookie Policy</span>
                </div>
                <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400 group-hover:text-[#4300FF] transition-colors duration-300" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

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