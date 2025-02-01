import { IReel } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReelsFeed from "./ReelsFeed";
import Spinner from "../ui/spinner";
import { delay } from "@/helpers/delay";
import { getAllReels } from "@/services/reel.api";

const LoadMore = () => {
  const [reels, setReels] = useState<IReel[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreReels = async () => {
    if (!hasMore) return;

    await delay(200);
    const nextPage = pagesLoaded + 1;
    try {
      const response = await getAllReels(nextPage, 4);

      const newReels = response?.data?.data || [];

      if (newReels.length === 0) {
        setHasMore(false);
      } else {
        setReels((prevReels) => [...prevReels, ...newReels]);
        setPagesLoaded(nextPage);
      }
    } catch (error) {
      console.error("Error loading reels:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreReels();
    }
  }, [inView]);

  return (
    <div className="container mx-auto">
      <ReelsFeed videosData={reels} />
      <div className="flex justify-center items-center mt-4" ref={ref}>
        {hasMore ? (
          <Spinner />
        ) : (
          <p className="text-white/60 my-3">No more reels to load.</p>
        )}
      </div>
    </div>
  );
};

export default LoadMore;
