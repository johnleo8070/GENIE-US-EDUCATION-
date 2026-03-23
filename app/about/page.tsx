import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import {
    BookOpen,
    Calculator,
    Atom,
    Code,
    Music,
    Users,
    CheckCircle2,
    Sparkles,
    Heart,
    ShieldCheck,
    Target,
    Trophy,
    MessageSquare,
    Mail,
    Smartphone
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'About Us | GENIE-US',
    description: 'Welcome to GENIE-US — where learning becomes a magical adventure! Discover our mission, our subjects, and our vision for early childhood education.',
}

const subjects = [
    { name: 'English', icon: BookOpen, color: 'text-pink-500', bgColor: 'bg-pink-100', desc: 'Building reading, phonics, and communication skills.' },
    { name: 'Maths', icon: Calculator, color: 'text-blue-500', bgColor: 'bg-blue-100', desc: 'Developing counting, problem-solving, and logical thinking.' },
    { name: 'Science', icon: Atom, color: 'text-green-500', bgColor: 'bg-green-100', desc: 'Exploring the wonders of the world.' },
    { name: 'Coding', icon: Code, color: 'text-purple-500', bgColor: 'bg-purple-100', desc: 'Introducing basic programming through fun challenges.' },
    { name: 'Music', icon: Music, color: 'text-orange-500', bgColor: 'bg-orange-100', desc: 'Encouraging creativity through rhythm and sound.' },
    { name: 'Public Speaking', icon: MessageSquare, color: 'text-red-500', bgColor: 'bg-red-100', desc: 'Building confidence and clear communication from an early age.' },
]

const whyChooseUs = [
    "Designed specifically for young learners (ages 2–7)",
    "Safe, child-friendly environment",
    "Interactive and engaging learning methods",
    "Balanced focus on education and fun",
    "Easy-to-use platform for both kids and parents"
]

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <NavHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
                {/* Floating background elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200/50 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-100/50 rounded-full blur-3xl animate-float animation-delay-500" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6 drop-shadow-sm animate-slide-up">
                        About <span className="text-[#F97316]">Us</span>
                    </h1>
                    <p className="font-sans text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-100">
                        Welcome to GENIE-US — where learning becomes a magical adventure!
                    </p>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative animate-slide-up">
                            <div className="absolute -inset-4 bg-[#F97316]/10 rounded-[2rem] rotate-3 scale-105" />
                            <div className="absolute -inset-4 bg-blue-100/50 rounded-[2rem] -rotate-3" />
                            <Image
                                src="/images/professor-panda.jpg"
                                alt="Professor Panda"
                                width={500}
                                height={500}
                                className="rounded-2xl shadow-xl relative z-10 hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg z-20 flex items-center gap-3 animate-bounce-gentle">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Sparkles className="text-white w-6 h-6" />
                                </div>
                                <p className="font-bold text-gray-800">Hi, I'm Prof. Panda!</p>
                            </div>
                        </div>

                        <div className="space-y-6 animate-slide-up animation-delay-200">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Our Journey with <span className="text-[#F97316]">Professor Panda</span>
                            </h2>
                            <div className="space-y-4 text-lg text-gray-600 leading-relaxed font-sans">
                                <p>
                                    At GENIE-US, we believe that every child deserves a fun, engaging, and inspiring start to their learning journey. Designed for children aged 2 to 7, our platform combines education with creativity to help young minds grow with confidence.
                                </p>
                                <p>
                                    Guided by our friendly mascot, Professor Panda, children explore a world of knowledge through interactive lessons, playful games, and exciting stories. We make learning simple, enjoyable, and easy to understand, so children stay curious and eager to learn more.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do - Subject Grid */}
            <section className="py-20 px-4 bg-gray-50/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">What We Do</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
                            GENIE-US offers a wide range of subjects and learning experiences designed to help children grow academically and creatively.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subjects.map((subject, index) => (
                            <div
                                key={subject.name}
                                className={`p-8 rounded-3xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group animate-slide-up`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-16 h-16 ${subject.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <subject.icon className={`w-8 h-8 ${subject.color}`} />
                                </div>
                                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{subject.name}</h3>
                                <p className="text-gray-600 font-sans">{subject.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl text-white shadow-lg animate-slide-up animation-delay-500">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold mb-2">Interactive Digital Learning</h3>
                                <p className="text-blue-50 font-sans text-lg">
                                    Combining videos, games, and hands-on activities to create an engaging and immersive learning experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                        <Target className="w-8 h-8 text-[#F97316]" />
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-sans font-medium">
                        Our mission is to make early education exciting, interactive, and accessible for every child. We aim to build a strong foundation in learning while nurturing creativity, confidence, and curiosity.
                    </p>
                </div>
            </section>

            {/* For Parents */}
            <section className="py-20 px-4 bg-[#F97316]/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 space-y-8">
                            <div className="inline-block px-4 py-1.5 bg-white rounded-full text-[#F97316] font-bold text-sm tracking-widest uppercase shadow-sm border border-orange-100">
                                For Parents
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Stay Involved in Your Child's <span className="text-[#F97316]">Development</span>
                            </h2>
                            <p className="text-lg text-gray-600 font-sans leading-relaxed">
                                We understand how important it is for parents to stay involved in their child’s development. That’s why GENIE-US includes a Parent Dashboard where you can:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Track your child's progress",
                                    "Monitor completed lessons and scores",
                                    "Support their learning journey"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700 font-sans font-semibold">
                                        <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 relative">
                            <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl relative z-10 border border-orange-50 overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-[#F97316]/10 rounded-2xl flex items-center justify-center">
                                        <Users className="w-6 h-6 text-[#F97316]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Parent Dashboard</h4>
                                        <p className="text-xs text-gray-400">Total control, total visibility</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[70%] bg-[#F97316] rounded-full" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="h-20 bg-blue-50 rounded-xl" />
                                        <div className="h-20 bg-pink-50 rounded-xl" />
                                        <div className="h-20 bg-green-50 rounded-xl" />
                                    </div>
                                    <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                                        <Heart className="w-12 h-12 text-pink-200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us & Our Vision */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Why Choose Us */}
                        <div className="space-y-8">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b-4 border-yellow-400 inline-block pb-2">
                                Why Choose GENIE-US?
                            </h2>
                            <div className="space-y-4">
                                {whyChooseUs.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <p className="text-gray-700 font-sans font-medium">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Our Vision */}
                        <div className="bg-indigo-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                                    <Trophy className="w-8 h-8 text-yellow-400" />
                                </div>
                                <h2 className="font-display text-4xl font-bold mb-6">Our Vision</h2>
                                <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed font-sans italic">
                                    "We envision a world where learning is not a chore, but an exciting adventure that every child looks forward to — a world where children grow smarter, more confident, and ready for the future."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join the Adventure */}
            <section className="py-24 px-4 text-center overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-50 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex animate-bounce-gentle">
                        <Image
                            src="/images/genie-us-logo.jpg"
                            alt="Logo"
                            width={120}
                            height={120}
                            className="rounded-3xl shadow-lg border-4 border-white"
                        />
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900">
                        Join the <span className="text-[#F97316]">Adventure!</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
                        At GENIE-US, learning is more than just lessons — it’s an experience.
                        Join Professor Panda today and let your child learn, play, and grow in a world designed just for them.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                        <Link
                            href="/auth/sign-up"
                            className="px-10 py-5 bg-[#F97316] text-white rounded-full font-bold text-xl shadow-xl hover:bg-[#EA580C] hover:scale-105 transition-all animate-pop flex items-center justify-center text-center"
                        >
                            Join Today
                        </Link>
                        <Link
                            href="/classroom"
                            className="px-10 py-5 bg-white text-[#F97316] border-2 border-[#F97316] rounded-full font-bold text-xl shadow-md hover:bg-orange-50 transition-all flex items-center justify-center text-center"
                        >
                            Explore Classroom
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 bg-orange-50/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <p className="text-lg text-gray-600 font-sans">Have questions? We're here to help you and your child on this magical journey!</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href="mailto:info@genie-us.education" className="flex items-center gap-6 p-8 bg-white rounded-3xl shadow-sm border border-orange-100 hover:shadow-md hover:scale-[1.02] transition-all group">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                                <Mail className="w-7 h-7 text-[#F97316]" />
                            </div>
                            <div>
                                <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">Email Us</p>
                                <p className="text-xl font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">info@genie-us.education</p>
                            </div>
                        </a>
                        <a href="tel:+2348090585858" className="flex items-center gap-6 p-8 bg-white rounded-3xl shadow-sm border border-green-100 hover:shadow-md hover:scale-[1.02] transition-all group">
                            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                <Smartphone className="w-7 h-7 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-green-400 font-bold uppercase tracking-wider mb-1">Call Us</p>
                                <p className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">+234-809-058-5858</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
