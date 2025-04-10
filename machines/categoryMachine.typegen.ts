
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Category machine.creatingNewCategory.savingCategory:invocation[0]": { type: "done.invoke.Category machine.creatingNewCategory.savingCategory:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Category machine.deletingCategory:invocation[0]": { type: "done.invoke.Category machine.deletingCategory:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Category machine.loadingCategories:invocation[0]": { type: "done.invoke.Category machine.loadingCategories:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Category machine.creatingNewCategory.savingCategory:invocation[0]": { type: "error.platform.Category machine.creatingNewCategory.savingCategory:invocation[0]"; data: unknown };
"error.platform.Category machine.deletingCategory:invocation[0]": { type: "error.platform.Category machine.deletingCategory:invocation[0]"; data: unknown };
"error.platform.Category machine.loadingCategories:invocation[0]": { type: "error.platform.Category machine.loadingCategories:invocation[0]"; data: unknown };
"xstate.after(2500)#Category machine.deletingCategoryErrored": { type: "xstate.after(2500)#Category machine.deletingCategoryErrored" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "deleteCategory": "done.invoke.Category machine.deletingCategory:invocation[0]";
"loadCategories": "done.invoke.Category machine.loadingCategories:invocation[0]";
"saveCategory": "done.invoke.Category machine.creatingNewCategory.savingCategory:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "deleteCategory" | "loadCategories" | "saveCategory";
        };
        eventsCausingActions: {
          "assignCategoriesToContext": "done.invoke.Category machine.loadingCategories:invocation[0]";
"assignErrorToContext": "error.platform.Category machine.creatingNewCategory.savingCategory:invocation[0]" | "error.platform.Category machine.deletingCategory:invocation[0]" | "error.platform.Category machine.loadingCategories:invocation[0]";
"assignTitleInputToContext": "titleInputChanged";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "deleteCategory": "delete";
"loadCategories": "cancel" | "done.invoke.Category machine.creatingNewCategory.savingCategory:invocation[0]" | "done.invoke.Category machine.deletingCategory:invocation[0]" | "xstate.init";
"saveCategory": "submit";
        };
        matchesStates: "categoriesLoaded" | "creatingNewCategory" | "creatingNewCategory.savingCategory" | "creatingNewCategory.showingFormInput" | "deletingCategory" | "deletingCategoryErrored" | "loadingCategories" | "loadingCategoriesErrored" | { "creatingNewCategory"?: "savingCategory" | "showingFormInput"; };
        tags: never;
      }
  