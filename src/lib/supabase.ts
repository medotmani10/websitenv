import { createClient } from '@supabase/supabase-js'

// استخدام المتغيرات الحقيقية مع قيم افتراضية للبناء
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xqfnywimjnrvhoblutqt.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZm55d2ltam5ydmhvYmx1dHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3Mzg0NzYsImV4cCI6MjA2NDMxNDQ3Nn0.Yj2AX6Fl5auLggLc7Waux4caVdbtMx-3u14J914-EzQ'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZm55d2ltam5ydmhvYmx1dHF0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODczODQ3NiwiZXhwIjoyMDY0MzE0NDc2fQ.nj_ndZlZNdJKdjp1Gc2u9r4HgKTPfoi_sJ6Pbyd_nlQ'

// إنشاء عميل Supabase للقراءة العامة
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// إنشاء عميل Supabase للعمليات الإدارية
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// التحقق من إعداد Supabase
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey &&
         supabaseUrl.includes('xqfnywimjnrvhoblutqt.supabase.co')
}

// Types for our database
export interface Property {
  id: number
  title: string
  location: string
  price: string
  bedrooms: number
  bathrooms: number
  area: string
  phone: string
  features: string[]
  category: string
  status: 'available' | 'rented' | 'maintenance'
  featured: boolean
  images: string[]
  main_image: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

export interface Booking {
  id: number
  property_id: number
  user_id: string
  start_date: string
  end_date: string
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  notes: string
  created_at: string
  updated_at: string
}

// Database functions
export const propertyService = {
  // Get all properties
  async getAll() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Property[]
  },

  // Get available properties only
  async getAvailable() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Property[]
  },

  // Get featured properties
  async getFeatured() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Property[]
  },

  // Get property by ID
  async getById(id: number) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Property
  },

  // Create new property
  async create(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabaseAdmin
      .from('properties')
      .insert([property])
      .select()
      .single()

    if (error) throw error
    return data as Property
  },

  // Update property
  async update(id: number, updates: Partial<Property>) {
    const { data, error } = await supabaseAdmin
      .from('properties')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Property
  },

  // Delete property
  async delete(id: number) {
    const { error } = await supabaseAdmin
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Filter properties
  async filter(filters: {
    category?: string
    location?: string
    bedrooms?: number
    minPrice?: number
    maxPrice?: number
  }) {
    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')

    if (filters.category) {
      query = query.ilike('category', `%${filters.category}%`)
    }
    
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    
    if (filters.bedrooms) {
      query = query.eq('bedrooms', filters.bedrooms)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data as Property[]
  }
}

// User service
export const userService = {
  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Sign up
  async signUp(email: string, password: string, fullName: string, phone: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
    })

    if (error) throw error
    return data
  },

  // Sign in
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}

// Storage service for images
export const storageService = {
  // Upload image
  async uploadImage(file: File, bucket: string = 'property-images') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return publicUrl
  },

  // Delete image
  async deleteImage(filePath: string, bucket: string = 'property-images') {
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath])

    if (error) throw error
  }
}
