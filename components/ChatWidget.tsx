"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/data/portfolio";

const ROUTED_SECTIONS = new Set(["work", "contact"]);
const ASSISTANT_NAME = "Atom";

type Message = { role: "user" | "assistant"; content: string; navTo?: string };

const SUGGESTIONS = ["What does Akshay do?", "Show me his work", "How do I contact him?"];

function parseReply(raw: string): { text: string; navTo?: string } {
  const match = raw.match(/\[\[nav:([a-z]+)\]\]/i);
  const navTo = match?.[1]?.toLowerCase();
  const text = raw.replace(/\[\[nav:[a-z]+\]\]/gi, "").trim();
  return { text, navTo };
}

export default function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hey, I'm ${ASSISTANT_NAME}, ${portfolio.name.split(" ")[0]}'s AI assistant. Ask me about his work, skills, or how to reach him — I can point you to the right part of the page too.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
    };
  }, [open]);

  const send = async (text: string) => {
    const userMessage: Message = { role: "user", content: text };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMessages((m) => [...m, { role: "assistant", content: "Sorry, I'm having trouble responding right now. Try again in a moment." }]);
      } else {
        const { text: parsed, navTo } = parseReply(data.reply);
        setMessages((m) => [...m, { role: "assistant", content: parsed, navTo }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong reaching the assistant." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    send(input.trim());
  };

  const goTo = (sectionId: string) => {
    if (ROUTED_SECTIONS.has(sectionId)) {
      router.push(`/${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-5 right-5 md:right-8 z-50 flex items-center justify-center h-14 w-14 rounded-full text-brand-bg"
        style={{
          backgroundColor: "var(--accent)",
          boxShadow: "0 0 0 4px var(--glass-bg), 0 8px 28px var(--accent-glow)",
        }}
        animate={{ boxShadow: open ? "0 0 0 4px var(--glass-bg)" : ["0 0 0 4px var(--glass-bg), 0 0 0px var(--accent-glow)", "0 0 0 4px var(--glass-bg), 0 0 22px var(--accent-glow)", "0 0 0 4px var(--glass-bg), 0 0 0px var(--accent-glow)"] }}
        transition={{ duration: 2.2, repeat: open ? 0 : Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.92 }}
      >
        <span className="text-xl">{open ? "×" : "✦"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed bottom-24 right-5 md:right-8 z-50 w-[min(92vw,360px)] h-[min(70vh,480px)] flex flex-col rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--bg2)" }}
          >
            <div className="px-4 py-3 border-b border-brand-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                <span className="text-sm font-bold text-brand-text">{ASSISTANT_NAME} · {portfolio.name.split(" ")[0]}'s assistant</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-brand-muted hover:text-brand-text text-sm w-6 h-6 flex items-center justify-center rounded-full"
              >
                ×
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed px-3 py-2 rounded-xl ${
                      m.role === "user" ? "text-brand-bg" : "text-brand-text bg-brand-bg3"
                    }`}
                    style={m.role === "user" ? { backgroundColor: "var(--accent)" } : undefined}
                  >
                    {m.content}
                  </div>
                  {m.navTo && (
                    <button
                      onClick={() => goTo(m.navTo!)}
                      className="mt-1.5 text-xs uppercase tracking-widest text-brand-accent no-underline hover:text-brand-text transition-colors"
                    >
                      → Go to {m.navTo}
                    </button>
                  )}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-brand-muted tracking-widest uppercase">Thinking…</div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-brand-bg3 text-brand-muted hover:text-brand-text transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-brand-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-transparent text-sm text-brand-text placeholder:text-brand-muted outline-none px-2"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="text-xs px-3 py-2 rounded-full bg-brand-text text-brand-bg disabled:opacity-40 transition-opacity"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
