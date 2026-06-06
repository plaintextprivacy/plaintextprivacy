import { PageLayout } from '@/components/layout/PageLayout'
import { HeroSection } from '@/components/home/HeroSection'
import { TldrStrip } from '@/components/home/TldrStrip'
import { FeaturedGuides } from '@/components/home/FeaturedGuides'
import { MisconceptionsSection } from '@/components/home/MisconceptionsSection'

export const HomePage = () => (
  <PageLayout>
    <HeroSection />
    <TldrStrip />
    <FeaturedGuides />
    <MisconceptionsSection />
  </PageLayout>
)
