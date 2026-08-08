import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import {
  QUESTIONS,
  PROFILES,
  scoreAnswers,
  saveProfile,
  loadProfile,
  clearProfile,
  type Answers,
  type ProfileLevel
} from '@/lib/riskProfile'
import type { GuidesIndex } from '@/types/guide'
import indexData from '@/data/index.json'
import { getIcon } from '@/lib/iconMap'

const { categories } = indexData as GuidesIndex
const allGuides = categories.flatMap((c) => c.guides)

const ThreatModelingBlurb = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='mb-8 rounded-xl border border-default bg-bg-secondary'>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className='flex w-full items-center justify-between px-5 py-4 text-left'
      >
        <div>
          <p className='text-body font-medium text-text-primary'>What is threat modeling?</p>
          <p className='mt-0.5 text-label text-text-secondary'>
            Threat modeling is a process to identify, communicate, and understand threats and
            mitigations related to protecting something of value. For individuals, "something of
            value" can be your banking information, nationality, sexual orientation, marital status,
            or anything else you wish to protect.
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className='border-t border-default px-5 pb-5 pt-4'>
          <div className='flex flex-col gap-4 text-body leading-relaxed text-text-secondary'>
            <p>
              A lot of privacy advice is given without considering a person's individual situation.
              You hear 'use a VPN,' 'use Signal,' 'delete your social media'. Threat modeling is the
              practice of answering those questions before reaching for tools.
            </p>

            <p>
              A threat model doesn't have to be complicated. At its core it's just four questions:
            </p>

            <div className='flex flex-col gap-3 rounded-lg bg-bg-tertiary p-4'>
              {[
                {
                  q: 'What do I want to protect?',
                  a: 'Your personal communications, location history, financial records, identity, relationships, or professional work. Anything that would cause harm if exposed or accessed by someone without your consent.'
                },
                {
                  q: 'Who might want access to it?',
                  a: 'This could be a corporation building an advertising profile, a stalker or abusive ex-partner, an employer, a government agency, or a opportunistic criminal.'
                },
                {
                  q: 'How likely is that threat, really?',
                  a: 'A journalist covering organized crime has a different threat level than someone who just wants to stop Google from tracking their searches.'
                },
                {
                  q: 'What happens if I fail?',
                  a: "Some exposures are inconvenient. Others are dangerous. Thinking about consequences helps you decide how much friction you're willing to accept in exchange for protection."
                }
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className='mb-1 font-medium text-text-primary'>{q}</p>
                  <p>{a}</p>
                </div>
              ))}
            </div>

            <p>
              The assessment below uses your answers to suggest which guides to prioritize and which
              risk levels to focus on. It's not a substitute for a full threat model, but it's a
              practical first step. If your situation is complex or high-stakes, consider working
              through a more detailed assessment. The{' '}
              <a
                href='https://ssd.eff.org/module/your-security-plan'
                target='_blank'
                rel='noopener noreferrer'
                className='text-accent underline decoration-dotted underline-offset-2 hover:opacity-80 transition-opacity'
              >
                EFF's Security Self-Defense guide
              </a>{' '}
              is an excellent free resource.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const StepDots = ({ total, current }: { total: number; current: number }) => (
  <div className='flex items-center gap-1.5' aria-label={`Step ${current + 1} of ${total}`}>
    {Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className={[
          'h-1.5 rounded-full transition-all',
          i === current
            ? 'w-5 bg-accent'
            : i < current
              ? 'w-1.5 bg-accent opacity-40'
              : 'w-1.5 bg-border-default'
        ].join(' ')}
      />
    ))}
  </div>
)

interface QuestionStepProps {
  questionIndex: number
  answers: Answers
  onAnswer: (questionId: string, optionId: string) => void
  onBack: () => void
  onNext: () => void
  isLast: boolean
}

const QuestionStep = ({
  questionIndex,
  answers,
  onAnswer,
  onBack,
  onNext,
  isLast
}: QuestionStepProps) => {
  const question = QUESTIONS[questionIndex]
  const selected = answers[question.id]

  return (
    <div className='mx-auto max-w-xl'>
      <div className='mb-8'>
        <StepDots total={QUESTIONS.length} current={questionIndex} />
        <p className='mt-5 text-caption font-medium uppercase tracking-widest text-accent'>
          {question.dimension}
        </p>
        <p className='mt-1 text-caption font-medium uppercase tracking-widest text-text-tertiary'>
          Question {questionIndex + 1} of {QUESTIONS.length}
        </p>
        <h2 className='mt-2 text-heading-md font-medium leading-snug text-text-primary'>
          {question.text}
        </h2>
      </div>

      <div className='flex flex-col gap-2.5'>
        {question.options.map((option) => {
          const isSelected = selected === option.id
          return (
            <button
              key={option.id}
              onClick={() => onAnswer(question.id, option.id)}
              className={[
                'flex w-full flex-col gap-0.5 rounded-xl border px-4 py-3.5 text-left transition-all',
                isSelected
                  ? 'border-accent bg-accent-muted'
                  : 'border-default bg-bg-secondary hover:border-accent'
              ].join(' ')}
            >
              <span
                className={`text-body-md font-medium ${isSelected ? 'text-accent' : 'text-text-primary'}`}
              >
                {option.label}
              </span>
              <span className='text-label text-text-secondary'>{option.detail}</span>
            </button>
          )
        })}
      </div>

      <div className='mt-8 flex items-center justify-between'>
        {questionIndex > 0 ? (
          <button
            onClick={onBack}
            className='text-body text-text-secondary hover:text-text-primary transition-colors'
          >
            ← Back
          </button>
        ) : (
          <button
            onClick={onBack}
            className='text-body text-text-secondary hover:text-text-primary transition-colors'
          >
            ← Start over
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!selected}
          className={[
            'rounded-lg px-5 py-2 text-body font-medium transition-all',
            selected
              ? 'bg-accent text-black hover:opacity-90'
              : 'cursor-not-allowed bg-bg-tertiary text-text-tertiary'
          ].join(' ')}
        >
          {isLast ? 'See my profile →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}

// results
const LEVEL_BORDER: Record<ProfileLevel, string> = {
  standard: 'border-risk-low',
  elevated: 'border-risk-high',
  'high-risk': 'border-risk-critical'
}

const LEVEL_DOT: Record<ProfileLevel, string> = {
  standard: 'bg-risk-low',
  elevated: 'bg-risk-high',
  'high-risk': 'bg-risk-critical'
}

interface ResultsProps {
  level: ProfileLevel
  answers: Answers
  onReset: () => void
}

const Results = ({ level, answers, onReset }: ResultsProps) => {
  const profile = PROFILES[level]
  const startGuides = profile.startWith
    .map((slug) => allGuides.find((g) => g.slug === slug))
    .filter((g) => g !== undefined)

  const dimensionSummary = QUESTIONS.map((q) => {
    const selected = q.options.find((o) => o.id === answers[q.id])
    return selected ? { dimension: q.dimension, label: selected.label } : null
  }).filter(Boolean) as { dimension: string; label: string }[]

  return (
    <div className='mx-auto max-w-2xl'>
      {/* profile */}
      <div className={`rounded-xl border-2 ${LEVEL_BORDER[level]} bg-bg-secondary p-6 mb-6`}>
        <div className='flex items-center gap-3 mb-4'>
          <span className={`h-3 w-3 rounded-full ${LEVEL_DOT[level]}`} />
          <p className='text-caption font-medium uppercase tracking-widest text-text-tertiary'>
            Your risk profile
          </p>
        </div>
        <h2 className='text-title-lg font-medium text-text-primary mb-2'>{profile.label}</h2>
        <p className='text-body-md leading-relaxed text-text-secondary'>{profile.summary}</p>
      </div>

      {/* threat model summary */}
      {dimensionSummary.length > 0 && (
        <div className='mb-6 rounded-xl border border-default bg-bg-secondary p-5'>
          <p className='mb-3 text-caption font-medium uppercase tracking-widest text-text-tertiary'>
            Your threat model
          </p>
          <div className='flex flex-col gap-2'>
            {dimensionSummary.map(({ dimension, label }) => (
              <div key={dimension} className='flex items-baseline justify-between gap-4'>
                <span className='text-label text-text-tertiary'>{dimension}</span>
                <span className='text-right text-label font-medium text-text-primary'>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* priority levels */}
      <div className='mb-6'>
        <h3 className='mb-3 text-body font-medium uppercase tracking-widest text-text-tertiary'>
          Apply settings rated
        </h3>
        <div className='flex flex-wrap gap-2'>
          {profile.priorityLevels.map((lvl) => (
            <span
              key={lvl}
              className={[
                'rounded-full border px-3 py-1 text-label font-medium capitalize',
                lvl === 'critical'
                  ? 'border-risk-critical text-risk-critical bg-bg-secondary'
                  : lvl === 'high'
                    ? 'border-risk-high text-risk-high bg-bg-secondary'
                    : lvl === 'medium'
                      ? 'border-accent text-accent bg-bg-secondary'
                      : 'border-risk-low text-risk-low bg-bg-secondary'
              ].join(' ')}
            >
              {lvl}
            </span>
          ))}
        </div>
      </div>

      {/* start here */}
      <div className='mb-8'>
        <h3 className='mb-3 text-body font-medium uppercase tracking-widest text-text-tertiary'>
          Start with these guides
        </h3>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {startGuides.map((guide) => (
            <Link
              key={guide!.slug}
              to={`/guides/${guide!.slug}`}
              className='flex items-center gap-3 rounded-lg border border-default bg-bg-secondary px-4 py-3 transition-all hover:border-accent group'
            >
              <span className='flex h-7 w-7 shrink-0 items-center justify-center text-accent'>
                {getIcon(guide!.icon, { size: 15 })}
              </span>
              <span className='text-body font-medium text-text-primary group-hover:text-accent transition-colors'>
                {guide!.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* actions */}
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Link
          to='/guides'
          className='flex-1 rounded-lg bg-accent px-5 py-2.5 text-center text-body font-medium text-white transition-opacity hover:opacity-90'
        >
          Browse all guides →
        </Link>
        <button
          onClick={onReset}
          className='flex-1 rounded-lg border border-default px-5 py-2.5 text-body text-text-secondary transition-colors hover:border-accent hover:text-text-primary'
        >
          Retake assessment
        </button>
      </div>

      <div className='mt-4 text-center'>
        <button
          onClick={onReset}
          className='text-label text-text-tertiary underline decoration-dotted underline-offset-2 transition-colors hover:text-text-secondary'
        >
          ← Back to start
        </button>
      </div>

      <p className='mt-6 text-caption text-text-tertiary text-center'>
        Your answers are saved locally in your browser and never sent anywhere.
      </p>
    </div>
  )
}

type Step = 'intro' | number | 'results'

export const RiskProfilePage = () => {
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<Answers>({})
  const [level, setLevel] = useState<ProfileLevel | null>(null)

  // load existing profile from localStorage on mount
  useEffect(() => {
    const stored = loadProfile()
    if (stored) {
      setAnswers(stored.answers)
      setLevel(stored.level)
      setStep('results')
    }
  }, [])

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleNext = () => {
    if (step === 'intro') {
      setStep(0)
      return
    }
    if (typeof step === 'number') {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1)
        return
      }
      // score and display results
      const computed = scoreAnswers(answers)
      setLevel(computed)
      saveProfile(answers, computed)
      setStep('results')
    }
  }

  const handleBack = () => {
    if (typeof step === 'number' && step > 0) setStep(step - 1)
    else setStep('intro')
  }

  const handleReset = () => {
    clearProfile()
    setAnswers({})
    setLevel(null)
    setStep('intro')
  }

  return (
    <PageLayout>
      <div className='border-b border-default px-6 pb-10 pt-10'>
        <div className='mx-auto max-w-5xl'>
          <p className='mb-2.5 text-caption font-medium uppercase tracking-widest text-accent'>
            Risk Assessment
          </p>
          <h1 className='mb-3 text-title-md font-medium text-text-primary'>
            Personal risk profile
          </h1>
          <p className='text-body-md leading-relaxed text-text-secondary'>
            Use this short five question quiz to help you understand which privacy and security
            settings to prioritize first based on your specific situation. The quiz is designed with
            threat modeling principles in mind, which is a process widely used by cybersecurity
            professionals.
          </p>
        </div>
      </div>

      <div className='mx-auto max-w-5xl px-6 py-12'>
        {step === 'intro' && (
          <div className='mx-auto max-w-5xl'>
            <ThreatModelingBlurb />
            <div className='mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3'>
              {[
                { label: '5 questions', detail: 'Takes about 2 minutes' },
                { label: 'No account', detail: 'Answers stay on your device' },
                {
                  label: 'Personalized',
                  detail: 'Guides tailored to your threat model'
                }
              ].map(({ label, detail }) => (
                <div
                  key={label}
                  className='rounded-lg border border-default bg-bg-secondary p-4 text-center'
                >
                  <p className='text-body-md font-medium text-accent'>{label}</p>
                  <p className='mt-1 text-label text-text-secondary'>{detail}</p>
                </div>
              ))}
            </div>
            <p className='mb-6 text-body leading-relaxed text-text-secondary'>
              There are no right or wrong answers. This assessment uses your responses to suggest
              which guides to prioritize - it does not collect any data or require you to identify
              yourself.
            </p>
            <button
              onClick={handleNext}
              className='rounded-lg bg-accent px-6 py-2.5 text-body font-medium text-black hover:opacity-90 transition-opacity'
            >
              Start assessment →
            </button>
          </div>
        )}

        {typeof step === 'number' && (
          <QuestionStep
            questionIndex={step}
            answers={answers}
            onAnswer={handleAnswer}
            onBack={handleBack}
            onNext={handleNext}
            isLast={step === QUESTIONS.length - 1}
          />
        )}

        {step === 'results' && level && (
          <Results level={level} answers={answers} onReset={handleReset} />
        )}
      </div>
    </PageLayout>
  )
}
