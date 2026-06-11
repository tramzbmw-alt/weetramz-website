"use client";
import { useState, useRef, useEffect } from "react";
import { PHONE_HREF, QUOTE_URL } from "@/lib/constants";

interface Message {
  role: "user" | "assistant";
  content: string;
  showQuoteBtn?: boolean;
  ts: string;
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const OPENING = "Hi! I'm the WTz Agent — your WeeTramz assistant. I can answer questions about our services, service area, safety, and more. Ready to get your child set up with a safe, reliable ride?";

const SUGGESTIONS = [
  "What areas do you serve?",
  "How are drivers vetted?",
  "What's included in a quote?",
  "Tell me about the tracking app",
];

export default function QuoteWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const conversationRef = useRef<{ role: string; content: string }[]>([]);

  function scrollBottom() {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }, 50);
  }

  function openChat() {
    setOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([{ role: "assistant", content: OPENING, ts: getTime() }]);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  function closeChat() {
    setOpen(false);
  }

  useEffect(() => {
    scrollBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (sessionStorage.getItem("wtz_chat_seen")) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("wtz_chat_seen", "1");
      if (!open) openChat();
    }, 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setShowSuggestions(false);
    setInput("");

    const userMsg: Message = { role: "user", content: trimmed, ts: getTime() };
    setMessages((prev) => [...prev, userMsg]);

    conversationRef.current = [...conversationRef.current, { role: "user", content: trimmed }];
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationRef.current }),
      });

      const data = await res.json();

      if (data.content && data.content[0]) {
        let reply: string = data.content[0].text;
        const showQuoteBtn = reply.includes("[SHOW_QUOTE_BUTTON]");
        reply = reply.replace("[SHOW_QUOTE_BUTTON]", "").trim();

        conversationRef.current = [...conversationRef.current, { role: "assistant", content: reply }];
        setMessages((prev) => [...prev, { role: "assistant", content: reply, showQuoteBtn, ts: getTime() }]);
      } else {
        throw new Error("No content");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Sorry, I'm having trouble connecting. Please call us at (866) 933-5938!`, ts: getTime() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!open && (
          <button
            onClick={openChat}
            className="bg-[#0A1628] text-[#2657f2] border border-[#2657f2]/50 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide whitespace-nowrap hover:bg-[#2657f2] hover:text-white transition-all duration-200 shadow-lg"
          >
            Get a Quote
          </button>
        )}

        <button
          onClick={() => (open ? closeChat() : openChat())}
          aria-label="Open WeeTramz chat"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 hover:scale-105 flex-shrink-0 bg-[#2657f2]"
          style={{
            boxShadow: open
              ? "0 4px 20px rgba(38,87,242,0.3)"
              : "0 4px 24px rgba(38,87,242,0.6)",
            animation: open ? "none" : "wtzPulse 2.8s ease-in-out infinite",
          }}
        >
          {open ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat window */}
      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl transition-all duration-300"
        style={{
          width: "360px",
          height: "500px",
          background: "#0A1628",
          border: "1px solid rgba(255,255,255,0.1)",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
          pointerEvents: open ? "all" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0 bg-[#2657f2]">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">W</div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-sm leading-tight">WTz Agent</div>
            <div className="text-white/70 text-[10px] font-semibold uppercase tracking-wider">WeeTramz · AI Assistant</div>
          </div>
          <button onClick={closeChat} className="text-white/70 hover:text-white transition-colors p-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(38,87,242,0.3) transparent" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col max-w-[86%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}>
              <div
                className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed"
                style={
                  msg.role === "user"
                    ? { background: "#2657f2", color: "white", borderBottomRightRadius: "3px", fontWeight: 500 }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", borderBottomLeftRadius: "3px" }
                }
              >
                {msg.content}
              </div>
              {msg.showQuoteBtn && (
                <a
                  href={QUOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white text-[#2657f2] hover:bg-gray-100 transition-colors"
                >
                  Start My Quote →
                </a>
              )}
              <div className="text-[10px] mt-1 px-0.5 text-white/25">{msg.ts}</div>
            </div>
          ))}

          {loading && (
            <div className="self-start">
              <div className="flex gap-1.5 items-center px-3.5 py-3 rounded-xl rounded-bl-sm" style={{ background: "rgba(255,255,255,0.08)" }}>
                {[0, 200, 400].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-[#2657f2]"
                    style={{ animation: `wtzDot 1.2s ease-in-out infinite ${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Suggestion pills */}
        {showSuggestions && messages.length > 0 && !loading && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-[11px] px-3 py-1.5 rounded-full border border-[#2657f2]/40 text-[#2657f2]/80 hover:bg-[#2657f2]/10 hover:text-[#2657f2] transition-all bg-transparent"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          className="flex gap-2 items-end px-3 py-3 flex-shrink-0 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 72) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask anything about WeeTramz..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-[13px] leading-relaxed text-white/90 placeholder:text-white/30"
            style={{ maxHeight: "72px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#2657f2] disabled:opacity-40 hover:bg-[#1a45d4] transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-2 text-[10px] text-white/20">
          <a href={PHONE_HREF} className="hover:text-white/50 transition-colors">(866) 933-5938</a>
          {" · "}Powered by Claude AI
        </div>
      </div>

      <style>{`
        @keyframes wtzPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(38,87,242,0.5); }
          50%       { box-shadow: 0 6px 36px rgba(38,87,242,0.9); }
        }
        @keyframes wtzDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
