const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lezukmxcbpdmchofdnkd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlenVrbXhjYnBkbWNob2ZkbmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MDA0ODUsImV4cCI6MjAyOTM3NjQ4NX0.ft5nyrqmLlgjRyHerDJ5rtEHOoxjFwJchM12UW6bdwk'
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase