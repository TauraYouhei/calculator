import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://kpezezvyzkzshtgbhxdq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZXplenZ5emt6c2h0Z2JoeGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NDY3NTAsImV4cCI6MjA2MDUyMjc1MH0.Z4HIuXtexBW0aaZj-f5__RYfZkGLGnMNmTmz1arDa-o"
);
