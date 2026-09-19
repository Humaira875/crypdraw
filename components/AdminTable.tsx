'use client'

import { motion } from 'framer-motion'

interface Column {
  key: string
  header: string
  render?: (value: any, row: any) => React.ReactNode
}

interface AdminTableProps {
  columns: Column[]
  data: any[]
}

export default function AdminTable({ columns, data }: AdminTableProps) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
