import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowRight, Users, Target, Zap, MapPin } from "lucide-react";

const highlights = [
  { label: "Media Outlets", value: "5,000+" },
  { label: "Monthly Readers", value: "10M+" },
  { label: "Success Rate", value: "98%" },
];

const values = [
  { 
    title: "Trusted Distribution", 
    description: "We connect your press releases with thousands of verified media outlets and journalists worldwide.",
    icon: Target
  },
  { 
    title: "Real Results", 
    description: "Our proven track record shows 98% success rate in getting press releases published and covered.",
    icon: Zap
  },
  { 
    title: "Expert Support", 
    description: "Our dedicated team provides 24/7 support to ensure your press releases reach the right audience.",
    icon: Users
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Jennifer Davis",
    role: "CEO & Founder",
    bio: "Former PR executive with 15+ years of media relations experience.",
    location: "New York, NY",
    initials: "JD"
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Head of Operations",
    bio: "Expert in media distribution and press release optimization.",
    location: "San Francisco, CA",
    initials: "MR"
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Director of Media Relations",
    bio: "Specializes in building lasting relationships with media professionals.",
    location: "Chicago, IL",
    initials: "SC"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarShell />
      
      <main>
        {/* Hero Section */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl mb-6">
              About <span className="text-blue-600">Hutdaily News</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Your trusted partner for professional press release distribution and media relations. 
              We help businesses and organizations share their stories with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                href="/updates" 
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Press Releases
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
            </div>
            
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item, index) => {
                const colors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600']
                return (
                  <div key={item.label} className="text-center">
                    <div className={`w-20 h-20 ${colors[index]} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <span className="text-3xl font-bold">{item.value}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                    <p className="text-gray-600 font-medium">{item.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] bg-blue-100 text-blue-600 border border-blue-200 mb-6">
                  Our Story
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  A single home for press release distribution and media relations.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Hutdaily News brings together press release distribution, media relations, and analytics so businesses can 
                  reach their audience effectively and track their impact in real-time.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded with the mission to democratize media access, we've helped thousands of organizations 
                  share their stories with millions of readers worldwide.
                </p>
              </div>
              <div className="grid gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon
                  const iconColors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600']
                  return (
                    <div key={value.title} className="bg-white p-6 rounded-xl shadow-lg">
                      <div className={`w-12 h-12 ${iconColors[index]} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">The experts behind your press release success</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600">{member.initials}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{member.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
