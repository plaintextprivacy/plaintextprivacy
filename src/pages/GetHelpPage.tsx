import { PageLayout } from '@/components/layout/PageLayout'
import { Users, Laptop, ShieldCheck, Map, BookOpen, BadgeCheck, Mail } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'

const SectionHeader = ({ title }: { title: string }) => (
  <div className='mb-5 flex items-center gap-3'>
    <h2 className='text-ui font-medium text-text-primary'>{title}</h2>
    <div className='h-px flex-1 bg-border-default' />
  </div>
)

interface ServiceCardProps {
  icon: React.ElementType
  title: string
  description: string
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => (
  <div className='flex gap-4 rounded-xl border border-default bg-bg-secondary p-5'>
    <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-tertiary text-accent'>
      <Icon size={15} />
    </div>
    <div>
      <h3 className='mb-1.5 text-body-md font-medium text-text-primary'>{title}</h3>
      <p className='text-body leading-relaxed text-text-secondary'>{description}</p>
    </div>
  </div>
)

const CONTACT_EMAIL = 'plaintextprivacy@proton.me'

export const GetHelpPage = () => (
  <PageLayout>
    <PageHeader
      eyebrow='Get Help'
      title='Personal privacy help'
      description={
        <>
          <p className='pb-2'>
            Tackling privacy and security for the first time can feel overwhelming. There's a lot of
            conflicting advice and it's hard to know what actually matters for your situation.
          </p>
          <p>
            There are many reasons to want to improve your privacy and security. You might be a
            journalist protecting your sources, an organizer trying to keep your group safe, a
            political protestor, or a stay at home mom who's tired of the surveillance state.
            Regardless of your reasons, you deserve to have control over your own information and
            who gets access to it.
          </p>
        </>
      }
    />

    <div className='mx-auto max-w-5xl px-6 py-12'>
      {/* services */}
      <div className='mb-10'>
        <SectionHeader title='What we offer' />
        <div className='flex flex-col gap-3'>
          <ServiceCard
            icon={Users}
            title='One-on-one consultation'
            description="A focused session to understand your specific situation and figure out what changes will make a difference for you. We'll talk through your concerns, needs, and devices."
          />
          <ServiceCard
            icon={Laptop}
            title='Device audit'
            description='We go through your phone, laptop, or other devices with you to check app permissions, account settings, software, and identify potential vulnerabilities.'
          />
          <ServiceCard
            icon={ShieldCheck}
            title='Risk assessment'
            description='A structured look at what you want to protect, who might want access to it, and how likely different threats are in your specific situation. This is the foundation for making good decisions rather than following generic advice.'
          />
          <ServiceCard
            icon={Map}
            title='Threat modeling'
            description='A more in-depth process for people with higher-stakes requirements. We will map out your specific adversaries, their capabilities, and build a practical plan tailored to your needs. Common for journalists, activists, legal professionals, and organizers.'
          />
          <ServiceCard
            icon={BookOpen}
            title='Training sessions'
            description='Structured sessions for individuals or groups covering the privacy and security practices that matter most. Designed to be practical and immediately applicable. Available remotely.'
          />
        </div>
      </div>

      <div className='mb-10'>
        <SectionHeader title='How it works' />
        <div className='rounded-xl border border-default bg-bg-secondary p-5'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
            {[
              {
                step: '01',
                label: 'Reach out',
                detail:
                  "Send a brief email describing your situation and what you're hoping to get out of a session. No need for detail - a few sentences is enough."
              },
              {
                step: '02',
                label: 'We talk',
                detail:
                  "We'll have a short introductory conversation to make sure we're a good fit and clarify what you need before committing to anything."
              },
              {
                step: '03',
                label: 'Get started',
                detail:
                  'Sessions are available remotely via video call or in person. Length and format depends on what you need.'
              }
            ].map(({ step, label, detail }) => (
              <div key={step}>
                <p className='mb-1 text-caption font-medium uppercase tracking-widest text-accent'>
                  {step}
                </p>
                <p className='mb-1.5 text-body-md font-medium text-text-primary'>{label}</p>
                <p className='text-label leading-relaxed text-text-secondary'>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mb-10'>
        <SectionHeader title='Pricing' />
        <div className='rounded-xl border border-default bg-bg-secondary p-5'>
          <p className='mb-4 text-body-md leading-relaxed text-text-secondary'>
            Sessions are available on a{' '}
            <span className='font-medium text-text-primary'>sliding scale</span>. We set a suggested
            range based on your request, and you pay what you're able to. If money is a barrier, let
            us know and we'll figure something out together.
          </p>
          <div className='flex flex-wrap gap-4'>
            {[
              { label: 'Consultation', range: '$75 – $200 / session' },
              { label: 'Device audit', range: '$100 – $200 / session' },
              { label: 'Threat modeling', range: '$200 – $350 / session' },
              { label: 'Training (group)', range: '$250 – $450 / session' }
            ].map(({ label, range }) => (
              <div
                key={label}
                className='flex-1 min-w-[160px] rounded-lg border border-default bg-bg-tertiary px-4 py-3'
              >
                <p className='text-caption font-medium uppercase tracking-wide text-text-tertiary'>
                  {label}
                </p>
                <p className='mt-1 text-body font-medium text-text-primary'>{range}</p>
              </div>
            ))}
          </div>
          <p className='mt-4 text-label text-text-tertiary'>
            These are suggested ranges only. Reach out and we'll discuss what works for you.
          </p>
        </div>
      </div>

      <div className='mb-10'>
        <SectionHeader title='Background' />
        <div className='rounded-xl border border-default bg-bg-secondary p-5'>
          <div className='mb-4 flex flex-wrap gap-2'>
            {[
              'B.S. Computer Science',
              'CompTIA Security+',
              'CompTIA CySA+',
              '6 years in engineering, cybersecurity & IT'
            ].map((label) => (
              <span
                key={label}
                className='inline-flex items-center gap-1.5 rounded-full border border-default bg-bg-tertiary px-3 py-1 text-label text-text-secondary'
              >
                <BadgeCheck size={11} className='text-accent' />
                {label}
              </span>
            ))}
          </div>
          <p className='text-body leading-relaxed text-text-secondary'>
            I built this site because I kept seeing people overwhelmed by privacy advice that was
            either too generic or too technical to act on. I've spent hundreds of hours researching
            all of these topics to develop guides and training materials designed for non-technical
            audiences.
          </p>
        </div>
      </div>

      {/* cta */}
      <div className='rounded-xl border border-accent bg-accent-muted p-6 text-center'>
        <h2 className='mb-2 text-heading-sm font-medium text-text-primary'>
          Ready to get started?
        </h2>
        <p className='mb-5 text-body text-text-secondary'>
          Send a brief email describing your situation and what you're looking for.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className='inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-body font-medium text-black transition-opacity hover:opacity-90'
        >
          <Mail size={14} />
          {CONTACT_EMAIL}
        </a>
        <p className='mt-4 text-caption text-text-tertiary'>
          I typically respond within 1–2 business days.
        </p>
      </div>
    </div>
  </PageLayout>
)
