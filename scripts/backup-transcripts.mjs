// Dump the transcripts table to a JSON file. Restore path for content edits.
// Run: node --env-file=.env.local scripts/backup-transcripts.mjs <out.json>
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data, error } = await sb.from("transcripts").select("*");
if (error) { console.error(error.message); process.exit(1); }
fs.writeFileSync(process.argv[2], JSON.stringify(data, null, 2));
console.log(`Backed up ${data.length} rows -> ${process.argv[2]}`);
