import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-secondary-50 to-primary-50 min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl animate-scale-in">
                ⟠∆∇
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="gradient-text">Phi's Forge</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-secondary-600 max-w-4xl mx-auto leading-relaxed mb-8 animate-slide-up">
              Building AI, Web, and Creative Systems from Scarborough to the world
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/about" className="btn-primary">
                Meet Me
              </Link>
              <Link to="/project" className="btn-secondary">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12">
        <div className="container-custom">
          <div className="card max-w-4xl mx-auto p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
              Mission Statement
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed">
              I design intelligent systems, creative web solutions, and immersive experiences — 
              bridging AI, culture, and code to create meaningful digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              What I Do
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Combining technical expertise with creative vision to build the future
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Systems Card */}
            <div className="card p-8 group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                🤖
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                AI Systems
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Multimodal AI ecosystems with blockchain integration and intelligent automation
              </p>
            </div>

            {/* Web Development Card */}
            <div className="card p-8 group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                🌐
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Web Solutions
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Modern React applications with Node.js backends and responsive design
              </p>
            </div>

            {/* Creative Projects Card */}
            <div className="card p-8 group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                �
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Creative Design
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Music production, visual design, and multimedia experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">3+</div>
              <p className="text-secondary-300">Major Projects</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">5+</div>
              <p className="text-secondary-300">Technologies</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">100%</div>
              <p className="text-secondary-300">Passion Driven</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss your next project and bring your vision to life with cutting-edge technology
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-secondary-50 transition-colors duration-200 shadow-lg"
          >
            Get In Touch
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;