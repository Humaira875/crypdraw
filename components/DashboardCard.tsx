'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: string
}

export default function DashboardCard({ title, value, icon: Icon, description, trend }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm text-green-400 font-semibold">{trend}</span>
        )}
      </div>
      <div className="text-3xl font-bold text-gradient mb-2">{value}</div>
      <div className="text-slate-400">{title}</div>
      {description && (
        <div className="text-sm text-slate-500 mt-2">{description}</div>
      )}
    </motion.div>
  )
}
