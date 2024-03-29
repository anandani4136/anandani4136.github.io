import './globals.css';
import { Inter } from '@next/font/google';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ronit Anandani',
  description: 'Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
