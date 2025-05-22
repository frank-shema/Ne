
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Clock, CreditCard, Map, Menu, X, Shield, Settings, Users, BarChart, ChevronDown } from "lucide-react";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: <Car size={32} />,
      title: "Smart Parking",
      description: "Real-time monitoring of available parking spaces and automated entry/exit system."
    },
    {
      icon: <Map size={32} />,
      title: "Location Tracking",
      description: "Know exactly where your car is parked with our detailed mapping system."
    },
    {
      icon: <Clock size={32} />,
      title: "Time Management",
      description: "Track parking duration and get notified before your parking time expires."
    },
    {
      icon: <CreditCard size={32} />,
      title: "Easy Payments",
      description: "Seamless payment process with multiple payment options available."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Shield size={32} />,
      title: "Enhanced Security",
      description: "24/7 surveillance and secure parking facilities for your vehicle's safety."
    },
    {
      icon: <Settings size={32} />,
      title: "Customizable Settings",
      description: "Tailor the parking experience to your preferences with customizable settings."
    },
    {
      icon: <Users size={32} />,
      title: "Multi-User Access",
      description: "Share parking access with family members or colleagues easily."
    },
    {
      icon: <BarChart size={32} />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics to track parking usage patterns and optimize operations."
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      position: "Building Manager",
      quote: "Smart Parking has completely transformed how we manage parking in our complex. The system is intuitive and has reduced congestion significantly.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Sarah Johnson",
      position: "Mall Operations Director",
      quote: "The real-time monitoring capability has allowed us to better serve our customers by guiding them to available spaces efficiently.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Michael Torres",
      position: "City Planner",
      quote: "Since implementing Smart Parking, we've seen a 30% reduction in traffic congestion around our busiest downtown areas.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const faqs = [
    {
      question: "How does the Smart Parking system work?",
      answer: "Our Smart Parking system uses sensors and cameras to monitor parking spaces in real-time. The data is processed by our software to provide users with information about available spaces, entry/exit management, and payment processing."
    },
    {
      question: "Can I integrate Smart Parking with my existing systems?",
      answer: "Yes, our system is designed to be compatible with most existing parking management systems. We offer APIs for seamless integration with your current infrastructure."
    },
    {
      question: "What payment methods are supported?",
      answer: "We support various payment methods including credit/debit cards, mobile payments, and digital wallets. We can also customize the system to work with your preferred payment gateway."
    },
    {
      question: "Is there a mobile app for users?",
      answer: "Yes, we offer both Android and iOS mobile apps for users to find available parking spaces, pay for parking, and receive notifications about their parking session."
    }
  ];

  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-primary text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold">Smart Parking</div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-gray-200 transition-colors">Features</a>
              <a href="#about" className="hover:text-gray-200 transition-colors">About</a>
              <a href="#testimonials" className="hover:text-gray-200 transition-colors">Testimonials</a>
              <a href="#faq" className="hover:text-gray-200 transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-gray-200 transition-colors">Contact</a>
              <Link 
                to="/role-select" 
                className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-primary transition-colors"
              >
                Register
              </Link>
            </div>
          </nav>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 space-y-4"
            >
              <a href="#features" className="block py-2 hover:text-gray-200 transition-colors">Features</a>
              <a href="#about" className="block py-2 hover:text-gray-200 transition-colors">About</a>
              <a href="#testimonials" className="block py-2 hover:text-gray-200 transition-colors">Testimonials</a>
              <a href="#faq" className="block py-2 hover:text-gray-200 transition-colors">FAQ</a>
              <a href="#contact" className="block py-2 hover:text-gray-200 transition-colors">Contact</a>
              <Link 
                to="/role-select" 
                className="block bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-center mb-2"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-primary transition-colors text-center"
              >
                Register
              </Link>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={fadeIn}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Smart Parking Management System
              </h1>
              <p className="text-xl mb-8">
                Streamline your parking operations with our efficient, easy-to-use parking management solution.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/signup" 
                  className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-center font-medium"
                >
                  Get Started
                </Link>
                <a 
                  href="#features" 
                  className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-primary transition-colors text-center font-medium"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" variants={fadeIn}>
              <img 
                src="https://images.unsplash.com/photo-1574767489026-4aa1466fbeb8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Smart Parking" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smart Parking offers a variety of features to make parking management easier and more efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1597766353939-3ba4762d7524?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="About Smart Parking" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our System</h2>
              <p className="text-gray-600 mb-6">
                Our Smart Parking Management System uses cutting-edge technology to streamline parking operations, reduce congestion, and improve the overall user experience.
              </p>
              <p className="text-gray-600 mb-6">
                With real-time monitoring, automated entry and exit systems, and detailed reporting, our solution helps parking operators optimize their resources and increase revenue.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <p className="text-gray-600">Customer Satisfaction</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <p className="text-gray-600">Parking Locations</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">30%</div>
                  <p className="text-gray-600">Revenue Increase</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <p className="text-gray-600">Customer Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Learn how our Smart Parking system has helped businesses and organizations improve their parking management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our Smart Parking Management System.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="mb-4 border-b border-gray-200 pb-4 last:border-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button 
                  className="flex justify-between items-center w-full text-left font-medium text-gray-800 py-2"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 pt-2"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Parking Management?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who have transformed their parking operations with our smart system.
            </p>
            <Link
              to="/signup"
              className="bg-white text-primary px-8 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-medium"
            >
              Create an Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart Parking</h3>
              <p className="text-gray-400">
                The most advanced parking management system for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Parking Avenue</li>
                <li>New York, NY 10001</li>
                <li>contact@smartparking.com</li>
                <li>(123) 456-7890</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button 
                  type="submit" 
                  className="bg-primary px-4 py-2 rounded-r-md hover:bg-navy-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Smart Parking Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
