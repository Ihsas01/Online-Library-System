import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon,
  DocumentTextIcon,
  UserIcon,
  CogIcon,
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
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

export default function Privacy() {
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

    privacySections.forEach((section) => {
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
            <ShieldCheckIcon className="h-10 w-10" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            We are committed to protecting your privacy and ensuring the security of your personal information.
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
            <DocumentTextIcon className="h-6 w-6 text-[#4300FF]" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {privacySections.map((section, index) => (
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
                At Online Library, we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                visit our website and use our services.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                By using our services, you agree to the collection and use of information in accordance with this policy. 
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </div>
          </motion.div>

          {/* Privacy Sections */}
          {privacySections.map((section, index) => (
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
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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
                to="/terms"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-[#4300FF]/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <DocumentTextIcon className="h-6 w-6 text-[#4300FF]" />
                  <span className="font-medium text-gray-900">Terms of Service</span>
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