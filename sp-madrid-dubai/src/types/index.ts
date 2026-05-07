export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TimelineMilestone {
  year: number;
  title: string;
  description: string;
  isKeyYear?: boolean;
}

export interface CaseStudy {
  id: string;
  company: string;
  sector: string;
  location: string;
  challenge: string;
  results: Array<{ value: string; sub: string }>;
  quote: string;
  attribution: string;
  isConfidential: boolean;
}

export interface TrustBadge {
  id: string;
  name: string;
  year: number;
  icon: string;
  category: string;
}

export interface CommitmentPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
  points: string[];
  badge: string;
}
