import { useUser } from "@/hooks/user";
import { useState } from "react";
import { Button } from "../button";
import { ArrowDown, ArrowUp, Eye, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router";
import { IVideo } from "@/types";
import { likeUnlike } from "@/services/video.api";

type TVideoProps = {
  data: {
    video: IVideo;
    prev: { id: string } | null;
    next: { id: string } | null;
    isLiked: boolean;
  };
};

const ActionButtons = ({ data }: TVideoProps) => {

  // console.log("----------->>>>> data.liked: ", data.isLiked)
  const { user } = useUser();
  const [liked, setLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data?.video?.likeCount || 0)
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const res = await likeUnlike(data?.video?.id);
      if (res) {
        console.log(res, "=== res")
        setLiked(data.isLiked);
        setLikeCount(res.data.likeCount)
      }

    } catch (err) {
      console.error(err);
    }
  };

  const handleActionButtons = async (id: string | undefined) => {
    if (!id) return;

    navigate(`/video/${id}`, { replace: true });
  };

  return (
    <div className="flex flex-col gap-4 mt-3 items-center">
      <div className="absolute top-28 right-12">
        <div className="hidden md:flex flex-col gap-2">
          {data?.next && (
            <Button
              onClick={() => handleActionButtons(data?.next?.id)}
              variant="secondary"
              size="icon"
            >
              <ArrowUp size={24} />
            </Button>
          )}

          {data?.prev && (
            <Button
              onClick={() => handleActionButtons(data?.prev?.id)}
              variant="secondary"
              size="icon"
            >
              <ArrowDown size={24} />
            </Button>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 right-24">
        <Button
          disabled={!user}
          onClick={handleLike}
          variant={liked ? "default" : "outline"}
          className="w-10 h-10 rounded-full flex items-center justify-center"
        >
          <ThumbsUp className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-1 text-white text-sm font-semibold my-1">
          <ThumbsUp className="w-4 h-4 text-gray-300" />
          {likeCount}
        </div>
        <div className="flex items-center gap-1 text-white text-sm font-semibold">
          <Eye className="w-4 h-4 text-gray-300" />
          {data?.video?.viewCount || 0}
        </div>

      </div>
    </div>
  );
};

export default ActionButtons;
