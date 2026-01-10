"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is AI Toolbox?",
    answer:
      "AI Toolbox is an all-in-one platform offering free AI-powered tools for everyone. From image generation to writing assistance, all tools are built into our platform and ready to use instantly. No external apps or complicated setups required.",
  },
  {
    question: "Are all the tools really free?",
    answer:
      "Yes! All our core AI tools are completely free to use. Basic features require no signup, and you can start creating immediately. We may offer premium features in the future, but the essential functionality will always remain free.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed for basic features! You can use our tools instantly without signing up. However, creating a free account lets you save your work, access history, and use advanced features.",
  },
  {
    question: "What kind of AI tools are available?",
    answer:
      "We offer a comprehensive suite of AI tools including: Free AI image generator from text, writing assistant and grammar checker, photo enhancer and background remover, text-to-speech and video transcriber, code formatter, SEO meta generator, and more. New tools are added regularly.",
  },
  {
    question: "How does the free image generator work?",
    answer:
      "Our free AI image generator uses advanced AI models to create images from your text descriptions. Simply enter what you want to see, click generate, and get high-quality images in seconds. It's perfect for social media, presentations, design mockups, and creative projects.",
  },
  {
    question: "Is my data safe and private?",
    answer:
      "Absolutely. We prioritize your privacy and security. Your generated content and data are processed securely, and we don't sell or share your information with third parties. Most tools run client-side in your browser for maximum privacy.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-16 px-4 ">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
