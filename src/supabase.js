import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vkmpvtwcwhsdgpslcbhm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrbXB2dHdjd2hzZGdwc2xjYmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5OTY4MzgsImV4cCI6MjAwMzU3MjgzOH0.K7ZfzDljxDhQPQ3TCH6fjA6gkRJ33BhaG7KyjWSyXe8"
);
