import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spinner from "@/components/ui/spinner";
import { useUser } from "@/hooks/user";
import { NavLink } from "react-router";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Analytics from "@/components/profile/Analytics";
import { useGetAllVideos } from "@/hooks/video";
import { IVideo } from "@/types";
import VideoPlayer from "@/components/videos/VideoPlayer";

const ProfilePage = () => {
  const { data: videosData, isLoading: isVideosLoading } = useGetAllVideos(1);
  const { user, isLoading } = useUser();

  if (isVideosLoading || isLoading)
    return (
      <div className="flex justify-center my-5">
        <Spinner />
      </div>
    );

  const {
    data: { data: videos },
  } = videosData || {};

  const filteredVideos = videos.filter(
    (video: IVideo) => video?.uploadedBy === user?.id
  );

  return (
    <div className="container mx-auto px-8">
      <ProfileHeader user={user} totalVideos={filteredVideos?.length} />
      <Tabs defaultValue="videos" className="text-center mt-2">
        <TabsList className="grid w-full sm:w-full md:w-1/3 lg:w-1/3 grid-cols-2">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 my-5 px-4 sm:px-4 md:px-0 lg:px-0">
            {filteredVideos.map((video: IVideo) => (
              <NavLink to={`/videos/${video?.id}`} key={videos?.id}>
                <VideoPlayer videoInfo={video} />
              </NavLink>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
