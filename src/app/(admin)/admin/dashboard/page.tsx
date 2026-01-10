"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/data/blogs';
import BlogForm from '@/components/admin/BlogForm';
import BlogList from '@/components/admin/BlogList';
import { LogOut, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg md:text-2xl font-bold truncate">Admin Dashboard</h1>
            <div className="flex items-center gap-2 md:gap-4">
              <Button 
                onClick={() => setShowForm(true)} 
                disabled={showForm}
                size="sm"
                className="md:h-10"
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">New Blog</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                size="sm"
                className="md:h-10"
              >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        {showForm ? (
          <BlogForm
            blog={editingBlog}
            onClose={handleCloseForm}
          />
        ) : (
          <BlogList onEdit={handleEdit} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
