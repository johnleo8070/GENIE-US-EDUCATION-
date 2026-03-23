import type { Metadata } from 'next'
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import {
    ShieldCheck,
    Lock,
    UserPlus,
    Baby,
    Activity,
    Eye,
    Share2,
    Save,
    Settings,
    FileText,
    Mail,
    Globe,
    CheckCircle,
    Clock,
    Smartphone
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Privacy Policy | GENIE-US',
    description: 'Learn how GENIE-US protects your privacy and your child\'s information. We are committed to a safe and secure e-learning experience.',
}

const sections = [
    {
        id: 1,
        title: "1. Introduction",
        icon: ShieldCheck,
        content: "GENIE-US is an e-learning platform designed for children aged 2–7. We are committed to creating a safe, secure, and child-friendly environment for learning. By using GENIE-US, you agree to the terms outlined in this Privacy Policy."
    },
    {
        id: 2,
        title: "2. Information We Collect",
        icon: UserPlus,
        subsections: [
            {
                subtitle: "a. Parent/Guardian Information",
                items: ["Name", "Email address", "Login credentials", "Payment information (processed securely via third-party providers)"]
            },
            {
                subtitle: "b. Child Information",
                items: ["Child’s name or nickname", "Age or age range", "Learning progress and activity data"],
                warning: "We do not require sensitive personal information from children."
            },
            {
                subtitle: "c. Usage Data",
                items: ["Device information", "Browser type", "Interaction with lessons and features", "Progress and performance data"]
            }
        ]
    },
    {
        id: 3,
        title: "3. How We Use Information",
        icon: Activity,
        items: [
            "Provide access to the platform",
            "Personalize learning experiences",
            "Track progress and performance",
            "Improve our content and services",
            "Communicate with parents",
            "Process payments securely"
        ]
    },
    {
        id: 4,
        title: "4. Child Privacy Protection",
        icon: Baby,
        items: [
            "Child accounts can only be created by parents or guardians",
            "We collect minimal information necessary for learning",
            "We do not allow children to publicly share personal information",
            "We do not knowingly collect sensitive personal data from children"
        ]
    },
    {
        id: 5,
        title: "5. Sharing of Information",
        icon: Share2,
        content: "We do not sell or rent personal information. We may share data only with trusted third-party service providers (e.g., hosting, payments) and legal authorities if required by law. All third parties are required to protect your data."
    },
    {
        id: 6,
        title: "6. Data Security",
        icon: Lock,
        content: "We take appropriate measures to protect your information, including secure servers, encryption where applicable, and restricted access to sensitive data. However, no system is 100% secure, and we cannot guarantee absolute security."
    },
    {
        id: 7,
        title: "7. Cookies and Tracking",
        icon: Eye,
        content: "GENIE-US may use cookies to improve user experience, remember preferences, and analyze platform usage. You can control cookies through your browser settings."
    },
    {
        id: 8,
        title: "8. Parental Rights",
        icon: Settings,
        items: [
            "Access their child’s information",
            "Request corrections",
            "Request deletion of their child’s account and data",
            "Control how their child uses the platform"
        ],
        footer: "To make a request, contact us at the email below."
    },
    {
        id: 9,
        title: "9. Data Retention",
        icon: Save,
        content: "We retain information only as long as necessary to provide services, comply with legal obligations, and improve user experience."
    },
    {
        id: 10,
        title: "10. Third-Party Services",
        icon: Globe,
        content: "We may use third-party services such as payment processors, hosting providers, and analytics tools. These services have their own privacy policies."
    },
    {
        id: 11,
        title: "11. Changes to This Policy",
        icon: FileText,
        content: "We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date."
    },
    {
        id: 12,
        title: "12. Contact Us",
        icon: Mail,
        footer: "If you have questions or concerns about this Privacy Policy, please contact us:",
        contact: {
            email: "info@genie-us.education",
            phone: "+234-809-058-5858",
            website: "https://genie-us.education"
        }
    },
    {
        id: 13,
        title: "13. Consent",
        icon: CheckCircle,
        content: "By using GENIE-US, you consent to this Privacy Policy."
    }
]

export default function PrivacyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <NavHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
                <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/50 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#F97316]/10 rounded-full blur-3xl animate-float animation-delay-500" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider mb-6 animate-slide-up">
                        <ShieldCheck className="w-4 h-4" />
                        Security First
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up animation-delay-100">
                        Privacy <span className="text-blue-500">Policy</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-500 font-sans mb-8 animate-slide-up animation-delay-200">
                        <Clock className="w-4 h-4" />
                        <span>Last Updated: {lastUpdated}</span>
                    </div>
                    <p className="font-sans text-xl text-gray-600 leading-relaxed animate-slide-up animation-delay-300">
                        Your privacy—and especially your child’s privacy—is extremely important to us.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-slide-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <section.icon className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div className="space-y-4 w-full">
                                        <h2 className="font-display text-2xl font-bold text-gray-900">
                                            {section.title}
                                        </h2>

                                        {section.content && (
                                            <p className="text-gray-600 leading-relaxed font-sans text-lg">
                                                {section.content}
                                            </p>
                                        )}

                                        {section.subsections && section.subsections.map((sub, i) => (
                                            <div key={i} className="space-y-3 mt-4">
                                                <h3 className="font-bold text-gray-800 text-lg">{sub.subtitle}</h3>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {sub.items.map((item, j) => (
                                                        <li key={j} className="flex items-center gap-2 text-gray-600 text-base font-sans">
                                                            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                                {sub.warning && (
                                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3 mt-4">
                                                        <span className="text-amber-500 text-xl">⚠️</span>
                                                        <p className="text-sm text-amber-900 font-medium font-sans">{sub.warning}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {section.items && (
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {section.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600 text-base font-sans p-3 bg-gray-50 rounded-xl">
                                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.contact && (
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                                <a href={`mailto:${section.contact.email}`} className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 group transition-colors hover:bg-blue-100">
                                                    <Mail className="w-5 h-5 text-blue-600" />
                                                    <div>
                                                        <p className="text-xs text-blue-400 font-bold uppercase">Email</p>
                                                        <p className="text-blue-900 font-bold text-sm truncate">{section.contact.email}</p>
                                                    </div>
                                                </a>
                                                <a href={`tel:${section.contact.phone}`} className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100 group transition-colors hover:bg-green-100">
                                                    <Smartphone className="w-5 h-5 text-green-600" />
                                                    <div>
                                                        <p className="text-xs text-green-400 font-bold uppercase">Phone</p>
                                                        <p className="text-green-900 font-bold text-sm truncate">{section.contact.phone}</p>
                                                    </div>
                                                </a>
                                                <a href={section.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-100">
                                                    <Globe className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 font-bold uppercase">Website</p>
                                                        <p className="text-gray-900 font-bold text-sm truncate">{section.contact.website.replace('https://', '')}</p>
                                                    </div>
                                                </a>
                                            </div>
                                        )}

                                        {section.footer && (
                                            <p className="text-gray-500 font-sans italic pt-4">
                                                {section.footer}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safe Environment Badge */}
            <section className="py-20 px-4 bg-blue-600 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 animate-bounce-gentle">
                        <ShieldCheck className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="font-display text-4xl font-bold text-white mb-6">A Safe World for Your Child</h2>
                    <p className="text-xl text-blue-100 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
                        We are dedicated to maintaining the highest standards of child safety and data protection.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 text-white text-sm font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> COPPA Compliant
                        </div>
                        <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 text-white text-sm font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> GDPR Ready
                        </div>
                        <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 text-white text-sm font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Secure SSL
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
