import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";

const sections = [
  { 
    title: 'Information We Collect', 
    body: 'We collect account information, press release content, usage analytics, and contact details necessary for distribution services.'
  },
  { 
    title: 'How We Use Your Information', 
    body: 'To distribute press releases, provide analytics, improve platform performance, and communicate with media outlets on your behalf.'
  },
  { 
    title: 'Data Protection', 
    body: 'We implement industry-standard security measures to protect your press releases and account information from unauthorized access.'
  },
  { 
    title: 'Third-Party Sharing', 
    body: 'Your press releases are shared with verified media outlets and journalists. We never sell your personal information to third parties.'
  },
  { 
    title: 'Your Rights and Choices', 
    body: 'You can access, update, or delete your account and press releases at any time. You can also opt-out of certain communications.'
  },
  { 
    title: 'Contact Information', 
    body: 'For privacy questions or concerns, contact our privacy team at privacy@hutdailynews.com. We respond within 48 hours.'
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarShell />
      
      <main>
        {/* Hero Section */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl mb-6">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              How we collect, use, and protect your information on Hutdaily News.
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500">Last updated: April 29, 2026</p>
            </div>
            
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={section.title} className="bg-gray-50 rounded-xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {index + 1}. {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
