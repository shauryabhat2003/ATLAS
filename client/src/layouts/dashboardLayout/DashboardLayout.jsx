import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatList from "../../components/chatList/ChatList";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="flex h-screen w-full overflow-hidden font-display text-slate-900 dark:text-slate-100 antialiased bg-background-light dark:bg-background-dark">
      <ChatList />
      <main className="flex-1 flex flex-col relative">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
