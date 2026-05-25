import type { Metadata } from "next";
import { signInAction } from "./actions";

export const metadata: Metadata = {
  title: "Sign in — FieldSignal Admin",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { error, next } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-9 py-12 bg-paper-2">
      <form
        action={signInAction}
        className="w-full max-w-md bg-paper border border-rule p-9 space-y-6"
      >
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            Admin sign-in
          </h1>
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
            FieldSignal staff only
          </p>
        </div>

        {error && (
          <div className="bg-red text-paper px-5 py-3 font-mono text-mono uppercase tracking-[0.08em]">
            {error}
          </div>
        )}

        <label className="block">
          <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink mb-2">
            Email
          </div>
          <input
            type="email"
            name="email"
            required
            autoFocus
            autoComplete="email"
            className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:border-ink"
          />
        </label>

        <label className="block">
          <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink mb-2">
            Password
          </div>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:border-ink"
          />
        </label>

        <input type="hidden" name="next" value={next ?? "/admin"} />

        <button
          type="submit"
          className="w-full bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors cursor-pointer"
        >
          Sign in →
        </button>

        <p className="font-mono text-micro text-ink-3 pt-4 border-t border-rule">
          Lost access? Reset your password via Supabase Dashboard → Authentication → Users.
        </p>
      </form>
    </div>
  );
}
