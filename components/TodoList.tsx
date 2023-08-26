"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/server-client";
import { UserButton } from "@clerk/nextjs";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) {
  // const todos: todo[] = await db.select().from(Todos);
  const [title, setTitle] = useState("");

  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
      setTitle("");
    },
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  return (
    <main className="max-w-6xl mx-auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-full mt-5 gap-2 items-center">
          <Input
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            type="submit"
            // size={"lg"}
            className="w-36"
            disabled={addTodo.isLoading}
            onClick={async () => {
              if (title.length) {
                addTodo.mutate(title);
              }
            }}
          >
            Add todo
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </form>
      <div className="grid grid-cols-3 justify-items-center my-4">
        {getTodos.data?.map((todo) => (
          <div className="flex justify-center items-center gap-2" key={todo.id}>
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.isCompleted}
              style={{ zoom: 1.5 }}
              onChange={async () => {
                setDone.mutate({
                  id: todo.id,
                  done: todo.isCompleted ? false : true,
                });
              }}
            />
            <h1
              className={cn(
                "font-normal",
                todo.isCompleted ? "line-through" : ""
              )}
            >
              {todo.title}
            </h1>
          </div>
        ))}
      </div>
    </main>
  );
}
