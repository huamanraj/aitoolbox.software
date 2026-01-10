"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Heart, Book, Sparkles, Moon, Star } from "lucide-react";

export function BedtimeStoryGeneratorContent() {
  return (
    <div className="max-w-7xl mx-auto py-16 space-y-16">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">
          Create Magical Bedtime Stories That Your Child Will Love
        </h2>
        
        <p className="text-lg leading-relaxed">
          Every parent knows the challenge: it's bedtime, but your child wants "just one more story." You've read the same books dozens of times, and while you love those classics, wouldn't it be amazing to have unlimited fresh stories that are perfectly tailored to your child? Our <strong>free AI bedtime story generator</strong> creates personalized, magical tales featuring your child as the hero—complete with beautiful cover illustrations.
        </p>

        <p className="text-lg leading-relaxed">
          Unlike generic stories, each tale is customized with your child's name, interests, and even addresses their specific fears or challenges. Want a story about a brave dinosaur lover who learns to share? Or perhaps a tale about conquering the fear of darkness through adventure? Our AI crafts age-appropriate narratives that entertain while teaching valuable life lessons, making bedtime both fun and meaningful.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Why Parents Love AI-Generated Bedtime Stories
        </h3>

        <p className="leading-relaxed">
          Traditional bedtime routines can become repetitive, and busy parents don't always have time to invent new stories on the spot. Our AI bedtime story maker solves this challenge by providing unlimited personalized stories in seconds. Here's why thousands of parents across the US and Europe have made it part of their nightly routine:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Personalization Increases Engagement</h4>
                  <p className="text-muted-foreground text-sm">
                    When children hear their own name in a story and see themselves as the hero, they pay closer attention. Studies show personalized stories improve listening skills and comprehension by up to 40%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Book className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Teaches Life Lessons Naturally</h4>
                  <p className="text-muted-foreground text-sm">
                    Instead of lectures, children learn about sharing, bravery, honesty, and emotions through engaging narratives. Life lessons embedded in stories are remembered longer than direct instruction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Moon className="h-6 w-6 text-chart-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Addresses Fears and Anxieties</h4>
                  <p className="text-muted-foreground text-sm">
                    Fear of the dark, monsters under the bed, or starting school? Our stories gently address these anxieties, helping children develop coping strategies through imaginative scenarios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-chart-1 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Saves Time for Busy Parents</h4>
                  <p className="text-muted-foreground text-sm">
                    Generate a complete story in 30 seconds—perfect for those nights when you're exhausted but want to maintain a quality bedtime routine. No need to remember complex storylines or make things up on the fly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Popular Bedtime Story Themes for Kids
        </h3>

        <p className="leading-relaxed">
          Our AI can generate stories about virtually anything your child loves. Here are some of the most popular themes parents request:
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Bedtime Stories About Dinosaurs</h4>
        <p className="leading-relaxed">
          Dinosaurs are endlessly fascinating to children aged 3-7. Our dinosaur bedtime stories feature friendly T-Rexes, brave Triceratops, and flying Pterodactyls who teach lessons about friendship, sharing, and trying new things. Example: "Emma the Explorer and the Gentle Brachiosaurus" teaches patience while waiting for a new baby sibling, set in a prehistoric world of wonder.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Bedtime Stories for Anxious Kids</h4>
        <p className="leading-relaxed">
          Childhood anxiety is common, affecting 1 in 8 children. Our anxiety-focused stories help kids process worries about separation, darkness, loud noises, or new experiences. These stories validate feelings while providing coping strategies. For example, a story about a brave knight who discovers that shadows are just friends in disguise can help a 5-year-old overcome fear of the dark. The narrative approach makes abstract concepts tangible and manageable.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Space Adventure Bedtime Stories</h4>
        <p className="leading-relaxed">
          Perfect for budding astronauts and science enthusiasts aged 6-10. Space-themed stories combine wonder with educational elements—learning about planets, stars, and teamwork while embarking on intergalactic adventures. These stories often teach problem-solving and curiosity: "Noah's Mission to Mars" might involve fixing a spaceship through cooperation, subtly teaching the value of asking for help.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Animal Friends Stories</h4>
        <p className="leading-relaxed">
          Children naturally connect with animals. Stories featuring woodland creatures, farm animals, or pets teach empathy, kindness, and respect for nature. Popular scenarios include forest friends planning a surprise party (teaching thoughtfulness), or a lost puppy finding its way home (teaching perseverance and problem-solving). These gentle narratives work well for younger children (2-5 years) who are learning social skills.
        </p>

        <h4 className="text-xl font-semibold mt-8 mb-3">Princess and Knight Tales</h4>
        <p className="leading-relaxed">
          Classic but customizable! Modern fairy tales where princesses are scientists, knights cook delicious meals, and dragons need friends. These stories break stereotypes while maintaining the magic children love. Great for teaching that anyone can be brave, smart, and kind, regardless of traditional roles. "Princess Sophia the Inventor" might create a machine that helps her kingdom, teaching creativity and confidence.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Age-Appropriate Story Content Guide
        </h3>

        <p className="leading-relaxed">
          Choosing the right story for your child's age ensures they understand the lesson and stay engaged. Our AI automatically adjusts vocabulary, sentence structure, and themes based on the age you select:
        </p>

        <div className="space-y-6 my-8">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Ages 2-3 (Toddlers)</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Content:</strong> Very simple plots with repetition, familiar objects (toys, animals, family), and predictable outcomes. Stories are 100-150 words with simple vocabulary. <strong>Lessons:</strong> Basic concepts like colors, numbers, simple emotions (happy, sad), bedtime routines, and saying goodnight. <strong>Example themes:</strong> "Teddy Bear's Bedtime," "Counting Stars with Mommy," "The Sleepy Little Duck." Perfect for establishing bedtime routines and wind-down time.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Ages 4-5 (Preschool)</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Content:</strong> Clear beginning, middle, and end with gentle conflicts and resolutions. 200-250 words with descriptive language. Introduction to cause and effect. <strong>Lessons:</strong> Sharing, taking turns, being kind, simple problem-solving, expressing feelings, and following rules. <strong>Example themes:</strong> "Sharing the Last Cookie," "Making New Friends at the Playground," "The Brave Little Firefighter." Great for social-emotional learning during key developmental years.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Ages 6-7 (Early Elementary)</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Content:</strong> More complex plots with character development, dialogue, and descriptive settings. 250-350 words with richer vocabulary. <strong>Lessons:</strong> Honesty, responsibility, perseverance, empathy, dealing with disappointment, and trying new things. <strong>Example themes:</strong> "The Truth About the Broken Vase," "Training for the Big Race," "Starting at a New School." Addresses real-world situations kids face, helping them navigate social dynamics and personal challenges.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">Ages 8-10 (Elementary)</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Content:</strong> Adventure narratives with multiple characters, subplots, and moral dilemmas. 300-400 words with advanced vocabulary and metaphors. <strong>Lessons:</strong> Integrity, teamwork, resilience, decision-making, understanding different perspectives, and managing complex emotions. <strong>Example themes:</strong> "The Mystery of the Missing Trophy," "Leading the Team Through Challenges," "Standing Up for What's Right." These stories tackle deeper themes while maintaining age-appropriate content, perfect for kids developing critical thinking skills.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          How to Use Bedtime Stories Effectively
        </h3>

        <p className="leading-relaxed">
          Bedtime stories are more than just entertainment—they're powerful tools for bonding, learning, and establishing healthy sleep routines. Here's how to maximize the benefits of your AI-generated stories:
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Creating the Perfect Bedtime Story Routine
          </h5>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Consistent Timing:</strong> Read at the same time each night (ideally 30 minutes before sleep) to signal the body it's wind-down time.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Create Ambiance:</strong> Dim lights, comfortable position (snuggled together), and a calm environment enhance the experience.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Engage Actively:</strong> Use different voices for characters, pause for questions, and let your child predict what happens next.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Discuss the Story:</strong> After reading, ask "What did you think about how [character] solved the problem?" to reinforce lessons.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Save Favorites:</strong> Keep a collection of your child's favorite stories to revisit. Repetition is comforting and reinforces learning.</span>
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          The Science Behind Bedtime Stories
        </h3>

        <p className="leading-relaxed">
          Research consistently shows that bedtime stories provide significant developmental benefits. A 2019 study in the journal <em>Pediatrics</em> found that children who are read to regularly show stronger language skills, increased vocabulary, and better emotional regulation. Here's what the science tells us:
        </p>

        <div className="space-y-4 my-6">
          <div className="border-l-4 border-primary pl-4">
            <h5 className="font-semibold mb-2">Language Development</h5>
            <p className="text-sm text-muted-foreground">
              Exposure to rich vocabulary and sentence structures during story time (even if the child doesn't fully understand every word) builds neural pathways for language. Children who hear bedtime stories regularly develop reading readiness skills 6-12 months earlier than those who don't.
            </p>
          </div>

          <div className="border-l-4 border-chart-2 pl-4">
            <h5 className="font-semibold mb-2">Emotional Intelligence</h5>
            <p className="text-sm text-muted-foreground">
              Stories allow children to experience emotions vicariously—feeling what characters feel—which builds empathy. When a story addresses fears (like darkness or separation), children learn that feelings are normal and manageable, reducing anxiety over time.
            </p>
          </div>

          <div className="border-l-4 border-chart-4 pl-4">
            <h5 className="font-semibold mb-2">Bonding and Security</h5>
            <p className="text-sm text-muted-foreground">
              The physical closeness and focused attention during storytime release oxytocin (the "bonding hormone") in both parent and child. This strengthens attachment and creates positive associations with bedtime, reducing resistance to sleep.
            </p>
          </div>

          <div className="border-l-4 border-chart-1 pl-4">
            <h5 className="font-semibold mb-2">Improved Sleep Quality</h5>
            <p className="text-sm text-muted-foreground">
              Calm, predictable bedtime routines that include stories help regulate the body's circadian rhythm. Children with consistent bedtime story routines fall asleep 20% faster and experience fewer night wakings, according to sleep research.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Common Bedtime Challenges and Story Solutions
        </h3>

        <div className="space-y-6 my-8">
          <div>
            <h5 className="font-semibold text-lg mb-2">Challenge: "I'm not tired yet!"</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Story Solution:</strong> Generate a story about going to bed on time with a character who learns that sleep helps them have amazing adventures the next day. Frame sleep as gaining energy for tomorrow's fun, not missing out on tonight's.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Challenge: Fear of the dark or monsters</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Story Solution:</strong> Create stories where darkness is magical (stars appear, friendly nighttime animals come out) or where the "monster" turns out to be friendly and just wants a friend. Empower your child as the brave hero who befriends nighttime.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Challenge: Sibling rivalry</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Story Solution:</strong> Generate stories about siblings or friends learning to share, cooperate, and appreciate each other. Show characters solving problems together rather than competing.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Challenge: Anxiety about upcoming events (first day of school, doctor visit)</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Story Solution:</strong> Create a story where your child (as the character) successfully navigates a similar situation. Preview what will happen in a positive, empowering way through narrative.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6 my-8">
          <div>
            <h5 className="font-semibold text-lg mb-2">How long should bedtime stories be?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ideal story length varies by age: 2-3 years (5 minutes / 100-150 words), 4-5 years (5-7 minutes / 200-250 words), 6-7 years (7-10 minutes / 250-350 words), 8-10 years (10-15 minutes / 300-400 words). Our AI generates stories within these ranges automatically based on your child's age.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Can I use these stories for children with special needs?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Yes! Many parents use our generator for children with autism, ADHD, or anxiety disorders. You can specify sensory sensitivities or particular interests (like trains or numbers) to create stories that engage your child. For children with autism, predictable story structures and clear cause-effect relationships work well.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Will my child get bored of AI-generated stories?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlike reading the same book repeatedly, you can generate unlimited unique stories. Children often want the same story multiple times initially (which you can save), but you can easily create new variations. Change one element (add a new animal friend, try a different setting) to keep things fresh while maintaining familiar characters.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">What if my child wants to change the story mid-reading?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is normal creative play! You can either adapt on the fly (great for interactive storytelling) or generate a new story with the requested changes. Many parents involve their child in choosing story elements before generation: "Should we have a dragon or a unicorn tonight?"
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Are these stories culturally diverse?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Yes! The AI creates stories reflecting your child's background when you specify cultural elements or traditions in the interests field. You can request stories featuring diverse characters, multicultural celebrations, or different family structures.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Can I create series or continuing adventures?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Absolutely! Use the same interests and character setup across multiple nights, adding "This is the second adventure where..." to create continuity. Many parents create weekly adventures with recurring characters their child loves.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Tips for Busy Parents
        </h3>

        <p className="leading-relaxed">
          We know parenting is exhausting. Here's how to make bedtime stories work even on your toughest days:
        </p>

        <ul className="space-y-3 my-6">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span><strong>Generate During Dinner:</strong> While your child eats, quickly create tonight's story and print or save it. You'll be ready when bedtime comes.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span><strong>Create Story Collections:</strong> On weekends, generate 5-7 stories and save them. You'll have a week's worth ready to go.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span><strong>Involve Your Child:</strong> Let older kids (6+) help choose tonight's theme. It takes 30 seconds to change inputs and gives them ownership of the routine.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span><strong>Share with Caregivers:</strong> Copy stories to share with grandparents, babysitters, or your partner so everyone can participate in the routine.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span><strong>Remember: Progress Over Perfection:</strong> Even 5 minutes of connection through story time beats no story at all. Don't stress about making it perfect every night.</span>
          </li>
        </ul>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Start Creating Magical Bedtime Memories Tonight
        </h3>

        <p className="leading-relaxed">
          Bedtime doesn't have to be a battle. With our free AI bedtime story generator, you can transform those chaotic end-of-day moments into precious bonding time filled with imagination, learning, and love. Each personalized story helps your child develop language skills, process emotions, and feel seen and valued—all while drifting peacefully off to sleep.
        </p>

        <p className="leading-relaxed">
          Whether your child dreams of dinosaurs, space adventures, or magical kingdoms, our AI creates age-appropriate stories that captivate and comfort. Address their fears gently, teach life lessons naturally, and create memories that will last long after they've outgrown bedtime stories.
        </p>

        <p className="leading-relaxed font-semibold">
          Scroll up now and create tonight's magical bedtime story—completely free, personalized just for your child, ready in 30 seconds. Sweet dreams begin here! ✨
        </p>
      </article>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-4/10 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Moon className="h-8 w-8 text-primary" />
          <Heart className="h-6 w-6 text-chart-2" />
          <Star className="h-8 w-8 text-chart-4" />
        </div>
        <h3 className="text-2xl font-bold mb-4">
          Create Your Child's Bedtime Story Now
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of parents creating magical bedtime moments. Free, personalized, and ready in seconds. No signup required.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Create Bedtime Story
        </button>
      </div>
    </div>
  );
}
