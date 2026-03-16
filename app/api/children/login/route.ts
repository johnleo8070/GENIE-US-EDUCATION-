import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { username, password } = body
    
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      )
    }
    
    // Find the child by username
    const { data: child, error: findError } = await supabase
      .from('children')
      .select('id, name, age, username, password_hash, learning_level, avatar_url, parent_id')
      .eq('username', username.toLowerCase())
      .single()
    
    if (findError || !child) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, child.password_hash)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      )
    }
    
    // Create a child session cookie
    const cookieStore = await cookies()
    const childSession = {
      id: child.id,
      name: child.name,
      age: child.age,
      username: child.username,
      learningLevel: child.learning_level,
      avatarUrl: child.avatar_url,
      parentId: child.parent_id,
      loggedInAt: new Date().toISOString(),
    }
    
    // Set a secure cookie for the child session
    cookieStore.set('child_session', JSON.stringify(childSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    
    return NextResponse.json({
      success: true,
      message: `Welcome back, ${child.name}!`,
      child: {
        id: child.id,
        name: child.name,
        age: child.age,
        username: child.username,
        learningLevel: child.learning_level,
        avatarUrl: child.avatar_url,
      }
    })
    
  } catch (error) {
    console.error('Error in child login:', error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
