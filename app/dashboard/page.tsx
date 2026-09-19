'use client'

import { motion } from 'framer-motion'
import { Wallet, Ticket, Trophy, History, LogOut, User } from 'lucide-react'
import DashboardCard from '@/components/DashboardCard'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    const fetchData = async () => {
      if (!user?.id) return

      // Fetch tickets
      const { data: ticketsData } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id)

      if (ticketsData) {
        setTickets(ticketsData)
      }

      // Fetch transactions
      const { data: txData } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (txData) {
        setTransactions(txData)
      }

      setLoading(false)
    }

    fetchData()
  }, [user, isAuthenticated, router, supabase])

  if (!isAuthenticated) {
    return null
  }

  const userStats = {
    totalTickets: tickets.length,
    totalSpent: `${tickets.length * 0.01} ETH`,
    totalWon: '0 ETH',
    activeDraws: tickets.filter((t: any) => t.status === 'active').length,
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-slate-400">Manage your CrypDraw account</p>
          </motion.div>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">{user?.email || 'User'}</div>
                  <div className="text-slate-400 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    {user?.wallet_address || 'No wallet connected'}
                  </div>
                  <div className="text-sm text-green-400 mt-1">
                    Balance: ${user?.balance || 0}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Total Tickets"
              value={userStats.totalTickets}
              icon={Ticket}
              description="Across all draws"
            />
            <DashboardCard
              title="Total Spent"
              value={userStats.totalSpent}
              icon={Wallet}
              description="On ticket purchases"
            />
            <DashboardCard
              title="Total Won"
              value={userStats.totalWon}
              icon={Trophy}
              description="From winning draws"
              trend="+25%"
            />
            <DashboardCard
              title="Active Draws"
              value={userStats.activeDraws}
              icon={History}
              description="Currently participating"
            />
          </div>

          {/* My Tickets Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Draw #</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Ticket Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Draw Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-slate-400">Loading...</td>
                    </tr>
                  ) : tickets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-slate-400">No tickets yet</td>
                    </tr>
                  ) : (
                    tickets.map((ticket: any) => (
                      <tr key={ticket.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition">
                        <td className="px-6 py-4 font-semibold">#{ticket.draw_id}</td>
                        <td className="px-6 py-4 text-slate-400">{ticket.ticket_number}</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(ticket.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            ticket.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-slate-500/20 text-slate-400'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Transactions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Transaction Hash</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-slate-400">Loading...</td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-slate-400">No transactions yet</td>
                    </tr>
                  ) : (
                    transactions.map((tx: any) => (
                      <tr key={tx.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition">
                        <td className="px-6 py-4 font-semibold">{tx.type}</td>
                        <td className="px-6 py-4 text-gradient font-bold">{tx.amount}</td>
                        <td className="px-6 py-4 text-slate-400">{tx.transaction_hash?.substring(0, 10)}...</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(tx.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
