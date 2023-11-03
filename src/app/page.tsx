import Image from "next/image";
import Navigation from "../features/Pages/Home/Navigation";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <header className="h-16 bg-slate-700">
        <div className="w-2/3 h-full mx-auto flex justify-between items-center">
          <Image
            src="/Logo-inverted.png"
            height={64}
            width={100}
            alt="inverted Logo"
          />

          <Navigation />
        </div>
      </header>
      <main className="py-12 min-h-[calc(100vh-4rem)] bg-slate-500">
        <section className="w-2/3 mx-auto">
          <div className="flex justify-between">
            <div className="self-center flex-1">
              <h1 className="font-playpen text-6xl mt-3 text-slate-50">
                World Around
              </h1>
              <h2 className="text-2xl mt-5 text-slate-200 leading-10 pr-5">
                Are you a passionate traveler with tales to tell? Do you dream
                of exploring new destinations or simply looking for inspiration
                for your next adventure? Look no further! World Around is your
                platform to connect with fellow explorers, share your travel
                experiences, and discover incredible journeys from all around
                the world.
              </h2>
            </div>
            <Image src="/home-image.jpg" height={300} width={400} alt="image" />
          </div>
          <div className="relative w-full h-40 py-10">
            <Image
              src="/divider.png"
              fill
              className="object-fit"
              alt="divider"
            />
          </div>
          <div className="flex justify-between py-11 gap-10 ">
            <Image
              src="/plane.png"
              height={300}
              width={400}
              alt="image"
              className="self-center"
            />
            <div>
              <h2 className="font-playpen text-4xl text-slate-50">
                How It Works
              </h2>
              <ul className="list-decimal text-slate-100 mt-5 leading-8 text-lg list-inside">
                <li>
                  <span className="font-semibold">Create Your Journey</span>:
                  Start by creating a new journey where you can add details
                  about your destinations, experiences, and tips.
                </li>
                <li>
                  <span className="font-semibold">Add Stops</span>: For each
                  stop on your journey, you can include photos, stories, and
                  practical information like accommodations, activities, and
                  dining recommendations.
                </li>
                <li>
                  <span className="font-semibold">Connect with Travelers</span>:
                  Follow other travelers, comment on their journeys, and engage
                  with the travel community.
                </li>
                <li>
                  <span className="font-semibold">Find Inspiration</span>:
                  Discover new destinations and travel ideas by browsing through
                  journeys created by our community of adventurers.
                </li>
              </ul>
              <h3 className="text-white mt-6 text-2xl font-playpen">
                Join Our Global Travel Community
              </h3>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
