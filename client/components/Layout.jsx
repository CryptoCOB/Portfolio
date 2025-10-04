import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/education", label: "Education" },
    { to: "/project", label: "Projects" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <header className="glass-card sticky top-4 z-50 mx-4 lg:mx-8 rounded-2xl shadow-lg">
      <div className="container-premium">
        <div className="flex items-center justify-between py-6 px-2">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-xl font-bold text-white mr-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
              ⟠∆∇𓂀
            </div>
            <div className="hidden sm:block">
              <h1 className="text-3xl font-bold gradient-text">
                Phi's Forge
              </h1>
              <p className="text-sm text-gray-600 -mt-1 font-medium">Building the Future</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={index}
                  to={link.to}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 hover-lift'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all duration-300 hover:scale-110"
          >
            <span className={`text-xl transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}>
              {isMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200/30 animate-fade-in-up">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={index}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}