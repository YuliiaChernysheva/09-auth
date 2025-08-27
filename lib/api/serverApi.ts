import { cookies } from "next/headers";
import { axiosInstance } from "./api";
import { User } from "@/types/user";
import { Note, Tag } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export type FetchNotesParams = {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: Tag;
};

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams): Promise<NotesResponse> => {
  const cookiesData = await cookies();
  const params: FetchNotesParams = {
    page,
    perPage,
    tag,
  };

  if (search) {
    params.search = search;
  }

  const headers = { Cookie: cookiesData.toString() };
  const response = await axiosInstance.get<NotesResponse>("/notes", {
    params,
    headers,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookiesData = await cookies();
  const response = await axiosInstance.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookiesData.toString() },
  });
  return response.data;
};

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
