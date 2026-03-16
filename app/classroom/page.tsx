"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { cn } from "@/lib/utils"
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

// Enhanced lesson data with more question types
const lessonData = {
  title: "The Missing Letter Mystery",
  subject: "english",
  totalQuestions: 8,
  questions: [
    {
      type: "tap-image",
      question: "Which animal says 'Moo'?",
      options: [
        { id: "cow", label: "Cow", image: "/api/placeholder/100/100", emoji: "🐄", correct: true },
        { id: "dog", label: "Dog", image: "/api/placeholder/100/100", emoji: "🐕", correct: false },
        { id: "cat", label: "Cat", image: "/api/placeholder/100/100", emoji: "🐱", correct: false },
        { id: "bird", label: "Bird", image: "/api/placeholder/100/100", emoji: "🐦", correct: false },
      ]
    },
    {
      type: "multiple-choice",
      question: "What letter is missing? C _ T",
      options: [
        { id: "a", label: "A", correct: true },
        { id: "o", label: "O", correct: false },
        { id: "u", label: "U", correct: false },
        { id: "i", label: "I", correct: false },
      ]
    },
    {
      type: "drag-and-drop",
      question: "Drag the letters to spell 'CAT'",
      targetSlots: ["C", "A", "T"],
      draggableItems: [
        { id: "T", label: "T" },
        { id: "A", label: "A" },
        { id: "C", label: "C" },
      ]
    },
    {
      type: "sequence",
      question: "Put the numbers in order: smallest to biggest",
      items: [
        { id: "3", label: "3", correctPosition: 2 },
        { id: "1", label: "1", correctPosition: 0 },
        { id: "2", label: "2", correctPosition: 1 },
      ]
    },
    {
      type: "coding-blocks",
      question: "Help the robot get to the star! Arrange the commands.",
      gridSize: { rows: 3, cols: 4 },
      robotStart: { row: 1, col: 0 },
      starPosition: { row: 1, col: 3 },
      availableCommands: [
        { id: "right1", command: "moveRight", label: "Move Right", icon: "→" },
        { id: "right2", command: "moveRight", label: "Move Right", icon: "→" },
        { id: "right3", command: "moveRight", label: "Move Right", icon: "→" },
      ],
      solution: ["moveRight", "moveRight", "moveRight"]
    },
    {
      type: "tap-image",
      question: "Find the RED apple",
      options: [
        { id: "red", label: "Red Apple", emoji: "🍎", correct: true },
        { id: "green", label: "Green Apple", emoji: "🍏", correct: false },
        { id: "orange", label: "Orange", emoji: "🍊", correct: false },
        { id: "banana", label: "Banana", emoji: "🍌", correct: false },
      ]
    },
    {
      type: "drag-and-drop",
      question: "Drag the numbers to count: 1, 2, 3",
      targetSlots: ["1", "2", "3"],
      draggableItems: [
        { id: "2", label: "2" },
        { id: "3", label: "3" },
        { id: "1", label: "1" },
      ]
    },
    {
      type: "multiple-choice",
      question: "How many apples are there? 🍎🍎🍎",
      options: [
        { id: "2", label: "2", correct: false },
        { id: "3", label: "3", correct: true },
        { id: "4", label: "4", correct: false },
        { id: "5", label: "5", correct: false },
      ]
    },
  ]
}

const encouragements = [
  "Amazing job! You got it right!",
  "Wonderful! You're so smart!",
  "Fantastic! Keep going!",
  "You're doing great!",
  "Perfect answer!",
  "Superstar! That's correct!"
]

const tryAgainMessages = [
  "Oops! Try again, you can do it!",
  "Almost! Give it another try!",
  "Not quite, but don't give up!",
  "Let's try one more time!"
]

// Drag and Drop Puzzle Component
function DragDropPuzzle({ 
  targetSlots, 
  draggableItems, 
  onComplete,
  isCorrect 
}: { 
  targetSlots: string[]
  draggableItems: { id: string; label: string }[]
  onComplete: (correct: boolean) => void
  isCorrect: boolean | null
}) {
  const [slots, setSlots] = useState<(string | null)[]>(Array(targetSlots.length).fill(null))
  const [availableItems, setAvailableItems] = useState(draggableItems)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (id: string) => {
    setDraggedItem(id)
  }

  const handleDrop = (slotIndex: number) => {
    if (!draggedItem || isCorrect !== null) return
    
    const newSlots = [...slots]
    
    // If slot already has an item, return it to available
    if (newSlots[slotIndex]) {
      const returnedItem = draggableItems.find(item => item.id === newSlots[slotIndex])
      if (returnedItem) {
        setAvailableItems(prev => [...prev, returnedItem])
      }
    }
    
    newSlots[slotIndex] = draggedItem
    setSlots(newSlots)
    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem))
    setDraggedItem(null)
  }

  const handleRemoveFromSlot = (slotIndex: number) => {
    if (isCorrect !== null) return
    const itemId = slots[slotIndex]
    if (itemId) {
      const returnedItem = draggableItems.find(item => item.id === itemId)
      if (returnedItem) {
        setAvailableItems(prev => [...prev, returnedItem])
      }
      const newSlots = [...slots]
      newSlots[slotIndex] = null
      setSlots(newSlots)
    }
  }

  const checkAnswer = () => {
    const correct = slots.every((slot, index) => slot === targetSlots[index])
    onComplete(correct)
  }

  const allSlotsFilled = slots.every(slot => slot !== null)

  return (
    <div className="space-y-6">
      {/* Target slots */}
      <div className="flex justify-center gap-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            onClick={() => handleRemoveFromSlot(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className={cn(
              "w-20 h-20 rounded-2xl border-4 border-dashed flex items-center justify-center text-3xl font-bold transition-all cursor-pointer",
              slot 
                ? isCorrect === true
                  ? "border-accent bg-accent/20 text-accent"
                  : isCorrect === false
                    ? slot === targetSlots[index] 
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-destructive bg-destructive/20 text-destructive"
                    : "border-primary bg-primary/10 text-primary"
                : "border-muted-foreground/30 bg-muted/50 text-muted-foreground"
            )}
          >
            {slot || "?"}
          </div>
        ))}
      </div>

      {/* Draggable items */}
      <div className="flex justify-center gap-4">
        {availableItems.map((item) => (
          <div
            key={item.id}
            draggable={isCorrect === null}
            onDragStart={() => handleDragStart(item.id)}
            onClick={() => {
              if (isCorrect !== null) return
              const emptySlotIndex = slots.findIndex(s => s === null)
              if (emptySlotIndex !== -1) {
                setDraggedItem(item.id)
                setTimeout(() => handleDrop(emptySlotIndex), 0)
              }
            }}
            className={cn(
              "w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-2xl font-bold cursor-grab active:cursor-grabbing transition-all hover:scale-110",
              isCorrect !== null && "opacity-50 cursor-not-allowed"
            )}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Check button */}
      {isCorrect === null && (
        <div className="flex justify-center">
          <Button
            onClick={checkAnswer}
            disabled={!allSlotsFilled}
            className="rounded-full px-8"
          >
            Check Answer
          </Button>
        </div>
      )}
    </div>
  )
}

// Simple Coding Blocks Component
function CodingBlocks({
  gridSize,
  robotStart,
  starPosition,
  availableCommands,
  solution,
  onComplete,
  isCorrect
}: {
  gridSize: { rows: number; cols: number }
  robotStart: { row: number; col: number }
  starPosition: { row: number; col: number }
  availableCommands: { id: string; command: string; label: string; icon: string }[]
  solution: string[]
  onComplete: (correct: boolean) => void
  isCorrect: boolean | null
}) {
  const [commandSequence, setCommandSequence] = useState<typeof availableCommands>([])
  const [remainingCommands, setRemainingCommands] = useState(availableCommands)
  const [robotPosition, setRobotPosition] = useState(robotStart)
  const [isAnimating, setIsAnimating] = useState(false)

  const addCommand = (command: typeof availableCommands[0]) => {
    if (isCorrect !== null || isAnimating) return
    setCommandSequence(prev => [...prev, command])
    setRemainingCommands(prev => prev.filter(c => c.id !== command.id))
  }

  const removeCommand = (index: number) => {
    if (isCorrect !== null || isAnimating) return
    const removed = commandSequence[index]
    setCommandSequence(prev => prev.filter((_, i) => i !== index))
    setRemainingCommands(prev => [...prev, removed])
  }

  const runCode = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setRobotPosition(robotStart)
    
    let pos = { ...robotStart }
    
    for (const cmd of commandSequence) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (cmd.command === "moveRight") {
        pos = { ...pos, col: Math.min(pos.col + 1, gridSize.cols - 1) }
      } else if (cmd.command === "moveLeft") {
        pos = { ...pos, col: Math.max(pos.col - 1, 0) }
      } else if (cmd.command === "moveUp") {
        pos = { ...pos, row: Math.max(pos.row - 1, 0) }
      } else if (cmd.command === "moveDown") {
        pos = { ...pos, row: Math.min(pos.row + 1, gridSize.rows - 1) }
      }
      
      setRobotPosition(pos)
    }
    
    await new Promise(resolve => setTimeout(resolve, 300))
    const reachedStar = pos.row === starPosition.row && pos.col === starPosition.col
    onComplete(reachedStar)
    setIsAnimating(false)
  }

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="flex justify-center">
        <div 
          className="inline-grid gap-1 bg-muted p-2 rounded-xl"
          style={{ gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)` }}
        >
          {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => {
            const row = Math.floor(index / gridSize.cols)
            const col = index % gridSize.cols
            const isRobot = robotPosition.row === row && robotPosition.col === col
            const isStar = starPosition.row === row && starPosition.col === col
            
            return (
              <div
                key={index}
                className={cn(
                  "w-14 h-14 rounded-lg flex items-center justify-center text-2xl transition-all duration-300",
                  isRobot ? "bg-primary" : isStar ? "bg-amber-100" : "bg-white"
                )}
              >
                {isRobot && <span>🤖</span>}
                {isStar && !isRobot && <span>⭐</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Command sequence */}
      <div className="bg-muted/50 rounded-xl p-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Your Commands:</p>
        <div className="flex flex-wrap gap-2 min-h-[48px]">
          {commandSequence.length === 0 ? (
            <p className="text-muted-foreground text-sm">Click commands below to add them</p>
          ) : (
            commandSequence.map((cmd, index) => (
              <button
                key={`${cmd.id}-${index}`}
                onClick={() => removeCommand(index)}
                disabled={isCorrect !== null || isAnimating}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium flex items-center gap-1 hover:bg-blue-600 disabled:opacity-50"
              >
                {cmd.icon} {cmd.label}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available commands */}
      <div className="flex flex-wrap justify-center gap-2">
        {remainingCommands.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => addCommand(cmd)}
            disabled={isCorrect !== null || isAnimating}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium flex items-center gap-1 hover:bg-green-600 disabled:opacity-50 transition-all"
          >
            {cmd.icon} {cmd.label}
          </button>
        ))}
      </div>

      {/* Run button */}
      {isCorrect === null && (
        <div className="flex justify-center">
          <Button
            onClick={runCode}
            disabled={commandSequence.length === 0 || isAnimating}
            className="rounded-full px-8"
          >
            {isAnimating ? "Running..." : "Run Code"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default function ClassroomPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [sequenceOrder, setSequenceOrder] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [pandaMessage, setPandaMessage] = useState("Let's learn together!")
  const [showCelebration, setShowCelebration] = useState(false)

  const question = lessonData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / lessonData.totalQuestions) * 100

  useEffect(() => {
    setSelectedAnswer(null)
    setSequenceOrder([])
    setIsCorrect(null)
  }, [currentQuestion])

  useEffect(() => {
    if (isCorrect === true) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
  }, [isCorrect])

  const handleTapAnswer = (id: string) => {
    if (isCorrect !== null) return
    setSelectedAnswer(id)
  }

  const handleSequenceTap = (id: string) => {
    if (sequenceOrder.includes(id)) {
      setSequenceOrder(sequenceOrder.filter(item => item !== id))
    } else {
      setSequenceOrder([...sequenceOrder, id])
    }
  }

  const handleDragDropComplete = (correct: boolean) => {
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
      setPandaMessage(encouragements[Math.floor(Math.random() * encouragements.length)])
    } else {
      setPandaMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)])
    }
  }

  const handleCodingComplete = (correct: boolean) => {
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
      setPandaMessage("Your code worked! The robot reached the star!")
    } else {
      setPandaMessage("The robot didn't reach the star. Try a different sequence!")
    }
  }

  const checkAnswer = () => {
    if (question.type === "sequence") {
      const items = question.items!
      const isSequenceCorrect = sequenceOrder.every((id, index) => {
        const item = items.find(i => i.id === id)
        return item?.correctPosition === index
      }) && sequenceOrder.length === items.length
      
      setIsCorrect(isSequenceCorrect)
      if (isSequenceCorrect) {
        setScore(score + 1)
        setPandaMessage(encouragements[Math.floor(Math.random() * encouragements.length)])
      } else {
        setPandaMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)])
      }
    } else {
      const correctOption = question.options!.find(opt => opt.correct)
      const correct = selectedAnswer === correctOption?.id
      setIsCorrect(correct)
      if (correct) {
        setScore(score + 1)
        setPandaMessage(encouragements[Math.floor(Math.random() * encouragements.length)])
      } else {
        setPandaMessage(tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)])
      }
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < lessonData.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setPandaMessage("Let's try the next one!")
    } else {
      setShowResult(true)
    }
  }

  const restartLesson = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setPandaMessage("Let's learn together!")
  }

  if (showResult) {
    const stars = Math.ceil((score / lessonData.totalQuestions) * 3)
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4">
        <div className="bg-card rounded-3xl p-8 shadow-playful-lg max-w-md w-full text-center relative overflow-hidden">
          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'][i % 5],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
          
          <Image
            src="/images/professor-panda.jpg"
            alt="Professor Panda"
            width={150}
            height={150}
            className="mx-auto mb-4 drop-shadow-lg"
            loading="eager"
          />
          
          <h1 className="text-3xl font-display font-bold text-card-foreground mb-2">
            Lesson Complete!
          </h1>
          
          <p className="text-lg text-primary font-medium mb-4">
            {score === lessonData.totalQuestions ? "Perfect score! You're amazing!" : "Great job! You did it!"}
          </p>
          
          <div className="mb-6">
            <StarRating earned={stars} total={3} size="lg" animated className="justify-center mb-2" />
            <p className="text-lg text-muted-foreground">
              You got {score} out of {lessonData.totalQuestions} correct!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              size="lg" 
              className="rounded-full font-bold"
              onClick={() => window.location.href = '/dashboard/kids'}
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce-gentle">
            <Sparkles className="w-32 h-32 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#A8E6CF'][i % 6],
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm py-4 px-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard/kids">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div className="flex-1 mx-4">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Question {currentQuestion + 1} of {lessonData.totalQuestions}
            </p>
          </div>

          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
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
            <div className="relative">
              <Image
                src="/images/professor-panda.jpg"
                alt="Professor Panda"
                width={120}
                height={120}
                className={cn(
                  "drop-shadow-lg transition-transform duration-300",
                  isCorrect === true && "animate-bounce-gentle"
                )}
              />
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-lg max-w-[200px] text-center">
                <p className="text-sm font-medium">{pandaMessage}</p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-playful mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-display font-bold text-card-foreground">
                {question.question}
              </h2>
              <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Tap Image Questions */}
            {question.type === "tap-image" && (
              <div className="grid grid-cols-2 gap-4">
                {question.options!.map((option) => (
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
                    <span className="text-5xl">{option.emoji}</span>
                    <span className="font-display font-bold text-card-foreground">{option.label}</span>
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

            {/* Multiple Choice Questions */}
            {question.type === "multiple-choice" && (
              <div className="grid grid-cols-2 gap-4">
                {question.options!.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleTapAnswer(option.id)}
                    disabled={isCorrect !== null}
                    className={cn(
                      "p-6 rounded-2xl border-4 transition-all duration-200 hover:scale-105",
                      selectedAnswer === option.id
                        ? isCorrect === true
                          ? "border-accent bg-accent/10"
                          : isCorrect === false
                            ? "border-destructive bg-destructive/10"
                            : "border-primary bg-primary/10"
                        : "border-transparent bg-muted hover:border-primary/50",
                      isCorrect !== null && option.correct && "border-accent bg-accent/10"
                    )}
                  >
                    <span className="text-3xl font-display font-bold text-card-foreground">{option.label}</span>
                    {isCorrect !== null && selectedAnswer === option.id && (
                      <div className="mt-2">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-accent mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive mx-auto" />
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Drag and Drop Questions */}
            {question.type === "drag-and-drop" && (
              <DragDropPuzzle
                targetSlots={question.targetSlots!}
                draggableItems={question.draggableItems!}
                onComplete={handleDragDropComplete}
                isCorrect={isCorrect}
              />
            )}

            {/* Sequence Questions */}
            {question.type === "sequence" && (
              <div>
                <div className="flex justify-center gap-4 mb-6">
                  {sequenceOrder.map((id, index) => {
                    const item = question.items!.find(i => i.id === id)
                    return (
                      <div
                        key={`selected-${index}`}
                        className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground"
                      >
                        {item?.label}
                      </div>
                    )
                  })}
                  {Array.from({ length: question.items!.length - sequenceOrder.length }).map((_, i) => (
                    <div
                      key={`placeholder-${i}`}
                      className="w-16 h-16 rounded-2xl border-4 border-dashed border-muted-foreground/30"
                    />
                  ))}
                </div>
                <div className="flex justify-center gap-4">
                  {question.items!.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSequenceTap(item.id)}
                      disabled={isCorrect !== null}
                      className={cn(
                        "w-16 h-16 rounded-2xl border-4 transition-all duration-200 text-2xl font-bold hover:scale-110",
                        sequenceOrder.includes(item.id)
                          ? "border-primary/30 bg-muted/50 text-muted-foreground"
                          : "border-transparent bg-secondary text-secondary-foreground hover:border-primary"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Coding Blocks Questions */}
            {question.type === "coding-blocks" && (
              <CodingBlocks
                gridSize={question.gridSize!}
                robotStart={question.robotStart!}
                starPosition={question.starPosition!}
                availableCommands={question.availableCommands!}
                solution={question.solution!}
                onComplete={handleCodingComplete}
                isCorrect={isCorrect}
              />
            )}
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex justify-center gap-4">
          {question.type !== "drag-and-drop" && question.type !== "coding-blocks" && isCorrect === null ? (
            <Button 
              size="lg"
              className="rounded-full px-12 font-bold shadow-lg"
              onClick={checkAnswer}
              disabled={question.type === "sequence" ? sequenceOrder.length !== question.items!.length : !selectedAnswer}
            >
              Check Answer
            </Button>
          ) : isCorrect !== null ? (
            <Button 
              size="lg"
              className="rounded-full px-12 font-bold shadow-lg"
              onClick={nextQuestion}
            >
              {currentQuestion < lessonData.totalQuestions - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                "See Results"
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
