'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, TrendingUp, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Hero() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Trophy className="w-4 h-4 text-accent-400" />
            <span className="text-sm text-slate-300">Secure & Transparent Crypto Draws</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Win Big with</span>
            <br />
            <span className="text-white">Crypto Lucky Draws</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Participate in fair, transparent, and secure cryptocurrency lucky draws. 
            Powered by smart contracts for guaranteed fairness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isAuthenticated ? (
              <Link 
                href="#current-draw"
                className="px-8 py-4 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                View Current Draw
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link 
                href="#how-it-works"
                className="px-8 py-4 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet to Play
              </Link>
            )}
            <Link 
              href="#how-it-works"
              className="px-8 py-4 glass rounded-lg font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              How It Works
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <Users className="w-8 h-8 text-primary-400 mb-4 mx-auto" />
              <div className="text-3xl font-bold text-gradient mb-2">10,000+</div>
              <div className="text-slate-400">Active Users</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <Trophy className="w-8 h-8 text-accent-400 mb-4 mx-auto" />
              <div className="text-3xl font-bold text-gradient mb-2">$500K+</div>
              <div className="text-slate-400">Prizes Distributed</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-6"
            >
              <TrendingUp className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <div className="text-3xl font-bold text-gradient mb-2">100%</div>
              <div className="text-slate-400">Transparent</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
