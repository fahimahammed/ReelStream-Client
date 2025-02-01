import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from "@/types";

type TProfileInfo = {
  user: IUser | null;
  totalVideos: number | string;
};

const ProfileHeader = ({ user, totalVideos }: TProfileInfo) => {
  return (
    <div className="container flex flex-col items-center p-5 border-b border-white/10">
      <Avatar className="w-24 h-24 border-2 border-gray-500">
        <AvatarImage
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile Picture"
        />
        <AvatarFallback>USER</AvatarFallback>
      </Avatar>

      <h1 className="text-2xl font-bold mt-3">User Name</h1>
      <p className="text-gray-400 leading-8">
        {user?.email} · {totalVideos} videos
      </p>
    </div>
  );
};

export default ProfileHeader;
