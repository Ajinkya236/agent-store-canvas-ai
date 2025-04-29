
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load page components for better performance
const AgentDetail = lazy(() => import("./pages/AgentDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AgentBuilder = lazy(() => import("./pages/AgentBuilder"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Profile = lazy(() => import("./pages/Profile"));
const Browse = lazy(() => import("./pages/Browse"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const SavedAgents = lazy(() => import("./pages/SavedAgents"));

// Create a loading component for Suspense fallback
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-pulse-soft text-center">
      <div className="h-8 w-8 mx-auto mb-4 rounded-full bg-accent-primary"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Add routes for all pages */}
            <Route path="/agent/:id" element={<AgentDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<AgentBuilder />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/browse" element={<Browse />} />
            
            {/* Routes for chat and saved agents */}
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/saved-agents" element={<SavedAgents />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
