import Link from 'next/link'
import { Calendar, ChevronRight, FileText, Globe2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = false

// Fallback images by category (free Unsplash, no attribution required)
const FALLBACK_IMAGES: Record<string, string> = {
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75',
  business:   'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=75',
  health:     'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=75',
  finance:    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=75',
  science:    'https://images.unsplash.com/photo-1532094349884-543559c5f185?w=600&q=75',
  sports:     'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=75',
  media:      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=75',
  default:    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=75',
}

function getPostImage(post: SitePost): string {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((m) => typeof m?.url === 'string' && m.url)?.url
  if (mediaUrl) return mediaUrl
  const c = post.content && typeof post.content === 'object' ? (post.content as any) : {}
  if (Array.isArray(c.images) && typeof c.images[0] === 'string') return c.images[0]
  if (typeof c.logo === 'string' && c.logo) return c.logo
  const cat = (typeof c.category === 'string' ? c.category : post.tags?.[0] || '').toLowerCase()
  return FALLBACK_IMAGES[cat] ?? FALLBACK_IMAGES.default
}

function getCategory(post: SitePost): string {
  const c = post.content && typeof post.content === 'object' ? (post.content as any) : {}
  if (typeof c.category === 'string' && c.category.trim()) return c.category.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution' && t !== 'article')
  return typeof tag === 'string' ? tag : 'Press Release'
}

function formatDate(date?: string | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Featured hero card (wide, top of page) ────────────────────────────────────
function HeroCard({ post }: { post: SitePost }) {
  return (
    <Link
      href={`/updates/${post.slug}`}
      className="group relative flex h-[340px] w-full overflow-hidden rounded-xl sm:h-[400px]"
    >
      <img
        src={getPostImage(post)}
        alt={post.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative mt-auto p-6 text-white">
        <span className="inline-block rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
          {getCategory(post)}
        </span>
        <h2 className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">{post.title}</h2>
        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">{post.summary}</p>
        )}
        <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
          {post.authorName && <span className="flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" />{post.authorName}</span>}
          {post.publishedAt && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.publishedAt)}</span>}
        </div>
      </div>
    </Link>
  )
}

// ── Standard grid card ────────────────────────────────────────────────────────
function PostCard({ post }: { post: SitePost }) {
  return (
    <Link
      href={`/updates/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-md"
    >
      <div className="relative h-44 overflow-hidden bg-neutral-100">
        <img
          src={getPostImage(post)}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#1a1f36] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          {getCategory(post)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-neutral-900 group-hover:text-[#1a1f36] transition-colors">
          {post.title}
        </h3>
        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">{post.summary}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-neutral-400">
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.authorName && (
            <span className="flex items-center gap-1 max-w-[140px] truncate">
              <Globe2 className="h-3.5 w-3.5 shrink-0" />
              {post.authorName}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── Compact list row (sidebar trending) ──────────────────────────────────────
function TrendingItem({ post, index }: { post: SitePost; index: number }) {
  return (
    <Link
      href={`/updates/${post.slug}`}
      className="group flex items-start gap-3 border-b border-neutral-100 py-3 last:border-b-0"
    >
      <span className="mt-0.5 w-6 shrink-0 text-xl font-black leading-none text-neutral-200">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          {getCategory(post)}
        </span>
        <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-neutral-800 group-hover:text-[#1a1f36] transition-colors">
          {post.title}
        </p>
        {post.publishedAt && (
          <p className="mt-1 text-xs text-neutral-400">{formatDate(post.publishedAt)}</p>
        )}
      </div>
    </Link>
  )
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 20, { fresh: true })

  const hero = posts[0]
  const topGrid = posts.slice(1, 7)    // 6 cards — first grid
  const trending = posts.slice(1, 6)   // 5 items — sidebar
  const moreGrid = posts.slice(7, 13)  // 6 cards — second grid

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <NavbarShell />

      <main>
        {/* ── Hero card ──────────────────────────────────────────────────── */}
        {hero && (
          <section className="px-4 pt-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <HeroCard post={hero} />
            </div>
          </section>
        )}

        {/* ── Latest releases grid + sidebar ─────────────────────────────── */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">

              {/* Grid */}
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-base font-bold uppercase tracking-[0.12em] text-neutral-900">
                    Latest Press Releases
                  </h2>
                  <Link
                    href="/updates"
                    className="flex items-center gap-1 text-sm font-semibold text-[#1a1f36] hover:underline"
                  >
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {topGrid.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-5">
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                    Trending
                  </h3>
                  {trending.map((post, i) => (
                    <TrendingItem key={post.id} post={post} index={i} />
                  ))}
                </div>

                {/* Submit CTA */}
                <div className="rounded-xl bg-[#1a1f36] p-5 text-white">
                  <h3 className="text-sm font-bold">Submit a Press Release</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                    Reach thousands of readers and media professionals worldwide.
                  </p>
                  <Link
                    href="/create/mediaDistribution"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1f36] transition-colors hover:bg-neutral-100"
                  >
                    Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── More releases grid ──────────────────────────────────────────── */}
        {moreGrid.length > 0 && (
          <section className="border-t border-neutral-200 bg-neutral-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-bold uppercase tracking-[0.12em] text-neutral-900">
                  More Releases
                </h2>
                <Link
                  href="/updates"
                  className="flex items-center gap-1 text-sm font-semibold text-[#1a1f36] hover:underline"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {moreGrid.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Newsletter ──────────────────────────────────────────────────── */}
        <section className="border-t border-neutral-200 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-xl font-bold text-neutral-900">Stay in the Loop</h2>
            <p className="mt-1.5 text-sm text-neutral-500">
              Get the latest press releases delivered to your inbox.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
              />
              <button className="rounded-lg bg-[#1a1f36] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d3452]">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
