"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ProfessorPanda } from "@/components/professor-panda"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  RotateCcw,
  Play,
  Home,
  Trash2,
  Trophy,
  ChevronUp,
  MoveRight,
  CornerDownRight,
  CornerUpRight
} from "lucide-react"

type Command = "forward" | "left" | "right" | "jump"
type Direction = "up" | "right" | "down" | "left"

interface Position {
  x: number
  y: number
}

const commands: { id: Command; label: string; icon: typeof ArrowUp; color: string }[] = [
  { id: "forward", label: "Move Forward", icon: MoveRight, color: "bg-[oklch(0.65_0.22_250)]" },
  { id: "left", label: "Turn Left", icon: CornerDownRight, color: "bg-[oklch(0.8_0.15_60)]" },
  { id: "right", label: "Turn Right", icon: CornerUpRight, color: "bg-[oklch(0.75_0.18_145)]" },
  { id: "jump", label: "Jump", icon: ChevronUp, color: "bg-[oklch(0.7_0.18_300)]" },
]

const levels = [
  {
    id: 1,
    name: "First Steps",
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 2, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    startPos: { x: 0, y: 2 },
    startDir: "right" as Direction,
    goal: { x: 3, y: 2 },
    solution: ["forward", "forward", "forward"],
    maxCommands: 5,
  },
  {
    id: 2,
    name: "Turn Around",
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    startPos: { x: 2, y: 4 },
    startDir: "up" as Direction,
    goal: { x: 2, y: 1 },
    solution: ["forward", "forward", "forward"],
    maxCommands: 5,
  },
  {
    id: 3,
    name: "L-Shape Path",
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 2, 0, 0],
    ],
    startPos: { x: 0, y: 2 },
    startDir: "right" as Direction,
    goal: { x: 2, y: 4 },
    solution: ["forward", "forward", "right", "forward", "forward"],
    maxCommands: 7,
  },
]

export default function CodingGamePage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [commandQueue, setCommandQueue] = useState<Command[]>([])
  const [robotPos, setRobotPos] = useState<Position>(levels[0].startPos)
  const [robotDir, setRobotDir] = useState<Direction>(levels[0].startDir)
  const [isRunning, setIsRunning] = useState(false)
  const [levelComplete, setLevelComplete] = useState(false)
  const [pandaMessage, setPandaMessage] = useState("Drag commands to help the robot reach the star!")

  const level = levels[currentLevel]

  const resetLevel = useCallback(() => {
    setRobotPos(level.startPos)
    setRobotDir(level.startDir)
    setCommandQueue([])
    setLevelComplete(false)
    setIsRunning(false)
    setPandaMessage("Drag commands to help the robot reach the star!")
  }, [level])

  const addCommand = (cmd: Command) => {
    if (commandQueue.length < level.maxCommands && !isRunning) {
      setCommandQueue([...commandQueue, cmd])
    }
  }

  const removeCommand = (index: number) => {
    if (!isRunning) {
      setCommandQueue(commandQueue.filter((_, i) => i !== index))
    }
  }

  const clearCommands = () => {
    if (!isRunning) {
      setCommandQueue([])
    }
  }

  const getNextDirection = (currentDir: Direction, turn: "left" | "right"): Direction => {
    const directions: Direction[] = ["up", "right", "down", "left"]
    const currentIndex = directions.indexOf(currentDir)
    if (turn === "right") {
      return directions[(currentIndex + 1) % 4]
    } else {
      return directions[(currentIndex + 3) % 4]
    }
  }

  const moveForward = (pos: Position, dir: Direction): Position => {
    const moves: Record<Direction, Position> = {
      up: { x: pos.x, y: pos.y - 1 },
      right: { x: pos.x + 1, y: pos.y },
      down: { x: pos.x, y: pos.y + 1 },
      left: { x: pos.x - 1, y: pos.y },
    }
    return moves[dir]
  }

  const isValidPosition = (pos: Position): boolean => {
    if (pos.x < 0 || pos.x >= 5 || pos.y < 0 || pos.y >= 5) return false
    return level.grid[pos.y][pos.x] !== 0
  }

  const runCommands = async () => {
    if (isRunning || commandQueue.length === 0) return
    
    setIsRunning(true)
    setPandaMessage("Let's see what happens!")
    
    let currentPos = { ...level.startPos }
    let currentDir = level.startDir

    for (const cmd of commandQueue) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (cmd === "forward" || cmd === "jump") {
        const nextPos = moveForward(currentPos, currentDir)
        if (isValidPosition(nextPos)) {
          currentPos = nextPos
          setRobotPos({ ...currentPos })
        } else {
          setPandaMessage("Oops! The robot can't go there. Try again!")
          setIsRunning(false)
          return
        }
      } else if (cmd === "left") {
        currentDir = getNextDirection(currentDir, "left")
        setRobotDir(currentDir)
      } else if (cmd === "right") {
        currentDir = getNextDirection(currentDir, "right")
        setRobotDir(currentDir)
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    if (currentPos.x === level.goal.x && currentPos.y === level.goal.y) {
      setLevelComplete(true)
      setPandaMessage("Amazing! You did it! The robot reached the star!")
    } else {
      setPandaMessage("Almost there! The robot didn't reach the star. Try different commands!")
    }
    
    setIsRunning(false)
  }

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1)
      const nextLevelData = levels[currentLevel + 1]
      setRobotPos(nextLevelData.startPos)
      setRobotDir(nextLevelData.startDir)
      setCommandQueue([])
      setLevelComplete(false)
      setPandaMessage("Great! Let's try a harder puzzle!")
    }
  }

  const getRotation = (dir: Direction): string => {
    const rotations: Record<Direction, string> = {
      up: "rotate-[-90deg]",
      right: "rotate-0",
      down: "rotate-90",
      left: "rotate-180",
    }
    return rotations[dir]
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card shadow-sm py-4 px-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/dashboard/kids">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-foreground">Level {level.id}:</span>
            <span className="text-muted-foreground">{level.name}</span>
          </div>

          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Professor Panda */}
          <div className="flex justify-center mb-6">
            <ProfessorPanda 
              size="md" 
              mood={levelComplete ? "excited" : "happy"}
              showSpeechBubble
              message={pandaMessage}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Game Grid */}
            <div className="bg-card rounded-3xl p-6 shadow-playful">
              <h3 className="font-display font-bold text-card-foreground mb-4">Game Board</h3>
              <div className="aspect-square bg-muted rounded-2xl p-2 relative">
                <div className="grid grid-cols-5 gap-1 h-full">
                  {level.grid.map((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={cn(
                          "rounded-lg flex items-center justify-center transition-all",
                          cell === 0 ? "bg-muted-foreground/10" : "bg-[oklch(0.75_0.18_145)]/30",
                          cell === 2 && "bg-[oklch(0.8_0.15_60)]/50"
                        )}
                      >
                        {/* Goal star */}
                        {cell === 2 && (
                          <span className="text-2xl animate-pulse">⭐</span>
                        )}
                        
                        {/* Robot */}
                        {robotPos.x === x && robotPos.y === y && (
                          <div className={cn(
                            "w-10 h-10 bg-[oklch(0.7_0.18_300)] rounded-lg flex items-center justify-center transition-all duration-300",
                            getRotation(robotDir)
                          )}>
                            <span className="text-xl">🤖</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Level complete overlay */}
              {levelComplete && (
                <div className="mt-4 p-4 bg-accent/20 rounded-2xl text-center">
                  <Trophy className="w-12 h-12 text-[oklch(0.8_0.15_60)] mx-auto mb-2" />
                  <h4 className="font-display font-bold text-card-foreground mb-2">Level Complete!</h4>
                  {currentLevel < levels.length - 1 ? (
                    <Button onClick={nextLevel} className="rounded-full">
                      Next Level <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <p className="text-muted-foreground">You completed all levels!</p>
                  )}
                </div>
              )}
            </div>

            {/* Commands Panel */}
            <div className="space-y-4">
              {/* Available Commands */}
              <div className="bg-card rounded-3xl p-6 shadow-playful">
                <h3 className="font-display font-bold text-card-foreground mb-4">Commands</h3>
                <div className="grid grid-cols-2 gap-3">
                  {commands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => addCommand(cmd.id)}
                      disabled={isRunning || commandQueue.length >= level.maxCommands}
                      className={cn(
                        "p-4 rounded-xl flex items-center gap-3 transition-all",
                        cmd.color,
                        "text-white font-bold",
                        "hover:opacity-90 active:scale-95",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      <cmd.icon className="w-6 h-6" />
                      <span className="text-sm">{cmd.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Command Queue */}
              <div className="bg-card rounded-3xl p-6 shadow-playful">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-card-foreground">Your Program</h3>
                  <span className="text-sm text-muted-foreground">
                    {commandQueue.length}/{level.maxCommands} commands
                  </span>
                </div>
                
                <div className="min-h-[120px] bg-muted rounded-2xl p-3 mb-4">
                  {commandQueue.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Click commands above to add them here
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {commandQueue.map((cmd, index) => {
                        const cmdData = commands.find(c => c.id === cmd)!
                        return (
                          <button
                            key={index}
                            onClick={() => removeCommand(index)}
                            disabled={isRunning}
                            className={cn(
                              "px-3 py-2 rounded-lg flex items-center gap-2 text-white text-sm font-bold",
                              cmdData.color,
                              "hover:opacity-80 active:scale-95",
                              "disabled:cursor-not-allowed"
                            )}
                          >
                            <span>{index + 1}.</span>
                            <cmdData.icon className="w-4 h-4" />
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={runCommands}
                    disabled={isRunning || commandQueue.length === 0}
                    className="flex-1 rounded-full font-bold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                  <Button
                    onClick={clearCommands}
                    disabled={isRunning}
                    variant="outline"
                    className="rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={resetLevel}
                    variant="outline"
                    className="rounded-full"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
