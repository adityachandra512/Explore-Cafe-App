// supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://rkcmmuysdzgovnyqznlb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrY21tdXlzZHpnb3ZueXF6bmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMzgyMTYsImV4cCI6MjA1MDgxNDIxNn0.7TCzOt6jlRTlme7yIyrKwWgH_UKOWkn9F7VjJMQb_Hw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})