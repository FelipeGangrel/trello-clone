import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/images/logo.svg',
      href: '/images/logo.svg',
    },
  ],
}

type RootLayoutProps = {
  readonly children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export { metadata }
export default RootLayout
