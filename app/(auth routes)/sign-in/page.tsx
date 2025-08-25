"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";

const SignIn = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (formData: FormData) => {
    setError("");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn({ email, password });
      router.push("/profile");
    } catch (err) {
      if (typeof err === "object" && err !== null && "message" in err) {
        setError(String((err as { message: string }).message));
      } else {
        setError("Login failed");
      }
    }
  };
  return (
    <main className={css.mainContent}>
      <form action={handleSignIn} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default SignIn;
