"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { axiosInstance } from "@/lib/api/api";

const SignUp = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    setError("");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await axiosInstance.post(
        "https://notehub-public.goit.study/api/auth/register",
        { email, password }
      );
      alert("Registration successful!");
      router.push("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert("A user with this email or username already exists.");
      } else {
        alert("An error occurred, please try again later.");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSignUp} className={css.form}>
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
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
