import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AIAssistant } from "@/components/AIAssistant";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import LearningPath from "./pages/LearningPath";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import CourseDetail from "./pages/CourseDetail";
import PracticeArena from "./pages/PracticeArena";
import ProjectLab from "./pages/ProjectLab";
import ExperimentDetail from "./pages/ExperimentDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/learning" element={<LearningPath />} />
            <Route path="/learning/knowledge" element={<KnowledgeCenter />} />
            <Route path="/learning/knowledge/:courseId" element={<CourseDetail />} />
            <Route path="/learning/practice" element={<PracticeArena />} />
            <Route path="/learning/project-lab" element={<ProjectLab />} />
            <Route path="/experiment/:id" element={<ExperimentDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
