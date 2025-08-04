import LinkedInPostGeneratorClient from "./_components/linkedin-post-generator-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Post Generator - Create Engaging Professional Posts",
  description:
    "Generate professional, engaging LinkedIn posts with our AI-powered tool. Create compelling content for networking, thought leadership, and professional growth.",
};

const postTypes = [
  {
    title: "Thought Leadership",
    description:
      "Share insights, industry knowledge, and professional expertise to establish authority.",
  },
  {
    title: "Career Updates",
    description:
      "Announce job changes, promotions, achievements, and career milestones.",
  },
  {
    title: "Professional Networking",
    description:
      "Connect with industry peers, share experiences, and build meaningful relationships.",
  },
  {
    title: "Industry Insights",
    description:
      "Comment on industry trends, news, and developments with your unique perspective.",
  },
  {
    title: "Company Updates",
    description:
      "Share company news, product launches, and organizational achievements.",
  },
  {
    title: "Personal Branding",
    description:
      "Build your personal brand through authentic storytelling and value-driven content.",
  },
];

export default function LinkedInPostGeneratorPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            LinkedIn Post Generator
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-center">
            Create professional, engaging LinkedIn posts that drive engagement and build your network.
            <br className="hidden sm:inline" />
            Our AI helps you craft compelling content for any professional purpose.
          </p>
        </header>
        <main>
          <LinkedInPostGeneratorClient />
        </main>

        <div className="grid gap-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {postTypes.map((type, index) => (
              <div key={index} className="border p-4 bg-white">
                <h3 className="font-medium mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Enter your topic or core message for the post</li>
            <li>Select your desired tone and add any key points</li>
            <li>Click generate to get a professional LinkedIn post</li>
            <li>Copy and paste directly to LinkedIn or edit as needed</li>
          </ol>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">LinkedIn Post Writing Tips</h2>
          <ul className="space-y-4">
            <li>
              <strong>Start with a hook:</strong> Capture attention in the first line to encourage reading.
            </li>
            <li>
              <strong>Keep it personal:</strong> Share your authentic experiences and insights.
            </li>
            <li>
              <strong>Use storytelling:</strong> Frame your message as a narrative that resonates.
            </li>
            <li>
              <strong>Include a call to action:</strong> Encourage engagement through questions or requests.
            </li>
            <li>
              <strong>Use relevant hashtags:</strong> Increase discoverability with strategic hashtag use.
            </li>
            <li>
              <strong>Optimize for mobile:</strong> Keep paragraphs short and use bullet points for readability.
            </li>
            <li>
              <strong>Post consistently:</strong> Maintain a regular posting schedule to build audience engagement.
            </li>
            <li>
              <strong>Engage with comments:</strong> Respond to comments to build community and increase visibility.
            </li>
          </ul>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">LinkedIn Content Strategy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Content Types That Perform Well</h3>
              <ul className="space-y-2 text-sm">
                <li>• Industry insights and analysis</li>
                <li>• Career milestones and achievements</li>
                <li>• Professional challenges and solutions</li>
                <li>• Company culture and team highlights</li>
                <li>• Educational content and tips</li>
                <li>• Behind-the-scenes content</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Best Practices for Engagement</h3>
              <ul className="space-y-2 text-sm">
                <li>• Post during peak hours (8-10 AM, 12-2 PM)</li>
                <li>• Use 3-5 relevant hashtags per post</li>
                <li>• Include images or videos when possible</li>
                <li>• Keep posts between 100-300 words</li>
                <li>• End with engaging questions</li>
                <li>• Tag relevant people and companies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Professional Networking on LinkedIn</h2>
          <p className="text-muted-foreground mb-4">
            LinkedIn is the world's largest professional network, with over 900 million members. 
            Creating engaging content is essential for building your professional brand and expanding your network.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border p-4 bg-white">
              <h4 className="font-medium mb-2">Build Authority</h4>
              <p className="text-sm text-muted-foreground">
                Share insights and expertise to establish yourself as a thought leader in your industry.
              </p>
            </div>
            <div className="border p-4 bg-white">
              <h4 className="font-medium mb-2">Expand Network</h4>
              <p className="text-sm text-muted-foreground">
                Connect with professionals, potential clients, and industry leaders through valuable content.
              </p>
            </div>
            <div className="border p-4 bg-white">
              <h4 className="font-medium mb-2">Career Growth</h4>
              <p className="text-sm text-muted-foreground">
                Showcase achievements and skills to attract new opportunities and career advancement.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            Mastering LinkedIn Content: A Professional's Guide to Engaging Posts
          </h2>

          <p>
            LinkedIn has evolved from a simple networking platform to the world's largest professional content ecosystem. 
            With over 900 million users, it represents an unprecedented opportunity to build your professional brand, 
            share insights, and connect with industry leaders. However, creating content that stands out in this crowded 
            space requires more than just posting updates—it demands strategic thinking, authentic storytelling, and 
            consistent value delivery.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Understanding the LinkedIn Algorithm
          </h3>

          <p>
            LinkedIn's algorithm prioritizes content that generates meaningful engagement. Unlike other social platforms 
            that focus on likes and shares, LinkedIn values comments, reactions, and profile visits. The algorithm 
            considers factors such as post length, media inclusion, hashtag usage, and the time of posting. 
            Understanding these mechanics helps you create content that performs better and reaches your target audience.
          </p>

          <p>
            Research shows that posts between 1,000-3,000 characters receive the highest engagement rates, while 
            those with 5-10 hashtags perform significantly better than posts with fewer or more hashtags. Additionally, 
            posts published on Tuesday through Thursday between 8-10 AM and 5-6 PM typically see higher engagement 
            rates, as professionals are most active during these windows.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Crafting Compelling Hooks
          </h3>

          <p>
            The first line of your LinkedIn post is crucial—it determines whether someone continues reading or scrolls 
            past. Effective hooks often start with questions, surprising statistics, personal stories, or bold statements. 
            For example, instead of writing "I'm excited to share our new product launch," try "What if I told you that 
            73% of companies are missing a crucial opportunity that could transform their business?"
          </p>

          <p>
            The key is to create curiosity and relevance. Your hook should immediately signal to your audience that 
            this content is valuable to them. Whether you're sharing a professional achievement, industry insight, or 
            personal story, the opening should make the reader think, "I need to read this."
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            The Power of Storytelling in Professional Contexts
          </h3>

          <p>
            Humans are wired for stories, and LinkedIn is no exception. The most engaging posts often follow a 
            narrative structure: they present a challenge, describe the journey, and share the outcome or lesson learned. 
            This approach works whether you're sharing a career milestone, discussing a business challenge, or 
            reflecting on industry changes.
          </p>

          <p>
            Consider the difference between these two approaches: "Our company increased revenue by 25% this quarter" 
            versus "Six months ago, our team faced a challenge that seemed impossible. We were losing clients faster 
            than we could acquire new ones, and morale was at an all-time low. Today, I'm proud to share that we've 
            not only turned things around but achieved 25% revenue growth. Here's what we learned..." The second 
            approach creates emotional investment and makes the achievement more relatable and inspiring.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Balancing Professionalism with Authenticity
          </h3>

          <p>
            LinkedIn's professional nature doesn't mean you need to be robotic or overly formal. The most successful 
            content creators on the platform strike a balance between professional credibility and human authenticity. 
            They share not just their successes but also their struggles, failures, and learning moments.
          </p>

          <p>
            This authenticity builds trust and makes your content more relatable. When you share both triumphs and 
            challenges, you demonstrate vulnerability and growth—qualities that resonate deeply with professional 
            audiences. Remember, your network wants to see the real person behind the professional title.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Strategic Hashtag Usage
          </h3>

          <p>
            Hashtags are LinkedIn's discovery mechanism, helping your content reach beyond your immediate network. 
            Effective hashtag strategy involves using a mix of popular, niche, and branded hashtags. Popular hashtags 
            like #leadership, #innovation, and #careeradvice help with broad discovery, while niche hashtags like 
            #fintech or #sustainability connect you with specific communities.
          </p>

          <p>
            Research shows that posts with 5-10 hashtags receive 50% more engagement than those with fewer hashtags. 
            However, quality matters more than quantity. Choose hashtags that are relevant to your content and audience, 
            and consider creating a branded hashtag for your personal or company content.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Encouraging Meaningful Engagement
          </h3>

          <p>
            LinkedIn rewards content that generates thoughtful comments and discussions. To encourage engagement, end 
            your posts with questions that invite responses, such as "What's your experience with this?" or "How do 
            you approach this challenge in your organization?" This not only increases your post's visibility but also 
            creates opportunities for networking and relationship building.
          </p>

          <p>
            When people comment on your posts, respond thoughtfully and promptly. This shows that you value their 
            input and encourages further interaction. Over time, these interactions can lead to meaningful professional 
            relationships and opportunities.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Consistency and Frequency
          </h3>

          <p>
            Building a strong LinkedIn presence requires consistency. While you don't need to post daily, maintaining 
            a regular posting schedule helps you stay top-of-mind with your network. Many successful LinkedIn creators 
            post 2-3 times per week, focusing on quality over quantity.
          </p>

          <p>
            Consistency also applies to your content themes and voice. While you can cover various topics, maintaining 
            a consistent perspective and approach helps build your personal brand and makes your content more recognizable 
            to your audience.
          </p>

          <p className="mt-6">
            Creating engaging LinkedIn content is both an art and a science. It requires understanding your audience, 
            staying authentic to your voice, and consistently delivering value. By combining strategic thinking with 
            genuine storytelling, you can build a LinkedIn presence that not only grows your network but also advances 
            your professional goals.
          </p>

          <p>
            Remember that LinkedIn success doesn't happen overnight. It's a long-term investment in your professional 
            brand that requires patience, persistence, and continuous learning. Start with small, consistent steps, 
            and over time, you'll build a powerful platform for professional growth and opportunity.
          </p>
        </div>
      </div>
    </div>
  );
} 