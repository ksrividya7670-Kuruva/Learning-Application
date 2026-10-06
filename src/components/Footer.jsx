import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Facebook, Twitter, Linkedin, Github, Mail, CheckCircle } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, href, label) => {
    if (href.startsWith('mailto:')) {
      return; // Let the browser handle mailto naturally
    }
    
    e.preventDefault();
    const homeSections = ['#courses', '#features', '#benefits', '#learning', '#home', '#pricing'];
    const targetId = href === '#about' ? 'benefits' : href.replace('#', '');
    
    if (homeSections.includes(href) || href === '#about') {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.alert(`${label} is coming soon!`);
    }
  };

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Courses', href: '#courses' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Features', href: '#features' },
        { label: 'Blog', href: '#blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press Kit', href: '#press' },
        { label: 'Contact', href: 'mailto:support@veeruproac.com' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'Community Forum', href: '#forum' },
        { label: 'Support', href: '#support' },
        { label: 'Status', href: '#status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' },
        { label: 'Accessibility', href: '#accessibility' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <footer className="relative bg-[#07182D] text-white">
      {/* Main Footer Content */}
      <div className="border-b border-white/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <Logo isDark={true} />
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                Empowering the next generation of developers through quality education and hands-on learning experiences.
              </p>
              <div className="mt-6 flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-none bg-white/10 p-2 text-white transition-all hover:bg-[#FF9100] hover:text-white"
                      whileHover={{ y: -4, x: -4 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerLinks.map((section, sectionIdx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (sectionIdx + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="mb-4 font-semibold text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href, link.label)}
                        className="text-sm text-gray-300 transition-colors hover:text-[#FF9100] cursor-pointer"
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <motion.div
        className="border-b border-white/20 px-4 py-12 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-none bg-white/5 p-8 backdrop-blur border border-white/10">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div>
                <h3 className="text-xl font-bold text-white">Stay Updated</h3>
                <p className="mt-1 text-gray-300">
                  Get the latest courses, tips, and career advice straight to your inbox.
                </p>
              </div>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (email) {
                    try {
                      const response = await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      });
                      
                      if (response.ok) {
                        setIsSubscribed(true);
                        setTimeout(() => {
                          setIsSubscribed(false);
                          setEmail('');
                        }, 4000);
                      } else {
                        const errData = await response.json();
                        alert(`Error: ${errData.error || 'Failed to subscribe'}`);
                      }
                    } catch (error) {
                      console.error('Subscription error:', error);
                      alert('Network error. Please make sure the backend server is running.');
                    }
                  }
                }}
                className="flex w-full flex-col gap-2 sm:w-auto lg:w-80"
              >
                {isSubscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-wrap items-start sm:items-center justify-between gap-2 rounded-none bg-[#FF9100]/20 px-4 py-2 text-[#FF9100] border border-[#FF9100]/50"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-bold text-sm">Thanks for subscribing!</span>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 rounded-none border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 focus:border-[#FF9100] focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-[#FF9100] transition-all"
                      />
                      <motion.button
                        type="submit"
                        className="rounded-none bg-[#FF9100] px-4 py-2 font-medium text-white transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,145,0,0.3)] hover:shadow-none cursor-pointer"
                        whileHover={{ y: -4, x: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="h-5 w-5" />
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-400">We respect your privacy. Unsubscribe anytime.</p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              © {currentYear} VeeruProAc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <motion.a
                href="#status"
                onClick={(e) => handleLinkClick(e, '#status', 'System Status')}
                className="text-sm text-gray-400 transition-colors hover:text-[#FF9100] cursor-pointer"
                whileHover={{ y: -4, x: -4 }}
              >
                System Status
              </motion.a>
              <motion.a
                href="#security"
                onClick={(e) => handleLinkClick(e, '#security', 'Security')}
                className="text-sm text-gray-400 transition-colors hover:text-[#FF9100] cursor-pointer"
                whileHover={{ y: -4, x: -4 }}
              >
                Security
              </motion.a>
              <motion.a
                href="#changelog"
                onClick={(e) => handleLinkClick(e, '#changelog', 'Changelog')}
                className="text-sm text-gray-400 transition-colors hover:text-[#FF9100] cursor-pointer"
                whileHover={{ y: -4, x: -4 }}
              >
                Changelog
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
