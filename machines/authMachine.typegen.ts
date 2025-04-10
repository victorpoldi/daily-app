
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.authMachine.creatingAccount:invocation[0]": { type: "done.invoke.authMachine.creatingAccount:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.authMachine.loggingIn:invocation[0]": { type: "done.invoke.authMachine.loggingIn:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.checkAuth": { type: "done.invoke.checkAuth"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.authMachine.creatingAccount:invocation[0]": { type: "error.platform.authMachine.creatingAccount:invocation[0]"; data: unknown };
"error.platform.authMachine.loggingIn:invocation[0]": { type: "error.platform.authMachine.loggingIn:invocation[0]"; data: unknown };
"error.platform.checkAuth": { type: "error.platform.checkAuth"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "checkAuth": "done.invoke.checkAuth";
"createAccount": "done.invoke.authMachine.creatingAccount:invocation[0]";
"login": "done.invoke.authMachine.loggingIn:invocation[0]";
"redirect": "done.invoke.authMachine.loggedIn:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "checkAuth" | "createAccount" | "login" | "redirect";
        };
        eventsCausingActions: {
          "assignAuthDataToContext": "done.invoke.authMachine.creatingAccount:invocation[0]" | "done.invoke.authMachine.loggingIn:invocation[0]" | "done.invoke.checkAuth";
"assignEmailInputToContext": "emailInputChanged";
"assignErrorToContext": "error.platform.authMachine.creatingAccount:invocation[0]" | "error.platform.authMachine.loggingIn:invocation[0]" | "error.platform.checkAuth";
"assignPasswordInputToContext": "passwordInputChanged";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "checkAuth": "xstate.init";
"createAccount": "submit";
"login": "submit";
"redirect": "done.invoke.authMachine.creatingAccount:invocation[0]" | "done.invoke.authMachine.loggingIn:invocation[0]" | "done.invoke.checkAuth";
        };
        matchesStates: "creatingAccount" | "idle" | "loggedIn" | "loggedOut" | "loggingIn" | "showCreateAccountForm" | "showCreateAccountForm.createAccountFormInput" | "showLoginForm" | "showLoginForm.LoginFormInput" | { "showCreateAccountForm"?: "createAccountFormInput";
"showLoginForm"?: "LoginFormInput"; };
        tags: never;
      }
  