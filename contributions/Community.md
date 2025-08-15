# Community page: how to add posts

Add your post links to this array:
- File: src/app/(community)/community/data/data.ts
- Export: communityPosts

Example:
```ts
// src/app/(community)/community/data/data.ts
export const communityPosts = [
  { url: "https://twitter.com/vercel/status/1790418522919100402" },
  { url: "https://x.com/nextjs/status/1790812345678900000" },
  { url: "https://www.linkedin.com/posts/...-activity-7361815034005504000-..." },
];
```

## Sample Content  to add in post 
>⚠️ do not exact copy paste personalise it with your words!! 

#### linkdin post ideas

```txt
1.
I’ve been testing a lot of AI tools lately, but switching between 10 different websites was tiring.

Last week I came across AIToolbox — it’s basically a collection of AI tools in one place.

So far, I’ve used:

Email Writer → helped me reply to client emails quickly

LinkedIn Post Generator → gave me a post outline in less than a minute

Image Generator → made a clean banner for my blog

Code Explainer → turned a confusing JS snippet into plain English

It’s been saving me a lot of time, and the best part is I don’t need to remember multiple logins or jump between tools.

If you’re into content creation, coding, or just want to get tasks done faster, it’s worth a try: https://aitoolbox.software/


2. 

Over the past few months, I’ve been experimenting with different AI tools for work and side projects.
The problem?
I had 10+ browser tabs open, each for a different AI tool.
Managing them was a nightmare.

Last week, I stumbled on AIToolbox — and it turned out to be the all-in-one platform I didn’t know I needed.

Here’s what stood out for me:

AI Email Writer – Writing professional emails now takes me less than a minute. I give it a short brief and get a polished draft ready to send.

LinkedIn Post Generator – Helps me break through writer’s block when I want to post but have no ideas.

Prompt Generator – Gives me ready-to-use prompts that improve ChatGPT and AI art results without trial and error.

Image Generator – I made a blog banner in under a minute with just one sentence of description.

Code Explainer – Explains complex code line-by-line in plain English, saving me hours of searching.

YouTube Summarizer – Turns 20-minute videos into 2-minute summaries with all the key points.

What I like most is that everything is under one login.
No need to remember multiple accounts or switch between sites.
I can handle content creation, design, coding, and even travel planning from the same dashboard.

If you’re a creator, developer, marketer, freelancer, or student looking to save time and get more done, this is worth checking out: https://aitoolbox.software/
```
#### tweet ideas 
```txt
1. Just tried AIToolbox's AI Email Writer — it drafts clear, professional emails in seconds. Big time-saver. [https://aitoolbox.software/email-writer](https://aitoolbox.software/email-writer)

2. I added the AIToolbox GPT Chatbot to my workflow — it answers questions and drafts ideas instantly. [https://aitoolbox.software/gpt-chatbot](https://aitoolbox.software/gpt-chatbot)

3. Struggling to write LinkedIn posts? AIToolbox LinkedIn Post Generator made one for me in seconds. [https://aitoolbox.software/linkedin-post-generator](https://aitoolbox.software/linkedin-post-generator)

4. I used AIToolbox Image Generator to make visuals for my posts — fast, sharp, and unique. [https://aitoolbox.software/image-generator](https://aitoolbox.software/image-generator)

5. Need better prompts? AIToolbox Prompt Generator gives clear, effective prompts for writing and images. [https://aitoolbox.software/prompt-generator](https://aitoolbox.software/prompt-generator)

6. I made a clean logo with AIToolbox Logo Generator in minutes. Simple to use and looks professional. [https://aitoolbox.software/logo-generator](https://aitoolbox.software/logo-generator)

7. Too long to watch? AIToolbox YouTube Summarizer gives quick, accurate video summaries so I get the key points fast. [https://aitoolbox.software/youtube-summarizer](https://aitoolbox.software/youtube-summarizer)

8. Stuck on code? AIToolbox Code Explainer breaks code into easy steps so I understand faster. [https://aitoolbox.software/code-explainer](https://aitoolbox.software/code-explainer)

9. I used AIToolbox Blog Writer to draft a clear blog post fast — saved hours on structure and tone. [https://aitoolbox.software/blog-writer](https://aitoolbox.software/blog-writer)

10. Updating my CV was easy with AIToolbox Resume Builder — clean format and strong wording suggestions. [https://aitoolbox.software/resume-builder](https://aitoolbox.software/resume-builder)

11. Planning a trip? I used AIToolbox AI Trip Planner for a clear travel plan and budget ideas — very handy. [https://aitoolbox.software/ai-trip-planner](https://aitoolbox.software/ai-trip-planner)

12. Want project ideas? AIToolbox AI Project Recommender gave me tailored project suggestions based on my skills. [https://aitoolbox.software/ai-project-recommender](https://aitoolbox.software/ai-project-recommender)


```


Notes:
- Supported: public Twitter/X tweet URLs and public LinkedIn post URLs.
- Order in the array = order shown on the page.
- The page uses SSR with oEmbed. If a platform’s oEmbed is unavailable, it auto-builds a valid embed (Twitter blockquote or LinkedIn iframe).
- No extra scripts or code changes needed. Visit /community to see the result.
- Cache revalidates every ~5 minutes; changes may take a moment to appear.
