import React, { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './components/Home'
const MusicPlayer = React.lazy(() => import('./components/MusicPlayer'))
import About from './src/about'
import Contact from './src/contact'
import Education from './src/education'
import Project from './src/project'
import Services from './src/services'
const Login = React.lazy(() => import('./src/login'))
const Register = React.lazy(() => import('./src/register'))
const Admin = React.lazy(() => import('./src/admin'))
import ProtectedRoute from './src/components/ProtectedRoute'
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
  <Suspense fallback={<div className="p-6">Loading…</div>}>
  <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/music" element={
            <Suspense fallback={<div className="p-6">Loading Music Player…</div>}>
              <MusicPlayer />
            </Suspense>
          } />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/education" element={<Education />} />
          <Route exact path="/project" element={<Project />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default MainRouter