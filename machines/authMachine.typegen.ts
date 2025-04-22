
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.authMachine.creatingAccount:invocation[0]": { type: "done.invoke.authMachine.creatingAccount:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.authMachine.loggingIn:invocation[0]": { type: "done.invoke.authMachine.loggingIn:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.checkAuth": { type: "done.invoke.checkAuth"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.checkingGoogle": { type: "done.invoke.checkingGoogle"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.authMachine.creatingAccount:invocation[0]": { type: "error.platform.authMachine.creatingAccount:invocation[0]"; data: unknown };
"error.platform.authMachine.loggingIn:invocation[0]": { type: "error.platform.authMachine.loggingIn:invocation[0]"; data: unknown };
"error.platform.checkAuth": { type: "error.platform.checkAuth"; data: unknown };
"error.platform.checkingGoogle": { type: "error.platform.checkingGoogle"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "checkAuth": "done.invoke.checkAuth";
"checkingGoogle": "done.invoke.checkingGoogle";
"createAccount": "done.invoke.authMachine.creatingAccount:invocation[0]";
"login": "done.invoke.authMachine.loggingIn:invocation[0]";
"redirect": "done.invoke.authMachine.loggedIn:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "checkAuth" | "checkingGoogle" | "createAccount" | "login" | "redirect";
        };
        eventsCausingActions: {
          "assignAuthDataToContext": "done.invoke.authMachine.creatingAccount:invocation[0]" | "done.invoke.authMachine.loggingIn:invocation[0]" | "done.invoke.checkAuth" | "done.invoke.checkingGoogle";
"assignEmailInputToContext": "emailInputChanged";
"assignErrorToContext": "error.platform.authMachine.creatingAccount:invocation[0]" | "error.platform.authMachine.loggingIn:invocation[0]" | "error.platform.checkAuth" | "error.platform.checkingGoogle";
"assignPasswordInputToContext": "passwordInputChanged";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "checkAuth": "xstate.init";
"checkingGoogle": "loginWithGoogle";
"createAccount": "submit";
"login": "submit";
"redirect": "done.invoke.authMachine.creatingAccount:invocation[0]" | "done.invoke.authMachine.loggingIn:invocation[0]" | "done.invoke.checkAuth" | "done.invoke.checkingGoogle";
        };
        matchesStates: "creatingAccount" | "idle" | "loggedIn" | "loggedOut" | "loggingIn" | "showCreateAccountForm" | "showCreateAccountForm.createAccountFormInput" | "showLoginForm" | "showLoginForm.LoginFormInput" | "waitingForGoogle" | { "showCreateAccountForm"?: "createAccountFormInput";
"showLoginForm"?: "LoginFormInput"; };
        tags: never;
      }
  