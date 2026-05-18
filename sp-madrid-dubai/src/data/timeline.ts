export interface TimelineMilestone {
  year: number;
  titleKey: string;
  descKey: string;
  isKeyYear?: boolean;
}

export const timeline: TimelineMilestone[] = [
  { year: 2004, titleKey: 'tl_2004_title', descKey: 'tl_2004_desc', isKeyYear: true },
  { year: 2007, titleKey: 'tl_2007_title', descKey: 'tl_2007_desc' },
  { year: 2010, titleKey: 'tl_2010_title', descKey: 'tl_2010_desc' },
  { year: 2013, titleKey: 'tl_2013_title', descKey: 'tl_2013_desc' },
  { year: 2016, titleKey: 'tl_2016_title', descKey: 'tl_2016_desc' },
  { year: 2018, titleKey: 'tl_2018_title', descKey: 'tl_2018_desc' },
  { year: 2021, titleKey: 'tl_2021_title', descKey: 'tl_2021_desc' },
  { year: 2023, titleKey: 'tl_2023_title', descKey: 'tl_2023_desc', isKeyYear: true },
  { year: 2024, titleKey: 'tl_2024_title', descKey: 'tl_2024_desc', isKeyYear: true },
  { year: 2025, titleKey: 'tl_2025_title', descKey: 'tl_2025_desc' },
  { year: 2026, titleKey: 'tl_2026_title', descKey: 'tl_2026_desc', isKeyYear: true },
];
