'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AnimatedUnderline({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <span className="relative inline-block" ref={ref}>
      <span className="relative z-10">{children}</span>
      <motion.svg
        className="absolute -bottom-1 left-0 w-full h-4 z-0 "
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,5 C20,12 80,-2 100,5"
          fill="none"
          stroke="#d68a49"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </motion.svg>
    </span>
  )
}
