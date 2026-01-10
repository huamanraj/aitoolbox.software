"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  icon: string;
  slug: string;
  trending?: boolean;
}

export const ToolCard = ({
  name,
  description,
  category,
  pricing,
  icon,
  slug,
  trending,
}: ToolCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className="h-full"
    >
      <Link href={`/${slug}`} className="block h-full">
        <Card className="h-full hover:shadow-lg transition-shadow duration-150 rounded-[18px]">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{name}</h3>
                  {trending && (
                    <Badge variant="secondary" className="mt-1">
                      Trending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            <div className="flex gap-2 mt-4">
              <Badge variant="outline" className="rounded-full">
                {category}
              </Badge>
              <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-primary/20">
                {pricing}
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-md group"
              asChild
            >
              <span className="flex items-center justify-center gap-2">
                Use this tool
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
