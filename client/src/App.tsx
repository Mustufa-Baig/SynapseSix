import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import RiskMap from "@/components/RiskMap";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RiskMap />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
