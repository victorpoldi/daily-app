"use client";
import { useMachine } from "@xstate/react";
import { authMachine } from "../../machines/authMachine";
import { useRouter } from "next/navigation";
import { createAccount, login } from "../../api/auth";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function Auth() {
  const router = useRouter();
  const [state, send] = useMachine(authMachine, {
    services: {
      login: async () => {
        if (!state.context.formInputEmail || !state.context.formInputPassword) {
          throw new Error("Email and password are required");
        }
        try {
          const email = state.context.formInputEmail as string;
          const password = state.context.formInputPassword as string;
          await login(email, password);
          console.log("Login");
          return { email, password };
        } catch (error) {
          console.error("Login error", error);
          throw new Error("Login failed");
        }
      },
      createAccount: async () => {
        if (!state.context.formInputEmail || !state.context.formInputPassword) {
          throw new Error("Email and password are required");
        }
        try {
          const email = state.context.formInputEmail as string;
          const password = state.context.formInputPassword as string;
          await createAccount(email, password);
          console.log("Login");
          return { email, password };
        } catch (error) {
          console.error("Unable to Create New Account", error);
          throw new Error("Unable to Create New Account");
        }
      },
      checkAuth: async () => {
        console.log("Checking Auth");
        // throw new Error("Not Authenticated");
        return { email: "test", password: "test" };
      },
      redirect: async () => {
        console.log("Redirecting to home");
        router.push("/home");
        return;
      },
    },
  });

  return (
    <>
      <h1>AUTHPAGE</h1>
      {state.matches("loggedOut") && (
        <>
          <Button onClick={() => send("login")}>Login</Button>
          <Button onClick={() => send("createAccount")}>Create Account</Button>
        </>
      )}
      {(state.matches("showLoginForm") || state.matches("showCreateAccountForm")) && (
        <>
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              send({ type: "emailInputChanged", value: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              send({ type: "passwordInputChanged", value: e.target.value });
            }}
          />
          <Button onClick={() => send("submit")}>Submit</Button>
          <Button onClick={() => send("cancel")}>Cancel</Button>
        </>
      )}
      {state.matches("loggedIn") && <h2>Redirecting...</h2>}
    </>
  );
}
