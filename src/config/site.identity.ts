export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'zsyi08145i',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Hutdaily News',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent media updates',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A simple newsroom-style publication for announcements, coverage, and media updates on Hutdaily News.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'hutdailynews.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hutdailynews.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/api/placeholder/80/80?text=HN',
} as const
