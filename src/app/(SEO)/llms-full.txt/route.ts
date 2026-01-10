import { NextResponse } from "next/server";
import { tools } from "@/data/tools";
import { blogPosts } from "@/data/blogs";

export const runtime = "edge";

export async function GET() {
    const baseUrl = "https://aitoolbox.software";

    const toolsList = tools
        .map((tool) => `### ${tool.name}\n\n- **Description**: ${tool.description}\n- **Category**: ${tool.category}\n- **Pricing**: ${tool.pricing}\n- **Link**: ${baseUrl}/${tool.slug}`)
        .join("\n\n");

    const blogsContent = blogPosts
        .map((post) => `## ${post.title}\n\n> ${post.excerpt}\n\n[Read on Website](${baseUrl}/blogs/${post.slug})\n\n${post.content}`)
        .join("\n\n---\n\n");

    const content = `
# AI Toolbox - Full Content

AI Toolbox provides 100% free AI tools for everyone. No signup required.

## Tools

${toolsList}

## Blog Posts

${blogsContent}

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
