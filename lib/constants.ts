export const SACRED = {
  THIRTY_THREE: 33,
  EIGHT_EIGHT_EIGHT: 888,

  // Spacing
  BASE_UNIT: 8,
  GUTTER: 33,

  // Animation durations (ms)
  FAST: 330,
  MEDIUM: 660,
  SLOW: 990,
  PRELOADER: 888,
  BACKGROUND_SHIFT: 8000,

  // Particle counts
  STAR_COUNT: 33,
  AMBIENT_PARTICLES: 55,
  TOTAL_PARTICLES: 88,

  // Typography (rem)
  DISPLAY_SIZE: 9.9,
  H1_SIZE: 6.6,
  H2_SIZE: 3.3,
  H3_SIZE: 2.2,

  // Design tokens
  BORDER_RADIUS: '3.3rem',
  BUTTON_RADIUS: '33px',
  LETTER_SPACING_NAV: '33px',
  SECTION_DIVIDER_HEIGHT: 33,

  // Z-index layers
  Z_BASE: 33,
  Z_OVERLAY: 66,
  Z_MODAL: 99,
  Z_TOP: 333,

  // Grid
  DESKTOP_COLUMNS: 8,
  MOBILE_BREAKPOINT: 833,

  // Services (exactly 8)
  SERVICE_COUNT: 8,

  // Process steps
  PROCESS_STEPS: 8,
  PROCESS_PHASES: 3,

  // Stats
  CLIENTS: '33+',
  HOURS: '888+',
  PROJECTS: '88+',
  YEARS: '8+',

  // Footer
  FOOTER_LINKS: 33,

  // Logo rotation
  LOGO_ANGLE: 33,

  // Scroll
  SCROLL_TRIGGER_VIEWPORT: 88,
  SCROLL_INCREMENTS: 33,
} as const

export const COLORS = {
  void: '#080808',
  deep: '#0D0D0D',
  surface: '#141414',
  border: '#1F1F1F',
  gold: '#C9A84C',
  goldLight: '#E8C97A',
  goldDark: '#8B6914',
  crimson: '#8B0000',
  electric: '#00D4FF',
  text: '#F5F0E8',
  muted: '#6B6560',
  glow: 'rgba(201,168,76,0.15)',
} as const

export const GRADIENTS = {
  gold: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 33%, #C9A84C 66%, #8B6914 100%)',
  background: 'radial-gradient(ellipse at 33% 33%, rgba(201,168,76,0.03) 0%, transparent 70%)',
} as const

export const SERVICES = [
  {
    id: 'I',
    title: 'SOFTWARE DEVELOPMENT',
    description: 'Custom software architecture built for scale, performance, and longevity. From complex enterprise systems to lightweight SaaS platforms.',
    icon: 'code',
  },
  {
    id: 'II',
    title: 'WEB DEVELOPMENT',
    description: 'Premium web experiences that convert. Every pixel intentional, every interaction purposeful, every load time engineered.',
    icon: 'web',
  },
  {
    id: 'III',
    title: 'MOBILE APP DEVELOPMENT',
    description: 'Native and cross-platform mobile applications with the performance of native code and the efficiency of unified development.',
    icon: 'mobile',
  },
  {
    id: 'IV',
    title: 'AI SOFTWARE DEVELOPMENT',
    description: 'Intelligent software systems powered by large language models, machine learning pipelines, and custom AI architectures.',
    icon: 'ai',
  },
  {
    id: 'V',
    title: 'AI VOICE AGENTS',
    description: 'Conversational AI agents that handle calls, qualify leads, book appointments, and deliver human-level interactions at machine scale.',
    icon: 'voice',
  },
  {
    id: 'VI',
    title: 'AI AUTOMATION',
    description: 'End-to-end workflow automation that eliminates repetitive processes, reduces operational overhead, and scales your business without scaling headcount.',
    icon: 'automation',
  },
  {
    id: 'VII',
    title: 'CUSTOM AI AGENTS',
    description: 'Bespoke AI agents trained on your data, integrated into your systems, operating autonomously to drive measurable business outcomes.',
    icon: 'agent',
  },
  {
    id: 'VIII',
    title: 'CYBERSECURITY SERVICES',
    description: 'Enterprise-grade security assessment, penetration testing, vulnerability management, SOC operations, and threat intelligence — protecting your digital assets at every layer.',
    icon: 'security',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: 1,
    phase: 'I',
    phaseName: 'DISCOVERY',
    title: 'Strategic Consultation',
    description: 'We map your vision, technical requirements, and business objectives with surgical precision.',
  },
  {
    number: 2,
    phase: 'I',
    phaseName: 'DISCOVERY',
    title: 'Architecture Design',
    description: 'Our engineers design the complete technical blueprint before a single line of code is written.',
  },
  {
    number: 3,
    phase: 'I',
    phaseName: 'DISCOVERY',
    title: 'Proposal & Agreement',
    description: 'A detailed scope, timeline, and investment proposal. Full transparency before commitment.',
  },
  {
    number: 4,
    phase: 'II',
    phaseName: 'CONSTRUCTION',
    title: 'Development Sprint',
    description: 'Agile development cycles with weekly deliverables and continuous communication.',
  },
  {
    number: 5,
    phase: 'II',
    phaseName: 'CONSTRUCTION',
    title: 'Quality Assurance',
    description: 'Rigorous testing across all environments. Security audits built into every phase.',
  },
  {
    number: 6,
    phase: 'II',
    phaseName: 'CONSTRUCTION',
    title: 'Client Review',
    description: 'You review every element. Your feedback shapes the final product.',
  },
  {
    number: 7,
    phase: 'III',
    phaseName: 'DEPLOYMENT',
    title: 'Launch & Integration',
    description: 'Precision deployment with zero downtime architecture and full integration testing.',
  },
  {
    number: 8,
    phase: 'III',
    phaseName: 'DEPLOYMENT',
    title: 'Ongoing Support',
    description: 'Post-launch monitoring, maintenance, and iterative improvements. The relationship doesn\'t end at launch.',
  },
] as const

export const PORTAL_PHASES = [
  { number: 1, name: 'DISCOVERY' },
  { number: 2, name: 'ARCHITECTURE' },
  { number: 3, name: 'PROPOSAL SIGNED' },
  { number: 4, name: 'DEVELOPMENT' },
  { number: 5, name: 'QUALITY ASSURANCE' },
  { number: 6, name: 'CLIENT REVIEW' },
  { number: 7, name: 'LAUNCH' },
  { number: 8, name: 'SUPPORT ACTIVE' },
] as const

export const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  { label: 'Portal', href: '/portal' },
] as const

export const CERTIFICATIONS = [
  { name: 'CompTIA Security+', abbr: 'SEC+' },
  { name: 'CompTIA Network+', abbr: 'NET+' },
  { name: 'CompTIA A+', abbr: 'A+' },
  { name: 'Certified Cybersecurity Specialist', abbr: 'CCS' },
  { name: 'B.S. Information Technology', abbr: 'B.S. IT' },
] as const
