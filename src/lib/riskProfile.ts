export interface ProfileQuestion {
  id: string
  dimension: string // the threat modeling concept this question maps to
  text: string
  options: ProfileOption[]
}

export interface ProfileOption {
  id: string
  label: string
  score: number
  detail: string
}

export const QUESTIONS: ProfileQuestion[] = [
  {
    id: 'assets',
    dimension: 'What to protect',
    text: 'What kind of information are you most concerned about protecting?',
    options: [
      {
        id: 'casual',
        label: 'General personal data',
        score: 0,
        detail: 'You want less corporate tracking: browsing history, purchase habits, location'
      },
      {
        id: 'identity',
        label: 'Identity and financial information',
        score: 1,
        detail:
          'Fraud and identity theft concern you: banking information, government ID, credentials'
      },
      {
        id: 'communications',
        label: 'Private communications and relationships',
        score: 2,
        detail: 'You need conversations to stay confidential: messages, calls, contacts'
      },
      {
        id: 'professional',
        label: 'Sensitive professional or client information',
        score: 2,
        detail: 'Legal files, medical records, source identities, proprietary data'
      },
      {
        id: 'safety',
        label: 'My physical safety or location',
        score: 4,
        detail: "You need to keep where you are or where you're going away from a specific person"
      }
    ]
  },
  {
    id: 'adversary',
    dimension: 'Who to protect it from',
    text: 'Who are you most concerned might try to access your information?',
    options: [
      {
        id: 'corporations',
        label: 'Advertisers and data brokers',
        score: 0,
        detail: 'Companies building profiles on you and selling your data'
      },
      {
        id: 'criminals',
        label: 'Hackers or identity thieves',
        score: 1,
        detail: 'Opportunistic attackers targeting credentials or financial accounts'
      },
      {
        id: 'institutions',
        label: 'Employers, institutions, or civil litigation',
        score: 2,
        detail: 'Workplace monitoring, legal discovery, or institutional access to your records'
      },
      {
        id: 'government',
        label: 'Government or law enforcement',
        score: 3,
        detail: 'Surveillance, subpoenas, or border searches by state actors'
      },
      {
        id: 'individual',
        label: 'A specific person I know',
        score: 4,
        detail: 'An abusive partner, stalker, or someone with personal access to your life'
      }
    ]
  },
  {
    id: 'likelihood',
    dimension: 'How likely is the threat',
    text: 'How likely is it that someone would actively target you specifically?',
    options: [
      {
        id: 'unlikely',
        label: "Unlikely. I'm not a specific target",
        score: 0,
        detail: "You're concerned about mass data collection, not targeted attacks"
      },
      {
        id: 'possible',
        label: 'Possible. My role or visibility creates some risk',
        score: 1,
        detail: 'Your job, public profile, or activities could make you a target of opportunity'
      },
      {
        id: 'likely',
        label: 'Likely. I work in a high-risk field',
        score: 2,
        detail: "You're a journalist, activist, lawyer, or handle sensitive work regularly"
      },
      {
        id: 'active',
        label: 'It may already be happening',
        score: 4,
        detail:
          'You have reason to believe someone is or has tried to access your accounts or location'
      }
    ]
  },
  {
    id: 'consequences',
    dimension: 'Consequences if you fail',
    text: 'What would happen if your private information was exposed or accessed?',
    options: [
      {
        id: 'annoying',
        label: 'Annoying but manageable',
        score: 0,
        detail: 'More targeted ads, spam, minor inconvenience'
      },
      {
        id: 'serious',
        label: 'Serious financial or reputational harm',
        score: 1,
        detail: 'Identity theft, job loss, public embarrassment - significant but survivable'
      },
      {
        id: 'professional_harm',
        label: 'Harm to others who trust me',
        score: 2,
        detail: 'Clients, sources, or colleagues could face consequences because of your exposure'
      },
      {
        id: 'legal',
        label: 'Legal jeopardy or professional sanctions',
        score: 3,
        detail: 'Prosecution, loss of license, disciplinary action, or forced disclosure'
      },
      {
        id: 'physical',
        label: 'Physical danger to myself or others',
        score: 4,
        detail: 'Exposure could put you or people you care about at direct physical risk'
      }
    ]
  },
  {
    id: 'friction',
    dimension: 'Willingness to act',
    text: 'How much inconvenience are you willing to accept to protect your privacy?',
    options: [
      {
        id: 'minimal',
        label: 'As little as possible',
        score: 0,
        detail: 'You want meaningful protection without changing your habits much'
      },
      {
        id: 'moderate',
        label: "Some if it's clearly worth it",
        score: 0,
        detail: "You'll change tools and settings when you understand why it matters"
      },
      {
        id: 'significant',
        label: 'Quite a bit. This matters to me',
        score: 0,
        detail: "You're willing to learn new tools and build new habits if needed"
      },
      {
        id: 'whatever_it_takes',
        label: 'Whatever it takes',
        score: 1,
        detail: 'Protecting yourself is a priority and friction is acceptable'
      }
    ]
  }
]

export type ProfileLevel = 'standard' | 'elevated' | 'high-risk'

export interface RiskProfile {
  level: ProfileLevel
  label: string
  summary: string
  priorityLevels: string[]
  startWith: string[]
  color: string
}

export const PROFILES: Record<ProfileLevel, RiskProfile> = {
  standard: {
    level: 'standard',
    label: 'Standard',
    summary:
      'Your main concerns are reducing corporate data collection and protecting against opportunistic threats. Focus on Critical-rated settings first; these cover the highest-impact changes for most people and take under two hours to complete.',
    priorityLevels: ['critical'],
    startWith: ['passwords-mfa', 'iphone', 'android', 'browsers'],
    color: 'var(--color-risk-low)'
  },
  elevated: {
    level: 'elevated',
    label: 'Elevated',
    summary:
      'Your situation involves meaningful risk. Complete all Critical and High-rated settings. The broader protection is worth the extra time.',
    priorityLevels: ['critical', 'high'],
    startWith: ['passwords-mfa', 'iphone', 'android', 'signal', 'browsers', 'email-privacy'],
    color: 'var(--color-risk-high)'
  },
  'high-risk': {
    level: 'high-risk',
    label: 'High Risk',
    summary:
      'Your threat model involves targeted adversaries, serious consequences, or immediate personal risk. Complete every setting across all guides, starting with the priority guides below. Do not skip Medium or Low-rated settings.',
    priorityLevels: ['critical', 'high', 'medium', 'low'],
    startWith: [
      'signal',
      'passwords-mfa',
      'iphone',
      'android',
      'browsers',
      'email-privacy',
      'social-media',
      'travel'
    ],
    color: 'var(--color-risk-critical)'
  }
}

export type Answers = Record<string, string>

export const scoreAnswers = (answers: Answers): ProfileLevel => {
  // high-risk overrides
  // indicate serious personal risk regardless of total score
  const adversary = answers['adversary']
  const consequences = answers['consequences']
  const likelihood = answers['likelihood']
  const assets = answers['assets']

  // physical safety asset + individual adversary = always high risk
  if (assets === 'safety' && adversary === 'individual') return 'high-risk'

  // physical consequences = always high risk
  if (consequences === 'physical') return 'high-risk'

  // active targeting = always high risk
  if (likelihood === 'active') return 'high-risk'

  // score remaining questions
  let total = 0
  for (const question of QUESTIONS) {
    const selectedId = answers[question.id]
    const option = question.options.find((o) => o.id === selectedId)
    if (option) total += option.score
  }

  if (total >= 8) return 'high-risk'
  if (total >= 3) return 'elevated'
  return 'standard'
}

const STORAGE_KEY = 'ptp_risk_profile'

export interface StoredProfile {
  answers: Answers
  level: ProfileLevel
  savedAt: string
}

export const saveProfile = (answers: Answers, level: ProfileLevel): void => {
  try {
    const data: StoredProfile = {
      answers,
      level,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable, fail silently
  }
}

export const loadProfile = (): StoredProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredProfile
  } catch {
    return null
  }
}

export const clearProfile = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
