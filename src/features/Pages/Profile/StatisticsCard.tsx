import Image from "next/image";

type AdditionalType = {
  item: string;
  amount: number;
};

type StatisticsCardProps = {
  icon: string;
  title: string;
  amount: number;
  additional?: AdditionalType[] | undefined;
};

export default function StatisticsCard({
  icon,
  title,
  amount,
  additional,
}: StatisticsCardProps) {
  return (
    <li className="flex gap-3">
      <div>
        <h3 className="text-center font-playpen text-xl">{title}</h3>
        <div className="relative w-36 h-36 mt-2">
          <Image alt={title} src={icon} fill className="object-fit" />
          <div className="absolute z-10 flex items-center justify-center bottom-2 right-2 w-10 h-10 bg-red-500 rounded-full">
            <p className="text-yellow-200 font-bold text-lg">{amount}</p>
          </div>
        </div>
      </div>
      {additional && (
        <div className="self-center">
          <h2>Favourites: </h2>
          <ul className="mt-2 italic font-light">
            {additional.map((item) => (
              <li key={item.item}>
                {item.item} - {item.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
