# CrypDraw - Crypto Lucky Draw Platform

A modern, secure, and transparent cryptocurrency lucky draw platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Public Landing Page**: Modern dark crypto-style design with smooth animations
- **User Dashboard**: Protected route for users to manage their tickets and view history
- **Admin Panel**: Protected route for admins to manage draws, view transactions, and create new draws
- **Smart Contract Security**: All draws powered by audited smart contracts (demo)
- **Transparent Results**: Every draw result is verifiable on blockchain (demo)
- **Instant Payouts**: Winners receive prizes instantly to their wallet (demo)
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

### Backend
- Supabase (PostgreSQL database)
- Supabase Authentication

### Deployment
- Vercel (recommended)

## Project Structure

```
CrypDraw/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # User dashboard
│   ├── admin/
│   │   └── page.tsx          # Admin panel
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation component
│   ├── Hero.tsx              # Hero section
│   ├── CurrentDraw.tsx       # Current draw section
│   ├── Countdown.tsx         # Countdown timer
│   ├── PrizeCard.tsx         # Prize card component
│   ├── HowItWorks.tsx        # How it works section
│   ├── RecentWinners.tsx     # Recent winners section
│   ├── WinnerTable.tsx       # Winners table
│   ├── FAQ.tsx               # FAQ section
│   ├── Footer.tsx            # Footer component
│   ├── DashboardCard.tsx      # Dashboard card component
│   └── AdminTable.tsx         # Admin table component
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Utility functions
├── supabase/
│   └── schema.sql            # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd CrypDraw
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to the SQL Editor in your Supabase dashboard
3. Copy the contents of `supabase/schema.sql` and run it in the SQL Editor
4. This will create all necessary tables and set up RLS policies

### 4. Configure Environment Variables

1. In your Supabase project, go to Settings > API
2. Copy your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

- **users**: User profiles and wallet addresses
- **draws**: Lucky draw information
- **tickets**: User tickets for draws
- **transactions**: Transaction history
- **winners**: Draw winners

See `supabase/schema.sql` for complete schema including RLS policies.

## Pages

### `/` - Landing Page
- Hero section with call-to-action
- Current draw with countdown timer
- How it works section
- Recent winners
- FAQ
- Footer

### `/dashboard` - User Dashboard (Protected)
- User profile with wallet address
- Statistics (total tickets, spent, won)
- My tickets table
- Transaction history

### `/admin` - Admin Panel (Protected)
- Platform statistics
- Create new draw form
- Recent transactions table
- Manage draws table

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
5. Click "Deploy"

### 3. Configure Custom Domain (Optional)

1. In Vercel project settings, add your custom domain
2. Update DNS settings as instructed by Vercel

## Current Status

This is an MVP prototype with demo data. The following features are implemented:

- ✅ Complete frontend with all pages
- ✅ Responsive design
- ✅ Smooth animations with Framer Motion
- ✅ Database schema with Supabase
- ✅ Component architecture
- ⏳ Real authentication (needs Supabase Auth setup)
- ⏳ Real wallet integration (needs Web3 integration)
- ⏳ Real payment processing (needs smart contract integration)
- ⏳ Protected routes (needs middleware implementation)

## Next Steps

1. Implement Supabase Authentication
2. Add Web3 wallet integration (MetaMask, WalletConnect)
3. Implement protected route middleware
4. Connect frontend to Supabase for real data
5. Add smart contract integration for draw execution
6. Implement real-time updates with Supabase Realtime
7. Add email notifications for winners
8. Implement transaction verification

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.
