"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, SignInRequest } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import axios from "axios";

const SignIn = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setUser);

  const handleSignIn = async (formData: FormData) => {
    setError("");
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    const data = Object.fromEntries(formData) as SignInRequest;

    try {
      const user = await signIn(data);

      if (user) {
        setAuth(user);
        router.push("/profile");
      } else {
        setError("Authorization failed. Please check your credentials.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Incorrect email or password. Please try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("Unexpected error occurred.");
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
