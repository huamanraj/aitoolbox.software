import { tools } from "@/data/tools";

export const StructuredData = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Toolbox",
    alternateName: "Free AI Tools Platform",
    url: "https://aitoolbox.software/",
    description: "Free AI tools including image generator, writing assistant, photo editor, and more. All-in-one AI platform with no signup required.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://aitoolbox.software/?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Toolbox",
    url: "https://aitoolbox.software/",
    logo: "https://aitoolbox.software/logo.png",
    description: "All-in-one platform for free AI tools including image generation, writing assistance, and content creation.",
    sameAs: [],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        applicationCategory: tool.category,
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        url: `https://aitoolbox.software/tools/${tool.slug}`,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aitoolbox.software/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Tools",
        item: "https://aitoolbox.software/#tools",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AI Toolbox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI Toolbox is an all-in-one platform offering free AI-powered tools for everyone. From image generation to writing assistance, all tools are built into our platform and ready to use instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Are all the tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! All our core AI tools are completely free to use. Basic features require no signup, and you can start creating immediately.",
        },
      },
      {
        "@type": "Question",
        name: "How does the free image generator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our free AI image generator uses advanced AI models to create images from your text descriptions. Simply enter what you want to see, click generate, and get high-quality images in seconds.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
