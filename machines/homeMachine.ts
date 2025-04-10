import { createMachine, assign } from "xstate";
import { TTodo } from "../types/todoType";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQA2quEZUaGsAxBuRWQG6oDWlTLHiJlKNOg0GwE3VPlwAXYqlIBtAAwBdDZsSgADqljElKvSAAeiAEwBWaxVsB2ABzr11gJxeAbC6e2ADQgAJ6ItrYALBTenk6RLrYAzLYAjLY+1gC+WcGCOAQkHOL0pIzoRixgAE7VqNUU+lSKAGb12BT5wkVitKXlzDKkPPKmalo65obGY+ZWCHYOzm4esX4BwWEL7hQB7j6p6inpmbY5eRUFIhwKFbAAMn2QLPjVYIpgAHJgAO6Ck0gQNMTMpSHNEJkkjF1AdrE41v4gqEIUlUhRUqlIrFUp5vKkXC5ziAuoVRBRbsxHnRnhAwFQwAowACDEYQWZAfNIdDYfDfIjNuE3BQDpEMl4CdYXKlsrliZdumTXu8lGVvn8KhRYIRUD8GAAxdoASVI+gArgoWLBTQAjbAmZlA1mzDmIaWRHzC9SeGGeFzWSLWfEuAUICUURK2dzqKVJNwyi4YK49ChKxQMNWCTXa3VlA3VbDGs0W0ZgKD1EKF80AYUIuDKkAdwOdoHmnkiUIxngOMPbkSxIcyLhikdSKW9Lh8BzOspJ10oqZVUAzGq1Ov1RpN5pYSgU9MrChrdZgEEbTtB4IQhyOjnSKSOkVS8J8nhDTniFFRbiiOLxBKJs+TBd01+TNVxzKA8wLTcLQUXBqhgBQABEPn3Q96xPLQpjPdkW1dJJ1CcChA0SdRbESTwkg2ZEEDbWwPwiKMYzjf95VJDggNVECV2zdd833F5UGwJoGUgVDa3Q08ZnPF1L3wwjiMjMjbAoqitniNFvWsf1rA8SInCSTxpwTIQ2PnN40049UME1XAuEkCo2BUShZH4TpWLnFNzMXZdrNgWz7IwIYRjTFQdEktkwRk7THFcdwvD5VTEClRx3GlHSnCOaUjLlRMFXYrzgKs1AbLsspBCqWp6kaZoFDafM3Ny0zPOVQrQP8sqKiCuQQvGbRMMBJtpNwy9-Q9HwvR9P0AyDV8XE8aEtIDXT9MMljGo82l6UXcr2Gc4Y+AEdzk02hkAtQLrRlBML+pZKScMsGx7BilZ4q7flqKSHw6NFJIsWlQ4VOygCyRO7aHJqOoGiaVp2gakyNrpU6OsC2RLtCiYbsdO7IuGxZnrihFEoQB8HEMpJPs8TEYTsNb4eOxGwYwABRSq3ggS19DASAAFV9HC5sHoWLFhScfFRy7BJ2yJ586NjT7SMMjLUXjHK6ZBhmzpZyHngsWBYMZChcBaRlqgACjsdwAEoWGBjhQc11mG0xwb7vmPHlgJhKkS2Hw9PDFxUUfHwAlcaVaaTRUCss0CeNzDcixeOt8DpfmhsFgBaDIKEl32uzInTle9pL3w8Ud1GlGXlZyWVSHQOBzFtsAsOxi908OaIc6xL6-Uy6wQ0zmJcX8catPJglg-DvLegkZGjGbiKLwDEMdI9exg7bdsx0ooGjrJCkjCpWkIHngX5j06IkjhAlo2U7eQzIwjkkxNsqdOSempKM7YC1+pIBPtOz7OHDN6SMr11hFwWFpbOTg-DB2DssLK78PIcSXFxDA-9XZJR8FCP0rg3DkTvtRb82dIwTVHFpNsSQkGASjqgoqWY1xxz4tBDBONBaUzRLg6+BCiYgKIqLfCFcyZhxnLvfKLVo4rnagMVArCLyYjSDEQMGRfTaRmtRFw7ps6xi8L9ZwvdqHqy2mdORMl9JLEyO2OavtNGxhDJ9KEyx3Q+nJspSIhi7Ya1nj-NmpjhpL2or7C+AcEixgnKLP81cgA */
  createMachine(
    {
      context: {
        todos: [] as TTodo[],
        errorMessage: undefined as string | undefined,
        titleFormInput: "",
        categoryFormInput: "",
        completedFormInput: false,
        targetDateFormInput: "",
      },
      tsTypes: {} as import("./homeMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: TTodo[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
            data: void;
          };
        },
        events: {} as
          | { type: "createNewTodo"; }
          | { type: "titleInputChanged"; value: string;}
          | { type: "categoryInputChanged"; value: string;}
          | { type: "completedInputChanged"; value: boolean;}
          | { type: "targetDateInputChanged"; value: string;}
          | { type: "submit"; }
          | { type: "cancel"; }
          | { type: "delete"; todo: TTodo; }
          | { type: "speedUp"; },
      },
      id: "Todo machine",
      initial: "loadingTodos",
      states: {
        loadingTodos: {
          invoke: {
            src: "loadTodos",
            onDone:
              {
                actions: "assignTodosToContext",
                target: "todosLoaded",
              },
            onError: 
              {
                actions: "assignErrorToContext",
                target: "loadingTodosErrored",
              },
          },
        },

        todosLoaded: {
          on: {
            createNewTodo: {
              target: "creatingNewTodo",
            },
            delete: {
              target: "deletingTodo",
            },
          },
        },

        loadingTodosErrored: {},

        creatingNewTodo: {
          initial: "showingFormInput",
          states: {
            showingFormInput: {
              on: {
                submit: {
                  target: "savingTodo",
                },

                categoryInputChanged: {
                  actions: "assignCategoryInputToContext",
                },

                titleInputChanged: {
                  actions: "assignTitleInputToContext",
                },

                targetDateInputChanged: {
                  actions: "assignTargetDateInputToContext",
                },

                completedInputChanged: {
                  actions: "assignCompletedInputToContext",
                },

                cancel: "#Todo machine.loadingTodos"
              },
            },
            savingTodo: {
              invoke: {
                src: "saveTodo",
                onDone: [
                  {
                    target: "#Todo machine.loadingTodos",
                  },
                ],
                onError: [
                  {
                    actions: "assignErrorToContext",
                    target: "showingFormInput",
                  },
                ],
              },
            },
          },
        },

        deletingTodo: {
          invoke: {
            src: "deleteTodo",
            onDone: [
              {
                target: "loadingTodos",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "deletingTodoErrored",
              },
            ],
          },
        },

        deletingTodoErrored: {
          after: {
            "2500": {
              target: "todosLoaded",
            },
          },
          on: {
            speedUp: {
              target: "todosLoaded",
            }
          },
        }
      },
    },
    {
      guards: {
        // "Has todos": (context, event) => {
        //   return event.data.length > 0;
        // },
      },
      actions: {
        assignTodosToContext: assign((context, event) => {
          context.titleFormInput = "";
          context.categoryFormInput = "";
          context.completedFormInput = false;
          context.targetDateFormInput = "";
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
        assignTitleInputToContext: assign((context, event) => {
          return {
            titleFormInput: event.value,
          };
        }),
        assignCategoryInputToContext: assign((context, event) => {
          return {
            categoryFormInput: event.value,
          };
        }),
        assignCompletedInputToContext: assign((context, event) => {
          return {
            completedFormInput: event.value,
          };
        }),
        assignTargetDateInputToContext: assign((context, event) => {
          return {
            targetDateFormInput: event.value,
          };
        }),
      },
    },
  );