// Curriculum Data Structure: Level → Module → Lesson → Activity

export type ActivityType = "tap-image" | "multiple-choice" | "sequence" | "drag-drop" | "match" | "fill-blank"

export interface ActivityOption {
  id: string
  label: string
  image?: string
  correct?: boolean
  correctPosition?: number
}

export interface Activity {
  id: string
  type: ActivityType
  question: string
  audioUrl?: string
  options?: ActivityOption[]
  items?: ActivityOption[]
  correctAnswer?: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl?: string
  duration: string
  activities: Activity[]
  rewardStars: number
  rewardBadge?: string
}

export interface Module {
  id: string
  title: string
  description: string
  icon: string
  color: string
  lessons: Lesson[]
  unlocked: boolean
}

export interface Level {
  id: string
  title: string
  description: string
  ageRange: string
  modules: Module[]
}

export interface Subject {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  gradientFrom: string
  gradientTo: string
  levels: Level[]
}

// English Curriculum
export const englishCurriculum: Subject = {
  id: "english",
  name: "English",
  slug: "english",
  description: "Learn letters, words, and reading!",
  icon: "BookOpen",
  color: "#FF6B9D",
  gradientFrom: "#FF6B9D",
  gradientTo: "#FF8E53",
  levels: [
    {
      id: "english-level-1",
      title: "Level 1",
      description: "Alphabet Adventures",
      ageRange: "2-4 years",
      modules: [
        {
          id: "english-l1-m1",
          title: "Meet the Letters",
          description: "Learn uppercase letters A-Z",
          icon: "ABC",
          color: "#FF6B9D",
          unlocked: true,
          lessons: [
            {
              id: "english-l1-m1-lesson1",
              title: "Letters A, B, C",
              description: "Learn the first three letters of the alphabet",
              thumbnail: "/images/lessons/abc.jpg",
              duration: "5 min",
              rewardStars: 3,
              rewardBadge: "ABC Explorer",
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Find the letter A",
                  options: [
                    { id: "a", label: "A", correct: true },
                    { id: "b", label: "B", correct: false },
                    { id: "c", label: "C", correct: false },
                    { id: "d", label: "D", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "tap-image",
                  question: "Which one is the letter B?",
                  options: [
                    { id: "p", label: "P", correct: false },
                    { id: "b", label: "B", correct: true },
                    { id: "d", label: "D", correct: false },
                    { id: "r", label: "R", correct: false },
                  ]
                },
                {
                  id: "act3",
                  type: "multiple-choice",
                  question: "What letter comes after B?",
                  options: [
                    { id: "a", label: "A", correct: false },
                    { id: "c", label: "C", correct: true },
                    { id: "d", label: "D", correct: false },
                    { id: "e", label: "E", correct: false },
                  ]
                },
                {
                  id: "act4",
                  type: "sequence",
                  question: "Put the letters in order: A, B, C",
                  items: [
                    { id: "c", label: "C", correctPosition: 2 },
                    { id: "a", label: "A", correctPosition: 0 },
                    { id: "b", label: "B", correctPosition: 1 },
                  ]
                },
              ]
            },
            {
              id: "english-l1-m1-lesson2",
              title: "Letters D, E, F",
              description: "Continue your alphabet journey",
              thumbnail: "/images/lessons/def.jpg",
              duration: "5 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Find the letter D",
                  options: [
                    { id: "d", label: "D", correct: true },
                    { id: "b", label: "B", correct: false },
                    { id: "p", label: "P", correct: false },
                    { id: "q", label: "Q", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "tap-image",
                  question: "Which picture starts with E?",
                  options: [
                    { id: "elephant", label: "Elephant", image: "🐘", correct: true },
                    { id: "apple", label: "Apple", image: "🍎", correct: false },
                    { id: "ball", label: "Ball", image: "⚽", correct: false },
                    { id: "cat", label: "Cat", image: "🐱", correct: false },
                  ]
                },
                {
                  id: "act3",
                  type: "multiple-choice",
                  question: "What letter comes after E?",
                  options: [
                    { id: "d", label: "D", correct: false },
                    { id: "f", label: "F", correct: true },
                    { id: "g", label: "G", correct: false },
                    { id: "h", label: "H", correct: false },
                  ]
                },
              ]
            },
            {
              id: "english-l1-m1-lesson3",
              title: "Letters G, H, I",
              description: "Keep learning new letters",
              thumbnail: "/images/lessons/ghi.jpg",
              duration: "5 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Which picture starts with G?",
                  options: [
                    { id: "grapes", label: "Grapes", image: "🍇", correct: true },
                    { id: "apple", label: "Apple", image: "🍎", correct: false },
                    { id: "banana", label: "Banana", image: "🍌", correct: false },
                    { id: "orange", label: "Orange", image: "🍊", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "tap-image",
                  question: "Find the letter H",
                  options: [
                    { id: "n", label: "N", correct: false },
                    { id: "h", label: "H", correct: true },
                    { id: "m", label: "M", correct: false },
                    { id: "k", label: "K", correct: false },
                  ]
                },
              ]
            },
          ]
        },
        {
          id: "english-l1-m2",
          title: "Letter Sounds",
          description: "Learn how letters sound",
          icon: "Volume2",
          color: "#FF8E53",
          unlocked: true,
          lessons: [
            {
              id: "english-l1-m2-lesson1",
              title: "Sounds of A, E, I",
              description: "Learn vowel sounds",
              thumbnail: "/images/lessons/vowels.jpg",
              duration: "6 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Which word has the 'A' sound?",
                  options: [
                    { id: "apple", label: "Apple", image: "🍎", correct: true },
                    { id: "egg", label: "Egg", image: "🥚", correct: false },
                    { id: "ice", label: "Ice", image: "🧊", correct: false },
                    { id: "orange", label: "Orange", image: "🍊", correct: false },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
    {
      id: "english-level-2",
      title: "Level 2",
      description: "Word Builders",
      ageRange: "4-6 years",
      modules: [
        {
          id: "english-l2-m1",
          title: "Simple Words",
          description: "Build 3-letter words",
          icon: "Puzzle",
          color: "#9B59B6",
          unlocked: false,
          lessons: []
        },
      ]
    },
  ]
}

// Maths Curriculum
export const mathsCurriculum: Subject = {
  id: "maths",
  name: "Maths",
  slug: "maths",
  description: "Numbers, counting, and fun puzzles!",
  icon: "Calculator",
  color: "#4ECDC4",
  gradientFrom: "#4ECDC4",
  gradientTo: "#44A08D",
  levels: [
    {
      id: "maths-level-1",
      title: "Level 1",
      description: "Number Explorers",
      ageRange: "2-4 years",
      modules: [
        {
          id: "maths-l1-m1",
          title: "Counting 1-5",
          description: "Learn to count from 1 to 5",
          icon: "12345",
          color: "#4ECDC4",
          unlocked: true,
          lessons: [
            {
              id: "maths-l1-m1-lesson1",
              title: "Number 1",
              description: "Learn about the number one",
              thumbnail: "/images/lessons/number1.jpg",
              duration: "4 min",
              rewardStars: 3,
              rewardBadge: "Number 1 Star",
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "How many apples? 🍎",
                  options: [
                    { id: "1", label: "1", correct: true },
                    { id: "2", label: "2", correct: false },
                    { id: "3", label: "3", correct: false },
                    { id: "4", label: "4", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "tap-image",
                  question: "Find ONE star",
                  options: [
                    { id: "one", label: "One", image: "⭐", correct: true },
                    { id: "two", label: "Two", image: "⭐⭐", correct: false },
                    { id: "three", label: "Three", image: "⭐⭐⭐", correct: false },
                    { id: "four", label: "Four", image: "⭐⭐⭐⭐", correct: false },
                  ]
                },
                {
                  id: "act3",
                  type: "multiple-choice",
                  question: "What number is this? 1",
                  options: [
                    { id: "one", label: "One", correct: true },
                    { id: "two", label: "Two", correct: false },
                    { id: "three", label: "Three", correct: false },
                    { id: "zero", label: "Zero", correct: false },
                  ]
                },
              ]
            },
            {
              id: "maths-l1-m1-lesson2",
              title: "Number 2",
              description: "Learn about the number two",
              thumbnail: "/images/lessons/number2.jpg",
              duration: "4 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "How many bananas? 🍌🍌",
                  options: [
                    { id: "1", label: "1", correct: false },
                    { id: "2", label: "2", correct: true },
                    { id: "3", label: "3", correct: false },
                    { id: "4", label: "4", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "tap-image",
                  question: "Find TWO hearts",
                  options: [
                    { id: "one", label: "One", image: "❤️", correct: false },
                    { id: "two", label: "Two", image: "❤️❤️", correct: true },
                    { id: "three", label: "Three", image: "❤️❤️❤️", correct: false },
                    { id: "four", label: "Four", image: "❤️❤️❤️❤️", correct: false },
                  ]
                },
              ]
            },
            {
              id: "maths-l1-m1-lesson3",
              title: "Numbers 3, 4, 5",
              description: "Learn numbers three, four, and five",
              thumbnail: "/images/lessons/number345.jpg",
              duration: "6 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "How many cats? 🐱🐱🐱",
                  options: [
                    { id: "2", label: "2", correct: false },
                    { id: "3", label: "3", correct: true },
                    { id: "4", label: "4", correct: false },
                    { id: "5", label: "5", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "sequence",
                  question: "Put the numbers in order: 1, 2, 3, 4, 5",
                  items: [
                    { id: "3", label: "3", correctPosition: 2 },
                    { id: "1", label: "1", correctPosition: 0 },
                    { id: "5", label: "5", correctPosition: 4 },
                    { id: "2", label: "2", correctPosition: 1 },
                    { id: "4", label: "4", correctPosition: 3 },
                  ]
                },
              ]
            },
          ]
        },
        {
          id: "maths-l1-m2",
          title: "Counting 6-10",
          description: "Count higher numbers",
          icon: "678910",
          color: "#44A08D",
          unlocked: true,
          lessons: [
            {
              id: "maths-l1-m2-lesson1",
              title: "Numbers 6 and 7",
              description: "Learn six and seven",
              thumbnail: "/images/lessons/number67.jpg",
              duration: "5 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "How many dots? ⚫⚫⚫⚫⚫⚫",
                  options: [
                    { id: "5", label: "5", correct: false },
                    { id: "6", label: "6", correct: true },
                    { id: "7", label: "7", correct: false },
                    { id: "8", label: "8", correct: false },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ]
}

// Science Curriculum
export const scienceCurriculum: Subject = {
  id: "science",
  name: "Science",
  slug: "science",
  description: "Explore nature and discover how things work!",
  icon: "Microscope",
  color: "#9B59B6",
  gradientFrom: "#9B59B6",
  gradientTo: "#8E44AD",
  levels: [
    {
      id: "science-level-1",
      title: "Level 1",
      description: "Little Scientists",
      ageRange: "2-4 years",
      modules: [
        {
          id: "science-l1-m1",
          title: "Animals",
          description: "Learn about different animals",
          icon: "Paw",
          color: "#9B59B6",
          unlocked: true,
          lessons: [
            {
              id: "science-l1-m1-lesson1",
              title: "Farm Animals",
              description: "Meet animals on the farm",
              thumbnail: "/images/lessons/farm.jpg",
              duration: "5 min",
              rewardStars: 3,
              rewardBadge: "Farm Friend",
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Which animal says 'Moo'?",
                  options: [
                    { id: "cow", label: "Cow", image: "🐄", correct: true },
                    { id: "pig", label: "Pig", image: "🐷", correct: false },
                    { id: "chicken", label: "Chicken", image: "🐔", correct: false },
                    { id: "sheep", label: "Sheep", image: "🐑", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "tap-image",
                  question: "Which animal gives us eggs?",
                  options: [
                    { id: "cow", label: "Cow", image: "🐄", correct: false },
                    { id: "pig", label: "Pig", image: "🐷", correct: false },
                    { id: "chicken", label: "Chicken", image: "🐔", correct: true },
                    { id: "horse", label: "Horse", image: "🐴", correct: false },
                  ]
                },
                {
                  id: "act3",
                  type: "multiple-choice",
                  question: "What sound does a pig make?",
                  options: [
                    { id: "moo", label: "Moo", correct: false },
                    { id: "oink", label: "Oink", correct: true },
                    { id: "woof", label: "Woof", correct: false },
                    { id: "meow", label: "Meow", correct: false },
                  ]
                },
              ]
            },
            {
              id: "science-l1-m1-lesson2",
              title: "Wild Animals",
              description: "Discover jungle and forest animals",
              thumbnail: "/images/lessons/wild.jpg",
              duration: "5 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Which animal is the King of the Jungle?",
                  options: [
                    { id: "lion", label: "Lion", image: "🦁", correct: true },
                    { id: "elephant", label: "Elephant", image: "🐘", correct: false },
                    { id: "monkey", label: "Monkey", image: "🐒", correct: false },
                    { id: "giraffe", label: "Giraffe", image: "🦒", correct: false },
                  ]
                },
              ]
            },
          ]
        },
        {
          id: "science-l1-m2",
          title: "Colors",
          description: "Learn about colors in nature",
          icon: "Palette",
          color: "#E74C3C",
          unlocked: true,
          lessons: [
            {
              id: "science-l1-m2-lesson1",
              title: "Primary Colors",
              description: "Red, Blue, and Yellow",
              thumbnail: "/images/lessons/colors.jpg",
              duration: "4 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Find something RED",
                  options: [
                    { id: "apple", label: "Apple", image: "🍎", correct: true },
                    { id: "banana", label: "Banana", image: "🍌", correct: false },
                    { id: "grapes", label: "Grapes", image: "🍇", correct: false },
                    { id: "orange", label: "Orange", image: "🍊", correct: false },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ]
}

// Coding Curriculum
export const codingCurriculum: Subject = {
  id: "coding",
  name: "Coding",
  slug: "coding",
  description: "Learn to code with fun puzzles and games!",
  icon: "Code",
  color: "#3498DB",
  gradientFrom: "#3498DB",
  gradientTo: "#2980B9",
  levels: [
    {
      id: "coding-level-1",
      title: "Level 1",
      description: "Code Beginners",
      ageRange: "4-7 years",
      modules: [
        {
          id: "coding-l1-m1",
          title: "Sequences",
          description: "Learn about step-by-step instructions",
          icon: "List",
          color: "#3498DB",
          unlocked: true,
          lessons: [
            {
              id: "coding-l1-m1-lesson1",
              title: "Follow the Steps",
              description: "Learn to follow instructions in order",
              thumbnail: "/images/lessons/sequence.jpg",
              duration: "5 min",
              rewardStars: 3,
              rewardBadge: "Sequence Star",
              activities: [
                {
                  id: "act1",
                  type: "sequence",
                  question: "Help the robot get to the star! Put the steps in order.",
                  items: [
                    { id: "right", label: "Turn Right", correctPosition: 1 },
                    { id: "forward1", label: "Move Forward", correctPosition: 0 },
                    { id: "forward2", label: "Move Forward", correctPosition: 2 },
                  ]
                },
                {
                  id: "act2",
                  type: "multiple-choice",
                  question: "What comes first when brushing teeth?",
                  options: [
                    { id: "brush", label: "Brush teeth", correct: false },
                    { id: "paste", label: "Put toothpaste", correct: true },
                    { id: "rinse", label: "Rinse mouth", correct: false },
                    { id: "spit", label: "Spit out", correct: false },
                  ]
                },
              ]
            },
            {
              id: "coding-l1-m1-lesson2",
              title: "Making Patterns",
              description: "Create repeating patterns",
              thumbnail: "/images/lessons/patterns.jpg",
              duration: "5 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "multiple-choice",
                  question: "What comes next? Red, Blue, Red, Blue, Red, ?",
                  options: [
                    { id: "red", label: "Red", correct: false },
                    { id: "blue", label: "Blue", correct: true },
                    { id: "green", label: "Green", correct: false },
                    { id: "yellow", label: "Yellow", correct: false },
                  ]
                },
              ]
            },
          ]
        },
        {
          id: "coding-l1-m2",
          title: "Loops",
          description: "Learn about repeating actions",
          icon: "Repeat",
          color: "#2980B9",
          unlocked: true,
          lessons: [
            {
              id: "coding-l1-m2-lesson1",
              title: "Repeat It!",
              description: "Make actions repeat",
              thumbnail: "/images/lessons/loops.jpg",
              duration: "6 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "multiple-choice",
                  question: "If we say 'Jump 3 times', how many jumps?",
                  options: [
                    { id: "1", label: "1", correct: false },
                    { id: "2", label: "2", correct: false },
                    { id: "3", label: "3", correct: true },
                    { id: "4", label: "4", correct: false },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ]
}

// Music Curriculum
export const musicCurriculum: Subject = {
  id: "music",
  name: "Music",
  slug: "music",
  description: "Discover rhythm, sounds, and songs!",
  icon: "Music",
  color: "#F39C12",
  gradientFrom: "#F39C12",
  gradientTo: "#E67E22",
  levels: [
    {
      id: "music-level-1",
      title: "Level 1",
      description: "Little Musicians",
      ageRange: "2-5 years",
      modules: [
        {
          id: "music-l1-m1",
          title: "Sounds Around Us",
          description: "Identify different sounds",
          icon: "Volume2",
          color: "#F39C12",
          unlocked: true,
          lessons: [
            {
              id: "music-l1-m1-lesson1",
              title: "Animal Sounds",
              description: "Match animals with their sounds",
              thumbnail: "/images/lessons/animal-sounds.jpg",
              duration: "4 min",
              rewardStars: 3,
              rewardBadge: "Sound Detective",
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Which animal makes a 'Woof' sound?",
                  options: [
                    { id: "dog", label: "Dog", image: "🐕", correct: true },
                    { id: "cat", label: "Cat", image: "🐱", correct: false },
                    { id: "bird", label: "Bird", image: "🐦", correct: false },
                    { id: "fish", label: "Fish", image: "🐟", correct: false },
                  ]
                },
                {
                  id: "act2",
                  type: "tap-image",
                  question: "Which animal goes 'Meow'?",
                  options: [
                    { id: "dog", label: "Dog", image: "🐕", correct: false },
                    { id: "cat", label: "Cat", image: "🐱", correct: true },
                    { id: "cow", label: "Cow", image: "🐄", correct: false },
                    { id: "duck", label: "Duck", image: "🦆", correct: false },
                  ]
                },
              ]
            },
            {
              id: "music-l1-m1-lesson2",
              title: "Musical Instruments",
              description: "Learn about instruments",
              thumbnail: "/images/lessons/instruments.jpg",
              duration: "5 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "tap-image",
                  question: "Which instrument do you hit with sticks?",
                  options: [
                    { id: "drum", label: "Drum", image: "🥁", correct: true },
                    { id: "guitar", label: "Guitar", image: "🎸", correct: false },
                    { id: "piano", label: "Piano", image: "🎹", correct: false },
                    { id: "violin", label: "Violin", image: "🎻", correct: false },
                  ]
                },
              ]
            },
          ]
        },
        {
          id: "music-l1-m2",
          title: "Rhythm & Beat",
          description: "Feel the rhythm",
          icon: "Drumstick",
          color: "#E67E22",
          unlocked: true,
          lessons: [
            {
              id: "music-l1-m2-lesson1",
              title: "Clap Along",
              description: "Clap to the beat",
              thumbnail: "/images/lessons/rhythm.jpg",
              duration: "5 min",
              rewardStars: 3,
              activities: [
                {
                  id: "act1",
                  type: "sequence",
                  question: "Follow the rhythm! Clap, Clap, Rest",
                  items: [
                    { id: "clap1", label: "Clap", correctPosition: 0 },
                    { id: "clap2", label: "Clap", correctPosition: 1 },
                    { id: "rest", label: "Rest", correctPosition: 2 },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ]
}

// All subjects combined
export const allSubjects: Subject[] = [
  englishCurriculum,
  mathsCurriculum,
  scienceCurriculum,
  codingCurriculum,
  musicCurriculum,
]

// Helper function to get subject by slug
export function getSubjectBySlug(slug: string): Subject | undefined {
  return allSubjects.find(s => s.slug === slug)
}

// Helper to get a specific lesson
export function getLesson(subjectSlug: string, lessonId: string): Lesson | undefined {
  const subject = getSubjectBySlug(subjectSlug)
  if (!subject) return undefined
  
  for (const level of subject.levels) {
    for (const module of level.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId)
      if (lesson) return lesson
    }
  }
  return undefined
}
