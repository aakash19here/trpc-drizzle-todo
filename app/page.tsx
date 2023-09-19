// import TodoList from "@/components/TodoList";
import React from "react";
import { serverClient } from "./_trpc/server-client";

export default async function page() {
  const todos = await serverClient.getTodos();
  return (
    <div>
      <h1 className="flex justify-center my-5">
        Todo : Get shit on edge via mysql
      </h1>
      <TodoList initialTodos={todos} />
    </div>
  );
}
