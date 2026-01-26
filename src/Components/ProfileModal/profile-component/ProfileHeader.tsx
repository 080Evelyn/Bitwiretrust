import { edit_profile } from "@/assets";
import { cn } from "@/lib/utils";
import { ContextType } from "@/types";
import { User2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface ProfileHeaderProps {
  fullName: string;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader = ({ fullName, onImageSelect }: ProfileHeaderProps) => {
  const { user } = useOutletContext<ContextType>();

  return (
    <div className="profile-header">
      {/* start profile image section */}
      <div className="size-25 bg-[#E9A9FF80] relative rounded-full p-1.25">
        {user?.profileUpload?.url ? (
          <img
            src={user.profileUpload.url}
            className="size-full rounded-full object-cover"
            alt="profile"
          />
        ) : (
          <User2 className="size-full p-2 text-primary fill-primary/50" />
        )}
        <label className="edit-icon animate-bounce bottom-1! right-1! cursor-pointer">
          <img src={edit_profile} alt="" className="edit-profile" />
          <input
            type="file"
            accept="image/*"
            onChange={onImageSelect}
            className="hidden"
          />
        </label>
      </div>

      {/* end profile image section */}
      <h3>{fullName}</h3>
      <p>{user?.email}</p>
      <span
        className={cn(
          "text-sm capitalize",
          user?.userKycVerificationStatus === "VERIFIED"
            ? "text-green-600"
            : user?.userKycVerificationStatus === "PENDING"
              ? "text-yellow-500"
              : "text-red-500",
        )}
      >
        {user?.userKycVerificationStatus}
      </span>
    </div>
  );
};

export default ProfileHeader;
