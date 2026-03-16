"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { X, User, Lock, Eye, EyeOff, Baby, Sparkles, Loader2 } from "lucide-react"

interface AddChildModalProps {
  isOpen: boolean
  onClose: () => void
  onChildAdded: (child: { id: string; name: string; age: number; username: string; learningLevel: string }) => void
}

const avatarOptions = [
  { id: "panda", emoji: "🐼", name: "Panda" },
  { id: "lion", emoji: "🦁", name: "Lion" },
  { id: "bunny", emoji: "🐰", name: "Bunny" },
  { id: "bear", emoji: "🐻", name: "Bear" },
  { id: "fox", emoji: "🦊", name: "Fox" },
  { id: "owl", emoji: "🦉", name: "Owl" },
]

const learningLevels = [
  { id: "beginner", name: "Beginner", description: "Just starting out" },
  { id: "intermediate", name: "Intermediate", description: "Some experience" },
  { id: "advanced", name: "Advanced", description: "Ready for challenges" },
]

export function AddChildModal({ isOpen, onClose, onChildAdded }: AddChildModalProps) {
  const [step, setStep] = useState(1)
  const [childName, setChildName] = useState("")
  const [age, setAge] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [avatar, setAvatar] = useState("panda")
  const [learningLevel, setLearningLevel] = useState("beginner")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const resetForm = () => {
    setStep(1)
    setChildName("")
    setAge("")
    setUsername("")
    setPassword("")
    setConfirmPassword("")
    setAvatar("panda")
    setLearningLevel("beginner")
    setError(null)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!childName.trim()) {
      setError("Please enter your child's name")
      return
    }

    const ageNum = parseInt(age)
    if (isNaN(ageNum) || ageNum < 2 || ageNum > 7) {
      setError("Age must be between 2 and 7")
      return
    }

    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username.trim() || username.length < 3) {
      setError("Username must be at least 3 characters")
      return
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setStep(3)
  }

  const handleFinalSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      // First, get the current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError("You must be logged in to add a child.")
        setLoading(false)
        return
      }

      // Check if parent profile exists, if not create it
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single()

      if (!existingProfile) {
        // Create parent profile first
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email || "",
            full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Parent",
            role: "parent",
          })

        if (profileError) {
          console.error("Error creating profile:", profileError)
          setError("Failed to set up parent account. Please try again.")
          setLoading(false)
          return
        }
      }

      // Now create child record in database
      const { data: childData, error: childError } = await supabase
        .from("children")
        .insert({
          parent_id: user.id,
          name: childName.trim(),
          age: parseInt(age),
          avatar: avatar,
          username: username.toLowerCase().trim(),
          password_hash: password, // In production, this should be hashed
          learning_level: learningLevel,
          total_stars: 0,
          current_streak: 0,
        })
        .select()
        .single()

      if (childError) {
        console.error("Error creating child:", childError)
        if (childError.message.includes("username")) {
          setError("This username is already taken. Please choose another.")
        } else if (childError.message.includes("row-level security")) {
          setError("Permission denied. Please try logging out and back in.")
        } else {
          setError("Failed to create child account. Please try again.")
        }
        setLoading(false)
        return
      }

      // Success - pass child data back to parent
      const newChild = {
        id: childData.id,
        name: childData.name,
        age: childData.age,
        username: childData.username || username.toLowerCase().trim(),
        learningLevel: childData.learning_level || learningLevel,
      }
      resetForm()
      onChildAdded(newChild)
      onClose()
    } catch (err) {
      console.error("Unexpected error:", err)
      setError("An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Add Child Account</h2>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Baby className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Child&apos;s Information</h3>
                <p className="text-sm text-muted-foreground">Tell us about your little learner</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Child&apos;s Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Enter child's name"
                    className="pl-10 h-12 rounded-xl border-2"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Child&apos;s Age</label>
                <div className="grid grid-cols-6 gap-2">
                  {[2, 3, 4, 5, 6, 7].map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAge(a.toString())}
                      className={`h-12 rounded-xl font-bold text-lg transition-all ${
                        age === a.toString()
                          ? "bg-primary text-white shadow-lg"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-white font-semibold"
                disabled={!childName || !age}
              >
                Continue
              </Button>
            </form>
          )}

          {/* Step 2: Login Credentials */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-foreground">Login Credentials</h3>
                <p className="text-sm text-muted-foreground">Create login details for {childName}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                    placeholder="Choose a username"
                    className="pl-10 h-12 rounded-xl border-2"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Only letters and numbers, no spaces</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a simple password"
                    className="pl-10 pr-10 h-12 rounded-xl border-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Keep it simple for your child to remember</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="pl-10 h-12 rounded-xl border-2"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 rounded-xl font-semibold"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 rounded-xl bg-primary text-white font-semibold"
                  disabled={!username || !password || !confirmPassword}
                >
                  Continue
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Avatar & Level */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-foreground">Personalize</h3>
                <p className="text-sm text-muted-foreground">Choose an avatar and learning level</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Choose Avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {avatarOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAvatar(opt.id)}
                      className={`aspect-square rounded-xl text-2xl transition-all ${
                        avatar === opt.id
                          ? "bg-primary/20 ring-2 ring-primary"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {opt.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Learning Level</label>
                <div className="space-y-2">
                  {learningLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setLearningLevel(level.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all ${
                        learningLevel === level.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-muted border-2 border-transparent hover:bg-muted/80"
                      }`}
                    >
                      <p className="font-semibold text-foreground">{level.name}</p>
                      <p className="text-xs text-muted-foreground">{level.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 rounded-xl font-semibold"
                >
                  Back
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
