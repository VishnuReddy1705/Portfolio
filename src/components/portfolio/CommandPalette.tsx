import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, CornerDownLeft } from "lucide-react";

const COMMANDS = [
  { id: "home", label: "Go to Hero", hint: "scene 01" },
  { id: "mission", label: "Go to Mission", hint: "scene 02" },
  { id: "about", label: "Go to Story", hint: "scene 03" },
  { id: "stack", label: "Go to Tech Stack", hint: "scene 04" },
  { id: "projects", label: "Go to Projects", hint: "scene 05" },
  { id: "journey", label: "Go to Journey", hint: "scene 06" },
  { id: "github", label: "Go to GitHub", hint: "scene 07" },
  { id: "achievements", label: "Go to Achievements", hint: "scene 08" },
  { id: "contact", label: "Go to Contact", hint: "scene 09" },
];

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const run = (id: string) => {
    onClose();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
    else if (e.key === "Enter" && results[active]) run(results[active].id);
    else if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-start justify-center bg-background/70 pt-[18vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass-strong w-[min(92vw,34rem)] overflow-hidden rounded-2xl glow-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-neon" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKey}
                placeholder="Search the portfolio..."
                className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center font-mono text-xs text-muted-foreground">
                  no results — try "projects"
                </p>
              )}
              {results.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => run(c.id)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === active ? "bg-muted text-neon" : "text-foreground"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    {c.hint}
                    {i === active && <CornerDownLeft className="h-3 w-3" />}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
