"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BlogPost, blogPosts, blogCategories } from '@/data/blogs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Eye, Edit } from 'lucide-react';

interface BlogFormProps {
  blog?: BlogPost | null;
  onClose: () => void;
}

const BlogForm = ({ blog, onClose }: BlogFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    authorAvatar: '',
    category: '',
    coverImage: '',
    tags: '',
    readTime: '',
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        authorAvatar: blog.authorAvatar,
        category: blog.category,
        coverImage: blog.coverImage,
        tags: blog.tags.join(', '),
        readTime: blog.readTime,
      });
    }
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const newBlog: BlogPost = {
      slug,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      authorAvatar: formData.authorAvatar,
      date: new Date().toISOString().split('T')[0],
      readTime: formData.readTime,
      category: formData.category,
      coverImage: formData.coverImage,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    if (blog) {
      const index = blogPosts.findIndex(b => b.slug === blog.slug);
      if (index !== -1) {
        blogPosts[index] = { ...newBlog, slug: blog.slug };
        toast({
          title: "Blog updated",
          description: "The blog post has been updated successfully",
        });
      }
    } else {
      blogPosts.unshift(newBlog);
      toast({
        title: "Blog created",
        description: "New blog post has been created successfully",
      });
    }

    onClose();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl md:text-2xl">
          {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit" className="text-xs md:text-sm">
                  <Edit className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-xs md:text-sm">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-2">
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  required
                  className="font-mono text-xs md:text-sm"
                  placeholder="Write your content in markdown..."
                />
              </TabsContent>
              <TabsContent value="preview" className="mt-2">
                <div className="min-h-[300px] max-h-[500px] w-full rounded-md border border-input bg-background px-3 py-2 overflow-auto">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {formData.content ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {formData.content}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-muted-foreground italic text-sm">
                        Content preview will appear here...
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorAvatar">Author Avatar URL</Label>
              <Input
                id="authorAvatar"
                type="url"
                value={formData.authorAvatar}
                onChange={(e) => setFormData({ ...formData, authorAvatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {blogCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="5 min read"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="ai, tools, productivity"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
            <Button type="submit" className="flex-1">
              {blog ? 'Update Blog' : 'Create Blog'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
