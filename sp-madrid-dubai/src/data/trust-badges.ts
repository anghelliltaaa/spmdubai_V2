import type { TrustBadge } from '@/types';

export const trustBadges: TrustBadge[] = [
  { id: '1', name: 'DIFC Licensed',      year: 2019, icon: '/images/logos/difc.svg',    category: 'Regulatory' },
  { id: '2', name: 'CBUAE Compliant',    year: 2019, icon: '/images/logos/cbuae.svg',   category: 'Regulatory' },
  { id: '3', name: 'ISO 27001',          year: 2021, icon: '/images/logos/iso27001.svg', category: 'Security' },
  { id: '4', name: 'Sharia Certified',   year: 2020, icon: '/images/logos/sharia.svg',  category: 'Compliance' },
  { id: '5', name: 'HSBC Partner',       year: 2015, icon: '/images/logos/hsbc.svg',    category: 'Banking' },
  { id: '6', name: 'BDO Unibank',        year: 2012, icon: '/images/logos/bdo.svg',     category: 'Banking' },
  { id: '7', name: 'ISO 9001:2015',      year: 2019, icon: '/images/logos/iso9001.svg', category: 'Quality' },
  { id: '8', name: 'UN Global Compact',  year: 2022, icon: '/images/logos/ungc.svg',    category: 'Ethics' },
];
