import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
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

  const words = text.split(' ')

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={isVisible ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{
            duration,
            delay: delay + i * 0.05,
            ease: 'easeOut',
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
