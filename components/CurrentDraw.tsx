'use client'

import { motion } from 'framer-motion'
import PrizeCard from './PrizeCard'

export default function CurrentDraw() {
  // Demo data - will be replaced with Supabase data
  const currentDraw = {
    drawNumber: 42,
    prizePool: '5 ETH',
    ticketPrice: '0.01 ETH',
    participants: 1234,
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // 2 days 14 hours from now
  }

  return (
    <section id="current-draw" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Current Draw</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Don't miss your chance to win big!
          </p>
        </motion.div>

        <PrizeCard {...currentDraw} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-primary-400 mb-2">Smart Contract</div>
            <div className="text-slate-400">100% transparent and verifiable</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-accent-400 mb-2">Instant Payout</div>
            <div className="text-slate-400">Winners paid immediately</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">Fair & Random</div>
            <div className="text-slate-400">Provably random selection</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
