import { Link } from 'react-router-dom'
import { ArrowRight, Shield } from 'lucide-react'
import { FeaturedGuideBlurb } from '@/components/home/FeaturedGuideBlurb'

export const HeroSection = () => (
  <section className='relative overflow-hidden px-6 py-20 text-center'>
    <div
      className='pointer-events-none absolute inset-0'
      style={{
        background:
          'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(164,232,208,0.10) 0%, rgba(136,196,232,0.05) 50%, transparent 70%)'
      }}
    />

    <div className='relative mx-auto max-w-2xl'>
      <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-[#3a2a10] bg-accent-muted px-3.5 py-1.5'>
        <Shield size={12} className='text-accent' />
        <span className='text-caption font-medium text-accent'>Your guide to digital privacy</span>
      </div>

      <h1 className='mb-4 text-display-sm font-medium leading-tight tracking-tight text-text-primary sm:text-[48px]'>
        Take back control of your{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #a4e8d0, #88c4e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          digital privacy
        </span>
      </h1>

      <p className='mx-auto mb-8 max-w-[500px] leading-relaxed text-text-secondary'>
        Simple and comprehensive guides to help you configure privacy and security settings for your
        devices, apps, and accounts. Every setting is rated by real-world impact.
      </p>

      <div className='flex flex-wrap items-center justify-center gap-3'>
        <Link
          to='/guides/passwords-mfa'
          className='inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-body-lg font-medium text-black transition-opacity hover:opacity-90'
        >
          Start with the basics
          <ArrowRight size={14} />
        </Link>
        <Link
          to='/guides'
          className='inline-flex items-center gap-2 rounded-lg border border-border-default px-5 py-2 text-body-md text-text-secondary transition-colors hover:border-accent hover:text-accent'
        >
          Browse all guides
        </Link>
      </div>
      <FeaturedGuideBlurb />
    </div>
  </section>
)
