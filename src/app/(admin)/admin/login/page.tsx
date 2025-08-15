"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account } from "appwrite";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  const client = useMemo(() => {
    if (!endpoint || !project) {
      console.error('Missing Appwrite environment variables:', { endpoint, project });
      return null;
    }
    try {
      return new Client().setEndpoint(endpoint).setProject(project);
    } catch (error) {
      console.error('Failed to create Appwrite client:', error);
      return null;
    }
  }, [endpoint, project]);

  const account = useMemo(() => {
    if (!client) return null;
    try {
      return new Account(client);
    } catch (error) {
      console.error('Failed to create Appwrite account:', error);
      return null;
    }
  }, [client]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!account) {
      toast.error("Appwrite client not initialized. Check your environment variables.");
      return;
    }
    
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    
    try {
      setLoading(true);
      console.log('Attempting login with:', { email, endpoint, project });
      await account.createEmailPasswordSession(email, password);
      toast.success("Logged in successfully");
      router.replace("/admin");
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!endpoint || !project) {
    return (
      <div className="min-h-[60svh] flex items-center justify-center p-4">
        <Card className="w-full max-w-sm p-6 space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Configuration required</h1>
            <p className="text-sm text-muted-foreground">Missing NEXT_PUBLIC_APPWRITE_ENDPOINT or NEXT_PUBLIC_APPWRITE_PROJECT_ID.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Add these to your `.env.local` and restart the dev server.
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[60svh] flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage blogs</p>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button onClick={onLogin} disabled={loading || !account}>{loading ? "Signing in..." : "Sign in"}</Button>
        </div>
      </Card>
    </div>
  );
}


