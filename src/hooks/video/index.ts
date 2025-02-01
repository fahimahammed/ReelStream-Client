import { getAllVideos, getVideoById } from "@/services/video.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllVideos = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["videos", "video", page, limit],
    queryFn: () => getAllVideos(page, limit),
  });
};

export const useVideo = (videoId: string) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
