
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Todo machine.creatingNewTodo.savingTodo:invocation[0]": { type: "done.invoke.Todo machine.creatingNewTodo.savingTodo:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Todo machine.deletingTodo:invocation[0]": { type: "done.invoke.Todo machine.deletingTodo:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Todo machine.loadingTodos:invocation[0]": { type: "done.invoke.Todo machine.loadingTodos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Todo machine.creatingNewTodo.savingTodo:invocation[0]": { type: "error.platform.Todo machine.creatingNewTodo.savingTodo:invocation[0]"; data: unknown };
"error.platform.Todo machine.deletingTodo:invocation[0]": { type: "error.platform.Todo machine.deletingTodo:invocation[0]"; data: unknown };
"error.platform.Todo machine.loadingTodos:invocation[0]": { type: "error.platform.Todo machine.loadingTodos:invocation[0]"; data: unknown };
"xstate.after(2500)#Todo machine.deletingTodoErrored": { type: "xstate.after(2500)#Todo machine.deletingTodoErrored" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "deleteTodo": "done.invoke.Todo machine.deletingTodo:invocation[0]";
"loadTodos": "done.invoke.Todo machine.loadingTodos:invocation[0]";
"saveTodo": "done.invoke.Todo machine.creatingNewTodo.savingTodo:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "deleteTodo" | "loadTodos" | "saveTodo";
        };
        eventsCausingActions: {
          "assignCategoryInputToContext": "categoryInputChanged";
"assignCompletedInputToContext": "completedInputChanged";
"assignErrorToContext": "error.platform.Todo machine.creatingNewTodo.savingTodo:invocation[0]" | "error.platform.Todo machine.deletingTodo:invocation[0]" | "error.platform.Todo machine.loadingTodos:invocation[0]";
"assignTargetDateInputToContext": "targetDateInputChanged";
"assignTitleInputToContext": "titleInputChanged";
"assignTodosToContext": "done.invoke.Todo machine.loadingTodos:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "deleteTodo": "delete";
"loadTodos": "cancel" | "done.invoke.Todo machine.creatingNewTodo.savingTodo:invocation[0]" | "done.invoke.Todo machine.deletingTodo:invocation[0]" | "xstate.init";
"saveTodo": "submit";
        };
        matchesStates: "creatingNewTodo" | "creatingNewTodo.savingTodo" | "creatingNewTodo.showingFormInput" | "deletingTodo" | "deletingTodoErrored" | "loadingTodos" | "loadingTodosErrored" | "todosLoaded" | { "creatingNewTodo"?: "savingTodo" | "showingFormInput"; };
        tags: never;
      }
  