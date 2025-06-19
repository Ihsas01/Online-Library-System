import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

const contactInfo = [
  {
    name: 'Email',
    value: 'mohamedihsas001@gmail.com',
    icon: EnvelopeIcon,
  },
  {
    name: 'Phone',
    value: '+94 76 391 3526',
    icon: PhoneIcon,
  },
  {
    name: 'Address',
    value: 'Colombo, Sri Lanka',
    icon: MapPinIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.href}
                className="pb-6 text-sm leading-6 text-gray-600 hover:text-[#4300FF] transition-colors duration-200"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <BookOpenIcon className="h-8 w-8 text-[#4300FF]" />
              </motion.div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#4300FF] to-[#00CAFF] bg-clip-text text-transparent group-hover:from-[#00CAFF] group-hover:to-[#4300FF] transition-all duration-300">
                Online Library
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-600">
              Your gateway to a world of knowledge. Discover, read, and learn with our extensive collection of digital books.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold leading-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.href}
                    className="text-sm leading-6 text-gray-600 hover:text-[#4300FF] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold leading-6 text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <EnvelopeIcon className="h-5 w-5 text-[#4300FF]" />
                <a href="mailto:mohamedihsas001@gmail.com" className="text-sm leading-6 text-gray-600 hover:text-[#4300FF] transition-colors duration-200">
                  mohamedihsas001@gmail.com
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <PhoneIcon className="h-5 w-5 text-[#4300FF]" />
                <a href="tel:+94763913526" className="text-sm leading-6 text-gray-600 hover:text-[#4300FF] transition-colors duration-200">
                  +94 76 391 3526
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <MapPinIcon className="h-5 w-5 text-[#4300FF]" />
                <span className="text-sm leading-6 text-gray-600">
                  Colombo, Sri Lanka
                </span>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold leading-6 text-gray-900">Newsletter</h3>
            <p className="text-sm leading-6 text-gray-600">
              Subscribe to our newsletter for the latest updates and book recommendations.
            </p>
            <form className="mt-4">
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-lg border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#4300FF] sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-none rounded-lg bg-[#4300FF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#00CAFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4300FF] transition-all duration-200"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-[#4300FF] transition-colors duration-200"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center text-xs leading-5 text-gray-500"
        >
          &copy; {new Date().getFullYear()} Online Library. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
} 