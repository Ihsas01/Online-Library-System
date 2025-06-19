import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  HeartIcon,
  AcademicCapIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Extensive Collection',
    description: 'Access thousands of books across all genres, from classics to contemporary bestsellers.',
    icon: BookOpenIcon,
    stats: '10,000+ Books',
  },
  {
    name: 'Global Community',
    description: 'Join readers from around the world in our vibrant literary community.',
    icon: GlobeAltIcon,
    stats: '50+ Countries',
  },
  {
    name: 'Expert Curation',
    description: 'Carefully selected books by our team of literary experts and librarians.',
    icon: AcademicCapIcon,
    stats: '100+ Experts',
  },
  {
    name: 'Personalized Experience',
    description: 'Get book recommendations tailored to your reading preferences.',
    icon: SparklesIcon,
    stats: '95% Accuracy',
  },
  {
    name: 'Active Community',
    description: 'Participate in book clubs, discussions, and literary events.',
    icon: UserGroupIcon,
    stats: '1M+ Members',
  },
  {
    name: 'Passion for Reading',
    description: 'We believe in the transformative power of reading and lifelong learning.',
    icon: HeartIcon,
    stats: '24/7 Support',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Head Librarian',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'With over 15 years of experience in library science, Sarah leads our team with passion and expertise.',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Michael Chen',
    role: 'Digital Collections Manager',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Michael brings innovative digital solutions to make our library accessible to everyone.',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Emily Rodriguez',
    role: 'Community Engagement',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Emily creates engaging programs and events to foster our vibrant reading community.',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
];

const stats = [
  { name: 'Books Available', value: '10,000+' },
  { name: 'Active Members', value: '1M+' },
  { name: 'Countries Reached', value: '50+' },
  { name: 'Expert Curators', value: '100+' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF] via-[#0065F8] to-[#00CAFF] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              <span className="block bg-gradient-to-r from-[#00FFDE] to-[#00CAFF] bg-clip-text text-transparent">
                About Our Library
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-white/90"
            >
              We're on a mission to make knowledge accessible to everyone through our digital library platform.
            </motion.p>
          </div>
        </div>
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
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-[#4300FF]">{stat.value}</dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-white to-[#4300FF]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Why Choose Our Library
              </span>
            </h2>
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
                    {feature.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              The passionate people behind our digital library.
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
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={member.image}
                      alt={member.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4300FF]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="mt-1 text-sm text-[#4300FF] font-medium">{member.role}</p>
                    <p className="mt-4 text-gray-600">{member.bio}</p>
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
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 bg-gradient-to-br from-[#4300FF]/5 to-[#00FFDE]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 max-w-3xl mx-auto text-xl text-gray-600"
            >
              We believe that access to knowledge is a fundamental right. Our mission is to make reading
              accessible to everyone, everywhere, through our digital library platform. We're committed to
              fostering a love for reading and learning in our global community.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 