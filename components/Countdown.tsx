'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface CountdownProps {
  targetDate: Date
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="glass rounded-lg p-4 min-w-[80px]">
      <div className="text-3xl font-bold text-gradient">{value.toString().padStart(2, '0')}</div>
      <div className="text-xs text-slate-400 uppercase">{label}</div>
    </div>
  )

  return (
    <div className="flex items-center gap-2 mb-6">
      <Clock className="w-5 h-5 text-accent-400" />
      <div className="flex gap-2">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  )
}
