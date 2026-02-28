import { useEffect, useRef, useState } from "react";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatInitialized, setChatInitialized] = useState(false);
  const chatInstance = useRef(null);
  const hasRun = useRef(false);
  const endRef = useRef(null);
  const formRef = useRef(null);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  // Initialize chat
  useEffect(() => {
    if (!data?._id || chatInitialized) return;

    try {
      const initialHistory = [{
        role: "user",
        parts: [{ text: data?.history?.[0]?.parts?.[0]?.text || "Hello" }]
      }];

      chatInstance.current = model.startChat({
        history: initialHistory,
        generationConfig: { temperature: 0.9 }
      });

      setChatInitialized(true);
    } catch (error) {
      console.error("Chat initialization error:", error);
    }
  }, [data?._id, chatInitialized]);

  // Handle first message
  useEffect(() => {
    if (!hasRun.current && chatInitialized && data?.history?.length === 1) {
      const initialMessage = data.history[0].parts[0]?.text;
      if (initialMessage) {
        hasRun.current = true;
        add(initialMessage, true);
      }
    }
  }, [data, chatInitialized]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial = false) => {
    if (!text || !chatInstance.current) {
      console.error("Missing text or chat not initialized");
      return;
    }

    setLoading(true);
    if (!isInitial) setQuestion(text);

    try {
      const result = await chatInstance.current.sendMessageStream(
        Object.keys(img.aiData).length ? [img.aiData, text] : text
      );

      let accumulatedText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (err) {
      console.error("Chat error:", err);
      setAnswer("Sorry, there was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text, false);
  };

  return (
    <>
      {img.isLoading && <div className="text-slate-400 text-sm py-4">Loading image...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
          className="rounded-xl mb-4"
        />
      )}
      {question && (
        <div className="flex items-start gap-4 justify-end">
          <div className="flex flex-col gap-2 max-w-[85%] items-end">
            <div className="user-gradient p-4 rounded-xl rounded-tr-none shadow-xl shadow-primary/20">
              <p className="text-[15px] leading-relaxed text-white">
                {question}
              </p>
            </div>
          </div>
          <div className="size-8 rounded-lg bg-slate-700 overflow-hidden shrink-0 mt-1 shadow-md">
            <span className="material-symbols-outlined text-white text-lg m-1">person</span>
          </div>
        </div>
      )}
      {answer && (
        <div className="flex items-start gap-4">
          <img src="/logo.png" alt="Atlas" className="size-8 shrink-0 mt-1" />
          <div className="flex flex-col gap-2 max-w-[85%]">
            <div className="bg-surface-dark/50 dark:bg-slate-800/40 p-4 rounded-xl rounded-tl-none shadow-sm border border-white/5">
              <div className="text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 prose prose-invert max-w-none">
                <Markdown>{answer}</Markdown>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="endChat" ref={endRef}></div>

      <div className="w-full max-w-4xl mx-auto absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-8">
        <form onSubmit={handleSubmit} ref={formRef} className="glass-effect rounded-full p-2 pl-4 pr-2 shadow-2xl shadow-black/50 border border-primary/20 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-primary/40 bg-surface-dark">
          <Upload setImg={setImg} />
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
        <p className="text-center text-[10px] text-slate-500 mt-4 font-medium hidden md:block">Atlas can make mistakes. Consider checking important information.</p>
      </div>
    </>
  );
};

export default NewPrompt;