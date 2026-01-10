import { NextResponse } from "next/server";
import { tools } from "@/data/tools";
import { blogPosts } from "@/data/blogs";

export const runtime = "edge";

export async function GET() {
    const baseUrl = "https://aitoolbox.software";

    const toolsList = tools
        .map((tool) => `- [${tool.name}](${baseUrl}/${tool.slug}): ${tool.description}`)
        .join("\n");

    const blogsList = blogPosts
        .map((post) => `- [${post.title}](${baseUrl}/blogs/${post.slug}): ${post.excerpt}`)
        .join("\n");

    const content = `
# AI Toolbox

AI Toolbox provides 100% free AI tools for everyone. No signup required.

[Full Content](${baseUrl}/llms-full.txt)

## Tools

${toolsList}

## Blog Posts

${blogsList}

## Legal

- [Privacy Policy](${baseUrl}/privacy-policy)
- [Terms of Service](${baseUrl}/terms)
- [About Us](${baseUrl}/about)
`.trim();

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
