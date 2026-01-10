"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Palette, Zap, Shield, Clock, Sparkles } from "lucide-react";

export function TattooGeneratorContent() {
  return (
    <div className="max-w-7xl mx-auto py-16 space-y-16">
      {/* Main Content Article */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">
          Transform Your Tattoo Ideas into Reality with AI
        </h2>
        
        <p className="text-lg leading-relaxed">
          Getting a tattoo is one of life's most personal decisions. It's a permanent piece of art that tells your story, commemorates special moments, or simply expresses who you are. But before you commit to ink, you need to visualize your design perfectly. That's where our <strong>free AI tattoo generator</strong> comes in—a revolutionary tool that transforms your ideas into stunning, professional-grade tattoo designs in seconds.
        </p>

        <p className="text-lg leading-relaxed">
          Unlike traditional tattoo design consultations that can cost hundreds of dollars and take weeks to complete, our AI-powered platform offers instant visualization completely free. Whether you're considering your first tattoo or adding to an existing collection, our generator helps you explore unlimited design possibilities before stepping into a tattoo studio.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Why Choose an AI Tattoo Generator?
        </h3>

        <p className="leading-relaxed">
          The tattoo industry has evolved dramatically, and artificial intelligence is now playing a crucial role in the design process. Here's why thousands of tattoo enthusiasts across the United States are using our free AI tattoo generator to plan their next piece:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Instant Visualization</h4>
                  <p className="text-muted-foreground text-sm">
                    See your tattoo concept come to life in 15-30 seconds. No waiting days or weeks for artist sketches. Perfect for those spontaneous creative moments when inspiration strikes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Palette className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Unlimited Iterations</h4>
                  <p className="text-muted-foreground text-sm">
                    Generate as many variations as you need. Try different styles, placements, and elements until you find the perfect design that resonates with your vision.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-chart-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Risk-Free Exploration</h4>
                  <p className="text-muted-foreground text-sm">
                    Test bold concepts without commitment. See how that full sleeve or intricate back piece would look before making a permanent decision.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-chart-1 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Save Time & Money</h4>
                  <p className="text-muted-foreground text-sm">
                    Avoid expensive consultation fees. Our free tool helps you refine your concept before meeting with your tattoo artist, making consultations more productive.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Complete Guide to Tattoo Styles
        </h3>

        <p className="leading-relaxed">
          Understanding different tattoo styles is essential for creating the perfect design. Our AI tattoo generator supports all major tattoo art styles popular in the United States. Here's your comprehensive guide:
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Traditional American Tattoos</h4>
        <p className="leading-relaxed">
          Also known as "old school," traditional American tattoos feature bold black outlines, limited color palettes (primarily red, yellow, green, and black), and iconic imagery like anchors, roses, eagles, and pin-up girls. This style originated in the early 1900s and remains one of the most popular choices for its timeless appeal and easy readability. Traditional tattoos age exceptionally well due to their bold lines and high contrast. Perfect for: First-time tattoo recipients, those seeking classic Americana aesthetics, bold statement pieces.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Minimalist Tattoos</h4>
        <p className="leading-relaxed">
          Minimalist tattoos embrace the "less is more" philosophy with clean lines, simple shapes, and meaningful symbolism. These designs often feature single-line drawings, small geometric patterns, or delicate symbols. Popular among millennials and Gen Z, minimalist tattoos are perfect for professional environments and can be easily concealed. They typically require shorter sessions and heal quickly. Common themes include nature elements (mountains, waves, trees), celestial bodies (moon, stars), and abstract representations of personal concepts. Ideal for: Professionals, first tattoos, subtle personal statements, wrist and finger placements.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Realistic Portrait Tattoos</h4>
        <p className="leading-relaxed">
          Realistic tattoos aim to replicate photographs with stunning accuracy. This technically demanding style requires exceptional shading skills and attention to detail. Popular subjects include loved ones' portraits, beloved pets, favorite celebrities, or meaningful photographs. Black and grey realism is most common, though color realism is increasingly popular. These tattoos require multiple sessions and significant investment but create breathtaking, photorealistic results. Best suited for: Memorial pieces, pet portraits, larger body areas like back, chest, or thigh.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Japanese Irezumi</h4>
        <p className="leading-relaxed">
          Japanese tattoo art, or Irezumi, has a rich history spanning centuries. This style features bold, flowing designs with symbolic imagery including dragons (wisdom and strength), koi fish (perseverance), cherry blossoms (life's transience), tigers (courage), and phoenixes (rebirth). Traditional Japanese tattoos often cover large areas and incorporate elements like wind, water, and clouds to create dynamic, story-driven compositions. The color palette is vibrant and intentional, with each color carrying specific meaning. Popular for: Full sleeves, back pieces, chest panels, those appreciating Asian art and symbolism.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Watercolor Tattoos</h4>
        <p className="leading-relaxed">
          Watercolor tattoos mimic the fluid, spontaneous appearance of watercolor paintings. These designs feature soft gradients, splashes of color, and minimal black outlines—creating an artistic, painterly effect. Popular subjects include flowers, birds, abstract designs, and silhouettes filled with colorful washes. While stunning, watercolor tattoos may require touch-ups over time as the colors can fade faster than traditional styles. Perfect for: Art enthusiasts, those seeking unique feminine designs, shoulder blades, ribs, and arms.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Geometric Tattoos</h4>
        <p className="leading-relaxed">
          Geometric tattoos use mathematical shapes, patterns, and sacred geometry to create visually striking designs. Popular elements include mandalas, tessellations, Fibonacci spirals, Metatron's Cube, and Flower of Life patterns. These tattoos often combine precision with spiritual or philosophical meaning. They can be minimalist or incredibly complex, and work beautifully in both black ink and color. Geometric tattoos are favored for their modern aesthetic and symbolic depth. Ideal for: Tech professionals, mathematics enthusiasts, those interested in sacred geometry, forearms and calves.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Neo-Traditional Tattoos</h4>
        <p className="leading-relaxed">
          Neo-traditional tattoos evolution the classic American traditional style with modern techniques. They maintain bold outlines but incorporate expanded color palettes, dimensional shading, and more intricate details. Popular subjects include animals, flowers, portraits, and mythological figures rendered with contemporary flair. This style bridges the gap between old and new, offering timeless appeal with modern execution. Best for: Those who love traditional tattoos but want more detail and color variety, mid-sized to large pieces.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Tribal Tattoos</h4>
        <p className="leading-relaxed">
          Tribal tattoos draw from indigenous cultures worldwide, featuring bold black patterns with cultural and spiritual significance. While popularized in the 1990s, authentic tribal designs carry deep meaning within specific cultures (Polynesian, Maori, Native American, Celtic). Modern tribal tattoos often blend traditional motifs with contemporary design elements. These tattoos are characterized by flowing, curvilinear patterns or geometric boldness depending on cultural origin. Suitable for: Those with cultural connections, lovers of bold black ink, shoulders, arms, and back.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Blackwork Tattoos</h4>
        <p className="leading-relaxed">
          Blackwork encompasses various styles united by the predominant use of solid black ink. This can include ornamental patterns, mandala-inspired designs, illustrative work, or abstract compositions. Blackwork ranges from delicate dotwork to bold, solid black sections. It's versatile, ages well, and creates dramatic visual impact. Subcategories include dotwork (created entirely with dots), blackout tattoos (solid black sections), and ornamental blackwork (intricate patterns). Perfect for: Bold statements, cover-up work, those preferring monochromatic designs.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Body Placement Guide: Where Should Your Tattoo Go?
        </h3>

        <p className="leading-relaxed">
          Choosing the right placement for your tattoo is as important as the design itself. Different body areas offer unique canvases with varying visibility, pain levels, and aging characteristics:
        </p>

        <div className="space-y-6 my-8">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Arm & Forearm</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Pain Level: Low to Moderate</strong> • The arm offers versatile placement options from small wrist tattoos to full sleeves. Forearms are popular for their visibility and relatively low pain level. Upper arms provide more privacy and work well for circular or wrapped designs. Arms age well and are easy to conceal when needed. Ideal for first tattoos or building a cohesive sleeve over time.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Full Sleeve</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Pain Level: Moderate</strong> • Full sleeves are ambitious projects covering the entire arm from shoulder to wrist. They allow for complex, narrative designs that flow naturally with the arm's shape. Sleeves typically require multiple sessions (10-30+ hours) and significant investment. They're showpieces that make bold statements. Consider starting with a half-sleeve to test your commitment before completing a full sleeve.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Back</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Pain Level: Low to Moderate</strong> • The back provides the largest canvas for elaborate designs. Upper back and shoulder blades are less painful, while the spine and lower back are more sensitive. Back tattoos age excellently due to minimal sun exposure and stable skin. They're perfect for intricate, large-scale artwork that you want to keep private in professional settings. Popular for: Full back pieces, wings, Japanese-style compositions, large animals or nature scenes.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Chest</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Pain Level: Moderate to High</strong> • Chest tattoos range from small pieces above the heart to full chest panels. The sternum and areas closer to bone are more painful. Chest tattoos are intimate and easily concealed, making them popular for meaningful designs. They work well for symmetrical designs, mandalas, or pieces that extend to the shoulders. Consider: Pain tolerance, body hair (for men), and whether you want a symmetrical or asymmetrical design.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Leg & Thigh</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Pain Level: Low to Moderate</strong> • Thighs offer substantial space with relatively low pain. Calves are popular for bold designs visible during summer. Legs provide flexibility for coverage—easily hidden for work or displayed casually. Outer thigh and calf are less painful than inner thigh or behind the knee. Excellent for: Large-scale designs, those wanting significant work without visible commitment, athletic individuals who want flexibility.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Shoulder</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Pain Level: Low</strong> • Shoulders are among the least painful areas with ample space for medium-sized designs. They can extend to the upper arm or back for larger compositions. Shoulder tattoos are easily concealed and age well. The rounded surface works beautifully for circular designs, mandalas, or organic flowing patterns. A popular starter location for those planning larger pieces.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Wrist & Hand</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Pain Level: Moderate to High</strong> • Wrist and hand tattoos are highly visible and increasingly accepted professionally. However, they fade faster due to frequent hand washing and sun exposure. Inner wrist is more painful than outer. Hand tattoos require frequent touch-ups. Best suited for: Simple, small designs, those in creative industries, commitment to a visible tattoo, people who don't mind regular maintenance.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          How to Use Our Free AI Tattoo Generator Effectively
        </h3>

        <p className="leading-relaxed">
          Getting the best results from our AI tattoo generator requires understanding how to craft effective prompts and utilize the available options. Follow these expert tips to create stunning designs:
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Crafting the Perfect Prompt
          </h5>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Be Specific:</strong> Instead of "dragon," try "fierce Chinese dragon with scales, breathing blue flames, wrapped around a sword"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Include Details:</strong> Mention colors, emotions, styles, and specific elements you want incorporated</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Reference Art Styles:</strong> Mention if you want "photorealistic," "cartoon-like," "abstract," or "detailed linework"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Consider Composition:</strong> Describe how elements should be arranged ("symmetrical," "flowing upward," "circular composition")</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Iterate and Refine:</strong> Generate multiple versions, then refine your prompt based on what works</span>
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Working with Your Tattoo Artist
        </h3>

        <p className="leading-relaxed">
          While our AI tattoo generator creates impressive designs, it's essential to work with a professional tattoo artist to bring your vision to life permanently. Here's how to use AI-generated designs effectively in your consultation:
        </p>

        <div className="space-y-4 my-6">
          <div className="border-l-4 border-primary pl-4">
            <h5 className="font-semibold mb-2">Use Designs as Reference Material</h5>
            <p className="text-sm text-muted-foreground">
              AI-generated tattoos are excellent starting points for discussions with your artist. They help communicate your vision clearly, showing the style, composition, and elements you want. Professional tattoo artists can then refine the design to work optimally with your body's contours and ensure it will age well.
            </p>
          </div>

          <div className="border-l-4 border-chart-2 pl-4">
            <h5 className="font-semibold mb-2">Discuss Technical Feasibility</h5>
            <p className="text-sm text-muted-foreground">
              Some AI-generated details may not translate well to actual tattoos due to size constraints, color limitations, or how ink behaves in skin over time. Your tattoo artist can advise on necessary modifications to ensure your tattoo looks great for years to come.
            </p>
          </div>

          <div className="border-l-4 border-chart-4 pl-4">
            <h5 className="font-semibold mb-2">Customize for Your Body</h5>
            <p className="text-sm text-muted-foreground">
              Every body is unique. A professional tattoo artist will adapt the design to complement your body shape, skin tone, existing tattoos, and the specific placement you've chosen. They understand how tattoos flow with muscle movement and how to optimize visual impact.
            </p>
          </div>

          <div className="border-l-4 border-chart-1 pl-4">
            <h5 className="font-semibold mb-2">Plan for Multiple Sessions</h5>
            <p className="text-sm text-muted-foreground">
              Large or complex designs typically require multiple sessions. Your artist can break down an AI-generated concept into manageable phases, allowing for proper healing between sessions and ensuring consistent quality throughout the piece.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Tattoo Aftercare and Maintenance
        </h3>

        <p className="leading-relaxed">
          Proper aftercare is crucial for ensuring your tattoo heals beautifully and maintains its appearance for years. While your tattoo artist will provide specific instructions, here are general guidelines for tattoo maintenance:
        </p>

        <p className="leading-relaxed">
          <strong>Initial Healing (Days 1-14):</strong> Keep the tattoo clean and moisturized with fragrance-free lotion. Avoid submerging in water (pools, baths, ocean) and don't pick at scabs. Wear loose clothing over the tattooed area and avoid direct sunlight. The tattoo will appear cloudy or dull during this phase—this is normal.
        </p>

        <p className="leading-relaxed">
          <strong>Long-term Care:</strong> Always apply high-SPF sunscreen to tattooed areas when exposed to sun. UV damage is the primary cause of fading and color degradation. Moisturize regularly to keep skin healthy. Stay hydrated and maintain overall skin health. Consider touch-ups every 5-10 years for colored tattoos, or as needed for areas with frequent friction.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6 my-8">
          <div>
            <h5 className="font-semibold text-lg mb-2">Can I use AI-generated tattoos exactly as shown?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-generated designs are excellent for inspiration and consultation, but should always be reviewed and refined by a professional tattoo artist. Artists can make necessary technical adjustments to ensure the design translates well to skin and ages beautifully. They'll also ensure the design works with your body's specific anatomy and placement.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">How much will my tattoo cost?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tattoo costs vary widely based on size, complexity, artist experience, and geographic location. In the United States, expect to pay $100-$300 per hour for experienced artists, with minimum charges of $80-$150 for small pieces. A full sleeve can cost $1,500-$6,000+, while small tattoos might be $50-$200. Always prioritize quality over price—good tattoos aren't cheap, and cheap tattoos aren't good.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">How painful are tattoos?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pain levels vary by individual pain tolerance and body placement. Areas with more muscle and fat (outer arm, thigh, calf) are generally less painful than bony areas (ribs, spine, hands, feet) or sensitive areas (inner arm, neck). Most people describe the sensation as a scratching or burning feeling. Sessions longer than 2-3 hours become more uncomfortable as endorphins wear off. Take breaks as needed.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">How do I find a reputable tattoo artist?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Research local artists' portfolios on Instagram or their websites. Look for artists who specialize in the style you want—every artist has strengths in specific styles. Read reviews, check their studio's cleanliness certifications, and verify they follow proper sterilization procedures. Schedule consultations with 2-3 artists before deciding. A reputable artist will listen to your ideas, provide honest feedback, and show enthusiasm for the project.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Can tattoos be removed or covered up?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Yes, but both options have considerations. Laser removal takes multiple sessions (typically 6-12+), is expensive ($200-$500 per session), and can be painful. Complete removal isn't always possible, especially with certain colors. Cover-ups are often more practical but require the new design to be larger and darker than the original. Skilled artists can create beautiful cover-up pieces, but your design options will be somewhat limited by the existing tattoo.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Are there age restrictions for tattoos?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In the United States, you must be 18 years old to get a tattoo without parental consent. Some states allow minors to get tattoos with parental permission and presence, but age requirements vary by state. Many reputable artists won't tattoo minors even with parental consent. It's generally recommended to wait until you're mature enough to make permanent body modification decisions.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">How long does a tattoo session take?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Session length depends on size and complexity. Small tattoos might take 30 minutes to 2 hours, while larger pieces require 3-8 hour sessions. Very large projects like full sleeves or back pieces span multiple sessions scheduled weeks apart to allow healing. Your artist will provide time estimates during consultation. First-time tattoo recipients should start with shorter sessions to gauge their pain tolerance.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Start Your Tattoo Journey Today
        </h3>

        <p className="leading-relaxed">
          Our free AI tattoo generator empowers you to explore endless design possibilities without cost or commitment. Whether you're planning your first tattoo or your fiftieth, visualization is key to ensuring you'll love your ink for life. Generate unlimited designs, experiment with different styles and placements, and discover what resonates with your personal aesthetic.
        </p>

        <p className="leading-relaxed">
          Remember, a tattoo is a collaboration between your vision and your artist's expertise. Use our AI generator to clarify your ideas, then work with a professional tattoo artist to bring your dream design to life. The combination of AI-powered inspiration and human artistry creates truly exceptional tattoos that you'll treasure forever.
        </p>

        <p className="leading-relaxed font-semibold">
          Ready to visualize your perfect tattoo? Scroll up and start generating your custom designs now—completely free, no login required, unlimited generations.
        </p>
      </article>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Create Your Dream Tattoo Design Now
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of tattoo enthusiasts who use our free AI generator to visualize their perfect ink. No signup, no limits, no cost.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Free Tattoo Design
        </button>
      </div>
    </div>
  );
}
