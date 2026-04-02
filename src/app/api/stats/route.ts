// app/api/stats/route.ts

import { NextResponse } from "next/server";

const THM_USERNAME = "harshitgupta3017";
const LC_USERNAME = "_Harshit";
const GITHUB_USERNAME = "HarshitGupta3017";

/* ── helpers ── */
function daysSince(isoDate: string): number {
    const base = new Date(isoDate);
    const now = new Date();
    // floor — only count fully elapsed days
    return Math.floor((now.getTime() - base.getTime()) / 86_400_000);
}

/* ─────────────────────────────────────────────────────────────
   TRYHACKME
───────────────────────────────────────────────────────────── */
async function fetchTHM() {
    try {
        const res = await fetch(
            `https://tryhackme.com/api/user/public-profile?username=${THM_USERNAME}`,
            { next: { revalidate: 3600 }, headers: { "User-Agent": "Mozilla/5.0" } }
        );
        if (!res.ok) throw new Error("THM fetch failed");
        const data = await res.json();
        const p = data?.data ?? data;
        return {
            streak: p?.streak ?? null,
            rank: p?.title ?? "Wizard 0xA",
            points: p?.points ?? null,
            completed: p?.completedRooms ?? null,
        };
    } catch {
        // Fallback: known streak on a known date + days elapsed since
        const BASE_STREAK = 182;
        const BASE_DATE = "2026-03-24";
        return {
            streak: BASE_STREAK + daysSince(BASE_DATE),
            rank: "Wizard 0xA",
            points: null,
            completed: null,
        };
    }
}

/* ─────────────────────────────────────────────────────────────
   LEETCODE
───────────────────────────────────────────────────────────── */
async function fetchLeetCode() {
    const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum { difficulty count }
        }
        userCalendar {
          streak
          totalActiveDays
        }
        profile { ranking }
      }
    }
  `;

    try {
        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { username: LC_USERNAME } }),
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error("LC fetch failed");
        const json = await res.json();
        const user = json?.data?.matchedUser;

        const allSolved = user?.submitStats?.acSubmissionNum
            ?.find((s: any) => s.difficulty === "All")?.count ?? null;

        const apiStreak = user?.userCalendar?.streak ?? 0;
        const BASE_STREAK = 693;
        const BASE_DATE = "2026-03-24";
        const finalStreak = Math.max(apiStreak, BASE_STREAK + daysSince(BASE_DATE));

        return {
            streak: finalStreak,
            solved: allSolved,
            ranking: user?.profile?.ranking ?? null,
            active: user?.userCalendar?.totalActiveDays ?? null,
        };
    } catch {
        // Fallback: known streak on a known date + days elapsed since
        const BASE_STREAK = 693;
        const BASE_DATE = "2026-03-24";
        return {
            streak: BASE_STREAK + daysSince(BASE_DATE),
            solved: 967,
            ranking: null,
            active: null,
        };
    }
}

/* ─────────────────────────────────────────────────────────────
   GITHUB
───────────────────────────────────────────────────────────── */
async function fetchGitHub() {
    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            { next: { revalidate: 3600 }, headers: { "User-Agent": "Mozilla/5.0" } }
        );
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data = await res.json();
        // Get contributions from the last year using GraphQL
        const contribRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/HarshitGupta3017?t=${Date.now()}`
        );
        const contribData = await contribRes.json();
        const totalContrib = contribData?.total
            ? Object.values(contribData.total).reduce((acc: number, val: any) => acc + (Number(val) || 0), 0)
            : null;

        return {
            contributions: totalContrib,
            repos: data?.public_repos ?? null,
            followers: data?.followers ?? null,
        };
    } catch {
        return {
            contributions: null,
            repos: null,
            followers: null,
        };
    }
}

/* ─────────────────────────────────────────────────────────────
   HANDLER
───────────────────────────────────────────────────────────── */
export async function GET() {
    const [thm, lc, gh] = await Promise.all([fetchTHM(), fetchLeetCode(), fetchGitHub()]);
    return NextResponse.json(
        { thm, lc, gh, fetchedAt: new Date().toISOString() },
        { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
}