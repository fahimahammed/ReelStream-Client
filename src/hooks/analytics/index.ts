import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/services/analytics.api";

export const useAnalytics = (query?: string) => {
  return useQuery({
    queryKey: ["analytics", query],
    queryFn: () => getAnalytics(query),
  });
};
