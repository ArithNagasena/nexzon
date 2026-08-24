import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Msg = { id: number; role: "bot" | "user"; text: string };

const SUGGESTIONS = [
  "Track my order",
  "Return policy",
  "Best phones under LKR 100,000",
  "0% installment plans",
];

/**
 * Hiding the launcher is remembered for the tab session only — a visitor who
 * waves it away shouldn't have it reappear on every route change, but a fresh
 * visit should still get offered support.
 */
const DISMISS_KEY = "nexzon:chat-dismissed";

const readDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(readDismissed);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi! I'm Nexzon Assistant 👋 Ask me about products, orders, delivery, warranty or returns.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: Date.now(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Thanks! Our AI assistant will respond shortly. For urgent help, visit the Help Center.",
        },
      ]);
    }, 700);
  };

  const dismiss = () => {
    setOpen(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* Private-mode storage failures shouldn't stop the widget from hiding. */
    }
  };

  if (dismissed) return null;

  return (
    <>
      {/* Launcher. The wrapper carries the fixed position so the dismiss control
          can sit beside the launcher rather than nested inside a button. */}
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
        <button
          type="button"
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-deep text-primary-foreground shadow-lift transition-all hover:scale-105 active:scale-95",
            open && "rotate-90"
          )}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {/* Moved to the left corner to make room for the dismiss button. */}
          {!open && (
            <span className="absolute left-0 top-0 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-glow opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-glow" />
            </span>
          )}
        </button>

        {!open && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Hide the chat assistant"
            title="Hide chat"
            className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-soft transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Nexzon AI chat"
          className="fixed bottom-24 right-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift animate-in fade-in slide-in-from-bottom-4 sm:right-6"
        >
          {/* Header */}
          <div className="bg-gradient-deep p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-base font-bold leading-tight">Nexzon Assistant</h3>
                <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · Replies instantly
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex items-end gap-2", m.role === "user" && "flex-row-reverse")}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    m.role === "bot"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {m.role === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                    m.role === "bot"
                      ? "rounded-bl-sm bg-card text-card-foreground"
                      : "rounded-br-sm bg-primary text-primary-foreground"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="pt-2">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Quick questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="h-10 rounded-full bg-muted/50 text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 shrink-0 rounded-full"
              disabled={!input.trim()}
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
