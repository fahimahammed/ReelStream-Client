import { useEffect } from "react";
import ActionButtons from "@/components/ui/action-buttons";
import Spinner from "@/components/ui/spinner";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useVideo } from "@/hooks/video";
import VideoPlayer from "@/components/videos/VideoPlayer";

const Video = () => {
  const { videoId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useVideo(videoId!);

  useEffect(() => {
    if (videoId) {
      queryClient.invalidateQueries({ queryKey: ["video", videoId] });
      refetch();
    }
  }, [videoId, queryClient, refetch]);

  if (isLoading)
    return (
      <div className="flex justify-center my-5">
        <Spinner />
      </div>
    );

  const {
    data: { video },
  } = data;

  return (
    <div className="w-full md:w-[37%] lg:w-[37%] px-8 md:px-0 lg:px-0 mx-auto my-5 md:flex justify-center gap-2 relative">
      <div className="h-screen md:h-[83vh] w-full md:w-3/5 flex flex-col items-center justify-center relative">
        <VideoPlayer videoInfo={video} />
      </div>
      <ActionButtons data={data?.data} />
    </div>
  );
};

export default Video;
