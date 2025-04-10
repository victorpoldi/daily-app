import { actions, createMachine } from "xstate";
import { TCategory } from "../types/categoryType";

export const categoryMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAXMUD2AnAngAQC2qAxgBYCWAdmAHQA22qEtUamOuVcAxBGx16tAG7YA1g05Y8RUpVoNmrdjO69YCMdjIYqQgNoAGALonTiUAAdssKugM0rIAB6IAjACYPH+h4B2DwAOAE5jLwBWYICwgBoQfEQvWPovABZ0gNCPADZ8goCAXyKE9TkScmphFTYaDgxZHn4wXFw8emtGDAAzPGJ6coJKxRqWOoauPE1tGnE9RyMzCxdbe0XnJDdPHz9AkPComPjEz2DItJyC64LQkrLG7nkqpXoFps0AGXHIPjJcMCNAByYAA7kN8CstmsHE4XO4EJEvAkkggAkj6OljLkovcQBCRtUGO8NHBvqxfhAwIwwJgoTY7LChPDELE9kEwhForEcijEOlcsFMZEAMzeSJ4gkKIlvAH6eog8GPOT0WAUbCg9gAMX6AEkaNYAK7oPiwQ0AI2IDnpIBhGxZCDFIvowW86WCWXS3g8xlC6T5CCiztCovFkuVw2lr3+gMcCrBENV6s19R1uGI+qNJsc6BpmeNyAoqHqkBtdrhWwRMQDHkiHnDU0jL2EMflUEVibVGu1eoNxr+xbI1LLjPtldZQX8HMO3LCHgDGQC-nSIq8XiuNzupXxEeeo2Jcrj7YTu9VqFEal3AiEDB0UkGu8J0cP7A7p9g58vjfws3m+iW5hmKso4VqACIBJO+yckcPLzqcCAeKEoT0LkK5rhu1xbg835Pi2L7xkq35nhe9QQnwrTtLgnTdOgfTpg+OFRnhsavieREfiRkxND+OgLE4FgjusoHbI6HjOq6GQegEXo+L6-rwXk9bblKzYMFSNJHmRgjCHe0iPkxanUrSX7cb+uj-jQAlAdCIHMuOaKulOBxcscvLweuS6oau655NcxTKfpqn0OpxmkVeFEdF0vT9Ax3G4YZGkmU8Zl8QBglMpsYHJB6-iRDikQBtEyFeMYYq4gFjFBSFmm7gAom0eC-LA1hgJAACq1jpWOWVohk-hRKVxh1uibIBrkxjpPQxhiRExjBCKC0LekDZxQZwVGTV371ZRvyuLA6CNPQqA9JguAABQDcYACUfAqfu62JWFW0NQCEBdcJ4F9eKg3DZEo3wbkkSTXWIqzfNi0isteI0NgVLwFsd1EsBQl2T1AC0oQBmjGQrU88VMOMSXTHAyMZQ6oTBLk9BlXWSKzm5qKIUuASCuhvmYbjFRrSSxOwOSVIQKT3UiR47p+KV3iAzBJyomVLoTYK6Kc02921ETzSwNtjWCzZKOZSLXpU+6K4zq5C7GEu03BGzNy5FhO6VfdrZHm+35Cx9iAipjAPOhKFWrUFzusYR3FJt2qa9lm7uoyLQ0ocbIrogudb0CGNPK3uMpBwRnafk93HR-rCJ1sh321tLDOeOiy7eRhtwZ-j1Xq6iDJ6w6SIBpkFzpKG5XYQH91N-nTxa69hcOu6yECjEBUAz6qfrorfslEAA */
    context: {
      categories: [] as TCategory[],
      errorMessage: undefined as string | undefined,
      titleFormInput: "",
    },
    schema: {
      services: {} as {
        loadCategories: { data: TCategory[] };
        saveCategory: { data: void };
        deleteCategory: { data: void };
      },
      events: {} as
        | { type: "createNewCategory" }
        | { type: "titleInputChanged"; value: string }
        | { type: "categoryInputChanged"; value: string }
        | { type: "completedInputChanged"; value: boolean }
        | { type: "targetDateInputChanged"; value: string }
        | { type: "submit" }
        | { type: "cancel" }
        | { type: "delete"; category: TCategory }
        | { type: "speedUp" },
    },
    tsTypes: {} as import("./categoryMachine.typegen").Typegen0,
    id: "Category machine",
    initial: "loadingCategories",
    states: {
      loadingCategories: {
        invoke: {
          src: "loadCategories",
          onDone: {
            actions: "assignCategoriesToContext",
            target: "categoriesLoaded",
          },
          onError: {
            actions: "assignErrorToContext",
            target: "loadingCategoriesErrored",
          },
        },
      },
      categoriesLoaded: {
        on: {
          createNewCategory: { target: "creatingNewCategory" },
          delete: { target: "deletingCategory" },
        },
      },
      loadingCategoriesErrored: {},
      creatingNewCategory: {
        initial: "showingFormInput",
        states: {
          showingFormInput: {
            on: {
              submit: { target: "savingCategory" },
              titleInputChanged: { actions: "assignTitleInputToContext" },
              cancel: "#Category machine.loadingCategories",
            },
          },
          savingCategory: {
            invoke: {
              src: "saveCategory",
              onDone: [{ target: "#Category machine.loadingCategories" }],
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
      deletingCategory: {
        invoke: {
          src: "deleteCategory",
          onDone: [{ target: "loadingCategories" }],
          onError: [
            {
              actions: "assignErrorToContext",
              target: "deletingCategoryErrored",
            },
          ],
        },
      },
      deletingCategoryErrored: {
        after: {
          "2500": { target: "categoriesLoaded" },
        },
        on: {
          speedUp: { target: "categoriesLoaded" },
        },
      },
    },
  },
  {
    actions: {
      assignCategoriesToContext: actions.assign((context, event) => {
        context.titleFormInput = "";
        return { categories: event.data };
      }),
      assignTitleInputToContext: actions.assign((context, event) => {
        return { titleFormInput: event.value };
      }),
      assignErrorToContext: actions.assign((context, event) => {
        return { errorMessage: (event.data as Error).message };
      }),
    },
  }
);
