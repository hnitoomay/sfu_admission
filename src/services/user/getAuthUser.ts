import api from "../our_axios";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useGetAuthUser() {
  const { data, error, isLoading, mutate } = useSWR("/user/profile", fetcher);
  
  return {
    user: data?.data,
    isErrorUser: error,
    userLoading: isLoading,
    mutate: mutate
  };
}
