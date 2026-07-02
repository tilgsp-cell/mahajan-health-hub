import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kuuydsyislbirnnadvsh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9k8R9Qm2lbGrwtHCV_tS8A_-0Vnbyc9";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
