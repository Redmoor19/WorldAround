import { useRouter } from "next/navigation";

type JourneyEditorItemProps = {
  id: string;
  countries: string[];
};

function JourneyEditorItem({ id, countries }: JourneyEditorItemProps) {
  const countriesList = countries.join(" ► ");
  const { push } = useRouter();

  function clickHandler() {
    push(`/dashboard/${id}`);
  }

  return (
    <div
      onClick={clickHandler}
      className="py-3 px-2 bg-slate-500 rounded text-slate-50 hover:scale-[102%] cursor-pointer"
    >
      <p className="truncate">{countriesList}</p>
    </div>
  );
}

export default JourneyEditorItem;
