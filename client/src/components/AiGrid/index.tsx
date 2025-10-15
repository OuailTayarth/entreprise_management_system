"use client";

import { Mic } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AiGrid = () => {
  return (
    <section className="py-3">
      <div className="mx-auto grid max-w-7xl cursor-pointer grid-cols-1 gap-6 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-neutral-200/60 bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 p-5 shadow transition-all hover:shadow-lg dark:border-neutral-800/60 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30"
        >
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            AI Agents & Automation
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Intelligent agents that learn, adapt, and automate complex workflows
          </p>

          {/* Typing Code Animation */}
          <TypingCodeFeature
            text={`const createAgent = async () => {
  const agent = new AIAgent({
    model: 'gpt-4-turbo',
    tools: [codeAnalysis, dataProcessing],
    memory: new ConversationalMemory()
  });
  
  // Train on domain knowledge
  await agent.learn(domainData);
  
  return agent;
};`}
          />
        </motion.div>

        {/* Voice Assistant Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-neutral-200/60 bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 p-5 shadow transition-all hover:shadow-lg dark:border-neutral-800/60 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30"
        >
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Voice Assistant
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Interact with our AI using natural voice commands. Experience
            seamless voice-driven interactions with advanced speech recognition.
          </p>
          <VoiceAssistant />
        </motion.div>
      </div>
    </section>
  );
};

function VoiceAssistant() {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: NodeJS.Timeout;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, 3000);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo]);

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
    } else {
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center gap-2">
        <button
          className={cn(
            "group flex h-16 w-16 items-center justify-center rounded-xl transition-colors",
            submitted
              ? "bg-none"
              : "bg-none hover:bg-black/10 dark:hover:bg-white/10",
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="pointer-events-auto h-6 w-6 animate-spin cursor-pointer rounded-sm bg-black dark:bg-white"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Mic className="h-6 w-6 text-black/70 dark:text-white/70" />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            submitted
              ? "text-black/70 dark:text-white/70"
              : "text-black/30 dark:text-white/30",
          )}
        >
          {formatTime(time)}
        </span>

        <div className="flex h-4 w-64 items-center justify-center gap-0.5">
          {[...Array(48)].map((_, i) => (
            <div
              key={`voice-bar-${i}`}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted
                  ? "animate-pulse bg-black/50 dark:bg-white/50"
                  : "h-1 bg-black/10 dark:bg-white/10",
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-4 text-xs text-black/70 dark:text-white/70">
          {submitted ? "Listening..." : "Click to speak"}
        </p>
      </div>
    </div>
  );
}

const TypingCodeFeature = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
          terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
          });
        },
        Math.random() * 30 + 10,
      );

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className="mt-4">
      <div className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
        agent.ts
      </div>
      <div
        ref={terminalRef}
        className="h-[150px] overflow-y-auto rounded-md bg-neutral-900 p-3 font-mono text-xs text-neutral-100 dark:bg-black"
      >
        <pre className="whitespace-pre-wrap">
          {displayedText}
          <span className="animate-pulse">|</span>
        </pre>
      </div>
    </div>
  );
};

export default AiGrid;
