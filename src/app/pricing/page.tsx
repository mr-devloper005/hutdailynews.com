import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Globe2, ShieldCheck, Users, Zap, BarChart3, Mail, Phone, HelpCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Pricing Plans - Hutdaily News',
    description: 'Choose the perfect pricing plan for your press release distribution needs. Get maximum media reach with our affordable packages.',
    keywords: ['pricing', 'press release distribution', 'media plans', 'affordable PR'],
  })
}

const pricingPlans = [
  {
    name: 'Basic',
    price: '$99',
    period: 'per release',
    description: 'Perfect for small businesses and startups',
    features: [
      'Basic press release distribution',
      'Up to 500 media outlets',
      'Standard analytics report',
      '24-hour review time',
      'Email support',
      '7-day media monitoring',
    ],
    notIncluded: [
      'Priority distribution',
      'Advanced analytics',
      'Social media promotion',
      'Custom media targeting',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$299',
    period: 'per release',
    description: 'Ideal for growing companies and marketing teams',
    features: [
      'Enhanced press release distribution',
      'Up to 2,000 media outlets',
      'Advanced analytics dashboard',
      '12-hour review time',
      'Priority email & phone support',
      '30-day media monitoring',
      'Social media promotion',
      'Custom media targeting',
      'SEO optimization',
    ],
    notIncluded: [
      'Dedicated account manager',
      'White-label options',
      'API access',
    ],
    popular: true,
    cta: 'Choose Pro',
  },
  {
    name: 'Premium',
    price: '$599',
    period: 'per release',
    description: 'Complete solution for enterprises and agencies',
    features: [
      'Premium press release distribution',
      'Up to 5,000+ media outlets',
      'Comprehensive analytics suite',
      '6-hour express review',
      'Dedicated account manager',
      '90-day media monitoring',
      'Full social media campaign',
      'Advanced media targeting',
      'Premium SEO optimization',
      'White-label options',
      'API access',
      'Custom reporting',
    ],
    notIncluded: [],
    popular: false,
    cta: 'Go Premium',
  },
]

const addOns = [
  {
    name: 'Media Kit Enhancement',
    price: '$149',
    description: 'Professional media kit creation with high-quality visuals and brand assets',
    icon: Globe2,
  },
  {
    name: 'Translation Services',
    price: '$199',
    description: 'Professional translation of your press release into multiple languages',
    icon: Users,
  },
  {
    name: 'Video Production',
    price: '$399',
    description: 'Professional video content to accompany your press release',
    icon: Zap,
  },
]

const faqs = [
  {
    question: 'What is included in the media distribution?',
    answer: 'Our distribution includes access to our extensive network of journalists, media outlets, news websites, bloggers, and industry influencers. The exact number varies by plan, with Premium offering the widest reach.',
  },
  {
    question: 'How long does it take for my press release to be distributed?',
    answer: 'Review times vary by plan: Basic (24 hours), Pro (12 hours), and Premium (6 hours). Once approved, distribution typically begins within 2-4 hours.',
  },
  {
    question: 'Can I target specific industries or regions?',
    answer: 'Yes! Pro and Premium plans include custom media targeting options, allowing you to focus on specific industries, geographic regions, or types of media outlets.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee for new customers. If you\'re not satisfied with our service, contact our support team within 14 days of your purchase.',
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle, and we\'ll prorate any differences.',
  },
  {
    question: 'What kind of analytics do you provide?',
    answer: 'Our analytics include pickup tracking, audience reach, engagement metrics, social media shares, and comprehensive performance reports. Premium plans offer real-time dashboards and custom reporting.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      
      <main>
        {/* Hero Section */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 bg-gradient-to-br from-[#DACC96]/20 to-white">
          <div className="mx-auto max-w-7xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] bg-[#632626]/10 text-[#632626] border border-[#632626]/20">
              <BarChart3 className="h-4 w-4" />
              Pricing Plans
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-[-0.06em] text-[#632626] sm:text-5xl lg:text-6xl">
              Choose Your Perfect Plan
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-[#6e5547]">
              Transparent pricing with no hidden fees. Get maximum media reach with our affordable press release distribution packages.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border bg-white p-8 shadow-lg transition-all hover:shadow-xl ${
                    plan.popular
                      ? 'border-[#632626] ring-2 ring-[#632626]/20 scale-105'
                      : 'border-[#632626]/10 hover:border-[#632626]/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-[#632626] px-4 py-1 text-sm font-semibold text-white">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#632626]">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-[#632626]">{plan.price}</span>
                      <span className="text-[#6e5547]">/{plan.period}</span>
                    </div>
                    <p className="mt-4 text-[#6e5547]">{plan.description}</p>
                  </div>

                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#632626] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#1a1a1a]">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-50">
                        <div className="h-5 w-5 border-2 border-[#6e5547] rounded-full flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6e5547] line-through">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={plan.popular ? '/contact' : '/signup'}
                    className={`mt-8 block w-full rounded-full px-6 py-3 text-center font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-[#632626] text-white hover:bg-[#9D5353]'
                        : 'border border-[#632626] text-[#632626] hover:bg-[#632626] hover:text-white'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 inline-block h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 bg-[#DACC96]/10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#632626]">Enhance Your Release</h2>
              <p className="mt-2 text-[#6e5547]">Add these services to maximize your press release impact</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {addOns.map((addon) => {
                const Icon = addon.icon
                return (
                  <div key={addon.name} className="rounded-xl border border-[#632626]/10 bg-white p-6 shadow-md">
                    <div className="w-12 h-12 bg-[#632626]/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-[#632626]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#632626] mb-2">{addon.name}</h3>
                    <p className="text-2xl font-bold text-[#632626] mb-3">{addon.price}</p>
                    <p className="text-sm text-[#6e5547]">{addon.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#632626]">Frequently Asked Questions</h2>
              <p className="mt-2 text-[#6e5547]">Everything you need to know about our pricing and services</p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-[#632626]/10 rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-5 w-5 text-[#632626] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#632626] mb-2">{faq.question}</h3>
                      <p className="text-[#6e5547] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 bg-[#632626] text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-[-0.04em] mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-white/90">
              Have questions about our pricing? Need a custom solution for your enterprise?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-white text-[#632626] font-semibold hover:bg-[#DACC96] transition-colors"
              >
                <Phone className="h-4 w-4" />
                Contact Sales
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-white text-white font-semibold hover:bg-white hover:text-[#632626] transition-colors"
              >
                <Mail className="h-4 w-4" />
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
