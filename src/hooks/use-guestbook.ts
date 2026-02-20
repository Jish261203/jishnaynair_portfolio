
import { clientApi } from "@/lib/client-api";
import { GuestbookEntry } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "better-auth";
import dayjs from "dayjs";



const GUESTBOOK_QUERY_KEY = ["guestbook"];


export function useGuestbookEntries() {
    return useQuery({
        queryKey: GUESTBOOK_QUERY_KEY,
        queryFn: async () => {
            return (await clientApi.guestbook.getEntries()).data
        },
    });
}


export function useCreateGuestbookEntry(currentUser: User & { role?: string | null }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (content: string) => clientApi.guestbook.createEntry(content),
        onMutate: async (content) => {

            await queryClient.cancelQueries({ queryKey: GUESTBOOK_QUERY_KEY });


            const previousEntries = queryClient.getQueryData<GuestbookEntry[]>(
                GUESTBOOK_QUERY_KEY
            );


            const optimisticEntry: GuestbookEntry = {
                id: `temp-${Date.now()}`,
                content,
                createdAt: dayjs().toISOString(),
                userId: currentUser.id,
                user: {
                    name: currentUser.name,
                    image: currentUser.image!,
                    role: currentUser.role || "GUEST",
                    accounts: [],
                },
            };

            queryClient.setQueryData<GuestbookEntry[]>(
                GUESTBOOK_QUERY_KEY,
                (old = []) => {
                    console.log({old})
                    return [ ...old , optimisticEntry]
                }
            );

            return { previousEntries };
        },

        onError: (err, _, context) => {
            if (context?.previousEntries) {
                queryClient.setQueryData(GUESTBOOK_QUERY_KEY, context.previousEntries);
            }

            throw err;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: GUESTBOOK_QUERY_KEY });
        },
    });
}


export function useDeleteGuestbookEntry() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => clientApi.guestbook.deleteEntry(id),



        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: GUESTBOOK_QUERY_KEY });

            const previousEntries = queryClient.getQueryData<GuestbookEntry[]>(
                GUESTBOOK_QUERY_KEY
            );

            queryClient.setQueryData<GuestbookEntry[]>(
                GUESTBOOK_QUERY_KEY,
                (old = []) => old.filter((entry) => entry.id !== id)
            );

            return { previousEntries };
        },
        onError: (err, variables, context) => {
            if (context?.previousEntries) {
                queryClient.setQueryData(GUESTBOOK_QUERY_KEY, context.previousEntries);
            }
            throw err;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: GUESTBOOK_QUERY_KEY });
        },
    });
}