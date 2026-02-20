import axios from "axios";
import type { GitHubStatsResponse } from "@/types/github";
import type { Todo } from "@prisma/client";
import { ApiResponse, GuestbookEntry, UmamiStats } from "@/types";
import type { GuestbookEntry as RawGuestbookEntry } from "@prisma/client";





const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
});


export const githubApi = {
    getStats: async () => {
        const res = await api.get<ApiResponse<GitHubStatsResponse>>("/github");
        return res.data;
    },
};




export const guestbookApi = {
    getEntries: async () => {
        const res = await api.get<ApiResponse<GuestbookEntry[]>>("/guestbook");
        return res.data;
    },

    createEntry: async (content: string) => {
        const res = await api.post<ApiResponse<RawGuestbookEntry>>("/guestbook", { content });
        return res.data;
    },

    deleteEntry: async (id: string) => {
        const res = await api.delete<ApiResponse>("/guestbook", { data: { id } });
        return res.data;
    },
};


export const todoApi = {
    getAll: async () => {
        const res = await api.get<ApiResponse<Todo[]>>("/todo");
        return res.data;
    },

    create: async (text: string) => {
        const res = await api.post<ApiResponse<Todo>>("/todo", { text });
        return res.data;
    },

    update: async (
        id: string,
        updates: Partial<Pick<Todo, "text" | "done">>
    ) => {
        const res = await api.patch<ApiResponse<Todo>>("/todo", { id, ...updates });
        return res.data;
    },

    delete: async (id: string) => {
        const res = await api.delete<ApiResponse>(`/todo?id=${id}`);
        return res.data;
    },

    clearCompleted: async () => {
        const res = await api.delete<ApiResponse>(`/todo?clearCompleted=true`);
        return res.data;
    },
};


export const viewsApi = {
    getStats: async () => {
        const res = await api.get<ApiResponse<UmamiStats>>("/views");
        return res.data;
    },
};


export const clientApi = {
    github: githubApi,
    guestbook: guestbookApi,
    todo: todoApi,
    views: viewsApi,

};
