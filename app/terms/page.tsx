import type { Metadata } from 'next'
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import {
    FileText,
    Info,
    UserCheck,
    Users,
    Baby,
    ShieldAlert,
    CreditCard,
    Copyright,
    Lock,
    Ban,
    Scale,
    RefreshCw,
    Mail,
    CheckSquare,
    Clock,
    Smartphone,
    Globe
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Terms of Service | GENIE-US',
    description: 'Understand the rules and expectations for using the GENIE-US e-learning platform. Your guide to a safe and fun educational experience.',
}

const termsSections = [
    {
        id: 1,
        title: "1. About GENIE-US",
        icon: Info,
        content: "GENIE-US is an e-learning platform designed for children aged 2–7, offering interactive lessons, videos, games, and educational content across subjects such as English, Maths, Science, Coding, and Music."
    },
    {
        id: 2,
        title: "2. Eligibility",
        icon: UserCheck,
        items: [
            "GENIE-US is intended for use by parents/guardians and their children.",
            "Parents or legal guardians must create and manage accounts for children.",
            "By using the platform, you confirm that you are at least 18 years old or a parent/guardian providing consent."
        ]
    },
    {
        id: 3,
        title: "3. Account Registration",
        icon: Users,
        items: [
            "Parents are responsible for creating and managing child accounts.",
            "You agree to provide accurate and complete information.",
            "You are responsible for maintaining the confidentiality of login credentials.",
            "GENIE-US is not responsible for unauthorized access due to misuse of credentials."
        ]
    },
    {
        id: 4,
        title: "4. Child Accounts",
        icon: Baby,
        items: [
            "Child accounts can only be created by a parent or guardian.",
            "Parents are responsible for monitoring their child’s use of the platform.",
            "Children should not create accounts independently."
        ]
    },
    {
        id: 5,
        title: "5. Use of the Platform",
        icon: ShieldAlert,
        content: "You agree to use GENIE-US only for lawful purposes and in a way that does not:",
        subItems: [
            "Harm, exploit, or misuse children or other users",
            "Disrupt or interfere with the platform",
            "Attempt to gain unauthorized access to systems or data",
            "Upload harmful or malicious content"
        ]
    },
    {
        id: 6,
        title: "6. Subscription & Payments",
        icon: CreditCard,
        items: [
            "Some features may require a subscription or payment.",
            "Payments are processed securely through third-party providers.",
            "Free trials may be offered and can convert to paid plans if not canceled.",
            "All fees are non-refundable unless otherwise stated."
        ]
    },
    {
        id: 7,
        title: "7. Intellectual Property",
        icon: Copyright,
        items: [
            "All content on GENIE-US, including videos, graphics, characters (such as Professor Panda), and learning materials, is owned by or licensed to GENIE-US.",
            "You may not copy, distribute, or reproduce any content without permission."
        ]
    },
    {
        id: 8,
        title: "8. Privacy",
        icon: Lock,
        content: "We are committed to protecting your privacy and your child’s data. Please review our Privacy Policy for details on how we collect and use information."
    },
    {
        id: 9,
        title: "9. Termination",
        icon: Ban,
        content: "We reserve the right to suspend or terminate accounts if Terms are violated, there is misuse, or fraudulent/harmful activity is detected."
    },
    {
        id: 10,
        title: "10. Limitation of Liability",
        icon: Scale,
        content: "GENIE-US is provided “as is” without warranties of any kind. We are not liable for:",
        subItems: [
            "Interruptions or errors in the platform",
            "Loss of data",
            "Any indirect or consequential damages"
        ]
    },
    {
        id: 11,
        title: "11. Changes to Terms",
        icon: RefreshCw,
        content: "We may update these Terms from time to time. Continued use of the platform after changes means you accept the updated Terms."
    },
    {
        id: 12,
        title: "12. Governing Law",
        icon: Scale,
        content: "These Terms are governed by the laws of your jurisdiction."
    },
    {
        id: 13,
        title: "13. Contact Us",
        icon: Mail,
        content: "If you have any questions about these Terms, please contact us:",
        contact: {
            email: "info@genie-us.education",
            phone: "+234-809-058-5858",
            website: "https://genie-us.education"
        }
    },
    {
        id: 14,
        title: "14. Acceptance",
        icon: CheckSquare,
        content: "By using GENIE-US, you confirm that you have read, understood, and agreed to these Terms of Service."
    }
]

export default function TermsPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <NavHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 bg-gradient-to-b from-yellow-50 to-white overflow-hidden text-center">
                <div className="absolute top-20 right-10 w-24 h-24 bg-orange-200/50 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-200/50 rounded-full blur-3xl animate-float animation-delay-700" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6 animate-slide-up">
                        <FileText className="w-4 h-4" />
                        Legal Agreement
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up animation-delay-100">
                        Terms of <span className="text-[#F97316]">Service</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-500 font-sans mb-8 animate-slide-up animation-delay-200">
                        <Clock className="w-4 h-4" />
                        <span>Last Updated: {lastUpdated}</span>
                    </div>
                    <p className="font-sans text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto animate-slide-up animation-delay-300">
                        Welcome to GENIE-US. These Terms of Service govern your use of our platform and ensure a safe, fun, and fair experience for everyone.
                    </p>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 gap-8">
                        {termsSections.map((section, index) => (
                            <div
                                key={section.id}
                                className="group p-8 md:p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 animate-slide-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <section.icon className="w-7 h-7 text-[#F97316]" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="font-display text-2xl font-bold text-gray-900">
                                            {section.title}
                                        </h2>

                                        {section.content && (
                                            <p className="text-gray-600 leading-relaxed font-sans text-lg">
                                                {section.content}
                                            </p>
                                        )}

                                        {section.items && (
                                            <ul className="space-y-4">
                                                {section.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600 text-base font-sans">
                                                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                                                            <CheckSquare className="w-3.5 h-3.5 text-green-600" />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.subItems && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                                {section.subItems.map((item, i) => (
                                                    <div key={i} className="p-4 bg-gray-50 rounded-2xl text-gray-600 font-sans border border-transparent hover:border-gray-200 transition-colors">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {section.contact && (
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                                <a href={`mailto:${section.contact.email}`} className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100 group transition-colors hover:bg-orange-100">
                                                    <Mail className="w-5 h-5 text-[#F97316]" />
                                                    <div>
                                                        <p className="text-xs text-orange-400 font-bold uppercase tracking-tight">Email</p>
                                                        <p className="text-orange-900 font-bold text-sm truncate">{section.contact.email}</p>
                                                    </div>
                                                </a>
                                                <a href={`tel:${section.contact.phone.replace(/ /g, '')}`} className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100 group transition-colors hover:bg-green-100">
                                                    <Smartphone className="w-5 h-5 text-green-600" />
                                                    <div>
                                                        <p className="text-xs text-green-400 font-bold uppercase tracking-tight">Phone</p>
                                                        <p className="text-green-900 font-bold text-sm truncate">{section.contact.phone}</p>
                                                    </div>
                                                </a>
                                                <a href={section.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group transition-colors hover:bg-gray-100">
                                                    <Globe className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Website</p>
                                                        <p className="text-gray-900 font-bold text-sm truncate">{section.contact.website.replace('https://', '')}</p>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Acceptance Footer */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#F97316] to-orange-600 p-1 rounded-[3rem] shadow-2xl animate-pop">
                    <div className="bg-white p-10 md:p-14 rounded-[2.8rem]">
                        <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Ready to Start?</h2>
                        <p className="text-gray-600 font-sans text-lg mb-8">
                            By using GENIE-US, you agree to these Terms. Let’s make learning a magical adventure together!
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-[#F97316] text-white rounded-full font-bold shadow-lg hover:bg-orange-700 transition-all hover:scale-105 active:scale-95">
                                I Understand & Accept
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
