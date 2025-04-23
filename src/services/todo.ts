
import { TTodo } from "../../types/todoType";

export async function createTodo(todo: TTodo) {
  const response = await fetch(" https://createtodo-jzc6hquj5q-uc.a.run.app", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return await response.json();
}