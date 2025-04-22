import { assign, createMachine } from 'xstate';

export const authMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWWQY0wEsA7MAOkIgBswBiCAe1IuIDcGBrcgsPDgQQyYA2gAYAuolAAHBrELpCTKSAAeiAKwAmADQgAnogCMGgOyiyWgBxWAnKesaALADYjTgMwBfL3rRZcAhJyShpaMAAnCIYIsmkqZHQAMxiAWzIePkEsMUkkEFl5RWV89QQrURcyWw9TDRMtDStTOz1DBCctD2qtWzMnWxcXT0qXHz8hQKJmKgYoGAgAeQxaPAiwRLB+PDwGVGJ0XJVChSViFTKKqpq6hqaW2zbjUydLI2atUSN3z6dTU3GIH8OHw03Is3mkGW6FoEJIR3yJ2K51KiC06LIGhuZhcvQ8ticGg8TwQ3z+ZFEfS0Rg8og8RlMLmagOBU2CZAhC2hsLmJAA6gpMABxBhzGgImRyU4lUBlLSdTHYxl4glEkm2KyvQYuURYxmdLQuby+IGTUHs2CYBgAdwAwutNttdvt0AAxNK0WCoABGqQUEoKUuRFzRLUVtQq9TqLRJDKMZFM7wcXx+oj+AJNrPNzEtNvtG3QWx2ewO7oiqVWyGIeDAVADSLOIfKlWqtXq2nurQMaKsVSZL3l9mVupZZqCOatdodhadJbdaQy06LztLaQAksRpCtpMhYLBrTEIBut+hbZgqwt60HG6iEPVurZKtZdQyzFYSfLrkSn7qXn0jFoo4BNm5C5lOBbLnOZbpGsEGzi60HHisYCpMghBUEhp7nsQl4SMc14ymomiGmQwyVB4wxOE4lIMrGGgWLYjGDNG9GmB48pASC46gZOAAyvLENBno+n6hx4YiBEorKaLWBSNzfFY35aA4xLdqSvQWM4Vi1O4Rh0i4GqcWyE42vxUAkEJeBVjWdbiZKRQ3tJCBdFo4bRriNSqqp7R6R4GhkK4OpGm+thdBmEzAdxZBgWZFkLrFgnrpu267vuh6YWeF6QFeDmEWUThWK5LQAQpSmJrGLlkB4fmmBqhp+QMVhGSB0V8QJ0FkAliHJTCKFoRhPWZTh2V2YGuVSURHR9JiJhNEyZVGLGNJVB4hUvEYoVWHplTNVFsGJCQUDwQc9BMCEbCcOQWZ7dOh3HegCAkOwVnIrkOXShNcpMm5kavjGalNAxvRNI0fSFdou1gouBZ3cWLrhFEMRxAkyQLtdUP7YoOH3Y9F0vWcb2jQ2eWhlYP0vtG75qeirnUs0aaKQSJjhaakVQ5yh0bqdzBPZdZDo+yHM4RuuPPQdTCE3k9kfU2dNyTp7xlV0sadGT9JdNpLhRtVTiQ4LczmcLxAI9EsTxIkKTlvzY7swbnPEKLDD4xLEjvcGt7omTlIK4ptLKcranfPYiraPSJgmBULMC8w1poVjUBliKYp0IwPMXVwGSYLwHCHUnUDikTklNrV3RpkyBW9ImG2LWpfTdKt-s2CYogtFHNvsrHpw4Ynor53QkSm8jFsLpkOc4XnBdS2NMsewqWJtsqnmEt5iA3AFQyVKI8p6cFPgmsQDAQHAKjR2A+HjU2AC0Lgkpf8oUqIj9fNS9iP4Ves89QZ8SRfHvffPLQKZvhJJ4Ko1E3BOAAltACJcP7ggNlCDA58Z5OWaOqck9QdRYi6K-ZwcDWp5iXPdaCyD3ZOVcP5R8uJfqUxJEaAKTENSUkNPeNubMLSTnzI6OGq4raY0gghJKJ5SGOUmh2eWjJExDBpIyEkHhyRUJctpVauJjQRS4lDGK7U0giJJh0eRCYtrUkVn7cqgcGZkBsMpeRvR6ZjEzO3Ey1ourxW0eWTCujPrEVMKRWqQxXAKSMLiWM1VujWDsAZOkjEGT4MxrDFc6BPFNk6LGb6mpagMyxJAsw+ChZQA3Ek282gKrvACq4IxDh6IuDYRo-WkIjwTWJl40kj94zNAGGxSuQca4+U8K8JodhskvEpNU-Bnd4492ToU8h9EKTFQolRaith3jqlklYhwjgAmeD3l4IAA */
    id: 'authMachine',
    initial: 'idle',
    tsTypes: {} as import('./authMachine.typegen').Typegen0,
    context: {
      error: undefined as string | undefined,
      authData: { email: "", password: "" },
      formInputEmail: "",
      formInputPassword: "",
    },
    schema: {
      services: {} as {
        checkAuth: { data: { email: string; password: string } };
        login: { data: { email: string; password: string } };
        checkingGoogle: {data: { email: string; password: string } }
        createAccount: { data: { email: string; password: string } };
        redirect: { data: void };
      },
      events: {} as
        | { type: 'emailInputChanged'; value: string }
        | { type: 'passwordInputChanged'; value: string }
        | { type: 'login' | 'createAccount' | 'loginWithGoogle' | 'submit' | 'cancel' | 'redirect' },
    },
    states: {
      idle: {
        invoke: {
          src: 'checkAuth',
          id: 'checkAuth',
          onDone: {
            target: 'loggedIn',
            actions: 'assignAuthDataToContext',
          },
          onError: {
            target: 'loggedOut',
            actions: 'assignErrorToContext',
          },
        },
      },

      loggedOut: {
        on: {
          createAccount: {
            target: 'showCreateAccountForm',
          },

          login: {
            target: '#authMachine.showLoginForm',
          },

          loginWithGoogle: "waitingForGoogle"
        },
      },

      showCreateAccountForm: {
        initial: "createAccountFormInput",
        states: {
          createAccountFormInput: {
            on: {
              passwordInputChanged: {
                target: "createAccountFormInput",
                actions: 'assignPasswordInputToContext',
              },
              emailInputChanged: {
                target: "createAccountFormInput",
                actions: 'assignEmailInputToContext',
              },
            },
          },
        },
        on: {
          submit: {
            target: 'creatingAccount',
          },
          cancel: {
            target: 'loggedOut',
          },
        },
      },

      showLoginForm: {
        initial: 'LoginFormInput',
        states: {
          LoginFormInput: {
            on: {
              passwordInputChanged: {
                target: 'LoginFormInput',
                actions: 'assignPasswordInputToContext',
              },
              emailInputChanged: {
                target: 'LoginFormInput',
                actions: 'assignEmailInputToContext',
              },
            },
          },
        },
        on: {
          submit: {
            target: 'loggingIn',
          },
          cancel: {
            target: 'loggedOut',
          },
        },
      },

      creatingAccount: {
        invoke: {
          src: 'createAccount',
          onDone: {
            target: 'loggedIn',
            actions: 'assignAuthDataToContext',
          },
          onError: {
            target: 'showCreateAccountForm',
            actions: 'assignErrorToContext',
          },
        },
      },

      loggingIn: {
        invoke: {
          src: 'login',
          onDone: {
            target: 'loggedIn',
            actions: 'assignAuthDataToContext',
          },
          onError: {
            target: '#authMachine.showLoginForm',
            actions: 'assignErrorToContext',
          },
        },
      },

      loggedIn: {
        invoke: {
          src: 'redirect',
        },
        type: 'final',
      },

      waitingForGoogle: {
        invoke: {
          src: "checkingGoogle",
          id: "checkingGoogle",
          onDone: {
            target: "loggedIn",
            actions: 'assignAuthDataToContext',
          },
          onError: {
            target: "loggedOut",
            actions: 'assignErrorToContext',
          }
        }
      }
    },
  },
  {
    actions: {
      assignAuthDataToContext: assign((context, event) => {
        context.error = "";
        return {
          authData: event.data,
        };
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          error: (event.data as Error).message,
        };
      }),
      assignEmailInputToContext: assign((context, event) => {
        return {
          formInputEmail: event.value,
        };
      }),
      assignPasswordInputToContext: assign((context, event) => {
        return {
          formInputPassword: event.value,
        };
      }),
    },
  }
);
