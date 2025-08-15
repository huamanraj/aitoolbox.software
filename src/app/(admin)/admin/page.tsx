"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account, Databases, Storage, ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, 
  Link, 
  AlignLeft, 
  Image, 
  Edit3, 
  Save, 
  Plus, 
  LogOut,
  Loader2,
  Eye,
  Code
} from "lucide-react";
import { BLOGS_DB_ID, BLOGS_COLLECTION_ID, BLOG_COVERS_BUCKET_ID } from "@/lib/appwrite";

type BlogFormState = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverFileId?: string;
};

export default function AdminPage() {
  const router = useRouter();
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  
  const [client] = useState(() => {
    if (!endpoint || !project) return null as unknown as Client;
    return new Client().setEndpoint(endpoint).setProject(project);
  });
  
  const account = useMemo(() => (client ? new Account(client) : (null as unknown as Account)), [client]);
  const databases = useMemo(() => (client ? new Databases(client) : (null as unknown as Databases)), [client]);
  const storage = useMemo(() => (client ? new Storage(client) : (null as unknown as Storage)), [client]);
  
  const [userChecked, setUserChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [form, setForm] = useState<BlogFormState>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [existing, setExisting] = useState<any[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!account) throw new Error("No Appwrite client");
        const session = await account.get();
        if (!cancelled) {
          setUserId(session.$id);
          setUserChecked(true);
        }
      } catch (e) {
        setUserChecked(true);
        setUserId(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [account]);

  useEffect(() => {
    if (userChecked && !userId) {
      router.replace("/admin/login");
    }
  }, [userChecked, userId, router]);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/blogs?limit=25`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const list = await res.json();
        const sortedBlogs = (list.documents || [])
          .sort((a: any, b: any) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())
          .slice(0, 25);
        if (!cancelled) setExisting(sortedBlogs);
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!userChecked) return null;
  if (!userId) {
    return null; // Will redirect to /admin/login
  }

  const onLogout = async () => {
    try {
      if (account) {
        await account.deleteSession('current');
      }
      setUserId(null);
      toast.success("Logged out");
      router.replace("/admin/login");
    } catch (err: any) {
      console.error('Logout error:', err);
      toast.error("Logout failed");
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!storage) {
      toast.error("Storage client not initialized");
      return;
    }
    
    try {
      setUploading(true);
      const uploadedFile = await storage.createFile(BLOG_COVERS_BUCKET_ID, ID.unique(), file);
      setForm((prev) => ({ ...prev, coverFileId: uploadedFile.$id }));
      toast.success("Cover image uploaded");
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast.error(err?.message || "Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    if (!form.title || !form.slug) {
      toast.error("Title and slug are required");
      return;
    }
    
    if (!databases) {
      toast.error("Database client not initialized");
      return;
    }
    
    try {
      setSaving(true);
      
      const extractExcerpt = (markdown: string) => {
        if (!markdown) return "";
        // Remove markdown syntax and get plain text
        const plainText = markdown
          .replace(/#{1,6}\s/g, '') // Remove headers
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
          .replace(/\*(.*?)\*/g, '$1') // Remove italic
          .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
          .replace(/`(.*?)`/g, '$1') // Remove inline code
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/\n+/g, ' ') // Replace newlines with spaces
          .trim();
        return plainText.slice(0, 200);
      };

      const payload: any = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || extractExcerpt(form.content),
        content: form.content,
        coverFileId: form.coverFileId || undefined,
      };

      let createdOrUpdated: any;
      if (form.id) {
        createdOrUpdated = await databases.updateDocument(
          BLOGS_DB_ID, 
          BLOGS_COLLECTION_ID, 
          form.id, 
          payload
        );
        toast.success("Blog updated successfully");
      } else {
        createdOrUpdated = await databases.createDocument(
          BLOGS_DB_ID, 
          BLOGS_COLLECTION_ID, 
          ID.unique(), 
          payload
        );
        setForm((prev) => ({ ...prev, id: createdOrUpdated.$id }));
        toast.success("Blog published successfully");
      }
      
      // Redirect to the blog page after successful save
      setTimeout(() => {
        router.push(`/${payload.slug}`);
      }, 1000);
      
    } catch (err: any) {
      console.error("Save failed:", err);
      toast.error(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-white border-b border-zinc-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Blog Editor</h1>
              <p className="mt-2 text-zinc-600">Create and manage your blog content</p>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout} 
              className="rounded-none"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <Card className="rounded-none border-0 shadow-none bg-white">
            <CardContent className="p-6 space-y-6">
              
              {/* Load Existing */}
              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-zinc-500" />
                  Load Existing Post
                </Label>
                <Select onValueChange={(val) => {
                  const doc = existing.find((d) => d.$id === val);
                  if (doc) {
                    setForm({ 
                      id: doc.$id, 
                      title: doc.title || "", 
                      slug: doc.slug || "", 
                      excerpt: doc.excerpt || "", 
                      content: doc.content || "", 
                      coverFileId: doc.coverFileId 
                    });
                    toast.message("Loaded post", { description: doc.title });
                  }
                }}>
                  <SelectTrigger className="rounded-none text-sm">
                    <SelectValue placeholder="Select a post to load" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {existing.map((d) => (
                      <SelectItem key={d.$id} value={d.$id}>{d.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base flex items-center gap-2">
                  <Edit3 className="h-4 w-4 text-zinc-500" />
                  Title
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter your blog title"
                  className="rounded-none text-base"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-base flex items-center gap-2">
                  <Link className="h-4 w-4 text-zinc-500" />
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                  className="rounded-none text-base"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-base flex items-center gap-2">
                  <AlignLeft className="h-4 w-4 text-zinc-500" />
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief description for SEO and previews"
                  className="resize-y min-h-[100px] rounded-none text-base"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <Image className="h-4 w-4 text-zinc-500" />
                  Cover Image
                </Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={onFileChange}
                    className="rounded-none text-base"
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </div>
                  )}
                </div>
              </div>

              {/* Markdown Editor with Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-zinc-500" />
                    Content (Markdown)
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={!previewMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode(false)}
                      className="rounded-none"
                    >
                      <Code className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant={previewMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode(true)}
                      className="rounded-none"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
                
                <div className="border border-zinc-200 rounded-none min-h-[500px]">
                  <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <div className="h-full p-4">
                        <Textarea
                          value={form.content}
                          onChange={(e) => setForm({ ...form, content: e.target.value })}
                          placeholder="Write your blog content in Markdown..."
                          className="h-full resize-none border-0 focus-visible:ring-0 font-mono text-sm"
                        />
                      </div>
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <div className="h-full p-4 overflow-auto bg-zinc-50">
                        <div className="prose prose-zinc max-w-none">
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
                              p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-zinc-300 pl-4 italic my-4 text-zinc-600">
                                  {children}
                                </blockquote>
                              ),
                              code: ({ children }) => (
                                <code className="bg-zinc-200 px-1 py-0.5 rounded text-sm font-mono">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="bg-zinc-800 text-zinc-100 p-4 rounded-lg overflow-x-auto mb-4">
                                  {children}
                                </pre>
                              ),
                              table: ({ children }) => (
                                <table className="w-full border-collapse border border-zinc-300 mb-4">
                                  {children}
                                </table>
                              ),
                              th: ({ children }) => (
                                <th className="border border-zinc-300 px-3 py-2 bg-zinc-100 font-semibold text-left">
                                  {children}
                                </th>
                              ),
                              td: ({ children }) => (
                                <td className="border border-zinc-300 px-3 py-2">
                                  {children}
                                </td>
                              ),
                              a: ({ children, href }) => (
                                <a href={href} className="text-blue-600 hover:underline">
                                  {children}
                                </a>
                              ),
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                            }}
                          >
                            {form.content || "*Start typing to see preview...*"}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={onSave} 
                  disabled={saving || !form.title || !form.slug}
                  className="rounded-none text-base py-6 flex-1"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {form.id ? "Updating..." : "Publishing..."}
                    </>
                  ) : (
                    <>
                      {form.id ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Update Post
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Publish Post
                        </>
                      )}
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setForm({
                      title: "",
                      slug: "",
                      excerpt: "",
                      content: "",
                    });
                    toast.success("Form cleared");
                  }}
                  className="rounded-none text-base py-6"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


