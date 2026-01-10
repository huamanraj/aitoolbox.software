import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";
import { tools } from "@/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://aitoolbox.software";

    // Static routes
    const routes = [
        "",
        "/about",
        "/privacy-policy",
        "/terms",
        "/blogs",
        "/llms.txt",
        "/llms-full.txt",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
    }));

    // Blog routes
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        images: post.coverImage ? [post.coverImage.replace(/&/g, '&amp;')] : undefined,
    }));

    return [...routes, ...toolRoutes, ...blogRoutes];
}
