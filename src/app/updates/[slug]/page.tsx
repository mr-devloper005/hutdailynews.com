import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, FileText, Globe2, Mail, Phone, Share2, Tag, Twitter, Linkedin, Facebook } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPostMetadata } from '@/lib/seo'
import type { SitePost } from '@/lib/site-connector'
import { notFound } from 'next/navigation'

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await fetchTaskPosts('mediaDistribution', 50)
  if (!posts.length) return [{ slug: 'placeholder' }]
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const post = await fetchTaskPostBySlug('mediaDistribution', resolvedParams.slug)
  return post ? await buildPostMetadata('mediaDistribution', post) : {
    title: 'Press Release Not Found - Hutdaily News',
    description: 'The requested press release could not be found.',
  }
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

function renderContent(content: any): string {
  if (typeof content === 'string') return content
  if (typeof content === 'object' && content !== null) {
    if (typeof content.body === 'string') return content.body
    if (typeof content.content === 'string') return content.content
    if (typeof content.text === 'string') return content.text
  }
  return ''
}

export default async function UpdateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await fetchTaskPostBySlug('mediaDistribution', resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await fetchTaskPosts('mediaDistribution', 6)
  const filteredRelatedPosts = relatedPosts.filter(p => p.id !== post.id).slice(0, 3)
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const fullUrl = `${baseUrl}/updates/${post.slug}`

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.summary || post.metaDescription,
    image: getPostImage(post),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Organization',
      name: post.authorName || SITE_CONFIG.name,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: baseUrl,
      logo: `${baseUrl}${SITE_CONFIG.defaultOgImage}`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      
      <main>
        {/* Breadcrumb */}
        <section className="px-5 py-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <nav className="flex items-center gap-2 text-sm text-[#6e5547]">
              <Link href="/" className="hover:text-[#632626] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/updates" className="hover:text-[#632626] transition-colors">Press Releases</Link>
              <span>/</span>
              <span className="text-[#632626] font-medium">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] bg-[#632626]/10 text-[#632626] border border-[#632626]/20">
                <FileText className="h-4 w-4" />
                {getPostCategoryLabel(post)}
              </span>
              
              <h1 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-[#632626] sm:text-4xl lg:text-5xl leading-tight">
                {post.title}
              </h1>
              
              {post.summary && (
                <p className="mt-6 text-xl leading-relaxed text-[#6e5547] max-w-3xl mx-auto">
                  {post.summary}
                </p>
              )}
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#6e5547]">
                {post.authorName && (
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    <span>{post.authorName}</span>
                  </div>
                )}
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {getPostImage(post) && (
              <div className="mb-12">
                <div className="relative overflow-hidden rounded-2xl border border-[#632626]/10">
                  <img 
                    src={getPostImage(post)} 
                    alt={post.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            {/* Social Share Buttons */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-semibold text-[#6e5547]">Share:</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition-colors">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-[#632626]/20 text-[#632626] rounded-lg hover:bg-[#632626]/10 transition-colors">
                  <Share2 className="h-4 w-4" />
                  Copy Link
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="article-content prose prose-lg max-w-none">
              {renderContent(post.content) ? (
                <div 
                  className="text-[#1a1a1a] leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                />
              ) : (
                <div className="text-[#6e5547] text-center py-12">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-[#632626]/30" />
                  <p>Content for this press release will be available soon.</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="mt-16 p-8 rounded-2xl border border-[#632626]/10 bg-[#DACC96]/20">
              <h3 className="text-2xl font-bold text-[#632626] mb-4">Media Contact</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#632626]" />
                  <span className="text-[#1a1a1a]">media@hutdailynews.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#632626]" />
                  <span className="text-[#1a1a1a]">+1 (555) 123-4567</span>
                </div>
              </div>
              <p className="mt-4 text-[#6e5547]">
                For media inquiries, interview requests, or additional information, please contact our media relations team.
              </p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {filteredRelatedPosts.length > 0 && (
          <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 bg-[#DACC96]/10">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#632626]">Related Press Releases</h2>
                <p className="mt-2 text-[#6e5547]">Explore more news and announcements</p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRelatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/updates/${relatedPost.slug}`} className="group">
                    <div className="h-full overflow-hidden rounded-xl border border-[#632626]/10 bg-white shadow-md transition-all hover:shadow-lg hover:border-[#632626]/20">
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] bg-[#632626]/10 text-[#632626] rounded-full mb-3">
                          {getPostCategoryLabel(relatedPost)}
                        </span>
                        <h3 className="text-xl font-bold leading-tight text-[#632626] group-hover:text-[#9D5353] transition-colors mb-3">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.summary && (
                          <p className="text-sm leading-relaxed text-[#6e5547] line-clamp-3">{relatedPost.summary}</p>
                        )}
                        <div className="mt-4 flex items-center text-xs text-[#6e5547]">
                          {relatedPost.publishedAt && (
                            <span>{new Date(relatedPost.publishedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Press Releases */}
        <section className="px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <Link 
              href="/updates" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#632626] text-white rounded-full font-semibold hover:bg-[#9D5353] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Press Releases
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      
      <SchemaJsonLd data={schemaData} />
    </div>
  )
}
