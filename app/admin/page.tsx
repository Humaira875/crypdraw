'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Ticket, DollarSign, Plus, CheckCircle, XCircle, Clock } from 'lucide-react'
import DashboardCard from '@/components/DashboardCard'
import AdminTable from '@/components/AdminTable'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function Admin() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [showCreateDraw, setShowCreateDraw] = useState(false)

  if (!isAuthenticated || !isAdmin) {
    router.push('/')
    return null
  }

  // Demo data - will be replaced with Supabase data
  const adminStats = {
    totalUsers: 1024,
    totalTickets: 5678,
    currentPrizePool: '5 ETH',
    activeDraws: 3,
  }

  const recentTransactions = [
    { id: '1', wallet: '0x7a3...f2d9', amount: '0.01 ETH', hash: '0x123...abc', date: 'Sep 18, 2026', status: 'completed' },
    { id: '2', wallet: '0x4b2...8c1e', amount: '0.01 ETH', hash: '0x456...def', date: 'Sep 18, 2026', status: 'completed' },
    { id: '3', wallet: '0x9d1...3e7f', amount: '0.01 ETH', hash: '0x789...ghi', date: 'Sep 18, 2026', status: 'pending' },
  ]

  const draws = [
    { id: '1', number: 42, prizePool: '5 ETH', ticketPrice: '0.01 ETH', startDate: 'Sep 15, 2026', endDate: 'Sep 20, 2026', status: 'active' },
    { id: '2', number: 41, prizePool: '3 ETH', ticketPrice: '0.01 ETH', startDate: 'Sep 10, 2026', endDate: 'Sep 15, 2026', status: 'completed' },
    { id: '3', number: 40, prizePool: '2 ETH', ticketPrice: '0.01 ETH', startDate: 'Sep 5, 2026', endDate: 'Sep 10, 2026', status: 'completed' },
  ]

  const transactionColumns = [
    { key: 'wallet', header: 'Wallet Address' },
    { key: 'amount', header: 'Amount' },
    { key: 'hash', header: 'Transaction Hash' },
    { key: 'date', header: 'Date' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-sm ${
          value === 'completed' 
            ? 'bg-green-500/20 text-green-400' 
            : value === 'pending'
            ? 'bg-yellow-500/20 text-yellow-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {value}
        </span>
      ),
    },
  ]

  const drawColumns = [
    { key: 'number', header: 'Draw #', render: (value: number) => `#${value}` },
    { key: 'prizePool', header: 'Prize Pool' },
    { key: 'ticketPrice', header: 'Ticket Price' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-sm ${
          value === 'active' 
            ? 'bg-green-500/20 text-green-400' 
            : value === 'completed'
            ? 'bg-blue-500/20 text-blue-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {value}
        </span>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-gradient">Admin Panel</span>
              </h1>
              <p className="text-slate-400">Manage CrypDraw platform</p>
            </div>
            <button
              onClick={() => setShowCreateDraw(!showCreateDraw)}
              className="px-6 py-3 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New Draw
            </button>
          </motion.div>

          {/* Create Draw Form */}
          {showCreateDraw && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Create New Draw</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Draw Number</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-primary-500 focus:outline-none transition"
                    placeholder="43"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Prize Pool</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-primary-500 focus:outline-none transition"
                    placeholder="5 ETH"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Ticket Price</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-primary-500 focus:outline-none transition"
                    placeholder="0.01 ETH"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-primary-500 focus:outline-none transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-primary rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Create Draw
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Total Users"
              value={adminStats.totalUsers}
              icon={Users}
              trend="+12%"
            />
            <DashboardCard
              title="Total Tickets"
              value={adminStats.totalTickets}
              icon={Ticket}
              trend="+8%"
            />
            <DashboardCard
              title="Current Prize Pool"
              value={adminStats.currentPrizePool}
              icon={DollarSign}
            />
            <DashboardCard
              title="Active Draws"
              value={adminStats.activeDraws}
              icon={CheckCircle}
            />
          </div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <AdminTable columns={transactionColumns} data={recentTransactions} />
          </motion.div>

          {/* Manage Draws */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Manage Draws</h2>
            <AdminTable columns={drawColumns} data={draws} />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
