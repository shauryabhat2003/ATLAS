import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      }),
  });

  console.log(data);
  if (error) {
    console.error("Error fetching chat:", error);
  }

  return (
    <div className="flex-1 flex flex-col relative bg-background-light dark:bg-background-dark h-full">
      <header className="h-16 shrink-0 flex items-center justify-between px-8 glass-effect border-b border-primary/5 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-200">
            {data?.history?.length > 0 ? "Chat Session" : "New Chat"}
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold text-primary border border-primary/20 uppercase">Pro</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          {isPending ? "Loading..." : error ? `Something went wrong! ${error.message}` : data?.history?.map((message, i) => (
            <div key={i}>
              {message.img && (
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                  path={message.img}
                  width="400"
                  transformation={[{ width: 400 }]}
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                  className="rounded-xl mb-4"
                />
              )}
              {message.role === "user" ? (
                <div className="flex items-start gap-4 justify-end">
                  <div className="flex flex-col gap-2 max-w-[85%] items-end">
                    <div className="user-gradient p-4 rounded-xl rounded-tr-none shadow-xl shadow-primary/20">
                      <div className="text-[15px] leading-relaxed text-white">
                        <Markdown>{message.parts[0].text}</Markdown>
                      </div>
                    </div>
                  </div>
                  <div className="size-8 rounded-lg bg-slate-700 overflow-hidden shrink-0 mt-1 shadow-md">
                    <span className="material-symbols-outlined text-white text-lg m-1">person</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <img src="/logo.png" alt="Atlas" className="size-8 shrink-0 mt-1" />
                  <div className="flex flex-col gap-2 max-w-[85%]">
                    <div className="bg-surface-dark/50 dark:bg-slate-800/40 p-4 rounded-xl rounded-tl-none shadow-sm border border-white/5">
                      <div className="text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 prose prose-invert max-w-none">
                        <Markdown>{message.parts[0].text}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
