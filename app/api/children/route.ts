import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get the current user (must be a parent)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as a parent." },
        { status: 401 }
      )
    }
    
    // Verify user is a parent
    const role = user.user_metadata?.role
    if (role !== 'parent' && role !== 'admin') {
      return NextResponse.json(
        { error: "Only parents can create child accounts." },
        { status: 403 }
      )
    }
    
    // Get the parent's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()
    
    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Parent profile not found." },
        { status: 404 }
      )
    }
    
    const body = await request.json()
    const { name, age, username, password, learningLevel, avatarUrl } = body
    
    // Validate required fields
    if (!name || !age || !username || !password) {
      return NextResponse.json(
        { error: "Name, age, username, and password are required." },
        { status: 400 }
      )
    }
    
    // Validate age
    if (age < 2 || age > 12) {
      return NextResponse.json(
        { error: "Age must be between 2 and 12." },
        { status: 400 }
      )
    }
    
    // Validate username (alphanumeric, 3-20 chars)
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return NextResponse.json(
        { error: "Username must be 3-20 characters and contain only letters, numbers, and underscores." },
        { status: 400 }
      )
    }
    
    // Check if username already exists
    const { data: existingChild } = await supabase
      .from('children')
      .select('id')
      .eq('username', username.toLowerCase())
      .single()
    
    if (existingChild) {
      return NextResponse.json(
        { error: "This username is already taken. Please choose another." },
        { status: 409 }
      )
    }
    
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)
    
    // Create the child record
    const { data: child, error: createError } = await supabase
      .from('children')
      .insert({
        parent_id: profile.id,
        name: name.trim(),
        age: parseInt(age),
        username: username.toLowerCase(),
        password_hash: passwordHash,
        learning_level: learningLevel || 'beginner',
        avatar_url: avatarUrl || null,
      })
      .select()
      .single()
    
    if (createError) {
      console.error('Error creating child:', createError)
      return NextResponse.json(
        { error: "Failed to create child account. Please try again." },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: "Child account created successfully!",
      child: {
        id: child.id,
        name: child.name,
        age: child.age,
        username: child.username,
        learningLevel: child.learning_level,
      }
    })
    
  } catch (error) {
    console.error('Error in POST /api/children:', error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Get children for this parent
    const { data: children, error } = await supabase
      .from('children')
      .select('id, name, age, username, learning_level, avatar_url, created_at')
      .eq('parent_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching children:', error)
      return NextResponse.json(
        { error: "Failed to fetch children." },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ children: children || [] })
    
  } catch (error) {
    console.error('Error in GET /api/children:', error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
