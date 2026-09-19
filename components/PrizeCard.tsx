'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Ticket, ArrowRight } from 'lucide-react'
import Countdown from './Countdown'

interface PrizeCardProps {
  drawNumber: number
  prizePool: string
  ticketPrice: string
  participants: number
  endDate: Date
}

export default function PrizeCard({ 
  drawNumber, 
  prizePool, 
  ticketPrice, 
  participants, 
  endDate 
}: PrizeCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-slate-400 mb-1">Current Draw</div>
          <div className="text-2xl font-bold">#{drawNumber}</div>
        </div>
        <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
          Active
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-sm text-slate-400 mb-2">Prize Pool</div>
        <div className="text-5xl font-bold text-gradient mb-2">{prizePool}</div>
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            <span>{ticketPrice} per ticket</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{participants} participants</span>
          </div>
        </div>
      </div>

      <Countdown targetDate={endDate} />

      <button className="w-full py-4 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
        Enter Draw
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  )
}
