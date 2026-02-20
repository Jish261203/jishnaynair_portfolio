// "use client";

// TODO later
// import { useState } from "react";
// import { motion } from "motion/react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle2, Circle, Plus, Trash2, Loader2 } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import {
//   useTodos,
//   useCreateTodo,
//   useUpdateTodo,
//   useDeleteTodo,
//   useClearCompletedTodos,
// } from "@/hooks/use-todo";

// export function TodoList({ className }: { className?: string }) {
//   const [newTodoText, setNewTodoText] = useState("");

//   // Auth
//   const { data: session } = authClient.useSession();
//   const isAuthor = session?.role === "AUTHOR";

//   // Queries
//   const { data: todos = [], isLoading } = useTodos();
//   const createTodo = useCreateTodo();
//   const updateTodo = useUpdateTodo();
//   const deleteTodo = useDeleteTodo();
//   const clearCompleted = useClearCompletedTodos();

//   const completed = todos.filter((t) => t.done).length;

//   const handleToggle = (id: string, currentDone: boolean) => {
//     updateTodo.mutate({ id, done: !currentDone });
//   };

//   const handleAddTodo = () => {
//     if (!newTodoText.trim()) return;
//     createTodo.mutate(newTodoText.trim(), {
//       onSuccess: () => setNewTodoText(""),
//     });
//   };

//   const handleDelete = (id: string) => {
//     deleteTodo.mutate(id);
//   };

//   const handleClearCompleted = () => {
//     if (completed === 0) return;
//     clearCompleted.mutate();
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <aside className={cn("w-80 max-w-full", className)}>
//         <div className="bg-background/70 backdrop-blur-sm rounded-xl border shadow-sm p-8 flex items-center justify-center">
//           <Loader2 className="size-6 animate-spin text-foreground/40" />
//         </div>
//       </aside>
//     );
//   }

//   // Don't render for non-authors
//   if (!isAuthor) {
//     return null;
//   }

//   return (
//     <aside className={cn("w-80 max-w-full", className)} aria-label="Quick todo panel">
//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-background/70 backdrop-blur-sm rounded-xl border shadow-sm"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
//           <div className="inline-flex items-center gap-2">
//             <div
//               className={cn("size-2 rounded-full animate-pulse", {
//                 "bg-green-500": completed > 0,
//                 "bg-red-500": completed === 0,
//               })}
//             />
//             <span className="font-mono text-xs tracking-wider uppercase text-foreground/70">
//               To‑do
//             </span>
//             <Badge variant="outline" className="font-mono text-[10px]">
//               {completed}/{todos.length} done
//             </Badge>
//           </div>

//           <div className="inline-flex items-center gap-1">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="size-8"
//               onClick={handleClearCompleted}
//               disabled={completed === 0 || clearCompleted.isPending}
//               title="Clear completed"
//             >
//               {clearCompleted.isPending ? (
//                 <Loader2 className="size-4 animate-spin" />
//               ) : (
//                 <Trash2 className="size-4 text-foreground/60" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* List */}
//         <ul className="max-h-[50vh] overflow-y-auto px-2 py-2">
//           {todos.length === 0 ? (
//             <li className="px-4 py-8 text-center text-sm text-foreground/40">
//               No todos yet. Add one below!
//             </li>
//           ) : (
//             todos.map((item, i) => (
//               <motion.li
//                 key={item.id}
//                 layout
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                 className={cn(
//                   "group flex items-center gap-3 rounded-md px-2 py-2.5 hover:bg-foreground/5",
//                   i !== todos.length - 1 && "mb-1"
//                 )}
//               >
//                 <button
//                   onClick={() => handleToggle(item.id, item.done)}
//                   disabled={updateTodo.isPending}
//                   className="inline-flex flex-1 items-center gap-3 text-left disabled:opacity-50"
//                   aria-pressed={item.done}
//                   aria-label={`Mark "${item.text}" ${item.done ? "incomplete" : "complete"}`}
//                 >
//                   <span
//                     className={cn(
//                       "relative grid size-5 place-items-center rounded-full border transition-colors flex-shrink-0",
//                       item.done
//                         ? "border-green-500/40 bg-green-500/10 text-green-600"
//                         : "border-foreground/30 text-foreground/40"
//                     )}
//                   >
//                     {item.done ? (
//                       <CheckCircle2 className="size-4" />
//                     ) : (
//                       <Circle className="size-4" />
//                     )}
//                   </span>

//                   <span
//                     className={cn(
//                       "text-sm transition-all",
//                       item.done
//                         ? "text-foreground/40 line-through decoration-primary/60 decoration-2"
//                         : "text-foreground/80"
//                     )}
//                   >
//                     {item.text}
//                   </span>
//                 </button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
//                   onClick={() => handleDelete(item.id)}
//                   disabled={deleteTodo.isPending}
//                 >
//                   {deleteTodo.isPending ? (
//                     <Loader2 className="size-3.5 animate-spin" />
//                   ) : (
//                     <Trash2 className="size-3.5 text-red-500" />
//                   )}
//                 </Button>
//               </motion.li>
//             ))
//           )}
//         </ul>

//         {/* Footer - Add new todo */}
//         <div className="border-t px-3 py-2.5">
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               value={newTodoText}
//               onChange={(e) => setNewTodoText(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleAddTodo();
//                 }
//               }}
//               placeholder="Add new todo..."
//               className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-foreground/40 px-2"
//               disabled={createTodo.isPending}
//             />
//             <Button
//               variant="ghost"
//               size="sm"
//               className="font-mono text-xs"
//               onClick={handleAddTodo}
//               disabled={!newTodoText.trim() || createTodo.isPending}
//             >
//               {createTodo.isPending ? (
//                 <Loader2 className="mr-1 size-3.5 animate-spin" />
//               ) : (
//                 <Plus className="mr-1 size-3.5" />
//               )}
//               Add
//             </Button>
//           </div>
//         </div>
//       </motion.div>
//     </aside>
//   );
// }

// export default TodoList;