import { IUser } from "@/src/models/User";
import TravelersItem from "./TravelersItem";

type TravelersListProps = {
  users: IUser[];
};

function TravelersList({ users }: TravelersListProps) {
  return (
    <ul className="mt-7 w-3/4 mx-auto flex gap-2 flex-col">
      {users.map((user) => (
        <TravelersItem key={user._id} user={user} />
      ))}
    </ul>
  );
}

export default TravelersList;
