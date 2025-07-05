import { useQuery } from "@tanstack/react-query";
import { queryClient } from "./client";

const initialUser: { name?: string; id?: number; } = {};
queryClient.setQueryData(['authUser'], initialUser);

export const useAuthUser = () => {
    const authUser = useQuery<{ name?: string; id?: number; }>({
        queryKey: ['authUser'],
        queryFn: () => queryClient.getQueryData(['authUser']) as { name?: string; id?: number; },
        initialData: initialUser
    });

    const setAuthUser = (newUserData: { name?: string; id?: number; }) => {
        queryClient.setQueryData(['authUser'], newUserData);
    };

    const clearAuthUser = () => {
        queryClient.setQueryData(['authUser'], initialUser);
    };

    return { data: authUser.data, setAuthUser, clearAuthUser };
};

