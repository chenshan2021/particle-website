import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  delay?: number
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      <motion.span
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay,
          ease: 'easeOut',
        }}
        className="glitch"
        data-text={text}
      >
        {text}
      </motion.span>
    </div>
  )
}
