export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: 'active' | 'inactive';
  appCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface App {
  id: string;
  name: string;
  package: string;
  packageUrl: string;
  icon?: string;
  description?: string;
  category: Category;
  tags: string[];
  source: 'manual' | 'api' | 'import';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'Admin' | 'Editor';
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'enable' | 'disable' | 'restore' | 'import';
  entityType: 'category' | 'app' | 'user';
  entityId: string;
  entityName: string;
  beforeSnapshot?: any;
  afterSnapshot?: any;
  timestamp: string;
  ipAddress?: string;
}

export interface ImportResult {
  totalProcessed: number;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{
    line: number;
    message: string;
    data?: any;
  }>;
}

export interface ListState {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filters: Record<string, any>;
}