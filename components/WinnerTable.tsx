'use client'

import { motion } from 'framer-motion'
import { Trophy, Star } from 'lucide-react'

interface Winner {
  id: string
  walletAddress: string
  prize: string
  date: string
  avatar: string
}

interface WinnerTableProps {
  winners: Winner[]
}

export default function WinnerTable({ winners }: WinnerTableProps) {
  return (
    <div className="space-y-4">
      {winners.map((winner, index) => (
        <motion.div
          key={winner.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">{winner.avatar}</div>
            <div>
              <div className="font-semibold">{winner.walletAddress}</div>
              <div className="text-sm text-slate-400">{winner.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-400" />
            <span className="font-bold text-gradient">{winner.prize}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
