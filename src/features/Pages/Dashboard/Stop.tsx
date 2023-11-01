"use client";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDrag, useDrop } from "react-dnd";

import { dateToString } from "../../../utils/dateToString";
import { StopType } from "../../../models/Journey";

type StopProps = {
  stop: StopType;
  deleteItem: (id: string) => void;
  editItem: (stop: StopType) => void;
  findStop: (id: string) => { stop: StopType; index: number };
  moveStop: (id: string, atIndex: number) => void;
};

function Stop({ stop, deleteItem, editItem, findStop, moveStop }: StopProps) {
  const { id, date, country, city, description } = stop;

  const originalIndex = findStop(id!).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveStop(droppedId!, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveStop]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "card",
      hover({ id: draggedId }: StopType) {
        if (draggedId !== id) {
          const { index: overIndex } = findStop(id!);
          moveStop(draggedId!, overIndex);
        }
      },
    }),
    [findStop, moveStop]
  );

  return (
    <li
      ref={(node) => drag(drop(node))}
      className={`grid grid-cols-[0.25fr_1fr_2fr_2fr_3fr_1fr] bg-slate-100 my-1 ring-1 ring-slate-300 py-3 px-5 rounded-xl items-center justify-items-center ${
        isDragging ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex justify-start items-center w-full h-full cursor-move">
        <h3 className="text-xl">&#x22EE;</h3>
      </div>
      <p>{dateToString(date)}</p>
      <p className="truncate max-w-full">{country}</p>
      <p className="truncate max-w-full">{city}</p>
      <p className="truncate max-w-full">
        {description || "No description for this stop"}
      </p>
      <div className="flex gap-3">
        <button onClick={() => editItem(stop)}>
          <AiFillEdit className="cursor-pointer text-orange-600" size={20} />
        </button>
        <button onClick={() => deleteItem(id!)}>
          <AiFillDelete className="cursor-pointer text-red-700" size={20} />
        </button>
      </div>
    </li>
  );
}

export default Stop;
