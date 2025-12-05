import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from "../img/logo.png";



interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Booking', id: 'booking' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src={Logo}
              alt="Quick Safety Logo"
              className="w-12 h-12 object-contain"
            />

            <span className="font-bold text-xl" style={{ color: '#1d3557' }}>
              Quick Safety Service
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative transition-colors duration-300 hover:opacity-80"
                style={{
                  color: currentPage === item.id ? '#1d3557' : '#457b9d'
                }}
              >
                {item.name}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5"
                    style={{ backgroundColor: '#1d3557' }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => onNavigate('worker-signup')}
              className="px-6 py-2.5 rounded-lg border-2 transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: '#1d3557',
                color: '#1d3557'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d3557';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1d3557';
              }}
            >
              Join as Worker
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#1d3557' }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t overflow-hidden"
            style={{ borderColor: '#e5e5e5' }}
          >
            <div className="px-4 py-4 space-y-3 bg-white">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: currentPage === item.id ? '#a8dadc' : 'transparent',
                    color: currentPage === item.id ? '#1d3557' : '#457b9d'
                  }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('worker-signup');
                  setMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-3 rounded-lg border-2"
                style={{
                  borderColor: '#1d3557',
                  color: '#1d3557'
                }}
              >
                Join as Worker
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
