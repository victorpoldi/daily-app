"use client";
import { useMachine } from "@xstate/react";
import { todosMachine } from "../../../machines/homeMachine";
import Button from "../ui/Button";
import { TTodo } from "../../../types/todoType";
import { v4 as uuidv4 } from "uuid";
import TodoItemList from "./TodoItemList";
import { useRouter } from "next/navigation";
import { Drawer, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NewTodoForm from "./NewTodoForm";
import { TCategory } from "../../../types/categoryType";

const todos = new Set<TTodo>([]);
const categories = new Set<TCategory>([
  { id: uuidv4(), title: "Work" },
  { id: uuidv4(), title: "Personal" },
  { id: uuidv4(), title: "Shopping" },
  { id: uuidv4(), title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" },
]);

export default function Home() {
  const router = useRouter();
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => Array.from(todos),
      saveTodo: async (context) => {
        const newTodo: TTodo = {
          id: uuidv4(),
          title: context.titleFormInput,
          category: context.categoryFormInput,
          completed: false,
          createdAt: new Date(),
          targetDate: context.targetDateFormInput,
        };
        todos.add(newTodo);
      },
      deleteTodo: async (context, event) => {
        todos.delete(event.todo);
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 border-b-gray-400 border-b-2 pb-4">
        <h1 className="text-gray-100 leading-normal">Todos</h1>
        <Button onClick={() => router.push("/category")}>Edit Categories</Button>
      </div>

      {(state.matches("todosLoaded") || state.matches("creatingNewTodo.showingFormInput")) && (
        <TodoItemList
          todoList={state.context.todos}
          onDelete={(todo) => send({ type: "delete", todo })}
          onEdit={(todo) => console.log("Edit", todo)}
          onComplete={() => console.log("Complete")}
        />
      )}

      {state.matches("todosLoaded") && (
        <FloatButton
          icon={<PlusOutlined />}
          style={{
            insetInlineEnd: 40,
            backgroundColor: "#99a1af",
            width: "48px",
            height: "48px",
          }}
          onClick={() => send({ type: "createNewTodo" })}
        />
      )}

      {state.matches("deletingTodoErrored") && (
        <>
          <p>Something went wrong: {state.context.errorMessage}</p>
          <Button onClick={() => send({ type: "speedUp" })}>Go back to list</Button>
        </>
      )}

      {state.matches("creatingNewTodo.showingFormInput") && (
        <Drawer
          title="Create New Todo"
          placement="bottom"
          closable={false}
          onClose={() => send({ type: "cancel" })}
          open={state.matches("creatingNewTodo.showingFormInput")}
          style={{
            backgroundColor: "#101828",
            color: "#fff",
            padding: "1rem",
            borderRadius: "16px 16px 0 0",
          }}
          styles={{
            header: { borderBottom: "1px solid rgba(255, 255, 255, 0.8)", padding: "1rem" },
            body: {padding: "1rem" },
            wrapper: { height: "fit-content" },
          }}
        >
          <NewTodoForm
            onCancel={() => send({ type: "cancel" })}
            onSubmit={(e) => {
              e.preventDefault();
              send({ type: "submit" });
            }}
            onChangeTitle={(e) => send({ type: "titleInputChanged", value: e.target.value })}
            // onChangeCategory={(e) => send({ type: "categoryInputChanged", value: e.target.value })}
            onChangeCategory={(value) => send({ type: "categoryInputChanged", value: value as string })}
            onChangeTargetDate={(e) => send({ type: "targetDateInputChanged", value: e.target.value })}
            // TODO: TRY TO USE CONTEXT AND EVENTS BESIDE OF ONCHANGES...
            context={state.context}
            events={state.event}
            categories={Array.from(categories)}
          />
        </Drawer>
      )}
    </div>
  );
}


