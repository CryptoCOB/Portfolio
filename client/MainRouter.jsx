import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './components/Home'
import About from './src/about'
import Contact from './src/contact'
import Education from './src/education'
import Project from './src/project'
import Services from './src/services'
import Layout from './components/Layout'
import { DarkModeToggle } from './src/components/DarkModeToggle'

const MainRouter = () => {
  const location = useLocation();

  // Smooth page transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <DarkModeToggle />
      <Layout/>
      <main className="page-transition-enter">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/education" element={<Education />} />
          <Route exact path="/project" element={<Project />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default MainRouter