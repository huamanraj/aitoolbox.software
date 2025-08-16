import ProductDescriptionClient from "./_components/product-description-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Product Description Generator - Create Compelling Product Descriptions",
  description:
    "Generate persuasive, SEO-optimized product descriptions for your e-commerce store with our AI-powered tool. Boost sales with compelling product copy.",
};

const productTypes = [
  {
    title: "E-commerce Products",
    description:
      "Create compelling descriptions for online stores that drive sales and conversions.",
  },
  {
    title: "Electronics & Gadgets",
    description:
      "Generate technical yet accessible descriptions for tech products and devices.",
  },
  {
    title: "Fashion & Apparel",
    description:
      "Craft stylish descriptions that highlight features, materials, and benefits.",
  },
  {
    title: "Home & Garden",
    description:
      "Write persuasive copy for household items, furniture, and outdoor products.",
  },
  {
    title: "Health & Beauty",
    description:
      "Develop engaging descriptions for cosmetics, skincare, and wellness products.",
  },
  {
    title: "Sports & Outdoors",
    description:
      "Create dynamic descriptions for fitness equipment, outdoor gear, and sports items.",
  },
];

export default function ProductDescriptionGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI Product Description Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your product features into compelling, sales-driven descriptions that convert browsers into buyers
            </p>
          </div>

          <ProductDescriptionClient />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {productTypes.map((type, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {type.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-medium mb-2">Enter Product Details</h3>
                <p className="text-sm text-muted-foreground">Add product name, key features, and specifications</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-medium mb-2">Choose Your Tone</h3>
                <p className="text-sm text-muted-foreground">Select the perfect voice for your target audience</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-medium mb-2">AI Generation</h3>
                <p className="text-sm text-muted-foreground">Our AI crafts a compelling product description</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">4</span>
                </div>
                <h3 className="font-medium mb-2">Copy & Use</h3>
                <p className="text-sm text-muted-foreground">Copy the description and use it in your store</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
