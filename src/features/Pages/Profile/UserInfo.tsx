import Image from "next/image";
import { MdEdit } from "react-icons/md";

import Modal, { ModalButton, ModalDisplay } from "../../UI/Modal";
import UpdateProfile from "./UpdateProfile";
import IconButton from "../../UI/IconButton";
import sanitize from "@/src/utils/sanitizer";
import { IUser } from "@/src/models/User";

type UserInfoProps = {
  user: IUser;
  isUser: boolean;
};

function UserInfo({ user, isUser }: UserInfoProps) {
  const sanitizedUser = sanitize(user);
  return (
    <section
      className="bg-cover bg-center bg-no-repeat h-full w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${
          user.bgUrl ? user.bgUrl : "/default-profile.jpg"
        })`,
      }}
    >
      <div className="flex flex-col items-center bg-slate-200 py-9 px-8 rounded-3xl bg-opacity-70 relative">
        {isUser && (
          <Modal>
            <ModalButton name="edit">
              <IconButton
                className="absolute top-2 right-2 hover:bg-slate-50 rounded-full px-2 py-2 cursor-pointer transition-colors duration-200"
                icon={<MdEdit size={20} />}
              />
            </ModalButton>
            <ModalDisplay name="edit">
              <UpdateProfile user={sanitizedUser} />
            </ModalDisplay>
          </Modal>
        )}
        <Image
          src={user.avatarUrl ? user.avatarUrl : "/default-avatar.jpg"}
          width={200}
          height={200}
          className="object-cover rounded-full h-[200px] w-[200px]"
          alt="avatar"
        />
        <h2 className="font-bold color-black mt-2 text-2xl">{user.name}</h2>
        <p className="text-center font-medium text-lg">
          {user.city ? user.city : null}
          {user.city && user.country ? ", " : null}
          {user.country ? user.country : null}
        </p>
      </div>
    </section>
  );
}

export default UserInfo;
