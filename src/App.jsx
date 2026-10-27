import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import ScheduleMeeting from './pages/ScheduleMeeting';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { AdminBlogs, AdminCaseStudies, AdminPortfolio, AdminTestimonials, AdminJobs, AdminInternships, AdminSEO, AdminClientLogos } from './pages/Admin/AdminModules';
import CustomProjectsManager from './pages/Admin/CustomProjectsManager';
import AdminApplications from './pages/Admin/AdminApplications';
function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    // Always reset scroll to top on page navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

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

  if (location.pathname.startsWith('/tai')) {
    return (
      <Routes location={location} key="admin-routes">
        <Route path="/tai/login" element={<AdminLogin />} />
        <Route path="/tai" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="casestudies" element={<AdminCaseStudies />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="internships" element={<AdminInternships />} />
          <Route path="recent-projects" element={<CustomProjectsManager />} />
          <Route path="client-logos" element={<AdminClientLogos />} />
          <Route path="seo" element={<AdminSEO />} />
        </Route>
        <Route path="*" element={<NotFound />} />
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
          <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
          {/* Catch-all 404 Route for any unmatched paths (including /admin) */}
          <Route path="*" element={<NotFound />} />
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
