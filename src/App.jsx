import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Automation from './pages/Automation';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

// New Pages
import CaseStudies from './pages/CaseStudies';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { AdminBlogs, AdminCaseStudies, AdminPortfolio, AdminTestimonials, AdminJobs, AdminInternships, AdminSEO } from './pages/Admin/AdminModules';
function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = 'vid_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('visitor_id', visitorId);
    }
    // Fire and forget tracking pixel equivalent
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: location.pathname, session_id: visitorId })
    }).catch(() => { });
  }, [location.pathname]);

  if (location.pathname.startsWith('/admin')) {
    return (
      <Routes location={location} key="admin-routes">
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="casestudies" element={<AdminCaseStudies />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="internships" element={<AdminInternships />} />
          <Route path="seo" element={<AdminSEO />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
