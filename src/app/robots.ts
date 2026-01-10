import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/private"], // Disallow admin or private routes if any
        },
        sitemap: "https://aitoolbox.software/sitemap.xml",
    };
}
