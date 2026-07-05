import './globals.css';
import { Inter } from '@next/font/google';

// const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://anandani4136.github.io';
const description =
  'Ronit Anandani — engineer building systems that learn, automate, and protect, across AI, cloud, and security.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ronit Anandani',
    template: '%s · Ronit Anandani',
  },
  description,
  keywords: ['Ronit Anandani', 'Software Engineer', 'AI', 'Cloud', 'Security', 'Distributed Systems'],
  authors: [{ name: 'Ronit Anandani' }],
  creator: 'Ronit Anandani',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Ronit Anandani',
    description,
    siteName: 'Ronit Anandani',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'Ronit Anandani — Learn · Automate · Protect' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronit Anandani',
    description,
    images: ['/og.png'],
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e8ecf2' },
    { media: '(prefers-color-scheme: dark)', color: '#07090d' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Ronit Anandani',
      url: siteUrl,
      image: `${siteUrl}/media/ronit_2026.png`,
      jobTitle: 'Software Engineer',
      worksFor: { '@type': 'Organization', name: 'SpaceX' },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Illinois Urbana-Champaign',
      },
      knowsAbout: ['Artificial Intelligence', 'Cloud', 'Security', 'Distributed Systems'],
      sameAs: [
        'https://www.linkedin.com/in/ranandani/',
        'https://www.github.com/anandani4136',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Ronit Anandani',
      url: siteUrl,
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
