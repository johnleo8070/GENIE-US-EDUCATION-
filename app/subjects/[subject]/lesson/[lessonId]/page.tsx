"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProfessorPanda } from "@/components/professor-panda"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { cn } from "@/lib/utils"
import { getSubjectBySlug, getLesson } from "@/lib/curriculum-data"
import type { Activity, ActivityOption } from "@/lib/curriculum-data"
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Home,
  RotateCcw,
  CheckCircle,
  XCircle,
  Sparkles
} from "lucide-react"

const encouragements = [
  "Amazing job! You got it right!",
  "Wonderful! You're so smart!",
  "Fantastic! Keep going!",
  "You're doing great!",
  "Perfect answer!",
  "Superstar! That's correct!",
]

const tryAgainMessages = [
  "Oops! Try again, you can do it!",
  "Almost! Give it another try!",
  "Not quite, but don't give up!",
  "Let's try one more time!",
]

export default function LessonPage({ params }: { params: Promise<{ subject: string; lessonId: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const subject = getSubjectBySlug(resolvedParams.subject)
  const lesson = getLesson(resolvedParams.subject, resolvedParams.lessonId)

  const [currentActivity, setCurrentActivity] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [sequenceOrder, setSequenceOrder] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [pandaMessage, setPandaMessage] = useState("Let's learn together!")
  const [showCelebration, setShowCelebration] = useState(false)

  const activities = lesson?.activities || []
  const activity = activities[currentActivity]
  const totalActivities = activities.length
  const progress = totalActivities > 0 ? ((currentActivity + 1) / totalActivities) * 100 : 0

  useEffect(() => {
    setSelectedAnswer(null)
    setSequenceOrder([])
    setIsCorrect(null)
  }, [currentActivity])

  if (!subject || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <ProfessorPanda size="lg" mood="thinking" showSpeechBubble message="Hmm, I can't find this lesson..." />
          <Link href="/" className="mt-6 inline-block">
            <Button size="lg" className="rounded-full">Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleTapAnswer = (id: string) => {
    if (isCorrect !== null) return
    setSelectedAnswer(id)
  }

  const handleSequenceTap = (id: string) => {
    if (isCorrect !== null) return
    if (sequenceOrder.includes(id)) {
      setSequenceOrder(sequenceOrder.filter(item => item !== id))
    } else {
      setSequenceOrder([...sequenceOrder, id])
    }
  }

  const checkAnswer = () => {
    if (!activity) return

    if (activity.type === "sequence") {
      const items = activity.items!
      const isSequenceCorrect = sequenceOrder.every((id, index) => {
        const item = items.find(i => i.id === id)
        return item?.correctPosition === index
      }) && sequenceOrder.length === items.length
      
      setIsCorrect(isSequenceCorrect)
      if (isSequenceCorrect) {
        setScore(score + 1)
        setPandaMessage(encouragements[Math.floor(Math.random() * encouragements.length)])
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 1500)
      } else {
        setPandaMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)])
      }
    } else {
      const correctOption = activity.options!.find(opt => opt.correct)
      const correct = selectedAnswer === correctOption?.id
      setIsCorrect(correct)
      if (correct) {
        setScore(score + 1)
        setPandaMessage(encouragements[Math.floor(Math.random() * encouragements.length)])
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 1500)
      } else {
        setPandaMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)])
      }
    }
  }

  const nextActivity = () => {
    if (currentActivity < totalActivities - 1) {
      setCurrentActivity(currentActivity + 1)
      setPandaMessage("Let's try the next one!")
    } else {
      setShowResult(true)
    }
  }

  const restartLesson = () => {
    setCurrentActivity(0)
    setScore(0)
    setShowResult(false)
    setPandaMessage("Let's learn together!")
    setSelectedAnswer(null)
    setSequenceOrder([])
    setIsCorrect(null)
  }

  // Celebration overlay
  const CelebrationOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="relative">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-400 animate-ping"
            style={{
              top: `${Math.random() * 200 - 100}px`,
              left: `${Math.random() * 200 - 100}px`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    </div>
  )

  // Result Screen
  if (showResult) {
    const stars = Math.ceil((score / totalActivities) * 3)
    const isPerfect = score === totalActivities

    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ 
          background: `linear-gradient(135deg, ${subject.gradientFrom}20, ${subject.gradientTo}20)`
        }}
      >
        <div className="bg-card rounded-3xl p-8 shadow-playful-lg max-w-md w-full text-center">
          <div className="mb-6">
            <ProfessorPanda 
              size="lg" 
              mood="excited" 
              showSpeechBubble 
              message={isPerfect ? "Perfect score! You're amazing!" : "Great job! You did it!"}
            />
          </div>
          
          <h1 className="text-3xl font-display font-bold text-card-foreground mb-2">
            Lesson Complete!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{lesson.title}</p>
          
          <div className="mb-6">
            <StarRating earned={stars} total={3} size="lg" animated className="justify-center mb-3" />
            <p className="text-lg text-muted-foreground">
              You got <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{totalActivities}</span> correct!
            </p>
          </div>

          {lesson.rewardBadge && isPerfect && (
            <div className="mb-6 p-4 bg-accent/10 rounded-2xl">
              <p className="text-sm text-muted-foreground mb-1">You earned a badge!</p>
              <p className="text-lg font-display font-bold text-accent">{lesson.rewardBadge}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button 
              size="lg" 
              className="rounded-full font-bold"
              style={{ backgroundColor: subject.color }}
              onClick={() => router.push(`/subjects/${subject.slug}`)}
            >
              Continue Learning
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full font-bold"
              onClick={restartLesson}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showCelebration && <CelebrationOverlay />}

      {/* Header */}
      <header 
        className="py-4 px-4 sticky top-0 z-40"
        style={{ backgroundColor: subject.color }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/subjects/${subject.slug}`}>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div className="flex-1 mx-4">
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-center text-white/80 mt-1">
              Question {currentActivity + 1} of {totalActivities}
            </p>
          </div>

          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-32">
        <div className="max-w-2xl w-full">
          {/* Professor Panda */}
          <div className="flex justify-center mb-6">
            <ProfessorPanda 
              size="md" 
              mood={isCorrect === true ? "excited" : isCorrect === false ? "thinking" : "happy"}
              showSpeechBubble
              message={pandaMessage}
            />
          </div>

          {/* Activity Card */}
          {activity && (
            <div className="bg-card rounded-3xl p-6 md:p-8 shadow-playful mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-display font-bold text-card-foreground">
                  {activity.question}
                </h2>
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Tap Image Activity */}
              {(activity.type === "tap-image" || activity.type === "multiple-choice") && (
                <div className="grid grid-cols-2 gap-4">
                  {activity.options!.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleTapAnswer(option.id)}
                      disabled={isCorrect !== null}
                      className={cn(
                        "p-6 rounded-2xl border-4 transition-all duration-200 flex flex-col items-center gap-2",
                        selectedAnswer === option.id
                          ? isCorrect === true
                            ? "border-accent bg-accent/10"
                            : isCorrect === false
                              ? "border-destructive bg-destructive/10"
                              : "border-primary bg-primary/10"
                          : "border-transparent bg-muted hover:border-primary/50 hover:scale-105",
                        isCorrect !== null && option.correct && "border-accent bg-accent/10"
                      )}
                    >
                      {option.image && <span className="text-5xl">{option.image}</span>}
                      <span className={cn(
                        "font-display font-bold text-card-foreground",
                        option.image ? "text-base" : "text-3xl"
                      )}>
                        {option.label}
                      </span>
                      {isCorrect !== null && selectedAnswer === option.id && (
                        isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-accent" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Sequence Activity */}
              {activity.type === "sequence" && (
                <div>
                  <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    {sequenceOrder.map((id, index) => {
                      const item = activity.items!.find(i => i.id === id)
                      return (
                        <div
                          key={`selected-${index}`}
                          className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold text-white"
                          style={{ backgroundColor: subject.color }}
                        >
                          {item?.label}
                        </div>
                      )
                    })}
                    {Array.from({ length: activity.items!.length - sequenceOrder.length }).map((_, i) => (
                      <div
                        key={`placeholder-${i}`}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-4 border-dashed border-muted-foreground/30"
                      />
                    ))}
                  </div>
                  <div className="flex justify-center gap-3 flex-wrap">
                    {activity.items!.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSequenceTap(item.id)}
                        disabled={isCorrect !== null}
                        className={cn(
                          "w-14 h-14 md:w-16 md:h-16 rounded-2xl border-4 transition-all duration-200 text-xl md:text-2xl font-bold",
                          sequenceOrder.includes(item.id)
                            ? "border-primary/30 bg-muted/50 text-muted-foreground"
                            : "border-transparent bg-secondary text-secondary-foreground hover:border-primary hover:scale-105"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex justify-center gap-4">
          {isCorrect === null ? (
            <Button 
              size="lg"
              className="rounded-full px-12 font-bold text-white"
              style={{ backgroundColor: subject.color }}
              onClick={checkAnswer}
              disabled={
                activity?.type === "sequence" 
                  ? sequenceOrder.length !== activity.items!.length 
                  : !selectedAnswer
              }
            >
              Check Answer
            </Button>
          ) : (
            <Button 
              size="lg"
              className="rounded-full px-12 font-bold text-white"
              style={{ backgroundColor: subject.color }}
              onClick={nextActivity}
            >
              {currentActivity < totalActivities - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                "See Results"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
