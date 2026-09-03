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
  | 'marketing';

export interface ProofOfWorkItem {
  id: string;
  name: string;
  role: string;
  category: 'professional' | 'ambassador' | 'beta-testing' | 'community' | 'project' | 'marketing';
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
