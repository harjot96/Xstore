import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  AuthContextType, 
  AuthState, 
  LoginCredentials, 
  SignupCredentials, 
  ForgotPasswordData, 
  ResetPasswordData,
  User 
} from '@/types/auth';

// Mock user data - in real app, this would come from API
const mockUser: User = {
  id: '1',
  email: 'admin@company.com',
  name: 'John Smith',
  role: 'SuperAdmin',
  createdAt: '2024-01-01T00:00:00Z',
  lastLogin: new Date().toISOString()
};

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

// Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In real app, validate token with API
          dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_FAILURE', payload: 'Failed to verify authentication' });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - in real app, this would be API call
      if (credentials.email === 'admin@company.com' && credentials.password === 'admin123') {
        const token = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('auth_token', token);
        dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in."
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Signup function
  const signup = async (credentials: SignupCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (credentials.email === 'admin@company.com') {
        throw new Error('User with this email already exists');
      }

      // Mock successful signup
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        role: 'Editor', // Default role for new users
        createdAt: new Date().toISOString()
      };

      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('auth_token', token);
      dispatch({ type: 'AUTH_SUCCESS', payload: newUser });

      toast({
        title: "Account Created!",
        description: "Welcome to the admin panel."
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('auth_token');
    dispatch({ type: 'LOGOUT' });
    
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out."
    });
  };

  // Forgot password function
  const forgotPassword = async (data: ForgotPasswordData): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success
      dispatch({ type: 'SET_LOADING', payload: false });
      
      toast({
        title: "Reset Link Sent",
        description: "If an account with that email exists, we've sent a password reset link."
      });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Reset password function
  const resetPassword = async (data: ResetPasswordData): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      dispatch({ type: 'SET_LOADING', payload: false });
      
      toast({
        title: "Password Reset",
        description: "Your password has been successfully reset."
      });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
      toast({
        title: "Reset Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
