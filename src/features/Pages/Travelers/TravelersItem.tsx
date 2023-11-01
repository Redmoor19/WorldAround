import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser } from "@/src/models/User";

type TravelersItemProps = {
  user: IUser;
};

function TravelersItem({ user }: TravelersItemProps) {
  const { avatarUrl, name, city, country, _id } = user;

  const { push } = useRouter();

  function navigateHandler() {
    push(`/travelers/${_id}`);
  }

  return (
    <li
      onClick={navigateHandler}
      className="rounded-xl px-4 py-2 grid grid-cols-[1fr_2fr_3fr] items-center bg-slate-200 cursor-pointer"
    >
      <Image
        src={avatarUrl ? avatarUrl : "/default-avatar.jpg"}
        alt={`${user.name} avatar`}
        width={50}
        height={50}
        className="rounded-full w-[50xp] h-[50px] object-cover"
      />
      <h3>{name}</h3>
      <p>
        {country}, {city}
      </p>
    </li>
  );
}

export default TravelersItem;
