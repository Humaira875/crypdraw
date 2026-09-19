'use client'

import Link from 'next/link'
import { Trophy, Twitter, Github, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold text-gradient">CrypDraw</span>
            </Link>
            <p className="text-slate-400 text-sm">
              The future of crypto lucky draws. Secure, transparent, and fair.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#current-draw" className="hover:text-white transition">Current Draw</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link href="#winners" className="hover:text-white transition">Winners</Link></li>
              <li><Link href="#faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2026 CrypDraw. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
