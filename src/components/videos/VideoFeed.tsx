import { IVideo } from "@/types";
import { NavLink } from "react-router";
import VideoPlayer from "./VideoPlayer";

const VideoFeed = ({ videosData }: { videosData: IVideo[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 my-5 px-4 sm:px-4 md:px-8 lg:px-8">
      {videosData?.map((videoInfo, idx) => (
        <NavLink to={`/videos/${videoInfo?.id}`} key={idx}>
          <VideoPlayer videoInfo={videoInfo} autoPlay controls={false} muted />
        </NavLink>
      ))}
    </div>
  );
};

export default VideoFeed;
