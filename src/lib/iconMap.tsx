import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Smartphone, LaptopMinimal, Cog, Globe, KeyRound, type LucideProps } from 'lucide-react'

import {
  faMobileScreen,
  faMobileScreenButton,
  faLaptop,
  faDesktop,
  faGlobe,
  faKey,
  faLock,
  faGear,
  faPhone,
  faComments,
  faEnvelope,
  faMagnifyingGlass,
  faMagnifyingGlassArrowRight,
  faFolderOpen,
  faTv,
  faPlane,
  faToolbox,
  faRobot,
  faShieldHalved,
  faUserSecret,
  faDatabase,
  faBan
} from '@fortawesome/free-solid-svg-icons'

import {
  faApple,
  faAndroid,
  faGoogle,
  faFacebook,
  faSignalMessenger,
  faLinux,
  faMicrosoft
} from '@fortawesome/free-brands-svg-icons'

const registry: Record<string, IconDefinition> = {
  // devices & platforms
  'mobile-screen': faMobileScreen,
  'mobile-screen-button': faMobileScreenButton,
  laptop: faLaptop,
  desktop: faDesktop,
  tv: faTv,
  phone: faPhone,

  // web
  globe: faGlobe,
  'magnifying-glass': faMagnifyingGlass,
  'magnifying-glass-arrow-right': faMagnifyingGlassArrowRight,
  'folder-open': faFolderOpen,

  // security & accounts
  key: faKey,
  lock: faLock,
  'shield-halved': faShieldHalved,
  'user-secret': faUserSecret,
  gear: faGear,
  database: faDatabase,
  ban: faBan,

  // communication
  comments: faComments,
  envelope: faEnvelope,

  // misc
  plane: faPlane,
  toolbox: faToolbox,
  robot: faRobot,

  // brands
  apple: faApple,
  android: faAndroid,
  google: faGoogle,
  facebook: faFacebook,
  signal: faSignalMessenger,
  microsoft: faMicrosoft,
  linux: faLinux
}

interface GetIconOptions {
  /** Tailwind / CSS class applied to the <svg> element */
  className?: string
  /** explicit pixel size, defaults to 1em */
  size?: number
}

/**
 * returns a FontAwesome icon React element for the given registry key
 * falls back to null if the key is unrecognised
 */
export const getIcon = (key: string, { className, size }: GetIconOptions = {}): ReactNode => {
  const icon = registry[key]
  if (!icon) return null

  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={size ? { width: size, height: size } : undefined}
    />
  )
}

/** check whether a key exists in the registry */
export const hasIcon = (key: string): boolean => key in registry

/**
 * Formats a minute value as a human-readable duration string.
 * Returns hours (e.g. "~1h", "~1.5h") for 60+ minutes,
 * and minutes (e.g. "~25 min") for under 60 minutes.
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `~${minutes} min`
  const hours = minutes / 60
  const rounded = Number.isInteger(hours) ? hours : parseFloat(hours.toFixed(1))
  return `~${rounded}h`
}

type LucideIcon = React.ComponentType<LucideProps>

const categoryRegistry: Record<string, LucideIcon> = {
  phones: Smartphone,
  computers: LaptopMinimal,
  advanced: Cog,
  browsing: Globe,
  'digital footprint': KeyRound
}

interface GetCategoryIconOptions {
  className?: string
  size?: number
}

/**
 * returns a Lucide icon element for the given guide category key
 * falls back to null for unrecognised categories
 */
export const getCategoryIcon = (
  category: string,
  { className, size = 15 }: GetCategoryIconOptions = {}
): ReactNode => {
  const Icon = categoryRegistry[category]
  if (!Icon) return null
  return <Icon size={size} className={className} aria-hidden='true' />
}
