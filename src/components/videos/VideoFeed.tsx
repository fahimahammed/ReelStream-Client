import { IVideo } from "@/types";
import { NavLink } from "react-router";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { User } from "lucide-react";

const VideoFeed = ({ videosData }: { videosData: IVideo[] }) => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 my-5 px-4 sm:px-4 md:px-8 lg:px-8">
      {videosData?.map((videoInfo, idx) => (
        <NavLink to={`/videos/${videoInfo?.id}`} key={idx}>
          <div
            className="relative w-full h-full group"
            onMouseEnter={() => setHoveredVideo(videoInfo?.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            {hoveredVideo === videoInfo?.id ? (
              <VideoPlayer videoInfo={videoInfo} autoPlay controls={false} muted />
            ) : (
              <div className="relative">
                <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/20 text-white px-3 py-1 rounded-lg text-xs sm:text-sm">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300 p-1 text-black" />
                  <div>
                    <p className="font-semibold">
                      {videoInfo?.user?.name || "User Name"}
                    </p>
                  </div>
                </div>
                <img
                  src={videoInfo?.thumbnailUrl || "/default-thumbnail.jpg"}
                  alt={videoInfo?.title}
                  className="w-full h-auto rounded-lg object-cover"
                />
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm font-semibold p-2 text-center rounded-b-lg">
                  {videoInfo?.title}
                </div>
              </div>
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default VideoFeed;
