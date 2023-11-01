import { IUser } from "@/src/models/User";
import Journeys from "./Journeys";
import Statistics from "./Statistics";
import UserInfo from "./UserInfo";
import { IJourney } from "@/src/models/Journey";

type ProfileProps = {
  user: IUser;
  userJourneys: IJourney[];
  isUser: boolean;
};

function Profile({ user, userJourneys, isUser }: ProfileProps) {
  return (
    <div className="h-screen grid grid-rows-[30rem_auto] overflow-y-scroll bg-slate-100">
      <UserInfo user={user} isUser={isUser} />
      <section className="bg-slate-400">
        <Statistics userJourneys={userJourneys} />
        <Journeys userJourneys={userJourneys} />
      </section>
    </div>
  );
}

export default Profile;
