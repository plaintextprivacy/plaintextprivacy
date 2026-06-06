import type { ReactNode } from 'react'
import { Topbar } from '@/components/layout/Topbar'
import { Footer } from '@/components/layout/Footer'

interface PageLayoutProps {
  children: ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => (
  <div className='flex min-h-screen flex-col bg-primary'>
    {/* Skip to main content — visually hidden until focused */}
    <a
      href='#main-content'
      className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-label focus:font-medium focus:text-white focus:outline-none'
    >
      Skip to main content
    </a>

    <Topbar />
    <main id='main-content' className='flex-1'>
      {children}
    </main>
    <Footer />
  </div>
)
