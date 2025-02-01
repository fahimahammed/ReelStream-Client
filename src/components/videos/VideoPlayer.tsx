import { IVideo } from "@/types";
import { User } from "lucide-react";

type TVideoPlayerProps = {
  videoInfo: IVideo;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
};

const VideoPlayer = ({
  videoInfo,
  autoPlay = true,
  muted = false,
  loop = false,
  controls = true,
  className = "",
}: TVideoPlayerProps) => {
  return (
    <div
      className={`relative border border-white/5 rounded-xl h-full w-full overflow-hidden  ${className}`}
    >
      <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/20 text-white px-3 py-1 rounded-lg text-xs sm:text-sm">
        <User className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300 p-1 text-black" />
        <div>
          <p className="font-semibold">
            {videoInfo?.user?.name || "User Name"}
          </p>
        </div>
      </div>

      <video
        className="rounded-xl h-full w-full"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
      >
        <source src={videoInfo?.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
