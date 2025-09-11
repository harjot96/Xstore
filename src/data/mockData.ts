import { Category, App, User, AuditLog } from "@/types/admin";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Productivity",
    slug: "productivity",
    description: "Apps to boost your productivity and efficiency",
    status: "active",
    appCount: 45,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-10T14:20:00Z",
    createdBy: "admin@company.com"
  },
  {
    id: "2",
    name: "Entertainment",
    slug: "entertainment",
    description: "Games, streaming, and fun applications",
    status: "active",
    appCount: 78,
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-03-08T16:45:00Z",
    createdBy: "admin@company.com"
  },
  {
    id: "3",
    name: "Education",
    slug: "education",
    description: "Learning and educational resources",
    status: "inactive",
    appCount: 23,
    createdAt: "2024-02-01T11:00:00Z",
    updatedAt: "2024-02-15T13:30:00Z",
    createdBy: "editor@company.com"
  },
  {
    id: "4",
    name: "Health & Fitness",
    slug: "health-fitness",
    description: "Wellness and fitness tracking apps",
    status: "active",
    appCount: 34,
    createdAt: "2024-02-10T08:45:00Z",
    updatedAt: "2024-03-12T10:15:00Z",
    createdBy: "admin@company.com"
  }
];

export const mockApps: App[] = [
  {
    id: "1",
    name: "Task Master Pro",
    package: "com.taskmaster.pro",
    packageUrl: "https://play.google.com/store/apps/details?id=com.taskmaster.pro",
    icon: "📋",
    description: "Advanced task management and productivity suite",
    category: mockCategories[0],
    tags: ["productivity", "tasks", "collaboration"],
    source: "manual",
    status: "active",
    createdAt: "2024-01-16T12:00:00Z",
    updatedAt: "2024-03-11T15:30:00Z",
    createdBy: "admin@company.com"
  },
  {
    id: "2",
    name: "Streaming Hub",
    package: "com.streaminghub.app",
    packageUrl: "https://play.google.com/store/apps/details?id=com.streaminghub.app",
    icon: "🎬",
    description: "All-in-one entertainment streaming platform",
    category: mockCategories[1],
    tags: ["entertainment", "streaming", "movies"],
    source: "api",
    status: "active",
    createdAt: "2024-01-22T14:20:00Z",
    updatedAt: "2024-03-09T11:45:00Z",
    createdBy: "editor@company.com"
  },
  {
    id: "3",
    name: "Learn Swift",
    package: "com.learnswift.edu",
    packageUrl: "https://play.google.com/store/apps/details?id=com.learnswift.edu",
    icon: "📚",
    description: "Interactive Swift programming course",
    category: mockCategories[2],
    tags: ["education", "programming", "swift"],
    source: "import",
    status: "inactive",
    createdAt: "2024-02-05T16:10:00Z",
    updatedAt: "2024-02-20T09:25:00Z",
    createdBy: "editor@company.com"
  },
  {
    id: "4",
    name: "Fitness Tracker",
    package: "com.fittrack.health",
    packageUrl: "https://play.google.com/store/apps/details?id=com.fittrack.health",
    icon: "💪",
    description: "Comprehensive fitness and health monitoring",
    category: mockCategories[3],
    tags: ["health", "fitness", "tracking"],
    source: "manual",
    status: "active",
    createdAt: "2024-02-12T10:30:00Z",
    updatedAt: "2024-03-13T14:15:00Z",
    createdBy: "admin@company.com"
  }
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "admin@company.com",
    role: "SuperAdmin",
    status: "active",
    lastLogin: "2024-03-15T09:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-15T09:30:00Z"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "editor@company.com",
    role: "Editor",
    status: "active",
    lastLogin: "2024-03-14T16:45:00Z",
    createdAt: "2024-01-10T10:20:00Z",
    updatedAt: "2024-03-14T16:45:00Z"
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@company.com",
    role: "Admin",
    status: "inactive",
    lastLogin: "2024-03-01T12:15:00Z",
    createdAt: "2024-01-15T14:30:00Z",
    updatedAt: "2024-03-10T08:20:00Z"
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Smith",
    action: "create",
    entityType: "category",
    entityId: "4",
    entityName: "Health & Fitness",
    afterSnapshot: { name: "Health & Fitness", status: "active" },
    timestamp: "2024-02-10T08:45:00Z",
    ipAddress: "192.168.1.100"
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Johnson",
    action: "update",
    entityType: "app",
    entityId: "3",
    entityName: "Learn Swift",
    beforeSnapshot: { status: "active" },
    afterSnapshot: { status: "inactive" },
    timestamp: "2024-02-20T09:25:00Z",
    ipAddress: "192.168.1.101"
  },
  {
    id: "3",
    userId: "1",
    userName: "John Smith",
    action: "import",
    entityType: "app",
    entityId: "bulk",
    entityName: "Bulk Import - 15 apps",
    afterSnapshot: { imported: 15, created: 12, updated: 3 },
    timestamp: "2024-03-01T11:00:00Z",
    ipAddress: "192.168.1.100"
  }
];