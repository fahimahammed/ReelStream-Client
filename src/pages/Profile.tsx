import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spinner from "@/components/ui/spinner";
import { useProfile, useUser } from "@/hooks/user";
import { NavLink } from "react-router";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Analytics from "@/components/profile/Analytics";
import { IVideo } from "@/types";
import VideoPlayer from "@/components/videos/VideoPlayer";

const ProfilePage = () => {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { user, isLoading } = useUser();

  console.log({ profileData })

  if (isProfileLoading || isLoading)
    return (
      <div className="flex justify-center my-5">
        <Spinner />
      </div>
    );

  const {
    data: { data: profile },
  } = profileData || {};

  return (
    <div className="container mx-auto px-8">
      <ProfileHeader user={user} />
      <Tabs defaultValue="analytics" className="text-center mt-2">
        <div className="flex justify-end">
          <TabsList className="">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="videos">My Studio</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 my-5 px-4 sm:px-4 md:px-0 lg:px-0">
            {profile.videos.map((video: IVideo) => (
              <NavLink to={`/videos/${video?.id}`} key={profile.videos?.id}>
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
