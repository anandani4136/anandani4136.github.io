import type { FormationKind } from '../lib/formations';

export type NarrativeBeat = {
  id: string;
  lines: string[];
  formation: FormationKind;
};

export const narrativeBeats: NarrativeBeat[] = [
  {
    id: 'problem-solver',
    lines: ['I am a problem solver', 'who thrives on innovation'],
    formation: 'dataField',
  },
  {
    id: 'bold-ideas',
    lines: ['shaping bold ideas', 'into impactful solutions'],
    formation: 'network',
  },
  {
    id: 'explore',
    lines: ['by exploring', 'the unexplored'],
    formation: 'cloud',
  },
  {
    id: 'outside-box',
    lines: ['thinking outside', 'the box'],
    formation: 'box',
  },
  {
    id: 'adapt',
    lines: ['and always', 'adapting.'],
    formation: 'reconfigure',
  },
];

export const hero = {
  name: 'Ronit Anandani',
  tagline: 'Learn · Automate · Protect',
};

export const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ranandani/',
    icon: 'linkedin' as const,
  },
  {
    label: 'GitHub',
    href: 'https://www.github.com/anandani4136',
    icon: 'github' as const,
  },
  {
    label: 'Email',
    href: 'mailto:contact@ronitanandani.com',
    icon: 'mail' as const,
  },
];

export type ExperienceEntry = {
  title: string;
  company: string;
  time: string;
  summary?: string;
  logo: string;
  logoDark?: boolean;
  logoInvert?: boolean;
  infoUrl?: string;
  current?: boolean;
  intern?: boolean;
  tags?: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    title: 'Software Engineer',
    company: 'SpaceX',
    time: 'Jun 2026 – Present',
    summary: 'Building. Securing. Connecting.',
    logo: '/media/logos/spacex.svg',
    logoDark: true,
    logoInvert: true,
    infoUrl: 'https://www.spacex.com',
    current: true,
    tags: ['Security', 'Infrastructure'],
  },
  {
    title: 'Software & Security Engineer',
    company: 'Amazon Web Services',
    time: 'May 2025 – Aug 2025',
    summary:
      'Built a custom security-testing framework hardening 6,000+ network devices, with automated regression alerting and detection-rule verification.',
    logo: '/media/logos/aws.png',
    logoDark: true,
    infoUrl: 'https://aws.amazon.com/',
    intern: true,
    tags: ['Security', 'Automation', 'Cloud'],
  },
  {
    title: 'Software & Security Engineer',
    company: 'Capital One (Discover)',
    time: 'Jun 2024 – Aug 2024',
    summary:
      'Built detection-engineering and threat-intel tooling that sped up SOC response and expanded MITRE ATT&CK coverage.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg',
    infoUrl: 'https://www.discover.com/company/our-company/',
    intern: true,
    tags: ['Security', 'Python'],
  },
  {
    title: 'Software Engineer',
    company: 'Novaspect',
    time: 'May 2023 – Aug 2023',
    summary:
      'Built microservices and internal tooling for industrial data syncing, cutting integration latency and speeding delivery.',
    logo: 'https://d3u5zljkkuhj4j.cloudfront.net/logos/nova.png',
    infoUrl: 'https://www.novaspect.com/about-us/',
    intern: true,
    tags: ['Microservices', 'CI/CD', 'Automation'],
  },
];

export const education = {
  school: 'University of Illinois Urbana-Champaign',
  logo: '/media/logos/uiuc.png',
  degrees: [
    {
      degree: 'MCS',
      field: 'Computer Science',
      detail: 'AI/ML · Security · Performance Engineering · Distributed Systems',
      time: 'Aug 2025 – May 2026',
    },
    {
      degree: 'B.S.',
      field: 'Computer Science',
      detail: 'Grainger College of Engineering',
      time: 'Aug 2022 – May 2025',
    },
  ],
};
