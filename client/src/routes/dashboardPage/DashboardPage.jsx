import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };
  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark">
      {/* Top Nav Bar */}
      <header className="h-16 flex items-center justify-between px-8 glass-effect border-b border-primary/5 sticky top-0 z-10">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-slate-200">Start a New Conversation</h2>
          <span className="text-[10px] text-slate-500">Ask a question or request an analysis.</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 flex flex-col items-center justify-center">
        <div className="size-20 rounded-2xl user-gradient flex items-center justify-center shadow-xl shadow-primary/20 mb-8 animation-pulse">
          <span className="material-symbols-outlined text-white text-4xl">auto_awesome</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">How can I help you today?</h1>
        <p className="text-sm text-slate-400 mb-12">I can analyze images, write code, or answer your questions.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-surface-dark/50 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group shadow-lg">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary">chat_bubble</span>
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">Create a New Chat</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-surface-dark/50 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group shadow-lg">
            <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-blue-500">image</span>
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">Analyze Images</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-surface-dark/50 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group shadow-lg">
            <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-green-500">code</span>
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">Help me with my Code</span>
          </div>
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="p-8 pt-0 w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="glass-effect rounded-full p-2 pl-6 pr-2 shadow-2xl shadow-black/50 border border-primary/20 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-primary/40">
          <button type="button" className="p-2 hover:bg-white/5 rounded-full transition-colors group">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">attach_file</span>
          </button>
          <input
            type="text"
            name="text"
            placeholder="Message Atlas..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] placeholder:text-slate-500 text-slate-100 outline-none"
          />
          <div className="flex items-center gap-1">
            <button type="submit" className="size-10 user-gradient rounded-full flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-white fill-1">arrow_upward</span>
            </button>
          </div>
        </form>
        <p className="text-center text-[10px] text-slate-500 mt-4 font-medium">Atlas can make mistakes. Consider checking important information.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
