import Image from "next/image";
import { MdEdit } from "react-icons/md";

import { serverSession } from "@/src/utils/getServerSession";
import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/models/User";

import Modal, { ModalButton, ModalDisplay } from "@/src/Components/Modal";
import UpdateProfile from "@/src/Components/UpdateProfile";
import IconButton from "@/src/Components/IconButton";

export default async function Profile() {
  await dbConnect();
  const session = await serverSession();

  const user = await User.findOne({ _id: session?.user?.id });
  const sanitizedUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="h-screen grid grid-rows-[30rem_auto] overflow-y-scroll">
      <section
        className="bg-cover bg-center bg-no-repeat h-full w-full flex flex-col items-center justify-center"
        style={{ backgroundImage: `url("/default-profile.jpg")` }}
      >
        <div className="flex flex-col items-center bg-slate-200 py-3 px-5 rounded-3xl bg-opacity-70 relative">
          <Modal>
            <ModalButton name="edit">
              <IconButton
                className="absolute top-3 right-3 hover:bg-slate-50 rounded-full px-2 py-2 cursor-pointer transition-colors duration-200"
                icon={<MdEdit size={20} />}
              />
            </ModalButton>
            <ModalDisplay name="edit">
              <UpdateProfile user={sanitizedUser} />
            </ModalDisplay>
          </Modal>
          <Image
            src="/default-avatar.jpg"
            width={200}
            height={200}
            className="object-cover rounded-full"
            alt="avatar"
          />
          <h2 className="font-bold color-black mt-2 text-2xl">{user.name}</h2>
          <p className="text-center font-medium text-lg">
            asd saasd asda sdasd asd asd asd{" "}
          </p>
        </div>
      </section>
    </div>
  );
}
