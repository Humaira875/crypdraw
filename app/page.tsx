'use client'

import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import CurrentDraw from "@/components/CurrentDraw"
import HowItWorks from "@/components/HowItWorks"
import RecentWinners from "@/components/RecentWinners"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import { useAuth } from "@/contexts/AuthContext"

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {isAuthenticated && <CurrentDraw />}
      <HowItWorks />
      <RecentWinners />
      <FAQ />
      <Footer />
    </main>
  )
}
