import { cookies } from "next/headers";
import { axiosInstance } from "./api";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookiesData = await cookies();
  const res = await axiosInstance.get("/auth/session", {
    headers: { Cookie: cookiesData.toString() },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookiesData = await cookies();
  const res = await axiosInstance.get("/users/me", {
    headers: { Cookie: cookiesData.toString() },
  });
  return res.data;
};
