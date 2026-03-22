import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Palette,
  Code,
  Briefcase,
  MessageSquare,
  Download,
} from 'lucide-react'
import { BlurText } from './components/BlurText'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
// Navbar Component
const Navbar = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8"
  >
    <div className="max-w-7xl mx-auto">
      <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between backdrop-blur-xl">
        {/* Logo */}
        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-heading italic font-bold">
          CS
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          {['Work', 'About', 'Skills', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/60 hover:text-white text-sm font-body font-light transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="bg-white text-black rounded-full px-6 py-2 text-sm font-body font-medium hover:scale-105 transition-transform"
        >
          Let's Talk
        </a>
      </div>
    </div>
  </motion.nav>
)

// Hero Section
const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="liquid-glass rounded-full px-4 py-2 inline-flex items-center space-x-2 mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/60 text-xs">Available for work</span>
          <span className="text-white/40">•</span>
          <span className="text-white/60 text-xs">Based in Shanghai</span>
        </motion.div>

        {/* Heading */}
        <div className="mb-6">
          <BlurText
            text="Crafting Digital Experiences That Matter."
            className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl md:text-6xl lg:text-[6rem]"
            delay={0.4}
          />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="font-body font-light text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-12"
        >
          I'm a Full-Stack Developer & Designer specializing in creating premium
          digital experiences. I blend aesthetic precision with technical excellence
          to build products that feel like magic.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center space-x-4 mb-16"
        >
          <a
            href="#work"
            className="liquid-glass-strong rounded-full px-8 py-3 text-sm font-body font-medium text-white flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button className="text-white/60 text-sm font-body font-light flex items-center space-x-2 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          className="liquid-glass rounded-full px-6 py-3 inline-flex items-center space-x-4"
        >
          <span className="text-white/40 text-xs">Previously at:</span>
          <span className="text-white/80 text-xs">TechCorp</span>
          <span className="text-white/40">•</span>
          <span className="text-white/80. text-xs">StartupX</span>
        </motion.div>
      </div>
    </section>
  )
}

// Work Section
const Work = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'Fintech Dashboard',
      tags: ['React', 'TypeScript', 'Figma'],
      description: 'A premium financial dashboard with real-time analytics and AI-powered insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
      title: 'E-Commerce Platform',
      tags: ['Next.js', 'Stripe', 'Node.js'],
      description: 'A modern e-commerce experience with seamless checkout and personalized recommendations.',
      image: 'https://images.unsplash.com/photo-1556742043-60a1e56e5d1d?w=800&q=80',
    },
    {
      title: 'AI Chat Application',
      tags: ['OpenAI', 'WebSockets', 'MongoDB'],
      description: 'An intelligent chat application with context-aware responses and real-time collaboration.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    },
  ]

  return (
    <section
      ref={ref}
      id="work"
      className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-black to-black/90"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 inline-block mb-6">
            Portfolio
          </span>
          <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl md:text-5xl">
            Selected Works
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.a
              key={index}
              variants={fadeInUp}
              href="#"
              className="liquid-glass rounded-3xl overflow-hidden group block"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading italic text-white text-xl mb-3">
                  {project.title}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-white/40 text-xs font-light"
                    >
                      {tag}
                      {i < project.tags.length - 1 && ' • '}
                    </span>
                  ))}
                </div>
                <p className="font-body font-light text-white/60 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex items-center text-white text-sm font-medium">
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// About Section
const About = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  const skills = {
    Design: ['Figma', 'Spline', 'After Effects', 'Blender'],
    Development: ['React', 'TypeScript', 'Node.js', 'Next.js'],
    Tools: ['Git', 'Vite', 'Docker', 'Framer Motion'],
  }

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-white-and-blue-video-background-27967-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: About */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 inline-block mb-6">
              About Me
            </span>
            <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl md:text-5xl mb-8">
              More than just code.
            </h2>
            <p className="font-body font-light text-white/60 text-sm md:text-base leading-relaxed mb-8">
              I believe that great digital experiences are born from the perfect
              intersection of design and technology. With over 5 years of experience
              building products for startups and enterprises, I've developed a
              deep understanding of what makes users click, engage, and convert.
            </p>
            <p className="font-body font-light text-white/60 text-sm md:text-base leading-relaxed">
              My approach is simple: start with empathy, iterate with purpose, and
              ship with confidence. Every pixel, every interaction, every line of
              code is crafted with intention.
            </p>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-heading italic text-white text-3xl mb-8">Skills</h3>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <span className="text-white/40 text-xs uppercase tracking-wider mb-3 block">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Services Section
const Services = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  const services = [
    {
      icon: Briefcase,
      title: 'Strategy',
      description: 'Research, Wireframing, UX Audit',
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'UI Design, Prototyping, Design Systems',
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Frontend Architecture, Performance Optimization',
    },
  ]

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-32 px-4 md:px-8 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 inline-block mb-6">
            What I Do
          </span>
          <h2 className="font-heading italic text-white tracking-tight leading-[0.9]` text-4xl md:text-5xl">
            End-to-end expertise
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="liquid-glass rounded-2xl p-8"
            >
              <div className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading italic text-white text-2xl mb-4">
                {service.title}
              </h3>
              <p className="font-body font-light text-white/60 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Testimonials Section
const Testimonials = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative py-32 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-3xl p-12 text-center"
        >
          <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-8" />
          <blockquote className="font-heading italic text-white text-3xl md:text-4xl leading-relaxed mb-8">
            "Working with Chen was a transformative experience. They didn't just
            build our product—they elevated our vision and helped us achieve
            results we never thought possible."
          </blockquote>
          <div className="space-y-1">
            <p className="font-body font-medium text-white text-sm">
              Sarah Johnson
            </p>
            <p className="font-body font-light text-white/40 text-xs">
              CEO, TechStart Inc.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Dribbble, href: '#', label: 'Dribbble' },
  ]

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading italic text-white tracking-tight leading-[0.9] text-4xl md:text-5xl lg:text-6xl mb-6">
            Let's build something iconic.
          </h2>
          <p className="font-body font-light text-white/60 text-sm md:text-base mb-12">
            Currently accepting new projects for Q2 2026.
          </p>

          {/* Email Button */}
          <a
            href="mailto:hello@example.com"
            className="liquid-glass-strong rounded-full px-12 py-4 inline-flex items-center space-x-3 text-white font-body font-medium hover:scale-105 transition-transform mb-12"
          >
            <Mail className="w-5 h-5" />
            <span>Email Me</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="liquid-glass rounded-full w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:scale-110 transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-white/10">
            <p className="font-body font-light text-white/40 text-xs">
              © 2024 Chen Shan. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main App Component
export default function App() {
  return (
    <div className="bg-black overflow-visible text-white">
      <Navbar />
      <Hero />
      <Work />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  )
}
