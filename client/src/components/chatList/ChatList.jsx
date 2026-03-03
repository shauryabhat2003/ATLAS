import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const ChatList = () => {
  const { user, getToken, signOut } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  return (
    <aside className="w-72 flex flex-col glass-effect border-r border-primary/10 h-full shrink-0">
      <div className="p-6 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Atlas" className="size-8 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">ATLAS</h1>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">Pro Intelligence</span>
          </div>
        </Link>
      </div>

      <div className="px-4 mb-4">
        <Link to="/dashboard" className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 rounded-xl transition-all font-medium border border-primary/20">
          <span className="material-symbols-outlined text-sm">add</span>
          New Conversation
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-1">
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2 py-2 uppercase tracking-wider">Recent Chats</p>

        {isPending ? (
          <span className="text-sm text-slate-400 px-3">Loading...</span>
        ) : error ? (
          <span className="text-sm text-red-400 px-3">Something went wrong!</span>
        ) : data?.map((chat) => (
          <Link
            to={`/dashboard/chats/${chat._id}`}
            key={chat._id}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors text-slate-400 group"
          >
            <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">history</span>
            <p className="text-sm font-medium truncate">{chat.title}</p>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-primary/10 bg-black/20 flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2">
          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brandBlue to-brandPink flex items-center justify-center text-white text-sm font-bold shrink-0">
            {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold text-slate-200 truncate">{user?.displayName || "User"}</span>
            <button
              onClick={signOut}
              className="text-[10px] text-slate-500 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1 w-fit"
            >
              <span className="material-symbols-outlined text-[12px]">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatList;
