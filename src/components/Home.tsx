"use client";
import { useMachine } from "@xstate/react";
import { todosMachine } from "../../machines/homeMachine";
import { v4 as uuidv4 } from "uuid";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { TTodo } from "../../types/todoType";
import TodoItemList from "./ui/TodoItemList";
import { useRouter } from "next/navigation";

const todos = new Set<TTodo>([]);

export default function Home() {
  const router = useRouter();
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context) => {
        const newTodo: TTodo = {
          id: uuidv4(),
          title: context.titleFormInput,
          category: context.categoryFormInput,
          completed: false,
          createdAt: new Date(),
          targetDate: context.targetDateFormInput,
        }
        console.log({newTodo});
        todos.add(newTodo);
      },
      deleteTodo: async (context, event) => {
        todos.delete(event.todo);
      },
    },
  });

  return (
    <>
      {/* <p>STATE VALUE</p>
      <p>{JSON.stringify(state.value)}</p>
      <p>STATE CONTEXT</p>
      <p>{JSON.stringify(state.context)}</p> */}
      <div className="w-full">
        {(state.matches("todosLoaded") || state.matches("creatingNewTodo.showingFormInput")) && (
          <TodoItemList
            todoList={state.context.todos}
            onDelete={(todo) => {
              send({
                type: "delete",
                todo,
              });
            }}
            onEdit={(todo) => {
              console.log("Edit", todo);
            }}
            onComplete={() => {
              console.log("Complete");
            }}/>
        )}
        {state.matches("todosLoaded") && (
          <>
          <Button
            onClick={() => {
              send({
                type: "createNewTodo",
              });
            } }
          >
            Create New Todo
          </Button><Button
            onClick={() => {
              router.push("/category");
            } }
          >
              Edit Categories
            </Button>
          </>
        )}
        {state.matches("deletingTodoErrored") && (
          <>
            <p>Something went wrong: {state.context.errorMessage}</p>
            <Button
              onClick={() => {
                send({
                  type: "speedUp",
                });
              }}
            >
              Go back to list
            </Button>
          </>
        )}
        {state.matches("creatingNewTodo.showingFormInput") && (
          <form
            className="flex flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              send({
                type: "submit",
              });
            }}
          >
            <Input
              type="text"
              placeholder="Title"
              required
              onChange={(e) => {
                send({
                  type: "titleInputChanged",
                  value: e.target.value,
                });
              }}
            />
            <Input
              type="text"
              required
              placeholder="Category"
              onChange={(e) => {
                send({
                  type: "categoryInputChanged",
                  value: e.target.value,
                });
              }}
            />
            <Input
              type="date"
              placeholder="Select Target Date"
              required
              onChange={(e) => {
                console.log("e.value", e.target.value);
                send({
                  type: "targetDateInputChanged",
                  value: e.target.value,
                });
              }}
            />
            <Button
              disabled={state.context.titleFormInput === "" || state.context.categoryFormInput === "" || state.context.targetDateFormInput === ""}
              className="disabled:opacity-50"
              type="submit"
              onClick={() => {
                send({
                  type: "submit",
                });
              }}
            >
              Create
            </Button>
            <Button
              type="button"
              onClick={() => {
                send({
                  type: "cancel",
                });
              }}
            >
              Cancel
            </Button>
          </form>
        )}
      </div>
    </>
  );
};