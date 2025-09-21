import PromptGeneratorClient from "./_components/prompt-generator-client";
import { ArrowRight, Bot, Code, Lightbulb, Sparkles, Target, Zap, BookOpen, List, MessageSquare, User, Settings, FileText, History, Search, PenTool, Brain, Puzzle, BarChart4, Laptop } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PromptGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Free AI Prompt Generator & Optimizer
          </h1>
          <p className="text-base text-muted-foreground mb-6">
            Transform basic prompts into powerful, professional instructions for
            ChatGPT, Claude, Gemini, and other AI models.
          </p>
        </header>

        <section className="mb-10">
          <PromptGeneratorClient />
        </section>

        {/* Prompt Examples Section */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5" />
            Proven Prompt Examples
          </h2>

          <div className="space-y-6">
            <div className="border p-4 rounded-none">
              <h3 className="font-medium text-lg mb-2">
                Creative Writing Assistant
              </h3>
              <div className="bg-zinc-50  p-3 border rounded-none text-sm mb-2">
                <pre className="whitespace-pre-wrap font-sans text-xs">
                  {`I need you to act as a creative writing coach focused on helping me craft compelling short stories. When I share a story idea or draft with you, first analyze its key elements (plot, character, setting, conflict, theme) and identify 3 specific strengths and 3 areas for improvement. Then provide actionable suggestions for enhancing character development, plot structure, dialogue, and emotional impact. Include one specific example of how to rewrite a weak section. Your feedback should be constructive, specific, and focused on helping me develop my unique voice while adhering to storytelling principles that engage readers. Let's begin with this story idea: [STORY IDEA].`}
                </pre>
              </div>
              <p className="text-sm text-zinc-600">
                This prompt creates a creative writing assistant that provides
                structured, specific feedback on your writing with actionable
                suggestions for improvement.
              </p>
            </div>

            <div className="border p-4 rounded-none">
              <h3 className="font-medium text-lg mb-2">Data Analysis Expert</h3>
              <div className="bg-zinc-50 p-3 border rounded-none text-sm mb-2">
                <pre className="whitespace-pre-wrap font-sans text-xs">
                  {`You are an expert data analyst with extensive knowledge of statistics, data visualization, and business intelligence. When I provide you with data or describe a dataset, help me analyze it by:

1. Identifying key patterns, trends, and outliers in the data
2. Suggesting appropriate statistical methods for deeper analysis
3. Recommending visualization approaches that would best communicate the insights
4. Explaining insights in business-friendly language without technical jargon
5. Pointing out potential data quality issues or biases to be aware of
6. Suggesting next steps for further investigation

When offering explanations, be clear and concise. If suggesting code, provide it in the appropriate language (Python/R/SQL) with brief comments. Here's my dataset or data question: [DATA OR QUESTION].`}
                </pre>
              </div>
              <p className="text-sm text-zinc-600">
                This system prompt transforms the AI into a data analysis expert
                who can help identify patterns, suggest appropriate statistical
                methods, and explain insights in accessible language.
              </p>
            </div>

            <div className="border p-4 rounded-none">
              <h3 className="font-medium text-lg mb-2">
                Product Development Consultant
              </h3>
              <div className="bg-zinc-50 p-3 border rounded-none text-sm mb-2">
                <pre className="whitespace-pre-wrap font-sans text-xs">
                  {`Act as a senior product development consultant with 15+ years of experience bringing successful digital products to market. I'll describe a product idea, and I need you to help me evaluate and develop it using a structured approach.

Please analyze my product idea across these dimensions:
- Target audience and user personas (identify 2-3 key personas)
- Problem validation (how serious is the problem and for whom)
- Market opportunity and competitive landscape
- Key features and prioritization (using MoSCoW method)
- Potential revenue models and pricing strategies
- Technical feasibility and implementation challenges
- Go-to-market strategy recommendations

For each area, provide actionable insights and specific next steps I should take. Include 3 critical questions I need to answer before moving forward, and suggest 2 low-cost ways to test key assumptions. Be honest about potential obstacles while maintaining a constructive approach.

My product idea is: [PRODUCT IDEA]`}
                </pre>
              </div>
              <p className="text-sm text-zinc-600">
                This prompt creates a product development consultant that helps
                evaluate and develop product ideas with actionable insights and
                strategic recommendations.
              </p>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <Card className="rounded-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  System Prompt Example
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="bg-zinc-50 p-3 border rounded-none text-sm mb-2">
                  <pre className="whitespace-pre-wrap font-sans text-xs">
                    {`You are ResearchGPT, an AI research assistant specifically designed to help academic researchers. Your capabilities include:

- Summarizing academic papers clearly and accurately
- Identifying key research methods, findings, and limitations
- Suggesting relevant papers based on a research topic
- Explaining complex concepts in simple terms
- Helping formulate research questions and hypotheses
- Providing balanced perspectives on scholarly debates
- Identifying gaps in research

When assisting with academic content, always maintain scientific accuracy, acknowledge limitations in current knowledge, and emphasize the importance of peer review. Never make up citations or claim expertise in extremely specialized fields beyond your training. When uncertain, acknowledge the limits of your knowledge.

Always ask clarifying questions before providing extensive answers on complex research topics. Prioritize helping the user understand concepts deeply rather than providing superficial answers.`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  User Prompt Example
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="bg-zinc-50 p-3 border rounded-none text-sm mb-2">
                  <pre className="whitespace-pre-wrap font-sans text-xs">
                    {`Create a comprehensive weekly meal plan for a family of 4 with the following requirements:

- Budget: $150 maximum for all meals
- Dietary needs: One vegetarian member, one with lactose intolerance
- Time constraints: Quick breakfasts (under 10 minutes), lunches that can be prepared ahead and packed, dinners under 45 minutes prep time
- Kitchen equipment: Instant Pot, basic cookware, no air fryer
- Cooking skill level: Intermediate
- Nutritional goals: Balanced macros, emphasis on protein and vegetables
- Preferences: The children (ages 8 and 12) prefer familiar foods, adults enjoy international cuisine
- Restrictions: No seafood, minimal processed foods

For each day, include:
1. Breakfast, lunch, and dinner with portion sizes
2. A simple shopping list organized by grocery department
3. Prep instructions noting what can be prepared in advance
4. Estimated cost per meal
5. Brief nutritional highlights

Also provide 3 versatile snack options that everyone can enjoy.`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Historical Context of Prompt Engineering */}
        <section className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <History className="h-5 w-5" />
            The Evolution of Prompt Engineering
          </h2>

          <div className="prose prose-zinc max-w-none">
            <p className="text-base mb-4">
              Prompt engineering has evolved rapidly alongside the development
              of large language models (LLMs). Understanding this history
              provides valuable context for creating effective prompts today.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">
                  Early Days: Command-Based Interactions
                </h3>
                <p className="text-base">
                  The concept of prompt engineering began with simple
                  command-based interactions with early AI systems. Users would
                  provide direct, explicit instructions to get specific outputs.
                  These early systems had limited understanding of context and
                  nuance, requiring humans to adapt their communication style to
                  the machine&apos;s limitations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  The Rise of Context Windows
                </h3>
                <p className="text-base">
                  As models like GPT-3 emerged in 2020, the importance of
                  context became apparent. These models could process longer
                  inputs and maintain context across multiple exchanges. This
                  led to the development of techniques like &quot;few-shot
                  learning,&quot; where examples could be provided within the
                  prompt to guide the model&apos;s responses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Chain-of-Thought and Advanced Reasoning
                </h3>
                <p className="text-base">
                  By 2022, researchers discovered that asking models to
                  &quot;think step-by-step&quot; dramatically improved their
                  reasoning abilities. This technique, known as chain-of-thought
                  prompting, became fundamental for complex problem-solving
                  tasks. It demonstrated that the way we ask questions
                  significantly impacts an AI&apos;s ability to think through
                  problems.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  System and User Prompts
                </h3>
                <p className="text-base">
                  Modern AI interfaces now differentiate between system prompts
                  (which define the AI&apos;s behavior, personality, and
                  constraints) and user prompts (specific instructions or
                  questions). This separation allows for more sophisticated
                  control over AI behavior while maintaining conversation flow.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Prompt Engineering as a Professional Skill
                </h3>
                <p className="text-base">
                  Today, prompt engineering has emerged as a valuable
                  professional skill. Organizations hire prompt engineers who
                  can effectively communicate with AI systems to generate
                  high-quality outputs. This specialization demonstrates how
                  human-AI communication has become a field requiring expertise
                  and strategic thinking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Prompt Problems and Solutions */}
        <section className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <Puzzle className="h-5 w-5" />
            Common Prompt Problems and Solutions
          </h2>

          <div className="space-y-6">
            <div className="border p-4 rounded-none">
              <div className="flex items-start">
                <div className="min-w-[24px] mr-3">
                  <PenTool className="h-5 w-5 text-zinc-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    Vague Instructions
                  </h3>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Problem:</span> &quot;Write me
                    a blog post about climate change.&quot;
                  </p>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Issue:</span> The prompt lacks
                    specificity on length, tone, audience, perspective, and
                    focus areas.
                  </p>
                  <p className="text-base text-zinc-600">
                    <span className="font-medium">Solution:</span> &quot;Write a
                    1000-word blog post about practical climate change solutions
                    for small businesses. Target audience is business owners
                    with limited environmental knowledge. Include 5 actionable
                    steps, relevant statistics, and cost considerations. Use a
                    professional but conversational tone with subheadings for
                    readability.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-none">
              <div className="flex items-start">
                <div className="min-w-[24px] mr-3">
                  <Brain className="h-5 w-5 text-zinc-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    Hallucinations and Inaccuracies
                  </h3>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Problem:</span> Receiving
                    responses with made-up facts, fabricated references, or
                    incorrect information.
                  </p>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Issue:</span> Not explicitly
                    instructing the AI to prioritize accuracy and admit
                    knowledge limitations.
                  </p>
                  <p className="text-base text-zinc-600">
                    <span className="font-medium">Solution:</span> &quot;Provide
                    information about [topic]. Only include facts you&apos;re
                    confident are accurate. Clearly distinguish between
                    established facts and areas of uncertainty or debate. If you
                    don&apos;t know something, explicitly state this rather than
                    guessing. Do not provide citations unless you can verify
                    they are real publications with accurate titles and
                    authors.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-none">
              <div className="flex items-start">
                <div className="min-w-[24px] mr-3">
                  <BarChart4 className="h-5 w-5 text-zinc-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    Inconsistent Output Format
                  </h3>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Problem:</span> Receiving data
                    or information in varying formats across different prompts.
                  </p>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Issue:</span> Not specifying
                    exact output structure requirements.
                  </p>
                  <p className="text-base text-zinc-600">
                    <span className="font-medium">Solution:</span> &quot;Analyze
                    the following financial data and present your findings in
                    this exact format: 1. Summary: 2-3 sentence overview of key
                    findings 2. Key Metrics: Present in a table with metrics in
                    first column, values in second column 3. Trends: Bullet
                    points identifying 3-5 significant trends 4.
                    Recommendations: Numbered list of exactly 3 actionable
                    recommendations Do not deviate from this structure or
                    include additional sections.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-none">
              <div className="flex items-start">
                <div className="min-w-[24px] mr-3">
                  <Laptop className="h-5 w-5 text-zinc-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    Technical Depth Mismatch
                  </h3>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Problem:</span> Receiving
                    explanations that are either too technical or too
                    simplified.
                  </p>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Issue:</span> Not specifying
                    the technical expertise level of your audience.
                  </p>
                  <p className="text-base text-zinc-600">
                    <span className="font-medium">Solution:</span> &quot;Explain
                    how neural networks function to someone with a solid
                    understanding of basic statistics and programming concepts,
                    but no machine learning background. Use appropriate
                    technical terms but define them when first used. Include
                    analogies that relate to software development concepts.
                    Avoid oversimplification but also avoid advanced
                    mathematical notation.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-none">
              <div className="flex items-start">
                <div className="min-w-[24px] mr-3">
                  <Search className="h-5 w-5 text-zinc-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    Lack of Critical Evaluation
                  </h3>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Problem:</span> The AI
                    provides answers without evaluating the validity or quality
                    of information.
                  </p>
                  <p className="text-base text-zinc-600 mb-2">
                    <span className="font-medium">Issue:</span> Not instructing
                    the AI to apply critical thinking or evaluation criteria.
                  </p>
                  <p className="text-base text-zinc-600">
                    <span className="font-medium">Solution:</span> &quot;Analyze
                    the following argument about [topic]. First, identify the
                    main claim and supporting evidence. Then critically evaluate
                    the argument by addressing: 1) the quality and relevance of
                    evidence, 2) logical fallacies or reasoning errors, 3)
                    alternative perspectives that aren&apos;t considered, and 4)
                    the strongest counterarguments. Conclude with a balanced
                    assessment of the argument&apos;s overall strengths and
                    weaknesses.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guide to Effective Prompt Engineering */}
        <section className="mt-16 prose prose-zinc max-w-none border-t pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5" />
            The Complete Guide to AI Prompt Engineering
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Target className="h-4 w-4" />
                What is Prompt Engineering?
              </h3>
              <p className="mt-2 text-base">
                Prompt engineering is the practice of crafting inputs for AI
                models to generate desired outputs. It involves designing clear,
                specific instructions that effectively communicate your
                intentions to the AI, allowing it to provide more accurate,
                relevant, and useful responses. As AI models evolve, the way we
                communicate with them becomes increasingly important for
                achieving optimal results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <List className="h-4 w-4" />
                Core Principles of Effective Prompts
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-medium">Clarity:</span>
                  <span>
                    Be explicit about what you want, avoiding ambiguity and
                    vague instructions.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Context:</span>
                  <span>
                    Provide relevant background information to help the AI
                    understand the situation.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Structure:</span>
                  <span>
                    Organize your prompt logically with a clear beginning,
                    middle, and end.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Specificity:</span>
                  <span>
                    Detail exactly what you need, including format, length,
                    tone, and other requirements.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Constraints:</span>
                  <span>
                    Define boundaries and limitations to guide the AI&apos;s
                    response appropriately.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Types of AI Prompts
              </h3>

              <div className="mt-4 space-y-4">
                <div className="border p-4 rounded-none">
                  <h4 className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    User Prompts
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    User prompts are the instructions you send to an AI during a
                    conversation to get a specific response. They focus on the
                    immediate task or question you want the AI to address.
                  </p>
                  <div className="mt-2 bg-zinc-50 p-3 border rounded-none text-sm">
                    <span className="text-xs font-semibold block mb-1">
                      Example:
                    </span>
                    &quot;Write a 500-word blog post about renewable energy
                    technologies. Focus on solar and wind power. Include 3
                    benefits for each technology and conclude with future
                    trends. Use a professional tone and include
                    subheadings.&quot;
                  </div>
                </div>
                z
                <div className="border p-4 rounded-none">
                  <h4 className="font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    System Prompts
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    System prompts define an AI&apos;s behavior, personality,
                    expertise, and operational parameters. They set the
                    foundation for how the AI will interact throughout a
                    conversation.
                  </p>
                  <div className="mt-2 bg-zinc-50 p-3 border rounded-none text-sm">
                    <span className="text-xs font-semibold block mb-1">
                      Example:
                    </span>
                    &quot;You are a financial advisor with 20+ years of
                    experience in retirement planning. You provide clear,
                    jargon-free advice based on established financial
                    principles. Always ask clarifying questions before giving
                    advice. Avoid making specific investment recommendations or
                    predictions. Present options with pros and cons rather than
                    definitive answers.&quot;
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Advanced Prompt Engineering Techniques
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-medium">Role assignment:</span>
                  <span>
                    Give the AI a specific persona or role to influence its
                    response style and expertise.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Chain-of-thought:</span>
                  <span>
                    Ask the AI to work through problems step-by-step, showing
                    its reasoning process.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Few-shot learning:</span>
                  <span>
                    Provide examples of desired inputs and outputs to guide the
                    AI&apos;s understanding.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Output formatting:</span>
                  <span>
                    Specify exactly how you want information structured (tables,
                    bullet points, etc.).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Iterative refinement:</span>
                  <span>
                    Use a series of prompts that build on previous responses to
                    achieve complex outputs.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Code className="h-4 w-4" />
                Prompt Templates
              </h3>
              <p className="mt-2 text-base">
                Using consistent templates can help structure your prompts
                effectively. Here are some useful templates:
              </p>

              <div className="mt-4 space-y-4">
                <div className="bg-zinc-50 p-3 border rounded-none text-sm">
                  <span className="font-medium block mb-1">
                    Content Creation Template:
                  </span>
                  <pre className="whitespace-pre-wrap text-xs">
                    {`Topic: [Specific topic]
Content type: [Blog post/Email/Social media/etc.]
Length: [Word count or parameters]
Audience: [Target audience details]
Tone: [Professional/Casual/Authoritative/etc.]
Key points to include: [List main points]
Call to action: [Desired reader action]
Format: [Structure, headings, etc.]`}
                  </pre>
                </div>

                <div className="bg-zinc-50 p-3 border rounded-none text-sm">
                  <span className="font-medium block mb-1">
                    Problem-Solving Template:
                  </span>
                  <pre className="whitespace-pre-wrap text-xs">
                    {`Problem description: [Detailed explanation]
Context: [Relevant background information]
Constraints: [Any limitations to consider]
Previous solutions attempted: [What you've already tried]
Desired outcome: [What a successful solution looks like]
Format for solution: [How you want the answer structured]`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Common Prompt Engineering Mistakes
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-medium">Being too vague:</span>
                  <span>
                    Lacking specific instructions leads to generic, unhelpful
                    responses.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Overwhelming complexity:</span>
                  <span>
                    Trying to achieve too much in a single prompt can confuse
                    the AI.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Ignoring context:</span>
                  <span>
                    Failing to provide necessary background information results
                    in misaligned responses.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">
                    Unspecified output format:
                  </span>
                  <span>
                    Not defining how you want information presented leads to
                    inconsistent results.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">Assuming AI knowledge:</span>
                  <span>
                    Expecting the AI to know specific context without providing
                    it.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Tips for Optimizing Your Prompts
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>Start with a clear instruction or question</li>
                <li>Use descriptive adjectives and specific verbs</li>
                <li>Break complex requests into multiple steps</li>
                <li>Specify the tone, style, and format you want</li>
                <li>Provide examples of desired outputs when possible</li>
                <li>Set constraints like word count or perspective</li>
                <li>
                  Ask the AI to &quot;think step-by-step&quot; for complex
                  problems
                </li>
                <li>Use iterative prompting to refine outputs</li>
                <li>Test and revise prompts based on results</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other AI Tools */}
        <section className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <Bot className="h-5 w-5" />
            Related AI Tools You Might Like
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/chatbot" className="no-underline">
              <Card className="hover:shadow-md transition-shadow rounded-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    AI Chatbot
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Chat with our versatile AI assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Get instant help, creative ideas, and expert answers. No
                    login required.
                  </p>
                  <div className="flex items-center text-primary mt-2 text-xs font-medium">
                    Try it now <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow rounded-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Code Generator
                </CardTitle>
                <CardDescription className="text-xs">
                  Coming soon
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Generate code snippets and complete functions in multiple
                  languages.
                </p>
                <div className="flex items-center text-muted mt-2 text-xs">
                  Coming soon <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">
                What is a prompt generator?
              </h3>
              <p className="text-base text-zinc-600">
                A prompt generator is a tool that helps you create optimized
                instructions (prompts) for AI systems like ChatGPT, Claude, or
                Gemini. It transforms basic instructions into more detailed,
                effective prompts that produce better AI responses by adding
                context, structure, and specific requirements.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">
                Why should I use a prompt generator?
              </h3>
              <p className="text-base text-zinc-600">
                Using a prompt generator helps you get more accurate, relevant,
                and useful responses from AI systems. Better prompts lead to
                better outputs, saving you time and ensuring you get the
                information or content you need without multiple revisions or
                clarifications.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">
                What&apos;s the difference between user prompts and system
                prompts?
              </h3>
              <p className="text-base text-zinc-600">
                User prompts are specific instructions or questions you ask an
                AI during a conversation to get information or content. System
                prompts define the AI&apos;s overall behavior, persona,
                expertise, and operational guidelines throughout the entire
                interaction. System prompts set the foundation, while user
                prompts handle specific requests.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">
                Can prompt engineering improve AI creativity?
              </h3>
              <p className="text-base text-zinc-600">
                Yes, effective prompt engineering can significantly enhance AI
                creativity. By providing the right context, constraints, and
                examples, you can guide AI systems to generate more innovative,
                unique, and creative outputs while still maintaining relevance
                to your specific needs.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">
                How do I know if my prompt is good?
              </h3>
              <p className="text-base text-zinc-600">
                A good prompt typically produces relevant, accurate responses
                that match your intended requirements. Signs of an effective
                prompt include receiving outputs that: 1) directly address your
                question or need, 2) follow your specified format, 3) maintain
                the requested tone and style, 4) include all requested
                components, and 5) require minimal or no revisions or
                clarifications.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}