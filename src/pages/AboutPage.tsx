import { Link } from 'react-router-dom'
import { Shield, Heart, GitPullRequest, AlertCircle, BookOpen } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeader } from '@/components/layout/PageHeader'

const SectionHeader = ({ title }: { title: string }) => (
  <div className='mb-5 flex items-center gap-3'>
    <h2 className='text-ui font-medium text-text-primary'>{title}</h2>
    <div className='h-px flex-1 bg-border-default' />
  </div>
)

const InfoCard = ({
  icon: Icon,
  title,
  children,
  accentColor = 'var(--color-accent)'
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  accentColor?: string
}) => (
  <div className='rounded-xl border border-default bg-bg-secondary p-5'>
    <div className='mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-bg-tertiary'>
      <Icon size={15} style={{ color: accentColor }} />
    </div>
    <h3 className='mb-2 text-body-md font-medium text-text-primary'>{title}</h3>
    <div className='text-body leading-relaxed text-text-secondary'>{children}</div>
  </div>
)

const ContributeItem = ({ title, description }: { title: string; description: string }) => (
  <div className='flex gap-3 border-b border-default py-4 last:border-b-0'>
    <span className='text-accent'>›</span>
    <div>
      <p className='mb-1 text-body font-medium text-text-primary'>{title}</p>
      <p className='text-body leading-relaxed text-text-secondary'>{description}</p>
    </div>
  </div>
)

export const AboutPage = () => (
  <PageLayout>
    <PageHeader
      eyebrow='About'
      title='About Plaintext Privacy'
      description='An independent project built out of the belief that everyone should have the right to control their
      personal information. You deserve to control access to your data – who gets it, when it’s given, how it’s used,
      and for how long. These guides focus on data privacy but they often veer into cybersecurity. While security and
      privacy are not synonomous, good digital hygiene will go a long way in protecting your personal privacy.'
    />

    <main className='mx-auto max-w-5xl px-6 py-10'>
      <section className='mb-12'>
        <SectionHeader title='Why this exists' />
        <div className='rounded-xl border border-default bg-bg-secondary p-6'>
          <p className='mb-4 text-body leading-relaxed text-text-secondary'>
            This site exists because digital privacy shouldn't require a computer science degree to
            navigate. The information is out there, but most of it is written for an audience who
            already knows what they're doing.
          </p>
          <p className='mb-4 text-body leading-relaxed text-text-secondary'>
            Plaintext Privacy is a combination of personal interest, professional experience, and an
            understanding of what's at stake with mass surveillance. Corporations profit from your
            data, governments purchase your data from those corporations, and then bad actors get
            their hands on it to exploit it further. The people most harmed are often those with the
            least resources to protect themselves.
          </p>
          <p className='text-body leading-relaxed text-text-secondary'>
            It's impossible for everyone to obtain 100% privacy in such a digitally connected world.
            The steps outlined in these guides are designed to mitigate your data exposure, but they
            aren't perfect. You don't need to do everything in these guides, and you don't need to
            be perfect. Fighting for your right to data privacy, even in the smallest way, is worth
            the effort.
          </p>
        </div>
      </section>

      <section className='mb-12'>
        <SectionHeader title='Our approach' />
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <InfoCard icon={BookOpen} title='Audience-focused' accentColor='var(--color-accent)'>
            Every guide is written with a non-technical audience in mind. We explain what to do and
            why so you can make informed decisions.
          </InfoCard>
          <InfoCard icon={Shield} title='Risk-rated for relevance' accentColor='var(--color-teal)'>
            Every setting is rated based on real-world impact. This is to help you prioritize what
            to address first.
          </InfoCard>
          <InfoCard
            icon={Heart}
            title="Meets you where you're at"
            accentColor='var(--color-risk-high)'
          >
            Start where you're comfortable and do what you can from there. Even completing one or
            two recommendations can make a huge difference in protecting your data privacy.
          </InfoCard>
          <InfoCard icon={AlertCircle} title='Clear on limitations' accentColor='var(--color-info)'>
            Privacy and security often come with trade-offs on convenience, which makes them
            difficult to commit to in practice. Choosing convenience where you need to will ensure
            the actions you take stick in the long run.
          </InfoCard>
        </div>
      </section>

      <section className='mb-12'>
        <SectionHeader title="Who's behind this" />
        <div className='rounded-xl border border-default bg-bg-secondary p-6'>
          <p className='mb-4 text-body leading-relaxed text-text-secondary'>
            Plaintext Privacy is a passion project brought to you through hundreds of hours of
            research and industry experience. It's maintained by one person in their spare time.
          </p>
          <p className='mb-4 text-body leading-relaxed text-text-secondary'>
            The author chooses to remain (mostly) anonymous.
          </p>
          <p className='text-body leading-relaxed text-text-secondary'>
            All research is sourced from primary documentation, news articles, and blog posts, many
            of which are listed on our{' '}
            <Link to='/resources' className='text-accent hover:underline'>
              Resources page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className='mb-12'>
        <SectionHeader title='How to contribute' />
        <p className='mb-5 text-body leading-relaxed text-text-secondary'>
          Because this site is maintained by one person, things will occasionally be outdated,
          incomplete, or wrong. If you've noticed something that needs fixing, please email us or
          submit a pull request on our{' '}
          <a
            href='https://github.com/plaintextprivacy/plaintextprivacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-accent hover:underline'
            onClick={(e) => e.stopPropagation()}
          >
            Github
          </a>
          .
        </p>
        <div className='rounded-xl border border-default bg-bg-secondary px-6'>
          <ContributeItem
            title='Outdated content'
            description='Privacy settings and app interfaces change frequently. If a step-by-step instruction no longer matches what you see on your device, please flag it.'
          />
          <ContributeItem
            title='Missing guides or settings'
            description="If there's a device, app, or privacy topic you think should be covered and isn't, that feedback helps prioritize what gets built next."
          />
          <ContributeItem
            title='Factual corrections'
            description='Report any inaccuracies via a Github pull request or by emailing us.'
          />
          <ContributeItem
            title='New resources'
            description='Know of an organization, tool, or guide that belongs on the Resources page? Please reach out and let us know why they should be included.'
          />
        </div>

        <div className='mt-4 flex items-start gap-3 rounded-xl border border-default bg-bg-secondary p-5'>
          <GitPullRequest size={16} className='mt-0.5 shrink-0 text-accent' />
          <div>
            <p className='mb-1 text-body font-medium text-text-primary'>Contribute via GitHub</p>
            <p className='text-body leading-relaxed text-text-secondary'>
              The content for this site lives in JSON files that are easy to edit. No coding
              knowledge is required to fix a typo or update a settings path. Pull requests and
              issues are welcome.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title='Disclaimer' />
        <div className='rounded-xl border border-default bg-bg-secondary p-6'>
          <p className='mb-3 text-body leading-relaxed text-text-secondary'>
            The information on this site is provided for educational purposes only and does not
            constitute legal, security, or professional advice. What's appropriate for one person's
            personal situation may not be appropriate for another's.
          </p>
          <p className='mb-3 text-body leading-relaxed text-text-secondary'>
            We have no financial relationship with any product, service, or organization mentioned
            on this site. Recommendations are based solely on independent research and publicly
            available information.
          </p>
          <p className='text-body leading-relaxed text-text-secondary'>
            Be sure to research any privacy measures you implement. Don't just take an internet
            stranger's word for it!.
          </p>
        </div>
      </section>
    </main>
  </PageLayout>
)
