import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://avqhfygyiqxkhbajimro.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2cWhmeWd5aXF4a2hiYWppbXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1NzgxODIsImV4cCI6MjAxNzE1NDE4Mn0.vhsstSB7DBmVXcAVjMwFzuJ_I5QEZrMIw0IzfQJbER8";

export default supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
