import { useUser } from "@/hooks/user";
import { useState } from "react";
import { Button } from "../button";
import { ArrowDown, ArrowUp, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router";
import { IVideo } from "@/types";
import { likeUnlike } from "@/services/video.api";

type TVideoProps = {
  data: {
    video: IVideo;
    prev: { id: string } | null;
    next: { id: string } | null;
  };
};

const ActionButtons = ({ data }: TVideoProps) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const res = await likeUnlike(data?.video?.id);
      if (res) {
        setLiked(!liked);
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
      <Button
        disabled={!user}
        onClick={handleLike}
        variant={liked ? "default" : "outline"}
        className="w-10 h-10 rounded-full flex items-center justify-center"
      >
        <ThumbsUp className="w-5 h-5" />
      </Button>
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
  );
};

export default ActionButtons;
