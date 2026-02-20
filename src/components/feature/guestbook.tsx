"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpenText,
  X,
  Send,
  Github,
  Trash2,
  AlertCircle,
  Crown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn, parseMessageWithMentions } from "@/lib/utils";
import {
  useGuestbookEntries,
  useCreateGuestbookEntry,
  useDeleteGuestbookEntry,
} from "@/hooks/use-guestbook";
import { authClient } from "@/lib/auth-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { User } from "better-auth";
import { useSearchParams } from "next/navigation";
import HeadingLine from "../ui/heading-line";
import { Textarea } from "../ui/textarea";

dayjs.extend(relativeTime);

const MessageContent = ({ content }: { content: string }) => {
  const parts = parseMessageWithMentions(content);

  return (
    <p className="text-foreground/80 mb-2 text-sm leading-relaxed">
      {parts.map((part) => {
        if (part.type === "mention") {
          return (
            <span
              key={part.key}
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 rounded border px-1 font-semibold transition-colors"
            >
              {part.content}
            </span>
          );
        }
        return <span key={part.key}>{part.content}</span>;
      })}
    </p>
  );
};

export const Guestbook = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handle search params only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsOpen(Boolean(searchParams.get("guestbook")));
  }, [searchParams]);

  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = !!session?.user;
  const isAuthor = session?.role === "AUTHOR";

  const { data: entries, isLoading } = useGuestbookEntries();

  const userWithRole = {
    ...(session?.user as User),
    role: session?.role,
  };

  const createEntry = useCreateGuestbookEntry(userWithRole);

  const deleteEntry = useDeleteGuestbookEntry();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setError(null);

    try {
      setMessage("");
      await createEntry.mutateAsync(message.trim());
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setError(null);

    try {
      await deleteEntry.mutateAsync(id);
    } catch (err) {
      console.error("Failed to delete message:", err);
      setError(err instanceof Error ? err.message : "Failed to delete message");
    }
  };

  const handleSignIn = async (provider: "github" | "google") => {
    const callbackUrl = new URL(window.location.href);
    callbackUrl.searchParams.set("guestbook", "true");

    await authClient.signIn.social({
      provider,
      callbackURL: callbackUrl.toString(),
    });
  };

  const getProvider = (accounts: { providerId: string }[]) => {
    if (!accounts || accounts.length === 0) return "github";
    return accounts[0].providerId as "github" | "google";
  };

  const formatTimestamp = (date: string) => {
    return dayjs(date).fromNow();
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed right-12 bottom-10 z-100 md:right-24"
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant={"secondary"}
          size={"lg"}
          className="border-foreground/20 relative size-10 rounded-full border-2 shadow-xl backdrop-blur-md transition-all hover:scale-105"
        >
          <BookOpenText className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] !bg-transparent ![background-image:radial-gradient(transparent_1px,_var(--color-background)_1px)] !bg-[length:4px_4px] !backdrop-blur-[10px] !backdrop-brightness-90"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-background fixed top-0 right-0 z-[100] flex h-full w-full flex-col border-l-2 shadow-2xl sm:w-[480px]"
            >
              {/* Header */}
              <div className="relative shrink-0 border-b-2 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-incognito text-2xl font-bold">
                      Guestbook
                    </h2>
                    <p className="text-muted-foreground mt-1 font-mono text-xs">
                      {"<"} Leave a message {"/>"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="border-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <HeadingLine className="mt-6" />
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-4 mt-4"
                  >
                    <div className="flex items-center gap-2 rounded-lg border-2 border-red-500/50 bg-red-500/10 p-3 text-sm text-red-500">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <p className="flex-1">{error}</p>
                      <button
                        onClick={() => setError(null)}
                        className="rounded p-1 hover:bg-red-500/20"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                  <div className="flex h-full flex-col items-center justify-center">
                    <div className="relative h-12 w-12">
                      <div className="border-primary/30 border-t-primary absolute inset-0 animate-spin rounded-full border-4" />
                    </div>
                    <p className="text-muted-foreground mt-4 font-mono text-sm">
                      Loading messages...
                    </p>
                  </div>
                ) : (entries?.length ?? 0) === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-lg border-2 border-dashed p-6">
                      <BookOpenText className="text-muted-foreground/50 mx-auto h-12 w-12" />
                    </div>
                    <p className="text-muted-foreground font-mono text-sm">
                      No messages yet.
                      <br />
                      Be the first to sign!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {entries?.map((entry, index) => {
                      const provider = getProvider(entry.user.accounts);
                      const isEntryAuthor = entry.user.role === "AUTHOR";

                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ delay: index * 0.05, duration: 0.8 }}
                          className="group relative"
                        >
                          <div className="bg-muted/20 hover:bg-muted/40 rounded-lg border-2 border-dashed p-4 transition-colors">
                            <div className="flex gap-3">
                              {/* Avatar */}
                              <div className="relative size-10 flex-shrink-0">
                                <img
                                  src={
                                    entry.user.image ||
                                    `https://ui-avatars.com/api/?name=${entry.user.name || "User"}`
                                  }
                                  alt={entry.user.name || "User"}
                                  className="absolute size-full rounded-full border-2"
                                />
                                {/* Provider badge */}
                                <div className="bg-background absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border-2">
                                  {provider === "github" ? (
                                    <Github className="h-2.5 w-2.5" />
                                  ) : (
                                    <svg
                                      viewBox="0 0 24 24"
                                      className="h-2.5 w-2.5"
                                    >
                                      <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                      />
                                      <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                      />
                                      <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                      />
                                      <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                  <span className="font-incognito font-semibold">
                                    {entry.user.name || "Anonymous"}
                                  </span>
                                  {isEntryAuthor && (
                                    <Badge
                                      variant="default"
                                      className="gap-1 border-green-500/30 bg-green-500/10 font-mono text-[10px] text-green-600"
                                    >
                                      <Crown className="h-2.5 w-2.5" />
                                      Author
                                    </Badge>
                                  )}
                                </div>
                                <MessageContent content={entry.content} />
                                <span className="text-muted-foreground font-mono text-xs">
                                  {formatTimestamp(entry.createdAt)}
                                </span>
                              </div>

                              {/* TODO Delete button  */}
                              {isAuthor && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                  onClick={() => handleDelete(entry.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div
                className="bg-background shrink-0 border-t-2 p-4"
                suppressHydrationWarning
              >
                {!isLoggedIn ? (
                  // Sign in buttons
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                    suppressHydrationWarning
                  >
                    <p className="text-muted-foreground mb-3 text-center font-mono text-xs">
                      Sign in to leave a message
                    </p>

                    <div className="flex-center gap-2 max-sm:flex-col">
                      <Button
                        onClick={() => handleSignIn("github")}
                        variant="default"
                        className="group border-2 font-medium"
                        size="lg"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Sign in with GitHub
                      </Button>
                      <Button
                        onClick={() => handleSignIn("google")}
                        variant="outline"
                        className="group border-2 font-medium"
                        size="lg"
                      >
                        <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Sign in with Google
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  // Message input
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                    suppressHydrationWarning
                  >
                    <div className="relative">
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Leave a message..."
                        maxLength={500}
                        className="bg-muted/20 resize-none text-sm"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "text-muted-foreground font-mono text-xs",
                          message.length > 450 && "text-orange-500",
                          message.length >= 500 && "text-red-500",
                        )}
                      >
                        {message.length}/500
                      </span>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isPending}
                        className="group border-2 font-medium"
                        size="lg"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
