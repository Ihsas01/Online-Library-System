import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarIcon,
  DocumentIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon,
  GlobeAltIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const contactInfo = [
  {
    name: 'Email',
    value: 'mohamedihsas001@gmail.com',
    icon: EnvelopeIcon,
    link: 'mailto:mohamedihsas001@gmail.com',
    description: 'Get in touch with our support team',
  },
  {
    name: 'Phone',
    value: '+94 76 391 3526',
    icon: PhoneIcon,
    link: 'tel:+94763913526',
    description: 'Call us during business hours',
  },
  {
    name: 'Address',
    value: 'Colombo, Sri Lanka',
    icon: MapPinIcon,
    link: 'https://maps.google.com',
    description: 'Visit our physical location',
  },
];

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const faqs = [
  {
    question: 'How quickly do you respond to inquiries?',
    answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.',
  },
  {
    question: 'Can I schedule a meeting with the library staff?',
    answer: 'Yes! We offer both in-person and virtual meetings. Please contact us to schedule a convenient time.',
  },
  {
    question: 'Do you offer technical support for the platform?',
    answer: 'Absolutely! Our technical support team is available to help with any platform-related issues.',
  },
  {
    question: 'How can I report a bug or suggest a feature?',
    answer: 'You can report bugs or suggest features through our contact form. We review all feedback regularly.',
  },
  {
    question: 'Do you have a newsletter I can subscribe to?',
    answer: 'Yes! We send out monthly newsletters with updates, new books, and community events.',
  },
];

const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/onlinelibrary',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/onlinelibrary',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/onlinelibrary',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/onlinelibrary',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.875-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.927-.175-1.297-.49-.37-.315-.49-.807-.49-1.297s.12-.982.49-1.297c.37-.315.807-.49 1.297-.49s.927.175 1.297.49c.37.315.49.807.49 1.297s-.12.982-.49 1.297c-.37.315-.807.49-1.297.49z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    preferredContact: 'email',
    newsletter: false,
    file: null,
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, file: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, file }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you within 24 hours.',
      });
      setFormData({ 
        name: '', 
        email: '', 
        subject: '', 
        message: '', 
        phone: '', 
        preferredContact: 'email',
        newsletter: false,
        file: null 
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF] via-[#0065F8] to-[#00CAFF] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <motion.div 
          style={{ y }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative"
        >
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block bg-gradient-to-r from-[#00FFDE] to-[#00CAFF] bg-clip-text text-transparent">
                Contact Us
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-3xl mx-auto text-xl text-white/90 lg:text-2xl"
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#4300FF] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Send Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#4300FF] transition-colors duration-200"
              >
                View FAQ
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Contact Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Multiple ways to reach our team
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.name}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative mb-4"
                  >
                    <info.icon className="h-12 w-12 text-[#4300FF]" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.name}</h3>
                  <p className="text-gray-600 mb-2">{info.value}</p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Office Hours Section */}
      <div className="py-16 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <ClockIcon className="h-12 w-12 text-[#4300FF]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Office Hours</h3>
              <p className="text-gray-600 mt-2">When you can reach our team</p>
            </div>
            
            <div className="space-y-4">
              {officeHours.map((schedule, index) => (
                <motion.div
                  key={schedule.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">{schedule.day}</span>
                  <span className="text-[#4300FF] font-semibold">{schedule.hours}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <InformationCircleIcon className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900">Emergency Support</h4>
                  <p className="text-blue-700 text-sm mt-1">
                    For urgent technical issues outside business hours, please email us with "URGENT" in the subject line.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-8 sm:p-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                      Send Us a Message
                    </span>
                  </h2>

                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-6 p-4 rounded-lg ${
                        status.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center">
                        {status.type === 'success' ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                        ) : (
                          <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                        )}
                        <p
                          className={`text-sm font-medium ${
                            status.type === 'success' ? 'text-green-800' : 'text-red-800'
                          }`}
                        >
                          {status.message}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`block w-full rounded-lg border shadow-sm focus:ring-2 focus:ring-[#4300FF] transition-colors duration-200 ${
                              errors.name ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-[#4300FF]'
                            }`}
                            placeholder="Your full name"
                          />
                        </motion.div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full rounded-lg border shadow-sm focus:ring-2 focus:ring-[#4300FF] transition-colors duration-200 ${
                              errors.email ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-[#4300FF]'
                            }`}
                            placeholder="your.email@example.com"
                          />
                        </motion.div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full rounded-lg border shadow-sm focus:ring-2 focus:ring-[#4300FF] transition-colors duration-200 ${
                            errors.phone ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-[#4300FF]'
                          }`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </motion.div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className={`block w-full rounded-lg border shadow-sm focus:ring-2 focus:ring-[#4300FF] transition-colors duration-200 ${
                            errors.subject ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-[#4300FF]'
                          }`}
                          placeholder="What's this about?"
                        />
                      </motion.div>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <textarea
                          name="message"
                          id="message"
                          rows={6}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className={`block w-full rounded-lg border shadow-sm focus:ring-2 focus:ring-[#4300FF] transition-colors duration-200 ${
                            errors.message ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-[#4300FF]'
                          }`}
                          placeholder="Tell us more about your inquiry..."
                        />
                      </motion.div>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          {errors.message}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        {formData.message.length}/1000 characters
                      </p>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                        Attach File (Optional)
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="relative"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="file"
                          id="file"
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4300FF] file:text-white hover:file:bg-[#4300FF]/90 transition-colors duration-200"
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        />
                      </motion.div>
                      {errors.file && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          {errors.file}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Max file size: 5MB. Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
                      </p>
                    </div>

                    {/* Contact Preferences */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Contact Method
                      </label>
                      <div className="space-y-2">
                        {['email', 'phone'].map((method) => (
                          <label key={method} className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value={method}
                              checked={formData.preferredContact === method}
                              onChange={handleChange}
                              className="h-4 w-4 text-[#4300FF] focus:ring-[#4300FF] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700 capitalize">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#4300FF] focus:ring-[#4300FF] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Subscribe to our newsletter for updates and new books
                        </span>
                      </label>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#4300FF] to-[#00CAFF] hover:from-[#4300FF]/90 hover:to-[#00CAFF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4300FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                        )}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Map and Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Interactive Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162224576!2d79.7861643!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1640991234567!5m2!1sen!2sus"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-[#4300FF] mr-2" />
                      <div>
                        <p className="font-medium text-gray-900">Colombo</p>
                        <p className="text-sm text-gray-600">Sri Lanka</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                  <p className="text-gray-600 mb-6">Stay connected with our community</p>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-[#4300FF] hover:bg-[#4300FF]/5 transition-all duration-200"
                      >
                        <div className="text-[#4300FF] mr-3">
                          {social.icon}
                        </div>
                        <span className="font-medium text-gray-900">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-[#4300FF] to-[#00CAFF] rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Response Time</span>
                      <span className="font-semibold">24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Support Team</span>
                      <span className="font-semibold">15+ experts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Languages</span>
                      <span className="font-semibold">5+ supported</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Satisfaction</span>
                      <span className="font-semibold">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openFaq === index ? (
                      <ChevronUpIcon className="h-6 w-6 text-[#4300FF]" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6 text-[#4300FF]" />
                    )}
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 