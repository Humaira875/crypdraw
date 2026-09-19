'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How does CrypDraw ensure fairness?',
    answer: 'CrypDraw uses audited smart contracts to ensure complete transparency and fairness. All draw results are verifiable on the blockchain, and the winner selection process is provably random.',
  },
  {
    question: 'What cryptocurrencies can I use?',
    answer: 'Currently, we support ETH, USDT, USDC, BTC, SOL, and MATIC. We plan to add more cryptocurrencies based on community demand.',
  },
  {
    question: 'How are winners paid?',
    answer: 'Winners are paid instantly to their connected wallet address after the draw concludes. The entire process is automated through smart contracts.',
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Yes, we prioritize your privacy. We only store your wallet address and email (optional). All transactions are encrypted and we never share your data with third parties.',
  },
  {
    question: 'What are the fees?',
    answer: 'CrypDraw charges a small platform fee of 5% on each ticket purchase. This fee helps maintain the platform and fund future prize pools.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-slate-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
