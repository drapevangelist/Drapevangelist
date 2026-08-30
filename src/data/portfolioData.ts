import { ProjectItem, StatItem, AchievementItem, SocialLink } from '../types';

export const WEB3_STATS: StatItem[] = [
  { num: '70+', numericVal: 70, suffix: '+', label: 'Onboarded into Tech/Web3', desc: 'Guided newcomers through hands-on bootcamps & community workshops' },
  { num: '50+', numericVal: 50, suffix: '+', label: 'Job Opportunities Provided', desc: 'Connected talent to high-growth Web3 protocols & DAOs' },
  { num: '20+', numericVal: 20, suffix: '+', label: 'Web3 Ecosystems Explored', desc: 'Arbitrum, Ethereum, Avalanche, Base, Solana, MovementLabs, Decred, etc.' },
  { num: '10+', numericVal: 10, suffix: '+', label: 'Certificates & Accreditations', desc: 'Technical writing, blockchain architecture & community leadership' },
];

export const WEB3_DUTIES: string[] = [
  'Brand Representation',
  'Community Moderation',
  'Content / Technical Writing',
  'Content Creation',
  'IRL Event Organization',
  'IRL Representation',
];

export const WEB3_ACHIEVEMENTS: AchievementItem[] = [
  {
    tag: 'Events',
    title: 'IRL Event Coordination',
    description: 'Coordinated IRL events for Rujira Academy, MovementLabs, Base, among others.',
    highlightBadge: 'Multiple IRL Summits',
  },
  {
    tag: 'Hackathon',
    title: 'Hack for Good Hackathon 2024',
    description: 'Achieved 2nd position building decentralized social impact solutions.',
    highlightBadge: '2nd Place Winner',
  },
  {
    tag: 'Writing',
    title: 'AYA Scribe Contest & Lisk Content Bounty',
    description: '2nd position in the AYA Scribe Contest, plus a won Lisk content bounty for technical/educational writing.',
    highlightBadge: 'Bounty & Contest Winner',
  },
];

export const WEB3_PROJECTS: ProjectItem[] = [
  {
    id: 'decred-africa',
    tag: 'Community',
    title: 'Decred Africa (@DecredAF)',
    summary: 'Coordinating content strategy, threads, and community growth for Decred\'s African presence — governance, staking, and exchange listing content.',
    fullDescription: 'Spearheading localized community initiatives, weekly educational Twitter Spaces, and deep-dive technical threads about Decred\'s hybrid PoW/PoS consensus, decentralized treasury management, and privacy-preserving ticket voting.',
    meta: 'Ongoing',
    category: 'web3',
    highlights: [
      'Authored in-depth educational threads on decentralized governance and staking mechanics',
      'Boosted community engagement metrics across African crypto hubs',
      'Curated content covering multi-platform exchange listings and atomic swaps'
    ],
    stats: [
      { label: 'Role', value: 'Lead Community Strategist' },
      { label: 'Focus', value: 'Governance & Staking' }
    ],
    link: 'https://x.com/DecredAF',
    linkLabel: 'Visit @DecredAF on X'
  },
  {
    id: 'superteam-ng-ph',
    tag: 'Community',
    title: 'Superteam NG-PH',
    summary: 'Building and growing the Web3 community in Port Harcourt through local events and organizing.',
    fullDescription: 'Driving grass-roots Web3 expansion across Port Harcourt and the Niger Delta tech corridor. Hosting developer meetups, onboarding builders, and creating pipelines for regional talent to access global Solana ecosystem grants and bounties.',
    meta: 'Ongoing',
    category: 'web3',
    highlights: [
      'Organized in-person developer hangouts and demo days',
      'Mentored participants entering global hackathons and bounty challenges',
      'Created regional developer directory and study groups'
    ],
    stats: [
      { label: 'Region', value: 'Port Harcourt, Nigeria' },
      { label: 'Community', value: 'Solana Builders' }
    ],
    link: 'https://x.com/SuperteamNG',
    linkLabel: 'Superteam NG'
  },
  {
    id: 'brand-ambassador',
    tag: 'Ambassador',
    title: 'Brand Ambassador & IRL Organizer',
    summary: 'Community manager, IRL event coordinator, and brand ambassador across multiple Web3 projects and ecosystems.',
    fullDescription: 'Representing top tier blockchain ecosystems at major conferences, campus workshops, and developer meetups. Trusted by leading protocols to manage high-stakes community groups, moderate lively discussions, and foster safe, welcoming environments.',
    meta: '2021 – Present',
    category: 'web3',
    highlights: [
      'Represented 20+ decentralized ecosystems including Base, MovementLabs, and Arbitrum',
      'Managed multi-platform communities across Discord, Telegram, and X',
      'Executed high-attendance IRL meetups with logistical excellence'
    ],
    stats: [
      { label: 'Experience', value: '4+ Years' },
      { label: 'Ecosystems', value: '20+ Supported' }
    ]
  },
  {
    id: 'ai-operator',
    tag: 'AI Tooling',
    title: 'AIOperator',
    summary: 'YouTube channel and toolkit teaching solopreneurs and small businesses how to use AI tools and automation.',
    fullDescription: 'Empowering creators and digital entrepreneurs with actionable tutorials on LLM workflow automation, agentic prompts, and no-code tooling to streamline content pipelines and client operations.',
    meta: 'Ongoing',
    category: 'web3',
    highlights: [
      'Step-by-step guides on integrating AI into everyday business processes',
      'Curated prompt libraries and workflow templates',
      'Tutorials bridging decentralized tech with modern AI automation'
    ],
    stats: [
      { label: 'Platform', value: 'YouTube & Toolkits' },
      { label: 'Audience', value: 'Solopreneurs & Creators' }
    ]
  },
  {
    id: 'studio-ai',
    tag: 'AI Product',
    title: 'StudioAI',
    summary: 'A prompt builder with a dark glassmorphism aesthetic — multi-section prompt assembly with AI enhancement via the Claude API.',
    fullDescription: 'A modern developer and creator utility built for structured prompt architecture. Features modular prompt blocks, tone calibrators, dynamic variable interpolation, and real-time AI refinement.',
    meta: 'Built',
    category: 'web3',
    highlights: [
      'Modular section-by-section prompt construction system',
      'Dark glassmorphic UI with tactile micro-interactions',
      'One-click prompt enhancement and export workflows'
    ],
    stats: [
      { label: 'Tech', value: 'React, Tailwind, LLM API' },
      { label: 'Status', value: 'Shipped & Live' }
    ]
  },
  {
    id: 'web3-curriculum',
    tag: 'Education',
    title: 'Web3 Education Curriculum',
    summary: 'A 4-week, 20-session curriculum designed to onboard newcomers into Web3 fundamentals.',
    fullDescription: 'A comprehensive, structured educational blueprint covering cryptography basics, wallet hygiene, smart contract fundamentals, DeFi protocols, DAO governance, and technical career roadmaps.',
    meta: 'Completed',
    category: 'web3',
    highlights: [
      '20 structured modules covering conceptual and practical blockchain skills',
      'Interactive assignments with zero-risk testnet onboarding exercises',
      'Directly responsible for graduating over 70+ confident Web3 participants'
    ],
    stats: [
      { label: 'Length', value: '4 Weeks / 20 Sessions' },
      { label: 'Graduates', value: '70+ Onboarded' }
    ]
  }
];

export const WEB2_PROJECTS: ProjectItem[] = [
  {
    id: 'recording-artist',
    tag: 'Music',
    title: 'Recording Artist',
    summary: 'Making music since 2017 — an ongoing creative practice alongside Web3 and content work.',
    fullDescription: 'Expressing authentic storytelling through hip-hop, soulful melodies, and introspective lo-fi arrangements. A deep catalog of singles and collaborative projects balancing lyrical precision with ambient, melodic soundscapes.',
    meta: '2017 – Present',
    category: 'web2',
    highlights: [
      'Active independent recording and audio production since 2017',
      'Fusion of narrative hip-hop with textured instrumentals and soulful chords',
      'Available across major streaming platforms including Audiomack and Spotify'
    ],
    stats: [
      { label: 'Active Since', value: '2017' },
      { label: 'Genre', value: 'Hip-Hop / Lo-Fi / Soul' }
    ],
    link: 'https://audiomack.com/drapevangelist',
    linkLabel: 'Listen on Audiomack'
  },
  {
    id: 'drowning-season',
    tag: 'Writing',
    title: 'The Drowning Season',
    summary: 'A thriller / horror / crime novel in progress.',
    fullDescription: 'An atmospheric psychological crime novel set in murky coastal landscapes. Blends visceral suspense, morally ambiguous characters, and relentless pacing as hidden pasts surface in an unforgiving season.',
    meta: 'In progress',
    category: 'web2',
    highlights: [
      'Richly textured narrative exploring tension, guilt, and survival',
      'Multi-layered crime mystery with supernatural psychological undertones',
      'Currently in final draft editing phases'
    ],
    stats: [
      { label: 'Format', value: 'Novel' },
      { label: 'Genre', value: 'Thriller / Crime / Horror' }
    ]
  },
  {
    id: 'fully-booked',
    tag: 'Writing & Community',
    title: 'Fully Booked',
    summary: 'A virtual book club built around shared reading and discussion.',
    fullDescription: 'An interactive literary salon bringing together readers from across the globe to dissect contemporary fiction, philosophy, African literature, and transformative non-fiction. Fostering deep, critical discussion over casual reading.',
    meta: 'Ongoing',
    category: 'web2',
    highlights: [
      'Bi-weekly virtual salons and reading roundtables',
      'Curated reading lists spanning world literature, sociology, and philosophy',
      'Community discussion logs and thought-provoking essay prompts'
    ],
    stats: [
      { label: 'Format', value: 'Virtual Salon' },
      { label: 'Cadence', value: 'Bi-weekly Sessions' }
    ]
  },
  {
    id: 'confessional-essays',
    tag: 'Writing',
    title: 'Confessional Essays',
    summary: 'Reflective, first-person essays under the Drapevangelist voice — grounded realism over polished metaphor.',
    fullDescription: 'Unfiltered, raw examinations of youth, hustle, faith, ambition, and identity in modern society. Rejecting hollow motivational tropes in favor of honest, lived experiences and relatable prose.',
    meta: 'Ongoing',
    category: 'web2',
    highlights: [
      'Direct, vulnerable first-person narrative voice',
      'Explores the emotional reality behind tech, creativity, and self-reinvention',
      'Published across Substack and literary social platforms'
    ],
    stats: [
      { label: 'Style', value: 'Creative Non-Fiction' },
      { label: 'Platform', value: 'Substack & Essays' }
    ]
  },
  {
    id: 'photography-gallery',
    tag: 'Gallery',
    title: 'Photography & Visual Arts',
    summary: 'A growing collection exploring photography and gallery / home décor projects.',
    fullDescription: 'Documenting urban streetscapes, everyday human moments, architectural geometry, and warm ambient light. Curating visual series suitable for physical gallery exhibitions and modern interior spaces.',
    meta: 'Ongoing',
    category: 'web2',
    highlights: [
      'High-contrast street photography and candid urban portraits',
      'Natural light architecture and interior aesthetic studies',
      'Fine-art prints curated for living spaces and creative studios'
    ],
    stats: [
      { label: 'Medium', value: 'Digital & 35mm Aesthetic' },
      { label: 'Focus', value: 'Urban Life & Light' }
    ]
  }
];

export const SOCIAL_LINKS = {
  web3: [
    { label: 'X (Twitter)', href: 'https://x.com/drapevangelist1', handle: '@drapevangelist1', platform: 'x' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/drapevangelist', handle: 'in/drapevangelist', platform: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/drapevangelist', handle: 'github/drapevangelist', platform: 'github' },
  ],
  web2: [
    { label: 'Audiomack', href: 'https://audiomack.com/drapevangelist', handle: 'audiomack.com/drapevangelist', platform: 'audiomack' },
    { label: 'WhatsApp Channel', href: 'https://whatsapp.com/channel/drapevangelist', handle: 'Drapevangelist Updates', platform: 'whatsapp' },
    { label: 'Substack', href: 'https://drapevangelist.substack.com', handle: 'drapevangelist.substack.com', platform: 'substack' },
  ]
};
