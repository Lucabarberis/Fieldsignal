/**
 * Minimal hand-written Database type for the Supabase client.
 *
 * Long term, replace this with auto-generated types via:
 *   npx supabase gen types typescript --project-id iezggzpyzqchpiqmagwk > lib/supabase/database-types.ts
 *
 * For now this hand-typed version keeps the .from("posts").insert(...)
 * calls type-safe.
 */

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          slug: string;
          title: string;
          description: string;
          body: string;
          author: string;
          tags: string[] | null;
          status: "draft" | "published";
          published_at: string;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          description: string;
          body: string;
          author?: string;
          tags?: string[];
          status?: "draft" | "published";
          published_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
        Relationships: [];
      };
      transcripts: {
        Row: {
          slug: string;
          display_id: string;
          title: string;
          description: string;
          expert_role: string;
          company_context: string;
          company_slug: string;
          topic_slug: string;
          topic_label: string;
          industry_slugs: string[];
          word_count: number;
          preview: string;
          gated_teaser: string;
          gated_content: string | null;
          related_slugs: string[];
          primary_kw: string;
          status: "draft" | "published";
          compliance_confirmed: boolean;
          published_at: string;
          updated_at: string | null;
          created_at: string;
        };
        Insert: {
          slug: string;
          display_id: string;
          title: string;
          description: string;
          expert_role: string;
          company_context: string;
          company_slug: string;
          topic_slug: string;
          topic_label: string;
          industry_slugs: string[];
          word_count: number;
          preview: string;
          gated_teaser: string;
          gated_content?: string;
          related_slugs?: string[];
          primary_kw: string;
          status?: "draft" | "published";
          compliance_confirmed?: boolean;
          published_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["transcripts"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
