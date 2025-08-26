import { NewNoteData, Note, Tag } from "@/types/note";
import { axiosInstance } from "./api";
import { User } from "@/types/user";

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
  const params: FetchNotesParams = {
    page,
    perPage,
    tag,
  };

  if (search) {
    params.search = search;
  }

  const response = await axiosInstance.get<NotesResponse>("/notes", {
    params,
  });

  return response.data;
};

export const addNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await axiosInstance.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axiosInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: NewNoteData): Promise<Note> => {
  const response = await axiosInstance.post<Note>(`/notes/`, data);
  return response.data;
};

export interface SignUpRequest {
  email: string;
  password: string;
}

export type SignInRequest = {
  email: string;
  password: string;
};

export const signUp = async (data: SignUpRequest): Promise<User> => {
  const response = await axiosInstance.post<User>("/auth/register", data);
  return response.data;
};

export const signIn = async (data: SignInRequest): Promise<User> => {
  const response = await axiosInstance.post<User>("/auth/login", data);
  return response.data;
};

export type CheckSessionResponse = {
  success: boolean;
};

export const checkSession = async () => {
  const response = await axiosInstance.get<CheckSessionResponse>(
    "/auth/session"
  );
  return response.data.success;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>("/users/me");
  return data;
};
