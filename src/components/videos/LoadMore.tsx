import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../ui/spinner";
import { delay } from "@/helpers/delay";
import { IVideo } from "@/types";
import { getAllVideos } from "@/services/video.api";
import VideoFeed from "./VideoFeed";

const LoadMore = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreVideos = async () => {
    if (!hasMore) return;

    await delay(200);
    const nextPage = pagesLoaded + 1;
    try {
      const response = await getAllVideos(nextPage, 4);

      const newVideos = response?.data?.data || [];

      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
        setPagesLoaded(nextPage);
      }
    } catch (error) {
      console.error("Error loading videos:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreVideos();
    }
  }, [inView]);

  return (
    <div className="container mx-auto">
      <VideoFeed videosData={videos} />
      <div className="flex justify-center items-center mt-4" ref={ref}>
        {hasMore ? (
          <Spinner />
        ) : (
          <p className="text-white/60 my-3">No more videos to load.</p>
        )}
      </div>
    </div>
  );
};

export default LoadMore;
