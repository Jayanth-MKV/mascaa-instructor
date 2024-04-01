import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useApiGet = (key, fn, options) =>
  useQuery({
    queryKey: key,
    queryFn: fn,
    ...options,
  });

export const useApiSend = (fn:any, success:any, error:any, invalidateKey?:any, options?:any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: async (data) => {
      console.log(data)
      invalidateKey &&
        invalidateKey.forEach((key:any) => {
          queryClient.invalidateQueries(key);
        });
      success && success(data);
    },
    onError: error,
    retry: 1,
    ...options,
  });
};
