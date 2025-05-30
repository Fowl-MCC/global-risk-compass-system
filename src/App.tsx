
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NewsFeed from "./pages/NewsFeed";
import RiskMap from "./pages/RiskMap";
import Markets from "./pages/Markets";
import Analysis from "./pages/Analysis";
import Forecasts from "./pages/Forecasts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import EyesWorldCommandPalette from "./components/command/EyesWorldCommandPalette";
import { useCommandStore } from "./store/commandStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { isOpen, setIsOpen, toggleOpen } = useCommandStore();
  
  // Set up keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleOpen();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleOpen]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            <Route path="/news" element={
              <AppLayout>
                <NewsFeed />
              </AppLayout>
            } />
            <Route path="/risk-map" element={
              <AppLayout>
                <RiskMap />
              </AppLayout>
            } />
            <Route path="/markets" element={
              <AppLayout>
                <Markets />
              </AppLayout>
            } />
            <Route path="/analysis" element={
              <AppLayout>
                <Analysis />
              </AppLayout>
            } />
            <Route path="/forecasts" element={
              <AppLayout>
                <Forecasts />
              </AppLayout>
            } />
            <Route path="/settings" element={
              <AppLayout>
                <Settings />
              </AppLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <EyesWorldCommandPalette isOpen={isOpen} setIsOpen={setIsOpen} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
