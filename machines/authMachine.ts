import { assign, createMachine } from 'xstate';

export const authMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWWQY0wEsA7MAOkIgBswBiCAe1IuIDcGBrcgsPDgQQyYA2gAYAuolAAHBrELpCTKSAAeiAMwBGABxlRANgBMAFh0aArAHYNVgyasAaEAE9NGo2QtGNJg7r8jAE4DHSsAX3DnNCxcAhJyShpaMAAnVIZUsmkqZHQAM0yAWzIePkEsMUkkEFl5RWUa9QRtPUNTc2tbeydXRC0gvSMfEw1zUZ0Lcw1I6KE4omYqBigYCAB5DFo8VLA8sH48PAZUYnQqlTqFJWIVZoMrPRCwrQ0DUStRHSDnNwQfDT6UTA15WMHvLSzEAxHD4RbkZarSCbdC0REkC41K4NW5NRAGUJkZ5WV7vT7fX79bREoK0nQ9MEaUQWExQmELBJkWCYBgAdwAwrt9odjqd0AAxYq0WCoABGRQUmJkcmujVAzQ0QVE+m0RhJVlpRlEJiMlIQWlM2usxosAw0tiCFrZ8zhnO5fMFe3QByOJzOktSRW2yGIeDAVCVtRVOLu+MeRNCJLeHy+Pz65p0nhMtMGo1pFm8QWdsVdzHdAqF3pFfolxVKlZ9ov9xQAksRpFswEVkIQqG2O+h+ZgQ2tI9ibrGEAZAWZRu96SErN5en8LSYTETRLYDWM-BaZlFoS74mWeRWvY2awGSjsL9Wxdf+1tpMhYLBeZkIE-B8PiKOJJc0YTniCAWNqS7ApBUHAhoZpaFoZhEmB04GBYbyOkEB5zCWJ7kOWAAyKwkNe0pygq5wAViQFqmoiBmJ4aEWvqhrGkYBhmmEnhWA42YWLm9rwcWsK4VyZ6EVAxFSngIZhhGlHKvUwHqviUwJi8ybkmmfw6FoZDZnSkwFlqmZCRyp58uJkmBmQlnEI+7adt2vbfkOI6QGO1G4sp5pWGQIzJguDzLhxwJEsES70uuWgGqyh7sqWeFiURdl1rZ9kDrQL5vh+qRfg5P5uRAHmKTRzQbmB0GVUYOhmp8G5BHY-jWCEZioaZCX1l6JBQPeZz0EwiRsJw5DxSJt55N1vXoAgJDsNJOJVMVqpebRCA6QYRK2PpjyiBaQSmumFrMmFVhsWh3F2NV7VjZWk2+mKKTpJk2S5AUdajfCnUTX+U0zUN803It8lRiVK0alqOpMdFLEmnBWiGGQYS2mY3weCYkJxcen2IhJf5tv1zCzcNZAfZyOPdW2f1zRNTBA9UCnLZOBobaM3HfBY9h8dxHHWH5nwhF8RrDDosXYcJ2MrLjUD42kGRZDkeSFNZpNLJLFPEFTDAA7TEhLTGIGtX5Ol6tD+2sWaBhBBufg6CLvivMjRiRIexAMBAcAqCrYCAaDk4ALSOnpObByHK6IH7G1QfB64mKIjoGhEmM4Z9STe1RvsGwdfzaBtFWiEaliYSYHPXRLSIbBgPuMyB3iAltDVhFbHxTGaRgDEhkHZvYuioU7Sfi26Z6esK93NoGVf695XF55VwLVSYcGGLpxeGG8aGW3apeDx6DZTdeX1VqPtaBt+E9Kat7xkImYH7dFzK5nBvgWIjHP7cMHhMraW-mbyaXFGfpVw6jCDiHUBYcpzRT0o1LQzV7D0gsN-RKFlkr7z-iffKACwZ0SCGQTUItGS7UMDHdi6YtS6VtsEXa2ZdCnVFkeZOnJxqKB+kfTBk4+LP18N0T4AxbRoTgkaDcMCxj+GNNoV4iCyDkzxitccgCIGcNZg8XaQQ+GwXTCLHBpglwcxRtYEWkicaQDbGwkC8NELF20BzS2lh9wCPzpuB0RDjSfAMM7cIQA */
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
        createAccount: { data: { email: string; password: string } };
        redirect: { data: void };
      },
      events: {} as
        | { type: 'emailInputChanged'; value: string }
        | { type: 'passwordInputChanged'; value: string }
        | { type: 'login' | 'createAccount' | 'submit' | 'cancel' | 'redirect' },
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
