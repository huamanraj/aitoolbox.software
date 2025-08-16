import Link from "next/link";
import EmbedClient from "@/components/community/EmbedClient";
import { communityPosts } from "./data/data";

type EmbedItem = {
  url: string;
  html: string;
};

export const revalidate = 300; // Revalidate server render every 5 minutes

const isTwitter = (u: string) =>
  u.includes("twitter.com") || u.includes("x.com");
const isLinkedIn = (u: string) => u.includes("linkedin.com");

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Generate a canonical twitter.com URL (widgets.js handles twitter.com best)
function toTwitterUrl(u: string) {
  return u.replace(/^https?:\/\/x\.com/i, "https://twitter.com");
}

// Build a Twitter/X embed via blockquote with just the URL (widgets.js hydrates it)
function buildTwitterEmbed(url: string) {
  const href = escapeHtml(toTwitterUrl(url));
  return `<blockquote class="twitter-tweet"><a href="${href}"></a></blockquote>`;
}

// Attempt to extract a LinkedIn URN (activity/share/ugcPost) from a normal post URL
function buildLinkedInEmbed(url: string): string | null {
  // Try to parse activity ID from typical URLs like ...-activity-7361815034005504000-...
  const activityMatch = url.match(/activity-(\d+)/);
  if (activityMatch) {
    const id = activityMatch[1];
    return `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}" width="100%" height="420" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`;
  }

  // Try to parse share/ugcPost from URL (sometimes encoded in the URL)
  const shareMatch = url.match(/share[:%3A](\d+)/i);
  if (shareMatch) {
    const id = shareMatch[1];
    return `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:${id}" width="100%" height="420" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`;
  }

  const ugcMatch = url.match(/ugcPost[:%3A](\d+)/i);
  if (ugcMatch) {
    const id = ugcMatch[1];
    return `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${id}" width="100%" height="420" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`;
  }

  return null;
}

async function fetchOEmbed(url: string): Promise<string> {
  try {
    if (isTwitter(url)) {
      const endpoint =
        "https://publish.twitter.com/oembed?omit_script=1&dnt=1&align=center&hide_thread=1&url=" +
        encodeURIComponent(toTwitterUrl(url));
      const res = await fetch(endpoint, {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const data = (await res.json()) as { html?: string };
        if (data.html) return data.html;
      }
      // Fallback to blockquote embed
      return buildTwitterEmbed(url);
    } else if (isLinkedIn(url)) {
      const endpoint =
        "https://www.linkedin.com/oembed?url=" + encodeURIComponent(url);
      const res = await fetch(endpoint, {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const data = (await res.json()) as { html?: string };
        if (data.html) return data.html;
      }
      // Fallback to iframe built from parsed URN
      const iframe = buildLinkedInEmbed(url);
      if (iframe) return iframe;
    }
  } catch {
    // ignore and fall through
  }

  // Final fallback: plain link
  const safe = escapeHtml(url);
  return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${safe}</a>`;
}

async function getEmbeds(urls: string[]): Promise<EmbedItem[]> {
  const results = await Promise.all(
    urls.map(async (url) => ({
      url,
      html: await fetchOEmbed(url),
    }))
  );
  return results;
}

// Accept search params for pagination
export default async function CommunityPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

  const page = Math.max(1, Number(first(sp?.page) ?? 1));
  const pageSize = Math.max(1, Number(first(sp?.pageSize) ?? 9));

  // Keep array order (top links first)
  const urlsAll = communityPosts.map((p) => p.url).filter(Boolean);
  const total = urlsAll.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const start = (page - 1) * pageSize;
  const pageUrls = urlsAll.slice(start, start + pageSize);

  const embeds = await getEmbeds(pageUrls);

  return (
    <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Community</h1>
          <p className="text-sm text-muted-foreground">
            Latest posts from our community of builders and supporters.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {embeds.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No posts yet. Add links in data.ts.
            </div>
          ) : (
            embeds.map((item) => (
              <article
                key={item.url}
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 sm:p-3 overflow-hidden"
              >
                {/* Client component shows skeleton until embed hydrates */}
                <EmbedClient html={item.html} height={320} />
              </article>
            ))
          )}
        </div>

        {/* Pagination */}
        <nav
          className="mt-6 flex items-center justify-center gap-2"
          aria-label="Pagination"
        >
          <Link
            href={`/community?page=${Math.max(1, page - 1)}&pageSize=${pageSize}`}
            className={`px-3 py-1 rounded-md border ${
              page === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Prev
          </Link>

          {/* simple page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <Link
                  key={p}
                  href={`/community?page=${p}&pageSize=${pageSize}`}
                  className={`px-2 py-1 rounded ${
                    p === page
                      ? "bg-accent text-accent-foreground"
                      : "border"
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>

          <Link
            href={`/community?page=${Math.min(totalPages, page + 1)}&pageSize=${pageSize}`}
            className={`px-3 py-1 rounded-md border ${
              page === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Next
          </Link>
        </nav>
      </div>
    </div>
  );
}
