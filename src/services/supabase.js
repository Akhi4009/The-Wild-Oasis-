import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://qwavsosofpfxvxzitssh.supabase.co'
const supabaseKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3YXZzb3NvZnBmeHZ4eml0c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyODcyMzUsImV4cCI6MjAyMTg2MzIzNX0.5v5pI4oQw2Q9ZAyqXyufv3iczA1N8aa07uj9eT7vQpA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;