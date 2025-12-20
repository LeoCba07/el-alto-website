'use client'

import { useEffect, useState, useRef } from 'react'
import { HiOutlineTrophy } from 'react-icons/hi2'
import { SiTripadvisor } from 'react-icons/si'
import { TbCalendarCheck, TbHomeHeart } from 'react-icons/tb'

function useCountUp(end: number, duration: number = 2000, start: number = 0, decimals: number = 0) {
  const [count, setCount] = useState(start)
  const [hasStarted, setHasStarted] = useState(false)

  const startCounting = () => {
    if (hasStarted) return
    setHasStarted(true)

    const startTime = Date.now()
    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * easeOut

      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(animate)
  }

  return { count, startCounting, hasStarted }
}

function useInView(threshold = 0.5) {
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

function AnimatedStat({
  end,
  start = 0,
  suffix = '',
  prefix = '',
  label,
  Icon,
  decimals = 0,
  isInView,
}: {
  end: number
  start?: number
  suffix?: string
  prefix?: string
  label: string
  Icon: React.ComponentType<{ className?: string }>
  decimals?: number
  isInView: boolean
}) {
  const { count, startCounting, hasStarted } = useCountUp(end, 2000, start, decimals)

  useEffect(() => {
    if (isInView && !hasStarted) {
      startCounting()
    }
  }, [isInView, hasStarted, startCounting])

  return (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 bg-amber/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-amber" />
      </div>
      <div>
        <span className="font-bold text-white text-lg">
          {prefix}{count}<span className="text-white/50 font-normal">{suffix}</span>
        </span>
        <p className="text-white/70 text-xs">{label}</p>
      </div>
    </div>
  )
}

export default function TrustSignals() {
  const { ref, isInView } = useInView(0.5)
  const [showShine, setShowShine] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowShine(true), 2100)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <section ref={ref} className="bg-forest-dark py-6 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-14">
          <AnimatedStat
            end={28}
            suffix="+"
            label="años de experiencia"
            Icon={TbCalendarCheck}
            isInView={isInView}
          />
          <AnimatedStat
            end={4.6}
            suffix="/5"
            label="en TripAdvisor"
            Icon={SiTripadvisor}
            decimals={1}
            isInView={isInView}
          />
          <AnimatedStat
            end={1}
            start={20}
            prefix="#"
            label="en Tanti"
            Icon={HiOutlineTrophy}
            isInView={isInView}
          />
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-amber/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TbHomeHeart className="w-5 h-5 text-amber" />
            </div>
            <div>
              <span className={`font-bold text-lg inline-block relative overflow-hidden ${showShine ? 'text-shine' : 'text-white'}`}>
                Familiar
              </span>
              <p className="text-white/70 text-xs">atendido por sus dueños</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
