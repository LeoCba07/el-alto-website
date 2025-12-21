'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

// Hook to detect when element is in view - exported for reuse
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// Fade up animation wrapper
export function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Staggered children animation wrapper
export function StaggerChildren({
  children,
  staggerDelay = 100,
  className = '',
}: {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className="transition-all duration-500 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: isInView ? `${index * staggerDelay}ms` : '0ms',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// For grid layouts with staggered reveal
export function StaggerGrid({
  children,
  staggerDelay = 100,
  className = '',
}: {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className="transition-all duration-500 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transitionDelay: isInView ? `${index * staggerDelay}ms` : '0ms',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
