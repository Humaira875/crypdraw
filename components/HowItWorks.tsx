'use client'

import { motion } from 'framer-motion'
import { Wallet, Gift, Zap, Trophy, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your crypto wallet securely to participate in draws',
  },
  {
    icon: Gift,
    title: 'Choose Draw',
    description: 'Select from available draws with different prize pools',
  },
  {
    icon: Zap,
    title: 'Enter Draw',
    description: 'Purchase tickets using supported cryptocurrencies',
  },
  {
    icon: Trophy,
    title: 'Win Prizes',
    description: 'Winners are selected fairly using smart contracts',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Simple, secure, and transparent process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass rounded-xl p-6 h-full">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold mb-2">{step.title}</div>
                <div className="text-slate-400">{step.description}</div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
