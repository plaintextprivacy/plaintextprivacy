interface Profile {
  label: string
  description: string
  detail: string
}

const profiles: Profile[] = [
  {
    label: 'Journalists & activists',
    description:
      'You work with sensitive sources or organize communities. Your digital footprint can expose not just you, but the people around you.',
    detail:
      'Start with Signal, email privacy, and the travel guide if you cross borders. The risk profile assessment will help you prioritize.'
  },
  {
    label: 'Survivors & people at risk',
    description:
      'You need to put distance between yourself and someone who may be monitoring your location, accounts, or communications.',
    detail:
      'Start with your phone guide and social media settings. Consider booking a one-on-one session as some situations need a tailored approach.'
  },
  {
    label: 'Professionals',
    description:
      'You handle privileged information, like client files, medical records, legal documents, and need to protect it without a dedicated IT team.',
    detail:
      'Password management and email encryption are the highest priority. The computers guide covers full-disk encryption for your devices.'
  },
  {
    label: 'Everyone else',
    description:
      "You're not a specific target, but you'd rather not have your location, browsing habits, and private messages feeding an advertising profile.",
    detail:
      "The Critical-rated settings in each guide are enough to make a difference. Start with your phone as it's the most personal device you own."
  }
]

export const MisconceptionsSection = () => (
  <section className='border-b border-default px-6 py-6'>
    <div className='mx-auto max-w-5xl'>
      <div className='mb-5'>
        <h2 className='text-body-lg font-medium uppercase tracking-widest text-accent'>
          Who this is for
        </h2>
        <p className='text-body text-text-secondary'>
          Privacy isn't one-size-fits-all. Your situation will determine what to prioritize.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {profiles.map(({ label, description, detail }) => (
          <div
            key={label}
            className='flex flex-col gap-2.5 rounded-lg border border-default bg-bg-secondary p-5'
          >
            <p className='text-body-md font-medium text-accent'>{label}</p>
            <p className='text-body leading-relaxed text-text-primary'>{description}</p>
            <p className='text-label leading-relaxed text-text-secondary'>{detail}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
