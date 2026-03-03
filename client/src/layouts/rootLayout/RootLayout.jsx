import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../context/AuthContext";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col h-screen overflow-hidden bg-background-dark text-slate-100 font-display">
          <main className="flex-1 overflow-hidden flex flex-col">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default RootLayout;
