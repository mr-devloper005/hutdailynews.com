import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  { 
    title: "Press Release Distribution", 
    body: "Users agree to distribute only legitimate press releases and news content. All submissions must be factual and newsworthy."
  },
  {
    title: "Content Guidelines",
    body: "All press releases must be professional, accurate, and comply with journalistic standards. No misleading or false information allowed."
  },
  {
    title: "Media Relations",
    body: "Users must not engage in spam, harassment, or unethical media practices. Professional conduct is required at all times."
  },
  {
    title: "Account Security",
    body: "Users are responsible for maintaining account security and protecting login credentials. Hutdaily News is not liable for unauthorized access."
  },
  {
    title: "Payment Terms",
    body: "All distribution services must be paid for in advance. Refunds available within 30 days for unused services."
  },
  {
    title: "Limitation of Liability",
    body: "Hutdaily News provides distribution platform only. We are not responsible for content accuracy or media coverage results."
  },
  {
    title: "Service Modifications",
    body: "We reserve the right to modify or discontinue services with notice. Continued use constitutes acceptance of changes."
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarShell />
      
      <main>
        {/* Hero Section */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl mb-6">
              Terms of <span className="text-blue-600">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The rules and guidelines for using Hutdaily News press release distribution platform.
            </p>
          </div>
        </section>

        {/* Terms Content */}
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
  );
}
