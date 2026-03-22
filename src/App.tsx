import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import {
  Database,
  Globe,
  Lock,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
} from 'lucide-react'
import { GlitchText } from './components/GlitchText'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
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

// Typing effect component
const TypingText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span className={className}>
      {displayedText}
      <span className="cursor" />
    </span>
  )
}

// Matrix Rain Component
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = Array(columns).fill(1)
    const chars = '01アイウエオカキクケコサシスセソタチツテト'

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff9f'
      ctx.font = '15px JetBrains Mono'

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" />
}

// Scanline Component
const Scanline = () => (
  <div className="scanlines">
    <div className="w-full h-1 bg-cyber-cyan/20 animate-scanline" />
  </div>
)

// Noise Component
const Noise = () => <div className="noise" />

// Navbar Component
const Navbar = () => {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="text-neon-cyan neon-cyan-glow font-mono text-xl font-bold">
            &lt;CS /&gt;
          </div>
          <div className="text-neon-pink text-xs">[SYSTEM_ONLINE]</div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['home', 'projects', 'skills', 'contact'].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="text-white/60 hover:text-neon-cyan font-mono text-sm transition-colors"
            >
              [{link.toUpperCase()}]
            </a>
          ))}
        </div>

        {/* Time */}
        <div className="text-neon-cyan font-mono text-sm neon-cyan-glow">
          {currentTime}
        </div>
      </div>
    </motion.nav>
  )
}

// Hero Section
const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <Noise />
      <Scanline />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="terminal-window rounded-lg p-4x mb-12 max-w-2xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-neon-pink" />
            <div className="w-3 h-3 rounded-full bg-neon-yellow" />
            <div className="w-3 h-3 rounded-full bg-neon-cyan" />
          </div>
          <div className="font-mono text-sm space-y-2">
            <p className="text-neon-cyan">
              <span className="text-white">root@system:~$</span> init_sequence
            </p>
            <p className="text-neon-pink">Loading developer profile...</p>
            <p className="text-neon-yellow">Skills: [LOADED]</p>
            <p className="text-neon-cyan">Status: [READY]</p>
            <p className="text-white">
              <TypingText text="Hello, World! I'm Chen Shan." className="text-white" />
            </p>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="mb-8"
        >
          <GlitchText
            text="FULL-STACK DEVELOPER"
            className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-white neon-cyan-glow"
            delay={1.6}
          />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="font-mono text-white/60 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          Crafting digital experiences at the intersection of design and
          technology. Specialized in building performant, scalable applications
          with modern frameworks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="neon-button bg-transparent border-2 border-neon-cyan text-neon-cyan px-8 py-3 font-mono font-medium rounded hover:bg-neon-cyan hover:text-black flex items-center space-x-2"
          >
            <span>VIEW_PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button className="flex items-center space-x-2 text-white/60 hover:text-neon-pink font-mono text-sm transition-colors">
            <Download className="w-4 h-4" />
            <span>DOWNLOAD_RESUME.EXE</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.4 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl"
        >
          {[
            { label: 'YEARS_EXP', value: '5+' },
            { label: 'PROJECTS', value: '50+' },
            { label: 'CLIENTS', value: '30+' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-bold text-neon-cyan neon-cyan-glow">
                {stat.value}
              </div>
              <div className="text-white/40 font-mono text-xs mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Projects Section
const Projects = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'FINTECH_DASHBOARD',
      description: 'Real-time analytics platform with AI-powered insights',
      tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      icon: Database,
    },
    {
      title: 'E_COMMERCE_API',
      description: 'Scalable e-commerce backend with microservices architecture',
      tech: ['Next.js', 'PostgreSQL', 'Redis', 'Docker'],
      icon: Globe,
    },
    {
      title: 'CYBER_SECURITY_TOOL',
      description: 'Advanced threat detection and vulnerability scanner',
      tech: ['Python', 'Go', 'Kubernetes', 'TensorFlow'],
      icon: Lock,
    },
  ]

  return (
    <section ref={ref} id="projects" className="relative py-32 px-4 md:px-8">
      <Noise />
      <Scanline />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-neon-pink font-mono text-sm mb-4">// PROJECTS</div>
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white neon-pink-glow">
            SELECTED_WORKS
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="cyber-card rounded-lg p-6"
            >
              <project.icon className="text-neon-cyan w-8 h-8 mb-4" />
              <h3 className="font-mono text-xl font-bold text-white mb-3">
                {project.title}
              </h3>
              <p className="font-mono text-white/60 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-neon-pink font-mono text-xs px-2 py-1 border border-neon-pink/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Skills Section
const Skills = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  const skills = {
    Frontend: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind', level: 92 },
    ],
    Backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Go', level: 75 },
      { name: 'PostgreSQL', level: 82 },
    ],
    DevOps: [
      { name: 'Docker', level: 88 },
      { name: 'Kubernetes', level: 80 },
      { name: 'AWS', level: 85 },
      { name: 'CI/CD', level: 90 },
    ],
  }

  return (
    <section ref={ref} id="skills" className="relative py-32 px-4 md:px-8">
      <Noise />
      <Scanline />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-neon-yellow font-mono text-sm mb-4">// SKILLS</div>
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white neon-yellow-glow">
            TECH_STACK
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              className="terminal-window rounded-lg p-6"
            >
              <h3 className="text-neon-cyan font-mono text-lg font-bold mb-6">
                {category.toUpperCase()}
              </h3>
              <div className="space-y-4">
                {items.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-mono text-sm">
                        {skill.name}
                      </span>
                      <span className="text-neon-pink font-mono text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 bg-white/10 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Terminal Section
const TerminalSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative py-32 px-4 md:px-8">
      <Noise />
      <Scanline />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="terminal-window rounded-lg p-8"
        >
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-neon-pink animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-neon-yellow" />
            <div className="w-3 h-3 rounded-full bg-neon-cyan" />
            <span className="text-white/40 font-mono text-sm ml-4">
              terminal - bash - 80x24
            </span>
          </div>

          <div className="font-mono text-sm space-y-3">
            <p className="text-neon-cyan">
              <span className="text-white">root@system:~$</span> whoami
            </p>
            <p className="text-neon-pink">chen-shan</p>
            <p className="text-neon-cyan">
              <span className="text-white">root@system:~$</span> cat philosophy.txt
            </p>
            <p className="text-white/80 leading-relaxed">
              "I believe in writing clean, maintainable code that scales.
              <br />
              Every line of code is a story, every function is a chapter.
              <br />
              Let's build something extraordinary together."
            </p>
            <p className="text-neon-cyan">
              <span className="text-white">root@system:~$</span>
              <span className="cursor" />
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
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ]

  return (
    <section ref={ref} id="contact" className="relative py-32 px-4 md:px-8">
      <Noise />
      <Scanline />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-neon-cyan font-mono text-sm mb-4">// CONTACT</div>
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-white neon-cyan-glow mb-6">
            LET'S_CONNECT
          </h2>
          <p className="font-mono text-white/60 text-lg max-w-2xl mx-auto mb-12">
            Ready to build something amazing? Let's discuss your project.
          </p>

          {/* Email Button */}
          <a
            href="mailto:hello@example.com"
            className="neon-button inline-flex items-center space-x-3 bg-neon-cyan text-black px-12 py-4 font-mono font-bold rounded-lg hover:bg-neon-pink mb-12"
          >
            <Mail className="w-5 h-5" />
            <span>SEND_EMAIL</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 mb-12">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="cyber-card rounded-full w-12 h-12 flex items-center justify-center text-white/60 hover:text-neon-cyan"
              >
              <social.icon className="w-5 h-5" />
            </a>
            ))}
          </div>

          {/* Footer */}
          <div className="text-white/40 font-mono text-sm space-y-2">
            <p>© 2024 CHEN_SHAN. ALL_SYSTEMS_NORMAL.</p>
            <p className="text-xs">
              BUILT_WITH REACT + TYPESCRIPT + TAILWIND + FRAMER_MOTION
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
    <div className="bg-cyber-black text-white font-mono overflow-x-hidden">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <TerminalSection />
      <Contact />
    </div>
  )
}
