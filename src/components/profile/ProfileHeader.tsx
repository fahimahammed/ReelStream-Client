import { IUser } from "@/types";

type TProfileInfo = {
  user: IUser | null;
};

const ProfileHeader = ({ user }: TProfileInfo) => {
  return (
    <div className="container p-5 border-b border-white/10">
      <h1 className="text-2xl font-bold mt-3">{user?.name}</h1>
      <p className="text-gray-400 leading-8">
        @{user?.username}
      </p>
    </div>
  );
};

export default ProfileHeader;
