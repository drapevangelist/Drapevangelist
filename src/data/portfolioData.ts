import { ProjectItem, StatItem, AchievementItem, SocialLink, ProofOfWorkItem } from '../types';

export const WEB3_STATS: StatItem[] = [
  { num: '40+', numericVal: 40, suffix: '+', label: 'Events Hosted & Coordinated', desc: 'Across Base, Movement Network, Rujira Academy, ETHNigeria & Blockchain Uniport' },
  { num: '70+', numericVal: 70, suffix: '+', label: 'Onboarded into Tech / Web3', desc: 'Guided newcomers through hands-on campus activations, workshops & bootcamps' },
  { num: '44', numericVal: 44, suffix: '', label: 'Master Proof of Work Records', desc: 'Across 6 specialized operational categories and ecosystem disciplines' },
  { num: '20+', numericVal: 20, suffix: '+', label: 'Web3 Ecosystems Explored', desc: 'Base, Solana, Sui Move, Arbitrum, Ethereum, Avalanche, Decred, Movement Labs' },
];

export const WEB3_DUTIES: string[] = [
  'Brand Representation',
  'Community Moderation',
  'Content / Technical Writing',
  'Content Creation',
  'IRL Event Organization',
  'IRL Representation',
  'Campus Operations & Onboarding',
  'Beta & DApp Testing',
];

export const WEB3_ACHIEVEMENTS: AchievementItem[] = [
  {
    tag: 'Events & Ecosystems',
    title: '40+ IRL Events Coordinated',
    description: 'Coordinated and promoted Web3/technology activities and IRL summits for Rujira Academy, Movement Labs, Base, and ETHNigeria.',
    highlightBadge: '40+ IRL Summits',
  },
  {
    tag: 'Campus Leadership',
    title: 'Blockchain Uniport Co-Lead & ETHNigeria Coordinator',
    description: 'Co-led Blockchain Uniport (Aug 2023 – Aug 2024) and served as Rivers State Campus Coordinator for ETHNigeria, onboarding 70+ students into tech.',
    highlightBadge: 'Campus Operations',
  },
  {
    tag: 'Hackathon & Competitions',
    title: 'Hack for Good Hackathon 2024 & Writing Bounties',
    description: 'Achieved 2nd position in Hack for Good Hackathon 2024, 2nd position in AYA Scribe Contest, and won the Lisk educational content bounty.',
    highlightBadge: 'Contest & Bounty Winner',
  },
];

// MASTER WEB3 EXPERIENCE DATABASE (44 Verified Records)
export const MASTER_PROOF_OF_WORK: ProofOfWorkItem[] = [
  // 1. PROFESSIONAL / COMMUNITY / SOCIAL MEDIA WORK
  {
    id: 'boonhq-pro',
    name: 'BoonHQ',
    role: 'Social Media & Community Management',
    category: 'professional',
    categoryLabel: 'Social Media / Community Growth',
    responsibilities: [
      'Social media management & strategy execution',
      'Community engagement across channels',
      'Targeted audience growth and retention',
    ],
    achievement: 'Increased Twitter/X followers by approximately 50%',
    status: 'CONFIRMED',
  },
  {
    id: 'rujira-academy',
    name: 'Rujira Academy',
    role: 'Event Coordinator / Community & Ecosystem Support',
    category: 'professional',
    categoryLabel: 'Events / Web3 Education',
    responsibilities: [
      'Coordinated and promoted Web3/technology activities',
      'Managed logistics and speaker relations for IRL events',
    ],
    achievement: 'Part of 40+ events hosted/coordinated across Web3/community work',
    status: 'CONFIRMED',
  },
  {
    id: 'movement-labs-pro',
    name: 'Movement Labs / Movement Network',
    role: 'Event Coordinator / Community & Ecosystem Support',
    category: 'professional',
    categoryLabel: 'Events / Community / Ecosystem',
    responsibilities: [
      'IRL event coordination and attendee logistics',
      'Community engagement and builder support',
      'Ecosystem activities and technical content creation',
    ],
    additional: "Created content around Movement Network's transition to an L1",
    achievement: 'Ecosystem event coordination & L1 content contributor',
    status: 'CONFIRMED',
  },
  {
    id: 'base-pro',
    name: 'Base',
    role: 'Event Coordinator / Community & Ecosystem Support',
    category: 'professional',
    categoryLabel: 'Events / Ecosystem',
    responsibilities: [
      'Coordinated IRL ecosystem and community activities',
      'Fostered onchain builder culture and local ecosystem participation',
    ],
    achievement: 'Part of 40+ events hosted/coordinated across Web3',
    status: 'CONFIRMED',
  },
  {
    id: 'blockchain-uniport',
    name: 'Blockchain Uniport',
    role: 'Co-lead / Community & Campus Operations',
    category: 'professional',
    categoryLabel: 'Campus Web3 Community',
    period: 'August 2023 – August 2024',
    responsibilities: [
      'Community building and organizational strategy',
      'Campus event planning and logistics execution',
      'Event promotion and multi-channel marketing',
      'Speaker and participant coordination',
      'Community communication and member relations',
      'Student onboarding and practical wallet setup',
      'Blockchain and Web3 literacy awareness',
    ],
    achievement: 'Helped build Web3 participation and awareness within the University of Port Harcourt community (70+ students onboarded)',
    status: 'CONFIRMED',
  },
  {
    id: 'ethnigeria-pro',
    name: 'ETHNigeria',
    role: 'Rivers State Campus Coordinator',
    category: 'professional',
    categoryLabel: 'Campus / Ecosystem / Events',
    responsibilities: [
      'Campus activation and student mobilization',
      'Student and community engagement programs',
      'Event coordination and workshop facilitation',
      'Ethereum ecosystem awareness and developer onboarding',
    ],
    achievement: 'Spearheaded regional campus activations across Rivers State',
    status: 'CONFIRMED',
  },

  // 2. AMBASSADOR EXPERIENCE
  {
    id: 'minipay-amb',
    name: 'MiniPay',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Ambassador / Ecosystem Growth',
    responsibilities: [
      'Product education and usability walkthroughs',
      'Community promotion and social engagement',
      'Content creation on zero-gas dollar stablecoin transfers',
      'User education and mobile wallet onboarding',
    ],
    status: 'CONFIRMED',
  },
  {
    id: 'archisinal-amb',
    name: 'Archisinal',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Ambassador',
    responsibilities: ['Brand representation', 'Community advocacy', 'Product evangelism'],
    status: 'CONFIRMED',
  },
  {
    id: 'eventplace-amb',
    name: 'Eventplace.Ng',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Ambassador',
    responsibilities: ['Event platform advocacy', 'Regional creator outreach', 'Ecosystem promotion'],
    status: 'CONFIRMED',
  },
  {
    id: 'everest-rides-amb',
    name: 'Everest Rides',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Ambassador',
    responsibilities: ['Mobility tech evangelism', 'Community outreach', 'Brand representation'],
    status: 'CONFIRMED',
  },
  {
    id: 'fruitizo-amb',
    name: 'Fruitizo',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Ambassador',
    responsibilities: ['Brand storytelling', 'Community growth', 'Product advocacy'],
    status: 'CONFIRMED',
  },
  {
    id: 'hervest-amb',
    name: 'Hervest',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Ambassador',
    responsibilities: ['Fintech education', 'Financial literacy advocacy', 'User onboarding'],
    status: 'CONFIRMED',
  },
  {
    id: 'solana-allstars-amb',
    name: 'Solana Allstars NG',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Solana / Ambassador',
    responsibilities: ['Solana ecosystem representation', 'IRL developer meetups', 'Ecosystem promotion'],
    status: 'CONFIRMED',
  },
  {
    id: 'step-finance-amb',
    name: 'Step Finance',
    role: 'Superfan (Season 1)',
    category: 'ambassador',
    categoryLabel: 'Ambassador / Community',
    additional: 'Superfan Season 1 Cohort',
    responsibilities: ['Solana dashboard education', 'Community discussions', 'Social promotion'],
    status: 'CONFIRMED',
  },
  {
    id: 'texce-amb',
    name: 'Texce',
    role: 'Evangelist',
    category: 'ambassador',
    categoryLabel: 'Ambassador',
    responsibilities: ['Tech evangelism', 'Developer awareness', 'Product advocacy'],
    status: 'CONFIRMED',
  },
  {
    id: 'zedi-hub-amb',
    name: 'Zedi Hub',
    role: 'Ambassador',
    category: 'ambassador',
    categoryLabel: 'Ambassador',
    responsibilities: ['Tech community engagement', 'Ecosystem networking', 'Brand advocacy'],
    status: 'CONFIRMED',
  },
  {
    id: '100pay-amb',
    name: '100pay',
    role: 'Ambassador + Beta Tester',
    category: 'ambassador',
    categoryLabel: 'Ambassador / Beta Testing',
    responsibilities: ['Crypto payment gateway testing', 'Merchant advocacy', 'Educational content'],
    status: 'CONFIRMED',
  },

  // 3. BETA TESTING
  {
    id: 'chipper-cash-beta',
    name: 'Chipper Cash',
    role: 'Beta Tester',
    category: 'beta-testing',
    categoryLabel: 'Product Testing',
    contributions: ['Tested cross-border payment flows and app performance', 'Submitted UI/UX feedback and bug reports to developer team'],
    status: 'CONFIRMED',
  },
  {
    id: 'josplay-beta',
    name: 'Josplay',
    role: 'Beta Tester',
    category: 'beta-testing',
    categoryLabel: 'Product Testing',
    contributions: ['Tested African music streaming interface, recommendation engine, and playback flows'],
    status: 'CONFIRMED',
  },
  {
    id: 'shiga-dapp-beta',
    name: 'Shiga D.app',
    role: 'Beta Tester',
    category: 'beta-testing',
    categoryLabel: 'Web3 / DApp Testing',
    contributions: ['Conducted comprehensive testing of Web3 decentralized application workflows, wallet connect, and transaction states'],
    status: 'CONFIRMED',
  },
  {
    id: 'streamlivr-dapp-beta',
    name: 'Streamlivr D.app',
    role: 'Beta Tester',
    category: 'beta-testing',
    categoryLabel: 'Web3 / DApp Testing',
    contributions: ['Evaluated decentralized live streaming infrastructure, token tipping mechanisms, and latency'],
    status: 'CONFIRMED',
  },
  {
    id: '100pay-beta',
    name: '100pay DApp',
    role: 'Beta Tester',
    category: 'beta-testing',
    categoryLabel: 'Product Testing',
    contributions: ['Stress-tested checkout widget integration, multi-currency invoicing, and crypto-to-fiat conversion rates'],
    status: 'CONFIRMED',
  },

  // 4. WEB3 COMMUNITY MEMBERSHIPS / AFFILIATIONS
  {
    id: 'all-in-dao',
    name: 'All in DAO',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'DAO / Community',
    status: 'CONFIRMED',
  },
  {
    id: 'arbitrum-ph',
    name: 'Arbitrum Port Harcourt',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Local Web3 Community',
    status: 'CONFIRMED',
  },
  {
    id: 'base-tech-team',
    name: 'Base Technical Team',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Ecosystem Community',
    status: 'CONFIRMED',
  },
  {
    id: 'blackdot-trading',
    name: 'Blackdot Trading',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Web3 / Trading Community',
    status: 'CONFIRMED',
  },
  {
    id: 'borderless-tech-uniport',
    name: 'Borderless Tech Club UNIPORT',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Campus Technology Community',
    status: 'CONFIRMED',
  },
  {
    id: 'borderless-web3',
    name: 'Borderless Web3 Community',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Web3 Community',
    status: 'CONFIRMED',
  },
  {
    id: 'creative-hub',
    name: 'Creative Hub',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Technology / Creative Community',
    status: 'CONFIRMED',
  },
  {
    id: 'eth-port-harcourt',
    name: 'ETH Port Harcourt',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Ethereum / Local Ecosystem',
    status: 'CONFIRMED',
  },
  {
    id: 'fighter-dao',
    name: 'Fighter DAO',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'DAO / Web3',
    status: 'CONFIRMED',
  },
  {
    id: 'hunters-dao',
    name: 'Hunters DAO',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'DAO / Web3',
    status: 'CONFIRMED',
  },
  {
    id: 'moonwalk-ph',
    name: 'Moonwalk Port Harcourt',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Local Web3 Community',
    status: 'CONFIRMED',
  },
  {
    id: 'superteamng-ph',
    name: 'SuperteamNG Port Harcourt',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'Solana / Local Ecosystem',
    status: 'CONFIRMED',
  },
  {
    id: 'sultans-dao',
    name: 'Sultans DAO',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'DAO / Web3',
    status: 'CONFIRMED',
  },
  {
    id: 'the-dao-network',
    name: 'The DAO Network',
    role: 'Community Member',
    category: 'community',
    categoryLabel: 'DAO / Web3',
    status: 'CONFIRMED',
  },
  {
    id: '360-volunteer-network',
    name: '360 Volunteer Network',
    role: 'Community Member / Volunteer',
    category: 'community',
    categoryLabel: 'Community / Volunteering',
    status: 'CONFIRMED',
  },

  // 5. WEB3 PROJECT / PRODUCT EXPERIENCE
  {
    id: 'assetlink-rwa',
    name: 'AssetLink',
    role: 'Project / Product Contributor',
    category: 'project',
    categoryLabel: 'RWA / Sui',
    focus: 'Real-world assets / RWA infrastructure tokenization',
    technology: 'Sui Move smart contracts',
    contributions: ['Architecture research for RWA tokenization on Sui', 'Move smart contract exposure and product feedback'],
    status: 'CONFIRMED',
  },
  {
    id: 'picwe-omnichain',
    name: 'PicWe',
    role: 'Project / Product Contributor',
    category: 'project',
    categoryLabel: 'Omnichain RWA',
    focus: 'Omnichain real-world asset infrastructure',
    additional: 'Associated with the planned $WEUSD stable ecosystem',
    contributions: ['Contributed to product design and omnichain asset interoperability roadmaps'],
    status: 'CONFIRMED',
  },
  {
    id: 'boon-socialfi',
    name: 'Boon',
    role: 'Project / Community Work',
    category: 'project',
    categoryLabel: 'SocialFi / Solana',
    focus: 'SocialFi mechanics and monetization on Solana',
    additional: 'Nigerian / African Web3 ecosystem focus',
    contributions: ['Executed targeted creator onboarding and local SocialFi community strategy'],
    status: 'CONFIRMED',
  },
  {
    id: 'decred-africa-proj',
    name: 'Decred / Decred Africa',
    role: 'Community / Ecosystem / Content',
    category: 'project',
    categoryLabel: 'Decred',
    contributions: [
      'Community and ecosystem engagement across Africa',
      'Technical content writing on hybrid PoW/PoS consensus and Politeia governance',
      'Visual asset design and educational collateral',
      'Ecosystem research and project ideation (Decred Atlas exploration)',
    ],
    status: 'CONFIRMED',
  },
  {
    id: 'drapnet-initiative',
    name: 'DRAPNET',
    role: 'Founder / Community Initiative',
    category: 'project',
    categoryLabel: 'Decentralized Ecosystem',
    meaning: 'Distributed Relevance Across Protocols and Networks',
    focus: 'Developer communities, creators, innovators, decentralized networks, and cross-ecosystem collaboration',
    contributions: ['Founded initiative uniting multidisciplinary creators across emerging L1/L2 networks'],
    status: 'CONFIRMED',
  },

  // 6. CONTENT / PRODUCT MARKETING
  {
    id: 'busha-marketing',
    name: 'Busha',
    role: 'Content / Community Campaign Contributor',
    category: 'marketing',
    categoryLabel: 'Fintech / Crypto / Content',
    contributions: [
      'Product-focused user-generated content (UGC)',
      'Feature education and video/thread tutorials',
      'Social media campaigns driving app activations',
      'Covered core features: buying/selling crypto, spending, virtual cards, holding, borrowing, and yield earning',
    ],
    status: 'CONFIRMED',
  },
  {
    id: 'avalanche-builders-mkt',
    name: 'Avalanche Builders',
    role: 'Ecosystem Participant / Builder Community',
    category: 'marketing',
    categoryLabel: 'Avalanche / Builders / Events',
    contributions: [
      'Attended Avalanche Builders events',
      'Participated in regional ecosystem activities and subnets discussions',
      'Created promotional and educational content around the builder experience',
    ],
    status: 'CONFIRMED',
  },
];

export const WEB3_PROJECTS: ProjectItem[] = [
  {
    id: 'decred-africa',
    tag: 'Governance & L1',
    title: 'Decred Africa (@DecredAF)',
    summary: 'Coordinating content strategy, technical education, and community growth for Decred across Africa — hybrid PoW/PoS consensus, staking, and treasury governance.',
    fullDescription: 'Spearheading localized community initiatives, weekly educational Twitter Spaces, and deep-dive technical threads about Decred\'s hybrid PoW/PoS consensus, decentralized treasury management, and privacy-preserving ticket voting.',
    meta: 'Confirmed · Ongoing',
    category: 'web3',
    highlights: [
      'Authored in-depth educational threads on decentralized governance and staking mechanics',
      'Boosted community engagement metrics across African crypto hubs',
      'Curated content covering multi-platform exchange listings, atomic swaps, and Politeia proposals',
      'Explored ecosystem initiatives including Decred Atlas ideation'
    ],
    stats: [
      { label: 'Role', value: 'Lead Community & Content' },
      { label: 'Focus', value: 'Hybrid Consensus & Governance' }
    ],
    link: 'https://x.com/DecredAF',
    linkLabel: 'Visit @DecredAF on X'
  },
  {
    id: 'base-movement-events',
    tag: 'IRL Events & L1/L2',
    title: 'Base & Movement Labs Ecosystem Operations',
    summary: 'Event Coordinator & Ecosystem Support across 40+ IRL Web3 activations, developer summits, and Movement Network\'s transition to an L1.',
    fullDescription: 'Orchestrated in-person ecosystem operations, workshop logistics, and builder outreach for Base and Movement Labs. Spearheaded community engagement programs, created technical content covering Movement Network\'s transition to an L1, and contributed to 40+ events hosted across Web3 communities.',
    meta: 'Confirmed · 40+ Events',
    category: 'web3',
    highlights: [
      'Part of 40+ events hosted and coordinated across leading ecosystems',
      'Executed on-the-ground activations connecting developers with Base and Movement Network',
      'Authored educational content covering Movement Labs architecture and L1 evolution',
      'Fostered high-retention builder pipelines through IRL workshops'
    ],
    stats: [
      { label: 'Events Hosted', value: '40+ IRL Summits' },
      { label: 'Ecosystems', value: 'Base & Movement Labs' }
    ]
  },
  {
    id: 'blockchain-uniport-eth',
    tag: 'Campus Leadership',
    title: 'Blockchain Uniport & ETHNigeria',
    summary: 'Co-lead of Blockchain Uniport (2023–2024) and Rivers State Campus Coordinator for ETHNigeria — 70+ students successfully onboarded into tech/Web3.',
    fullDescription: 'Directed campus operations, student onboarding workshops, and multi-speaker hackathon preparation sessions at the University of Port Harcourt. Coordinated statewide Ethereum educational initiatives for ETHNigeria, teaching cryptography fundamentals, wallet security, and developer pathways.',
    meta: 'August 2023 – August 2024',
    category: 'web3',
    highlights: [
      'Successfully onboarded 70+ students into active Web3 development and community roles',
      'Organized multi-speaker campus summits, speaker bookings, and hands-on developer labs',
      'Acted as ETHNigeria Rivers State Campus Coordinator for statewide student outreach',
      'Established ongoing mentorship pipelines connecting students to global DAOs and hackathons'
    ],
    stats: [
      { label: 'Students Onboarded', value: '70+ Graduated' },
      { label: 'Tenure', value: 'Co-Lead (2023–2024)' }
    ]
  },
  {
    id: 'boon-hq-socialfi',
    tag: 'SocialFi & Growth',
    title: 'BoonHQ & Boon SocialFi',
    summary: 'Social Media & Community Management on Solana — drove +50% Twitter/X follower growth and spearheaded creator onboarding for the Nigerian Web3 ecosystem.',
    fullDescription: 'Led end-to-end social media strategy, community moderation, and creator campaigns for BoonHQ. Designed high-converting social campaigns and creator incentive structures, achieving an approximate 50% increase in Twitter/X community growth while fostering active SocialFi adoption on Solana.',
    meta: 'Confirmed · Solana',
    category: 'web3',
    highlights: [
      'Grew Twitter/X community following by ~50% via organic educational campaigns',
      'Managed daily community conversations, Discord/Telegram engagement, and user queries',
      'Coordinated creator onboarding for decentralized monetization features',
      'Bridged regional African creator talent with Solana SocialFi tools'
    ],
    stats: [
      { label: 'Growth Metric', value: '+50% X Followers' },
      { label: 'Domain', value: 'Solana SocialFi' }
    ]
  },
  {
    id: 'assetlink-picwe-rwa',
    tag: 'RWA & Sui Move',
    title: 'AssetLink & PicWe RWA Infrastructure',
    summary: 'Product contributor for Real-World Asset (RWA) tokenization on Sui Move (AssetLink) and omnichain asset infrastructure supporting the planned $WEUSD ecosystem (PicWe).',
    fullDescription: 'Engaged as product and research contributor for next-generation RWA platforms. Analyzed Sui Move object-centric smart contract patterns for asset fractionalization at AssetLink, and contributed to cross-chain interoperability design for PicWe\'s omnichain RWA and $WEUSD stablecoin ecosystem.',
    meta: 'Confirmed · Sui & Omnichain',
    category: 'web3',
    highlights: [
      'Researched tokenization frameworks utilizing Sui Move smart contract standards',
      'Contributed product feedback for omnichain asset bridge mechanics and $WEUSD peg design',
      'Evaluated compliance and fractional ownership models for tangible physical assets onchain',
      'Deep technical exposure to high-throughput non-EVM execution environments'
    ],
    stats: [
      { label: 'Chains', value: 'Sui Move & Omnichain' },
      { label: 'Focus', value: 'RWA & $WEUSD' }
    ]
  },
  {
    id: 'drapnet-founder',
    tag: 'Ecosystem Initiative',
    title: 'DRAPNET (Founder)',
    summary: 'Distributed Relevance Across Protocols and Networks — a grassroots decentralized initiative connecting developer communities, creators, and innovators across multi-chain ecosystems.',
    fullDescription: 'Founded DRAPNET to bridge builders, content creators, and protocols across isolated blockchain networks. Focused on cross-ecosystem collaboration, shared developer resources, and empowering African talent to ship impactful projects on emerging L1s and L2s.',
    meta: 'Founder · Confirmed',
    category: 'web3',
    highlights: [
      'Established cross-protocol network uniting developers, designers, and community leads',
      'Facilitated collaboration across Solana, Base, Sui, and Ethereum ecosystems',
      'Created open resource hubs for onboarding developers into Web3 careers',
      'Championed decentralized governance and regional African builder representation'
    ],
    stats: [
      { label: 'Initiative', value: 'Founder' },
      { label: 'Scope', value: 'Cross-Chain / Protocols' }
    ]
  },
  {
    id: 'busha-content-marketing',
    tag: 'Product Marketing',
    title: 'Busha Campaign & Product Education',
    summary: 'Content and community campaign contributor for Busha — educational UGC covering crypto buy/sell, virtual cards, holding, spending, and yield earning.',
    fullDescription: 'Crafted engaging user-generated content and educational explainers for Busha\'s crypto and fintech ecosystem. Developed walkthroughs demystifying crypto-to-fiat spending, virtual card generation, interest-bearing vaults, and seamless everyday payment features.',
    meta: 'Confirmed · Fintech / Crypto',
    category: 'web3',
    highlights: [
      'Authored UGC and social video scripts breaking down complex financial products',
      'Educated retail users on spending, virtual cards, and interest-bearing wallets',
      'Participated in active growth campaigns driving app activations and user deposits',
      'Bridged crypto fundamentals with practical everyday African commerce'
    ],
    stats: [
      { label: 'Focus', value: 'Crypto Cards & Vaults' },
      { label: 'Channel', value: 'UGC & Campaigns' }
    ]
  },
  {
    id: 'superteam-ng-ph',
    tag: 'Solana Leadership',
    title: 'Superteam NG-PH',
    summary: 'Building and growing the Solana developer and builder community in Port Harcourt through meetups, hackathons, and regional talent pipelines.',
    fullDescription: 'Driving grass-roots Web3 expansion across Port Harcourt and the Niger Delta tech corridor. Hosting developer meetups, onboarding builders, and creating pipelines for regional talent to access global Solana ecosystem grants and bounties.',
    meta: 'Ongoing · Solana',
    category: 'web3',
    highlights: [
      'Organized in-person developer hangouts and demo days in Port Harcourt',
      'Mentored participants entering global hackathons and bounty challenges',
      'Created regional developer directory and study groups for Rust/Anchor learners',
      'Active community member in SuperteamNG Port Harcourt chapter'
    ],
    stats: [
      { label: 'Region', value: 'Port Harcourt, Nigeria' },
      { label: 'Community', value: 'Solana Builders' }
    ],
    link: 'https://x.com/SuperteamNG',
    linkLabel: 'Superteam NG'
  },
  {
    id: 'multichain-ambassador',
    tag: 'Ambassador Portfolio',
    title: '11+ Ambassador & Beta Testing Roles',
    summary: 'Ambassador and product tester across MiniPay, Chipper Cash, 100pay, Archisinal, Solana Allstars NG, Step Finance, Shiga, Streamlivr, and more.',
    fullDescription: 'Extensive track record as a trusted brand evangelist and technical beta tester across 11+ protocols and applications. Conducted regression testing on DApps and payment flows, provided UX feedback to product teams, and led user onboarding drives across Nigeria.',
    meta: '11+ Roles Confirmed',
    category: 'web3',
    highlights: [
      'Ambassador for MiniPay, Archisinal, Eventplace.Ng, Everest Rides, Fruitizo, Hervest, Solana Allstars NG, Step Finance (Superfan S1), Texce, Zedi Hub, 100pay',
      'Beta tested Chipper Cash, Josplay, Shiga D.app, Streamlivr D.app, and 100pay payment gateways',
      'Delivered structured user feedback and bug reports directly to core development teams',
      'Consistently recognized for authentic community advocacy and education'
    ],
    stats: [
      { label: 'Ambassador Roles', value: '11 Verified' },
      { label: 'Beta Testing', value: '5 DApps & Apps' }
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

