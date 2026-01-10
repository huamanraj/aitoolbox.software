import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Ensure URL has protocol
        const targetUrl = url.startsWith("http") ? url : `https://${url}`;
        const urlObj = new URL(targetUrl);
        const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

        // Fetch the main page
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; AI-Toolbox-Bot/1.0)",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch URL: ${response.statusText}` },
                { status: response.status }
            );
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Extract Metadata
        const title = $("title").text() || $('meta[property="og:title"]').attr("content") || "";
        const description = $('meta[name="description"]').attr("content") || $('meta[property="og:description"]').attr("content") || "";
        const h1 = $("h1").first().text().trim();

        // Extract Links (simple heuristic for main nav or important links)
        const links: { text: string; href: string }[] = [];
        $("a").each((_, el) => {
            const href = $(el).attr("href");
            const text = $(el).text().trim();
            if (href && text && !href.startsWith("#") && !href.startsWith("javascript:")) {
                // Normalize URL
                let fullHref = href;
                if (href.startsWith("/")) {
                    fullHref = `${baseUrl}${href}`;
                } else if (!href.startsWith("http")) {
                    return; // Skip relative links that aren't root relative for simplicity
                }

                // Avoid duplicates and same page
                if (fullHref !== targetUrl && !links.some(l => l.href === fullHref)) {
                    links.push({ text, href: fullHref });
                }
            }
        });

        // Limit links to top 20 to avoid clutter
        const topLinks = links.slice(0, 20);

        // Try to fetch sitemap (optional)
        let sitemapLinks: string[] = [];
        try {
            const sitemapUrl = `${baseUrl}/sitemap.xml`;
            const sitemapRes = await fetch(sitemapUrl);
            if (sitemapRes.ok) {
                const sitemapText = await sitemapRes.text();
                // Simple regex to find URLs in sitemap
                const matches = sitemapText.match(/<loc>(.*?)<\/loc>/g);
                if (matches) {
                    sitemapLinks = matches.map(m => m.replace(/<\/?loc>/g, "")).slice(0, 50); // Limit to 50
                }
            }
        } catch (e) {
            console.log("Could not fetch sitemap");
        }

        // Generate llms.txt content
        const llmsTxt = `
# ${title || "Website Summary"}

> ${description || "No description available."}

## Main Pages

${topLinks.map(l => `- [${l.text}](${l.href})`).join("\n")}

${sitemapLinks.length > 0 ? `
## Sitemap Links (Top 50)

${sitemapLinks.map(l => `- [Link](${l})`).join("\n")}
` : ""}
`.trim();

        // Generate llms-full.txt (Mocking full content by adding more details or structure)
        // In a real scenario, we would crawl these links. Here we just provide a structured list.
        const llmsFullTxt = `
# ${title || "Website Full Content"}

> ${description || "No description available."}

## Detailed Content Structure

${topLinks.map(l => `### ${l.text}\n\n[Visit Page](${l.href})\n`).join("\n")}

${sitemapLinks.length > 0 ? `
## All Pages

${sitemapLinks.map(l => `- ${l}`).join("\n")}
` : ""}
`.trim();

        return NextResponse.json({
            llmsTxt,
            llmsFullTxt,
            meta: { title, description, url: targetUrl }
        });

    } catch (error: any) {
        console.error("Error generating llms.txt:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
