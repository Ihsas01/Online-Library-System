import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  HeartIcon,
  AcademicCapIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import AnimatedCounter from '../components/AnimatedCounter';

const features = [
  {
    name: 'Extensive Collection',
    description: 'Access thousands of books across all genres, from classics to contemporary bestsellers.',
    icon: BookOpenIcon,
    stats: '10,000+',
    suffix: ' Books',
  },
  {
    name: 'Global Community',
    description: 'Join readers from around the world in our vibrant literary community.',
    icon: GlobeAltIcon,
    stats: '50+',
    suffix: ' Countries',
  },
  {
    name: 'Expert Curation',
    description: 'Carefully selected books by our team of literary experts and librarians.',
    icon: AcademicCapIcon,
    stats: '100+',
    suffix: ' Experts',
  },
  {
    name: 'Personalized Experience',
    description: 'Get book recommendations tailored to your reading preferences.',
    icon: SparklesIcon,
    stats: '95',
    suffix: '% Accuracy',
  },
  {
    name: 'Active Community',
    description: 'Participate in book clubs, discussions, and literary events.',
    icon: UserGroupIcon,
    stats: '1M+',
    suffix: ' Members',
  },
  {
    name: 'Passion for Reading',
    description: 'We believe in the transformative power of reading and lifelong learning.',
    icon: HeartIcon,
    stats: '24/7',
    suffix: ' Support',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Head Librarian',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'With over 15 years of experience in library science, Sarah leads our team with passion and expertise.',
    expertise: ['Digital Libraries', 'Collection Management', 'Community Outreach'],
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'sarah@onlinelibrary.com',
    },
  },
  {
    name: 'Michael Chen',
    role: 'Digital Collections Manager',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Michael brings innovative digital solutions to make our library accessible to everyone.',
    expertise: ['Digital Preservation', 'Metadata Management', 'Technology Integration'],
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'michael@onlinelibrary.com',
    },
  },
  {
    name: 'Emily Rodriguez',
    role: 'Community Engagement',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Emily creates engaging programs and events to foster our vibrant reading community.',
    expertise: ['Event Planning', 'Social Media', 'Reader Relations'],
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'emily@onlinelibrary.com',
    },
  },
];

const stats = [
  { name: 'Books Available', value: 10000, suffix: '+' },
  { name: 'Active Members', value: 1000000, suffix: '+' },
  { name: 'Countries Reached', value: 50, suffix: '+' },
  { name: 'Expert Curators', value: 100, suffix: '+' },
];

const timeline = [
  {
    year: '2020',
    title: 'Library Founded',
    description: 'Started with a vision to make knowledge accessible to everyone.',
    icon: BookOpenIcon,
  },
  {
    year: '2021',
    title: 'Digital Platform Launch',
    description: 'Launched our first digital library platform with 1,000 books.',
    icon: SparklesIcon,
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Reached readers in 25+ countries with localized content.',
    icon: GlobeAltIcon,
  },
  {
    year: '2023',
    title: 'Community Features',
    description: 'Introduced book clubs, discussions, and social features.',
    icon: UserGroupIcon,
  },
  {
    year: '2024',
    title: 'AI-Powered Recommendations',
    description: 'Implemented advanced AI for personalized book suggestions.',
    icon: AcademicCapIcon,
  },
];

const faqs = [
  {
    question: 'How do I join the library?',
    answer: 'Joining is free and easy! Simply create an account with your email address and start exploring our collection immediately.',
  },
  {
    question: 'Are there any fees for using the library?',
    answer: 'No, our library is completely free to use. We believe knowledge should be accessible to everyone.',
  },
  {
    question: 'Can I download books to read offline?',
    answer: 'Yes! Many of our books are available for download in various formats for offline reading.',
  },
  {
    question: 'How do you curate your book collection?',
    answer: 'Our team of expert librarians and literary professionals carefully select books based on quality, relevance, and reader demand.',
  },
  {
    question: 'Can I suggest books to add to the library?',
    answer: 'Absolutely! We welcome book suggestions from our community. You can submit recommendations through our contact form.',
  },
  {
    question: 'Do you have books in different languages?',
    answer: 'Yes, we have books in multiple languages and are constantly expanding our multilingual collection.',
  },
];

const testimonials = [
  {
    name: 'Alex Thompson',
    role: 'Student',
    content: 'This library has been a game-changer for my studies. The extensive collection and easy search make finding resources so much easier.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Maria Garcia',
    role: 'Teacher',
    content: 'I use this library daily for my lesson planning. The quality of books and the community features are outstanding.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'David Kim',
    role: 'Book Club Organizer',
    content: 'The discussion features and book clubs have brought our reading community together in amazing ways.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Helper function to extract numeric value from stats string
  const extractNumericValue = (statsString) => {
    if (statsString === '24/7') {
      return 24; // Special case for 24/7
    } else if (statsString.includes('M')) {
      return 1000000; // 1M = 1,000,000
    } else if (statsString.includes('K')) {
      return parseInt(statsString.replace(/[^0-9]/g, '')) * 1000;
    } else if (statsString.includes('+')) {
      return parseInt(statsString.replace(/[^0-9]/g, ''));
    } else {
      return parseInt(statsString.replace(/[^0-9]/g, '')) || 0;
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
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
                About Our Library
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-3xl mx-auto text-xl text-white/90 lg:text-2xl"
            >
              We're on a mission to make knowledge accessible to everyone through our digital library platform.
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
                Explore Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#4300FF] transition-colors duration-200"
              >
                Join Community
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-[#4300FF]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-24 bg-gradient-to-br from-white to-[#4300FF]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              From humble beginnings to a global digital library
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-[#4300FF] to-[#00FFDE]" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-2">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="mr-3"
                      >
                        <item.icon className="h-6 w-6 text-[#4300FF]" />
                      </motion.div>
                      <span className="text-sm font-semibold text-[#4300FF]">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#4300FF] rounded-full border-4 border-white shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Why Choose Our Library
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover what makes us the preferred choice for readers worldwide
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
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
                    <feature.icon className="h-12 w-12 text-[#4300FF]" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-[#4300FF] font-semibold">
                    <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
                    <AnimatedCounter end={extractNumericValue(feature.stats)} suffix={feature.suffix} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              The passionate people behind our digital library
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={member.image}
                      alt={member.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4300FF]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="mt-1 text-sm text-[#4300FF] font-medium">{member.role}</p>
                    <p className="mt-4 text-gray-600">{member.bio}</p>
                    
                    {/* Expertise tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 text-xs font-medium bg-[#4300FF]/10 text-[#4300FF] rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex space-x-4">
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-[#4300FF] transition-colors duration-200"
                      >
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-[#4300FF] transition-colors duration-200"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-gray-400 hover:text-[#4300FF] transition-colors duration-200"
                      >
                        <span className="sr-only">Email</span>
                        <EnvelopeIcon className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                What Our Readers Say
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Join thousands of satisfied readers worldwide
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
            >
              <div className="flex items-center mb-6">
                <img
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-[#4300FF] font-medium">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <svg 
                  className="absolute -top-2 -left-2 h-8 w-8 text-[#4300FF]/20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg text-gray-600 leading-relaxed pl-6">
                  "{testimonials[currentTestimonial].content}"
                </p>
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-[#4300FF] text-white hover:bg-[#4300FF]/90 transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentTestimonial ? 'bg-[#4300FF]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-[#4300FF] text-white hover:bg-[#4300FF]/90 transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
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
              Everything you need to know about our library
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

      {/* Mission Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed"
            >
              We believe that access to knowledge is a fundamental right. Our mission is to make reading
              accessible to everyone, everywhere, through our digital library platform. We're committed to
              fostering a love for reading and learning in our global community, breaking down barriers
              and creating opportunities for lifelong learning.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#4300FF] to-[#00CAFF] text-white font-semibold rounded-lg hover:from-[#4300FF]/90 hover:to-[#00CAFF]/90 transition-all duration-200"
              >
                Start Reading Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-[#4300FF] text-[#4300FF] font-semibold rounded-lg hover:bg-[#4300FF] hover:text-white transition-all duration-200"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 