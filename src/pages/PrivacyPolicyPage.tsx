import { PageLayout } from '@/components/layout/PageLayout'

const lastUpdated = 'May 2026'

export const PrivacyPolicyPage = () => (
  <PageLayout>
    <div className='border-b border-default px-6 pb-10 pt-10'>
      <div className='mx-auto max-w-5xl'>
        <p className='mb-2.5 text-caption font-medium uppercase tracking-widest text-accent'>
          Privacy policy
        </p>
        <h1 className='mb-3 text-title-md font-medium text-text-primary'>Our privacy policy</h1>
        <p className='text-body-md leading-relaxed text-text-secondary'>
          We built this site to help you improve your data privacy. It would be pretty hypocritical
          to collect yours.
        </p>
        <p className='mt-3 text-label text-text-tertiary'>Last updated: {lastUpdated}</p>
      </div>
    </div>

    <main className='mx-auto max-w-5xl px-6 py-10'>
      <div className='mb-10 rounded-xl border border-default bg-bg-secondary p-6'>
        <p className='mb-2 text-body font-medium text-accent'>TL;DR</p>
        <p className='text-body-md leading-relaxed text-text-primary'>
          We collect nothing about you. No analytics, no cookies, no tracking, no accounts, no
          servers receiving your data. The only data stored is your checklist and survey progress,
          which is saved locally in your browser and never sent anywhere.
        </p>
      </div>

      <div className='flex flex-col gap-8'>
        <section>
          <h2 className='mb-4 text-body-lg font-medium text-text-primary'>What we collect</h2>
          <div className='rounded-xl border border-default bg-bg-secondary p-6'>
            <p className='text-body leading-relaxed text-text-secondary'>
              Nothing. We do not collect, store, or transmit any of your information.
            </p>
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-body-lg font-medium text-text-primary'>Cookies</h2>
          <div className='rounded-xl border border-default bg-bg-secondary p-6'>
            <p className='text-body leading-relaxed text-text-secondary'>
              We do not use cookies for tracking or preferences. We do not use advertisers.
            </p>
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-body-lg font-medium text-text-primary'>
            localStorage: checklist progress &amp; risk assessment
          </h2>
          <div className='rounded-xl border border-default bg-bg-secondary p-6'>
            <p className='mb-4 text-body leading-relaxed text-text-secondary'>
              This is the only data stored by this site. When you check off items on a guide, your
              progress is saved to your browser's localStorage so it's still there when you come
              back. If you complete the risk assessment, your answers and result are also saved
              locally. None of this ever leaves your browser.
            </p>
            <p className='mb-4 text-body leading-relaxed text-text-secondary'>
              localStorage is different from cookies. It's a small amount of data your browser keeps
              on your device, accessible only by this site, and only within your browser. Think of
              it like a notepad your browser keeps for you locally.
            </p>
            <div className='rounded-lg bg-bg-tertiary p-4'>
              <p className='mb-2 text-label font-medium text-text-secondary'>What's stored:</p>
              <ul className='flex flex-col gap-1.5'>
                {[
                  'A list of which checklist items you have marked as complete, per guide',
                  'Keys are prefixed with pg_progress_ followed by the guide name',
                  'Example: pg_progress_iphone stores your iPhone guide progress',
                  'No personal information is ever included'
                ].map((item) => (
                  <li key={item} className='flex items-start gap-2 text-label text-text-secondary'>
                    <span className='mt-[3px] shrink-0 text-accent'>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-body-lg font-medium text-text-primary'>
            How to clear your progress data
          </h2>
          <div className='rounded-xl border border-default bg-bg-secondary p-6'>
            <p className='mb-4 text-body leading-relaxed text-text-secondary'>
              Since your progress is stored locally in your browser, you can clear it at any time
              through your browser's built-in tools by clearing your cache & cookies.
            </p>
            <div className='flex flex-col gap-3'>
              {[
                {
                  browser: 'Chrome / Brave',
                  steps: 'Settings → Privacy and security → Clear browsing data → Site data'
                },
                {
                  browser: 'Firefox',
                  steps: 'Settings → Privacy & Security → Cookies and Site Data → Clear Data'
                },
                {
                  browser: 'Safari (Mac)',
                  steps: 'Settings → Privacy → Manage Website Data → Remove All'
                },
                {
                  browser: 'Safari (iPhone)',
                  steps: 'iPhone Settings → Apps → Safari → Advanced → Website Data → Remove All'
                }
              ].map(({ browser, steps }) => (
                <div key={browser} className='rounded-lg bg-bg-tertiary px-4 py-3'>
                  <p className='mb-0.5 text-label font-medium text-text-primary'>{browser}</p>
                  <p className='font-mono text-caption text-text-tertiary'>{steps}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-body-lg font-medium text-text-primary'>Third-party services</h2>
          <div className='rounded-xl border border-default bg-bg-secondary p-6'>
            <p className='mb-4 text-body leading-relaxed text-text-secondary'>
              This site is hosted on Cloudflare Pages. Cloudflare may process your IP address and
              browser information as part of serving the site and protecting against abuse. This is
              standard for any website host and is outside our control. You can read Cloudflare's
              privacy policy at{' '}
              <a
                href='https://www.cloudflare.com/privacypolicy/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-accent hover:underline'
              >
                cloudflare.com/privacypolicy
              </a>
              .
            </p>
            <p className='text-body leading-relaxed text-text-secondary'>
              Beyond hosting, this site loads no external scripts, fonts, analytics, or resources
              from any third party. Everything is served from the same Cloudflare Pages domain.
              There are no calls to Google, Meta, or any advertising network.
            </p>
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-body-lg font-medium text-text-primary'>External links</h2>
          <div className='rounded-xl border border-default bg-bg-secondary p-6'>
            <p className='text-body leading-relaxed text-text-secondary'>
              This site links to external resources including the EFF, Privacy Guides, and others.
              When you click an external link, you leave this site and the privacy practices of the
              destination site apply. We recommend reviewing the privacy policy of any site before
              sharing personal information with it.
            </p>
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-body-lg font-medium text-text-primary'>
            Changes to this policy
          </h2>
          <div className='rounded-xl border border-default bg-bg-secondary p-6'>
            <p className='text-body leading-relaxed text-text-secondary'>
              If this policy changes in any meaningful way - for example, if a hosting change
              introduces new data processing - the last updated date at the top of this page will
              reflect that. We will never introduce advertising, analytics, or account systems
              without making it clearly known.
            </p>
          </div>
        </section>
      </div>
    </main>
  </PageLayout>
)
