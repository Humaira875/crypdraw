'use client'

import { motion } from 'framer-motion'
import WinnerTable from './WinnerTable'

export default function RecentWinners() {
  // Demo data - will be replaced with Supabase data
  const winners = [
    { id: '1', walletAddress: '0x7a3...f2d9', prize: '5 ETH', date: 'Sep 15, 2026', avatar: '🎯' },
    { id: '2', walletAddress: '0x4b2...8c1e', prize: '10,000 USDT', date: 'Sep 10, 2026', avatar: '🚀' },
    { id: '3', walletAddress: '0x9d1...3e7f', prize: '2 BTC', date: 'Sep 5, 2026', avatar: '💎' },
    { id: '4', walletAddress: '0x2e8...5a4b', prize: '1 SOL', date: 'Aug 30, 2026', avatar: '⭐' },
    { id: '5', walletAddress: '0x6f4...9c2d', prize: '500 MATIC', date: 'Aug 25, 2026', avatar: '🎪' },
  ]

  return (
    <section id="winners" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Recent Winners</span>
          </h2>
          <p className="text-slate-400 text-lg">
            See who's winning big on CrypDraw
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <WinnerTable winners={winners} />
        </div>
      </div>
    </section>
  )
}
