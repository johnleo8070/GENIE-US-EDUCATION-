"use client"

import { Button } from "@/components/ui/button"
import { Check, Star, Crown, Users } from "lucide-react"
import Image from "next/image"

const plans = [
  {
    name: "Free Explorer",
    price: "$0",
    period: "forever",
    description: "Try the platform before paying",
    icon: Star,
    color: "from-blue-400 to-cyan-400",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    features: [
      "1 toy story per day",
      "1 learning game per subject",
      "Limited rewards",
      "Basic progress view"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Panda Premium",
    price: "$10.99",
    period: "/month",
    description: "Full access to all learning adventures",
    icon: Crown,
    color: "from-orange-400 to-amber-400",
    borderColor: "border-orange-300",
    bgColor: "bg-orange-50",
    features: [
      "Unlimited toy stories",
      "All learning worlds",
      "All coding, maths, English & music games",
      "Progress tracking",
      "Rewards & badges",
      "Multiple child profiles"
    ],
    cta: "Get Premium",
    popular: true
  },
  {
    name: "Panda Family",
    price: "$69",
    period: "/year",
    description: "Best value for families",
    icon: Users,
    color: "from-purple-400 to-pink-400",
    borderColor: "border-purple-300",
    bgColor: "bg-purple-50",
    badge: "Save 40%",
    features: [
      "Everything in Premium",
      "Up to 4 kids",
      "Parent progress dashboard",
      "Family rewards",
      "Priority support",
      "Offline downloads"
    ],
    cta: "Choose Family",
    popular: false
  }
]

export function PricingSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Learning Adventure</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade anytime. Learning is magic with GENIE-US!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  plan.popular 
                    ? "bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 shadow-xl scale-105 z-10" 
                    : `bg-white border-2 ${plan.borderColor} shadow-lg`
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Save badge */}
                {plan.badge && (
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Plan name */}
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl lg:text-5xl font-display font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-lg">
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  className={`w-full h-14 text-lg font-bold rounded-2xl transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-white border-2 border-current text-foreground hover:bg-gray-50"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            )
          })}
        </div>

        {/* Professor Panda endorsement */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-blue-100">
          <Image
            src="/images/professor-panda.jpg"
            alt="Professor Panda"
            width={150}
            height={150}
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] object-contain drop-shadow-lg"
          />
          <div className="text-center md:text-left">
            <p className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
              &ldquo;Learning is Magic with GENIE-US!&rdquo;
            </p>
            <p className="text-muted-foreground">
              Join thousands of happy families already learning with Professor Panda. 
              Cancel anytime, no questions asked.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Safe & secure payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>7-day money back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
