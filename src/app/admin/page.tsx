"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
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
  Loader2
} from "lucide-react";

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
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((prev) => ({ ...prev, coverFileId: data.$id || data.id }));
      toast.success("Cover image uploaded");
    } catch (err: any) {
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
    try {
      setSaving(true);
      const extractExcerpt = (html: string) => {
        if (!html) return "";
        const el = document.createElement("div");
        el.innerHTML = html;
        const firstP = el.querySelector("p");
        const text = (firstP?.textContent || el.textContent || "").trim();
        return text.slice(0, 200);
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
        const res = await fetch(`/api/blogs/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        createdOrUpdated = await res.json();
        toast.success("Blog updated successfully");
      } else {
        const res = await fetch(`/api/blogs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        createdOrUpdated = await res.json();
        setForm((prev) => ({ ...prev, id: createdOrUpdated.$id }));
        toast.success("Blog published successfully");
      }
      
      // Redirect to the blog page after successful save
      setTimeout(() => {
        router.push(`/${payload.slug}`);
      }, 1000);
      
    } catch (err: any) {
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

              {/* Content Editor */}
              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-zinc-500" />
                  Content
                </Label>
                <div className="border border-zinc-200 rounded-none min-h-[400px]">
                  <RichEditor 
                    value={form.content} 
                    onChange={(html) => setForm({ ...form, content: html })} 
                  />
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


