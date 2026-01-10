"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Users, TrendingUp, Shield, Zap } from "lucide-react";

export function BioGeneratorContent() {
  return (
    <div className="max-w-7xl mx-auto py-16 space-y-16">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">
          Create the Perfect Social Media Bio with AI
        </h2>
        
        <p className="text-lg leading-relaxed">
          Your social media bio is often the first impression you make online. Whether you're building your personal brand on Instagram, establishing professional credibility on LinkedIn, entertaining on TikTok, or sharing thoughts on Twitter, your bio needs to capture attention instantly. Our <strong>free AI bio generator</strong> creates platform-optimized bios that help you stand out in seconds.
        </p>

        <p className="text-lg leading-relaxed">
          Stop staring at a blank profile wondering what to write. Our AI understands each platform's unique character limits, audience expectations, and best practices—generating 10 unique bio options tailored specifically for your chosen platform, role, and desired tone.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Why Use an AI Bio Generator?
        </h3>

        <p className="leading-relaxed">
          Crafting the perfect bio is challenging. You need to communicate your identity, value proposition, and personality—all within strict character limits. Our AI bio generator solves this by:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Instant Results</h4>
                  <p className="text-muted-foreground text-sm">
                    Generate 10 unique bio options in seconds. No more writer's block or spending hours crafting the perfect description.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Platform Optimized</h4>
                  <p className="text-muted-foreground text-sm">
                    Automatically respects character limits: Instagram (150), LinkedIn (220), TikTok (80), Twitter (160). Each bio is crafted for maximum impact on your chosen platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-chart-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Role-Specific Bios</h4>
                  <p className="text-muted-foreground text-sm">
                    Whether you're a content creator, entrepreneur, developer, or fitness trainer, get bios tailored to your profession with industry-relevant language.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-chart-1 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Multiple Tone Options</h4>
                  <p className="text-muted-foreground text-sm">
                    Choose from professional, casual, creative, witty, inspirational, bold, or minimalist tones to match your personal brand perfectly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Platform-Specific Bio Guide
        </h3>

        <h4 className="text-xl font-semibold mt-8 mb-3">Instagram Bio Generator (150 Characters)</h4>
        <p className="leading-relaxed">
          Instagram bios are your digital elevator pitch. With only 150 characters, every word counts. A great Instagram bio clearly states who you are, what you do, and why people should follow you. The best Instagram bios use emojis strategically to break up text and add personality, include a clear call-to-action (like "DM for collabs" or "Shop below ⬇️"), and may incorporate branded hashtags or location tags for discoverability.
        </p>
        <p className="leading-relaxed">
          Our AI Instagram bio generator creates bios that balance professionalism with personality, use line breaks effectively for readability, include relevant emojis without overwhelming the text, and maintain brand consistency. Whether you're an influencer, small business, or personal brand, your Instagram bio should communicate value at a glance.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">LinkedIn Bio Generator (220 Characters)</h4>
        <p className="leading-relaxed">
          Your LinkedIn headline (220 characters) is crucial for professional networking and job searching. It appears in search results, connection requests, and profile views—making it one of the most important pieces of text on your profile. A strong LinkedIn bio includes your current role and company, key skills or expertise areas, unique value proposition or achievement, and industry-relevant keywords for search optimization.
        </p>
        <p className="leading-relaxed">
          Unlike other platforms, LinkedIn bios should be more formal and achievement-focused. Our AI LinkedIn bio generator creates headlines that position you as an expert, include searchable keywords recruiters look for, highlight measurable achievements when possible, and maintain a professional yet approachable tone. Examples include: "Senior Product Manager at Tech Corp | Building AI Solutions | Ex-Google | Helping Startups Scale 10x" or "Digital Marketing Strategist | 50M+ in Revenue Generated | SEO & PPC Expert | Forbes Contributor."
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">TikTok Bio Generator (80 Characters)</h4>
        <p className="leading-relaxed">
          TikTok's 80-character limit demands ultra-concise creativity. The platform's young, trend-focused audience expects bios that are punchy, fun, and immediately understandable. Effective TikTok bios often use heavy emoji integration (emojis count as characters but add visual impact), trendy language or slang relevant to TikTok culture, clear content niche indication (e.g., "Daily cooking hacks 🍳"), and casual, conversational tone.
        </p>
        <p className="leading-relaxed">
          Our TikTok bio generator creates short, impactful bios optimized for Gen Z and millennial audiences. With only 80 characters, we focus on immediate impact—using emojis creatively to save space while adding personality, incorporating trending phrases or formats, and making your content type instantly clear. Examples: "20s life hacks ✨ | Making adulting easier 🎯" or "Gaming content 🎮 | Building in public 👾."
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Twitter/X Bio Generator (160 Characters)</h4>
        <p className="leading-relaxed">
          Twitter bios (160 characters) need to be witty, informative, and memorable. The platform's fast-paced, text-focused nature means your bio should capture your personality and interests quickly. Great Twitter bios often include what you tweet about (your content themes), your professional role or interests, a touch of personality or humor, and possibly relevant hashtags or mentions.
        </p>
        <p className="leading-relaxed">
          Our Twitter bio generator creates bios that reflect the platform's conversational culture while clearly stating your identity. We help you balance professionalism with personality, include your areas of expertise or interest, add a memorable hook or quirk, and stay authentic to your voice. Examples: "Software engineer by day, sci-fi novelist by night 🚀 | Building @TechStartup | Tweeting about AI, writing, & coffee ☕" or "Marketing strategist helping B2B SaaS companies grow | Marathon runner 🏃 | Dog dad to 2 golden retrievers."
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Bio Writing Best Practices by Role
        </h3>

        <div className="space-y-6 my-8">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Content Creators & Influencers</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Focus:</strong> Your niche and content type • <strong>Include:</strong> Upload schedule ("New videos every Tuesday"), collab info, or achievements (follower milestone) • <strong>Tone:</strong> Friendly, approachable, authentic • <strong>Emojis:</strong> Use liberally to show personality • <strong>Example:</strong> "Fashion & lifestyle creator 👗 | Sustainable style tips | 100K+ community 💚 | YouTube every Wed 📹"
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Entrepreneurs & Business Owners</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Focus:</strong> Your company and value proposition • <strong>Include:</strong> What your business does, who you help, key achievement • <strong>Tone:</strong> Professional but personable • <strong>Emojis:</strong> Use sparingly, professionally • <strong>Example:</strong> "Founder @ EcoClean | Helping 500+ offices go plastic-free ♻️ | Forbes 30 Under 30 | DM for partnerships"
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Developers & Tech Professionals</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Focus:</strong> Your tech stack and specialization • <strong>Include:</strong> Programming languages, current project/company, open-source contributions • <strong>Tone:</strong> Technical but accessible • <strong>Emojis:</strong> Tech-related emojis only • <strong>Example:</strong> "Full-stack dev @ Microsoft | React, Node.js, Python 🐍 | Open source contributor | Building cool stuff ⚡"
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Coaches & Consultants</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Focus:</strong> Your expertise and client transformation • <strong>Include:</strong> Who you help, results you deliver, credibility markers • <strong>Tone:</strong> Authoritative yet approachable • <strong>Emojis:</strong> Sparingly, professionally • <strong>Example:</strong> "Business coach | Helped 200+ entrepreneurs hit 6-figures 📈 | 15 years experience | Book a free clarity call 👉 link below"
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Artists & Creatives</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Focus:</strong> Your art style and medium • <strong>Include:</strong> What you create, where to buy/commission, achievements • <strong>Tone:</strong> Creative, expressive, unique • <strong>Emojis:</strong> Use artistically to enhance meaning • <strong>Example:</strong> "Digital artist 🎨 | Surreal portraits & fantasy landscapes | Commissions open ✨ | Featured in Art Monthly 📖"
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Fitness Trainers & Wellness Experts</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Focus:</strong> Your fitness philosophy and specialization • <strong>Include:</strong> Certifications, transformation results, training availability • <strong>Tone:</strong> Motivational, energetic, supportive • <strong>Emojis:</strong> Fitness-related emojis frequently • <strong>Example:</strong> "Certified PT 💪 | Helping busy moms get fit in 20min/day | 1000+ transformations | Online coaching 📲 DM to start"
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          How to Use Our Free Bio Generator Effectively
        </h3>

        <p className="leading-relaxed">
          Getting the best results from our AI bio generator is simple. Follow these steps for perfect bios every time:
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Step-by-Step Guide
          </h5>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 1:</strong> Select your platform (Instagram, LinkedIn, TikTok, or Twitter) to ensure proper character limits</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 2:</strong> Choose your role from the dropdown (Content Creator, Entrepreneur, Developer, etc.) for industry-appropriate language</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 3:</strong> Enter 3-5 keywords that describe you, your work, or your interests (e.g., "AI, startups, coffee, travel")</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 4:</strong> Select your desired tone (Professional, Casual, Creative, Witty, Inspirational, Bold, or Minimalist)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 5:</strong> Click "Generate 10 Bios" and wait 5-10 seconds for AI to create unique options</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 6:</strong> Review the 10 generated bios, check character counts, and copy your favorite with one click</span>
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Common Bio Mistakes to Avoid
        </h3>

        <p className="leading-relaxed">
          Even with AI assistance, it's important to avoid these common bio mistakes that can hurt your profile's effectiveness:
        </p>

        <div className="space-y-4 my-6">
          <div className="border-l-4 border-destructive pl-4">
            <h5 className="font-semibold mb-2">❌ Being Too Vague</h5>
            <p className="text-sm text-muted-foreground">
              "Entrepreneur | Passionate about business | Dream big" tells people nothing specific. Instead: "SaaS founder helping e-commerce brands automate customer service | Built & sold 2 startups."
            </p>
          </div>

          <div className="border-l-4 border-destructive pl-4">
            <h5 className="font-semibold mb-2">❌ Emoji Overload</h5>
            <p className="text-sm text-muted-foreground">
              Too many emojis make your bio hard to read and unprofessional. Use 2-4 emojis strategically, not 15. Bad: "🌟✨💫🚀🔥 Creator 🎨🎭🎪" Good: "Content creator 🎬 | Teaching social media marketing 📱"
            </p>
          </div>

          <div className="border-l-4 border-destructive pl-4">
            <h5 className="font-semibold mb-2">❌ Ignoring Keywords</h5>
            <p className="text-sm text-muted-foreground">
              Especially on LinkedIn, keywords matter for search. "I help people" is generic. "SEO consultant helping SaaS companies rank on Google" includes searchable terms that help you be found.
            </p>
          </div>

          <div className="border-l-4 border-destructive pl-4">
            <h5 className="font-semibold mb-2">❌ No Clear Value Proposition</h5>
            <p className="text-sm text-muted-foreground">
              Your bio should answer "Why should I follow/connect?" Don't just state facts; communicate value. Instead of "Marketer with 5 years experience," try "Marketing strategist who helped 50+ brands 3x their revenue in 90 days."
            </p>
          </div>

          <div className="border-l-4 border-destructive pl-4">
            <h5 className="font-semibold mb-2">❌ Outdated Information</h5>
            <p className="text-sm text-muted-foreground">
              Update your bio when you change jobs, hit milestones, or shift focus. A bio mentioning your 2020 project looks stale in 2025. Keep it current!
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6 my-8">
          <div>
            <h5 className="font-semibold text-lg mb-2">How does the AI bio generator work?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our AI uses advanced natural language processing trained on millions of successful social media profiles. When you input your platform, role, keywords, and tone, the AI generates 10 unique bios following platform-specific best practices, character limits, and audience expectations. Each bio is crafted to maximize engagement and clearly communicate your value.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Can I use the generated bios commercially?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Yes! All bios generated by our tool are yours to use however you like—personally or commercially. There are no usage restrictions, licensing fees, or attribution requirements. The bios are original creations based on your inputs.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Why do I get 10 bio options instead of just one?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Different approaches work for different people and contexts. By generating 10 unique bios, you can choose the one that resonates most with your personal brand, mix and match elements from multiple options, or test different bios to see which drives better engagement. Variety gives you flexibility and inspiration.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">What if a generated bio is too long?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our AI is trained to respect character limits, but occasionally a bio might be 1-2 characters over. You'll see a warning indicator showing which bios exceed the limit. Simply edit out a word or emoji to fit. Most generated bios will be well within limits for your selected platform.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Should I include emojis in my professional bio?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              It depends on your industry and platform. LinkedIn bios can include 1-2 professional emojis (like 🚀 or 💡) to add visual interest without looking unprofessional. Instagram and TikTok expect more emojis. Our AI adapts emoji usage based on the platform and tone you select. For very corporate industries (law, finance), you might remove emojis from generated bios.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">How often should I update my bio?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Update your bio whenever you change roles, hit significant milestones, shift content focus, or every 6-12 months to keep it fresh. For Instagram and TikTok, updating seasonally or when launching new content series can re-engage your audience. LinkedIn should be updated when you change jobs or gain new certifications.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Can I generate bios in different languages?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Currently, our bio generator creates bios in English, optimized for US audiences. While you can input keywords in other languages and the AI will work with them, the output structure and best practices follow English-language social media conventions.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Is my information stored or shared?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No. We don't store your inputs, generated bios, or any personal information. Each generation is processed in real-time and not saved to our servers. Your data privacy is important—we only use your inputs to generate bios in that moment, then discard them.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Start Creating Your Perfect Bio Today
        </h3>

        <p className="leading-relaxed">
          Your social media bio is valuable real estate—it's often the deciding factor in whether someone follows you, connects with you, or does business with you. With our free AI bio generator, you can create professional, engaging bios for any platform in seconds. No more writer's block, no more guessing what works, no more settling for mediocre profiles.
        </p>

        <p className="leading-relaxed">
          Generate unlimited bios for Instagram, LinkedIn, TikTok, and Twitter. Try different tones, experiment with keywords, and find the perfect bio that represents you authentically. Whether you're building a personal brand, growing your business, or simply want a better profile, the perfect bio is just one click away.
        </p>

        <p className="leading-relaxed font-semibold">
          Scroll up now and generate 10 unique bios in seconds—completely free, no signup required, unlimited uses.
        </p>
      </article>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Create Your Perfect Social Media Bio Now
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of creators, entrepreneurs, and professionals using our free AI bio generator. No signup, no limits, instant results.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Free Bios
        </button>
      </div>
    </div>
  );
}
