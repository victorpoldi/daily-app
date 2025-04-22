"use client";
import { useMachine } from "@xstate/react";
import { authMachine } from "../../machines/authMachine";
import { useRouter } from "next/navigation";
import { createAccount, login, signInWithGoogle } from "../services/auth";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { GoogleOutlined } from "@ant-design/icons";

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
      checkingGoogle: async () => {
        try {
          await signInWithGoogle();
          console.log("checkingGoogle");
          return { email: "user", password: "google" };
        } catch (error) {
          console.error("Unable to sign in with Google", error);
          throw new Error("Unable to sign in with Google");
        }
      },
      checkAuth: async () => {
        console.log("Checking Auth");
        throw new Error("Not Authenticated");
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
          <Button className="w-50" onClick={() => send("login")}>
            Login
          </Button>
          <Button className="w-50" onClick={() => send("createAccount")}>
            Create Account
          </Button>
          <Button
            className="justify-between flex w-50"
            onClick={() => send("loginWithGoogle")}
          >
            <GoogleOutlined />
            Sign in with Google
          </Button>
        </>
      )}
      {(state.matches("showLoginForm") || state.matches("showCreateAccountForm")) && (
        <>
          <form className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Email"
              className="w-50"
              required
              onChange={(e) => {
                send({ type: "emailInputChanged", value: e.target.value });
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              className="w-50"
              onChange={(e) => {
                send({ type: "passwordInputChanged", value: e.target.value });
              }}
            />
            <Button
              type="submit"
              className="w-50 disabled:opacity-50"
              disabled={
                state.context.formInputEmail === "" ||
                state.context.formInputPassword === ""
              }
              onClick={() => send("submit")}
            >
              Submit
            </Button>
            <Button className="w-50" onClick={() => send("cancel")}>
              Cancel
            </Button>
          </form>
        </>
      )}
      {state.matches("loggedIn") && <h2>Redirecting...</h2>}
    </>
  );
}
