"use client";

import { useState } from 'react';
import { blogPosts, BlogPost } from '@/data/blogs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface BlogListProps {
  onEdit: (blog: BlogPost) => void;
}

const BlogList = ({ onEdit }: BlogListProps) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);

  const handleDelete = (blog: BlogPost) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      const index = blogPosts.findIndex(b => b.slug === blogToDelete.slug);
      if (index !== -1) {
        blogPosts.splice(index, 1);
        toast({
          title: "Blog deleted",
          description: "The blog post has been deleted successfully",
        });
      }
    }
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold">Manage Blogs</h2>
        
        {blogPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-sm md:text-base text-muted-foreground">
                No blog posts yet. Create your first one!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {blogPosts.map((blog) => (
              <Card key={blog.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="mb-2 text-base md:text-lg line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs md:text-sm">
                        {blog.excerpt}
                      </CardDescription>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">
                          {blog.category}
                        </Badge>
                        <span className="text-xs md:text-sm text-muted-foreground">
                          by {blog.author} • {blog.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 md:gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10"
                        onClick={() => onEdit(blog)}
                      >
                        <Edit className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10"
                        onClick={() => handleDelete(blog)}
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{blogToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BlogList;
