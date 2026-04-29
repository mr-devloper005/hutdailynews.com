import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Filter, FileText, Globe2, Search, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/updates',
    title: 'Latest Press Releases - Hutdaily News',
    description: 'Browse the latest press releases and media updates from Hutdaily News. Stay informed with breaking news and announcements.',
    keywords: ['press releases', 'news', 'media updates', 'announcements'],
  })
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/api/placeholder/900/1400?text=Press+Release'
}

function getPostCategoryLabel(post: SitePost): string {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const cat = content.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution' && t !== 'article')
  if (typeof tag === 'string') return tag
  return 'Press Release'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

export default async function UpdatesPage({ searchParams }: { searchParams?: { category?: string; search?: string } }) {
  const posts = await fetchTaskPosts('mediaDistribution', 30)
  const normalizedCategory = searchParams?.category ? normalizeCategory(searchParams.category) : 'all'
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  
  const filteredPosts = posts.filter(post => {
    if (normalizedCategory === 'all') return true
    const meta = getPostMeta(post)
    return meta.category.toLowerCase() === normalizedCategory.toLowerCase()
  })

  const schemaItems = filteredPosts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}/updates/${post.slug}`,
    name: post.title,
  }))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      
      <main>
        {/* Hero Section */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 bg-gradient-to-br from-[#DACC96]/20 to-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] bg-[#632626]/10 text-[#632626] border border-[#632626]/20">
                <FileText className="h-4 w-4" />
                Press Releases
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-[-0.06em] text-[#632626] sm:text-5xl lg:text-6xl">
                Latest Press Releases
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-[#6e5547]">
                Stay updated with the latest news, announcements, and media updates from Hutdaily News
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6e5547]" />
                  <input
                    type="text"
                    placeholder="Search press releases..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#632626]/20 bg-white text-[#632626] placeholder-[#6e5547] focus:outline-none focus:border-[#632626]/40"
                  />
                </div>
                <div className="flex gap-3">
                  <form className="flex items-center gap-3">
                    <select 
                      name="category" 
                      defaultValue={normalizedCategory}
                      className="h-12 px-4 rounded-xl border border-[#632626]/20 bg-white text-[#632626] focus:outline-none focus:border-[#632626]/40"
                    >
                      <option value="all">All Categories</option>
                      {CATEGORY_OPTIONS.map((item) => (
                        <option key={item.slug} value={item.slug}>{item.name}</option>
                      ))}
                    </select>
                    <button 
                      type="submit"
                      className="h-12 px-6 rounded-xl bg-[#632626] text-white font-semibold hover:bg-[#9D5353] transition-colors flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases Grid */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#632626]">
                  {normalizedCategory === 'all' ? 'All Press Releases' : `${CATEGORY_OPTIONS.find(c => c.slug === normalizedCategory)?.name || normalizedCategory} Press Releases`}
                </h2>
                <p className="mt-2 text-[#6e5547]">
                  {filteredPosts.length} press release{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#632626]/20 rounded-xl text-[#632626] hover:bg-[#632626]/10 transition-colors">
                  <Calendar className="h-4 w-4" />
                  Latest First
                </button>
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/updates/${post.slug}`} className="group">
                    <div className="h-full overflow-hidden rounded-2xl border border-[#632626]/10 bg-white shadow-md transition-all hover:shadow-lg hover:border-[#632626]/20">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={getPostImage(post)} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] bg-[#632626] text-white rounded-full">
                            {getPostCategoryLabel(post)}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/90 text-[#632626] rounded-full">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold leading-tight text-[#632626] group-hover:text-[#9D5353] transition-colors mb-3">
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p className="text-sm leading-relaxed text-[#6e5547] line-clamp-3 mb-4">{post.summary}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-[#6e5547]">
                          <div className="flex items-center gap-2">
                            <FileText className="h-3 w-3" />
                            Press Release
                          </div>
                          {post.authorName && (
                            <div className="flex items-center gap-2">
                              <Globe2 className="h-3 w-3" />
                              {post.authorName}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#632626]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-[#632626]" />
                </div>
                <h3 className="text-xl font-semibold text-[#632626] mb-2">No press releases found</h3>
                <p className="text-[#6e5547] mb-6">Try adjusting your filters or search terms</p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#632626] text-white rounded-full font-semibold hover:bg-[#9D5353] transition-colors">
                  <ArrowRight className="h-4 w-4" />
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 bg-[#DACC96]/10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#632626] mb-4">Stay Updated</h2>
            <p className="text-lg text-[#6e5547] mb-8">
              Subscribe to our newsletter to receive the latest press releases directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-[#632626]/20 bg-white text-[#632626] placeholder-[#6e5547] focus:outline-none focus:border-[#632626]/40"
              />
              <button className="px-6 py-3 bg-[#632626] text-white rounded-xl font-semibold hover:bg-[#9D5353] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <SchemaJsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Latest Press Releases | Hutdaily News',
            url: `${baseUrl}/updates`,
            hasPart: schemaItems,
          },
        ]}
      />
    </div>
  )
}
