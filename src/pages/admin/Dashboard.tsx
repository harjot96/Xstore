import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Smartphone, 
  FolderOpen, 
  Activity,
  Plus,
  FileText,
  AlertTriangle,
  Save,
  X,
  Mail
} from "lucide-react";
import { mockCategories, mockApps, mockUsers, mockAuditLogs } from "@/data/mockData";
import { Category, App, User } from "@/types/admin";

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
}

interface AppFormData {
  name: string;
  package: string;
  packageUrl: string;
  description: string;
  categoryId: string;
  status: 'active' | 'inactive';
}

interface UserFormData {
  name: string;
  email: string;
  role: 'SuperAdmin' | 'Admin' | 'Editor';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Dialog states
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isAppDialogOpen, setIsAppDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  
  // Form data
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    status: "active"
  });
  
  const [appForm, setAppForm] = useState<AppFormData>({
    name: "",
    package: "",
    packageUrl: "",
    description: "",
    categoryId: mockCategories[0]?.id || "",
    status: "active"
  });
  
  const [userForm, setUserForm] = useState<UserFormData>({
    name: "",
    email: "",
    role: "Editor"
  });

  const stats = {
    totalCategories: mockCategories.length,
    activeCategories: mockCategories.filter(c => c.status === 'active').length,
    totalApps: mockApps.length,
    activeApps: mockApps.filter(a => a.status === 'active').length,
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'active').length,
  };

  const recentActivity = mockAuditLogs.slice(0, 5);

  // Helper functions
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const resetForms = () => {
    setCategoryForm({ name: "", slug: "", description: "", status: "active" });
    setAppForm({ name: "", package: "", packageUrl: "", description: "", categoryId: mockCategories[0]?.id || "", status: "active" });
    setUserForm({ name: "", email: "", role: "Editor" });
  };

  // Category handlers
  const handleCategoryNameChange = (name: string) => {
    setCategoryForm(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleAddCategory = () => {
    if (!categoryForm.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Category Added",
      description: `Category "${categoryForm.name}" has been created successfully`
    });
    
    resetForms();
    setIsCategoryDialogOpen(false);
  };

  // App handlers
  const handleAddApp = () => {
    if (!appForm.name.trim() || !appForm.package.trim()) {
      toast({
        title: "Validation Error",
        description: "App name and package are required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "App Added",
      description: `App "${appForm.name}" has been created successfully`
    });
    
    resetForms();
    setIsAppDialogOpen(false);
  };

  // User handlers
  const handleInviteUser = () => {
    if (!userForm.name.trim() || !userForm.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "User Invited",
      description: `Invitation sent to ${userForm.email}`
    });
    
    resetForms();
    setIsUserDialogOpen(false);
  };

  // Navigation handlers
  const handleImportData = () => {
    navigate('/admin/import');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's what's happening with your admin panel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">{stats.activeCategories} active</span> • {stats.totalCategories - stats.activeCategories} inactive
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Smartphone className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApps}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">{stats.activeApps} active</span> • {stats.totalApps - stats.activeApps} inactive
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">{stats.activeUsers} active</span> • {stats.totalUsers - stats.activeUsers} inactive
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12% from last week</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              System activity over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Activity chart would be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.action === 'create' && (
                    <div className="w-2 h-2 bg-success rounded-full mt-2" />
                  )}
                  {activity.action === 'update' && (
                    <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                  )}
                  {activity.action === 'import' && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.userName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action} {activity.entityType}: {activity.entityName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Add Category Button */}
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => resetForms()}>
                  <Plus className="h-5 w-5" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new category for organizing apps.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category-name">Category Name *</Label>
                    <Input
                      id="category-name"
                      value={categoryForm.name}
                      onChange={(e) => handleCategoryNameChange(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category-slug">Slug</Label>
                    <Input
                      id="category-slug"
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="category-slug"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea
                      id="category-description"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="category-status"
                      checked={categoryForm.status === 'active'}
                      onCheckedChange={(checked) => 
                        setCategoryForm(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }))
                      }
                    />
                    <Label htmlFor="category-status">Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>
                    <Save className="w-4 h-4 mr-2" />
                    Create Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Add App Button */}
            <Dialog open={isAppDialogOpen} onOpenChange={setIsAppDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => resetForms()}>
                  <Smartphone className="h-5 w-5" />
                  Add App
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New App</DialogTitle>
                  <DialogDescription>
                    Add a new application to the system.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="app-name">App Name *</Label>
                    <Input
                      id="app-name"
                      value={appForm.name}
                      onChange={(e) => setAppForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter app name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-package">Package Name *</Label>
                    <Input
                      id="app-package"
                      value={appForm.package}
                      onChange={(e) => setAppForm(prev => ({ ...prev, package: e.target.value }))}
                      placeholder="com.example.app"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-url">Package URL</Label>
                    <Input
                      id="app-url"
                      value={appForm.packageUrl}
                      onChange={(e) => setAppForm(prev => ({ ...prev, packageUrl: e.target.value }))}
                      placeholder="https://play.google.com/store/apps/details?id=..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-description">Description</Label>
                    <Textarea
                      id="app-description"
                      value={appForm.description}
                      onChange={(e) => setAppForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter app description"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="app-status"
                      checked={appForm.status === 'active'}
                      onCheckedChange={(checked) => 
                        setAppForm(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }))
                      }
                    />
                    <Label htmlFor="app-status">Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAppDialogOpen(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleAddApp}>
                    <Save className="w-4 h-4 mr-2" />
                    Create App
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Invite User Button */}
            <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => resetForms()}>
                  <Users className="h-5 w-5" />
                  Invite User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite New User</DialogTitle>
                  <DialogDescription>
                    Send an invitation to a new user to join the admin panel.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user-name">Full Name *</Label>
                    <Input
                      id="user-name"
                      value={userForm.name}
                      onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-email">Email Address *</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-role">Role</Label>
                    <select
                      id="user-role"
                      value={userForm.role}
                      onChange={(e) => setUserForm(prev => ({ ...prev, role: e.target.value as 'SuperAdmin' | 'Admin' | 'Editor' }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Editor">Editor</option>
                      <option value="Admin">Admin</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleInviteUser}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Import Data Button */}
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleImportData}>
              <FileText className="h-5 w-5" />
              Import Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span className="text-sm font-medium">API Status</span>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <span className="text-sm font-medium">Database</span>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <span className="text-sm font-medium">Import Queue</span>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                3 Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}