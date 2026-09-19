'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trophy, Menu, X, Wallet, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, logout, isAuthenticated, isAdmin } = useAuth()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold text-gradient">CrypDraw</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#how-it-works" className="text-slate-300 hover:text-white transition">
                How It Works
              </Link>
              <Link href="#winners" className="text-slate-300 hover:text-white transition">
                Winners
              </Link>
              <Link href="#faq" className="text-slate-300 hover:text-white transition">
                FAQ
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="text-slate-300 hover:text-white transition">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
              
              {!isAuthenticated && (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-2 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              )}
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass border-t border-slate-800"
          >
            <div className="px-4 py-4 space-y-3">
              <Link href="#how-it-works" className="block text-slate-300 hover:text-white transition">
                How It Works
              </Link>
              <Link href="#winners" className="block text-slate-300 hover:text-white transition">
                Winners
              </Link>
              <Link href="#faq" className="block text-slate-300 hover:text-white transition">
                FAQ
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link href="/dashboard" className="block text-slate-300 hover:text-white transition">
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="block text-slate-300 hover:text-white transition">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block text-slate-300 hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              )}
              
              {!isAuthenticated && (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="block w-full px-6 py-2 bg-gradient-primary rounded-lg font-semibold text-center"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
