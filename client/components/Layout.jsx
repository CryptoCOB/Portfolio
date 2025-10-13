import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, clearToken } from '../src/auth';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const authed = useMemo(() => isLoggedIn(), [location.key]);

  const navBase = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/education", label: "Education" },
    { to: "/project", label: "Projects" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];
  const navAuth = authed
    ? [...navBase, { to: "/admin", label: "Admin" }]
    : [...navBase, { to: "/login", label: "Login" }, { to: "/register", label: "Register" }];

  const onLogout = () => {
    clearToken();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="backdrop-blur bg-white/70 sticky top-0 z-50 mx-0 md:mx-4 lg:mx-8 rounded-none md:rounded-2xl shadow-sm md:shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-5">
          
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
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navAuth.map((link, index) => {
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
          {authed && (
            <button onClick={onLogout} className="hidden lg:inline-flex px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition">
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-white/60 transition-all duration-300 hover:scale-105"
          >
            <span className={`text-xl transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}>
              {isMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-200/50 animate-fade-in-up">
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navAuth.map((link, index) => {
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
            {authed && (
              <div className="mt-2">
                <button onClick={onLogout} className="w-full px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}