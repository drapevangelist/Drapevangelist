export type PageMode = 'web3' | 'web2';

export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  summary: string;
  fullDescription?: string;
  meta: string;
  category: 'web3' | 'web2';
  highlights?: string[];
  link?: string;
  linkLabel?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
}

export type ProofOfWorkCategory = 
  | 'all'
  | 'professional'
  | 'ambassador'
  | 'beta-testing'
  | 'community'
  | 'project'
  | 'marketing'
  | 'volunteering';

export interface ProofOfWorkItem {
  id: string;
  name: string;
  role: string;
  category: 'professional' | 'ambassador' | 'beta-testing' | 'community' | 'project' | 'marketing' | 'volunteering';
  categoryLabel: string;
  period?: string;
  responsibilities?: string[];
  achievement?: string;
  additional?: string;
  focus?: string;
  technology?: string;
  meaning?: string;
  contributions?: string[];
  status: 'CONFIRMED' | 'VERIFIED' | 'COMPLETED';
  link?: string;
  institution?: string;
  year?: string;
}

export interface ChronologicalChapter {
  id: string;
  chapterNumber: string;
  era: string;
  title: string;
  role: string;
  institution: string;
  location: string;
  timeframe: string;
  summary: string;
  milestones: string[];
  verifiableRecords: string[];
  badgeTag?: string;
}

export interface ChapterTabItem {
  id: string;
  title: string;
  category: 'education' | 'certificates' | 'events' | 'posts_held' | 'drapnet';
  subtitle?: string;
  institution?: string;
  year?: string;
  description: string;
  highlights?: string[];
  verificationLink?: string;
  credentialId?: string;
  imageUrl?: string;
  exclusiveInitiative?: boolean;
}

export interface VisualProofItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  event: string;
  date: string;
  category: 'summits' | 'campus' | 'hackathons' | 'speaking' | 'drapnet' | 'creative';
  thumbnailUrl: string;
  mediaUrl: string;
  caption: string;
  impactNote?: string;
  socialPostUrl?: string;
  isUserUploaded?: boolean;
  exclusiveTag?: string;
}

export interface SocialTestimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  quote: string;
  context: string;
  year: string;
  verified: boolean;
  avatarInitials: string;
  socialUrl?: string;
  socialHandle?: string;
  socialPlatform?: 'x' | 'linkedin' | 'telegram' | 'discord' | 'website';
}

export interface LatestUpdateItem {
  id: string;
  date: string;
  title: string;
  tagline: string;
  summary: string;
  category: string;
  externalLink?: string;
  externalLinkLabel?: string;
  highlight?: boolean;
}

export interface StatItem {
  num: string;
  numericVal: number;
  suffix: string;
  label: string;
  desc?: string;
}

export interface AchievementItem {
  tag: string;
  title: string;
  description: string;
  highlightBadge?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  iconName: string;
  category: 'web3' | 'web2' | 'shared';
}

export interface MosaicItem {
  id: string;
  title: string;
  categoryLabel: string;
  location?: string;
  imageUrl: string;
  mediaType?: 'image' | 'video';
  colSpan?: string;
  isUserUploaded?: boolean;
}
