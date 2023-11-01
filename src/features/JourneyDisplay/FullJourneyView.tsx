"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StopType } from "../../models/Journey";

import { useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

import Modal, { ModalButton, ModalDisplay } from "../UI/Modal";
import dynamic from "next/dynamic";
const JourneyViewMap = dynamic(() => import("./JourneyViewMap"), {
  ssr: false,
});

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type FullJourneyViewProps = {
  countries: string[];
  cities: string[];
  stops: StopType[];
  createdBy: string;
  closeJourney: () => void;
};

function FullJourneyView({ stops, closeJourney }: FullJourneyViewProps) {
  const [selected, setSelected] = useState(stops[0]);
  const [slide, setSlide] = useState(0);

  const years = Array.from(
    new Set(stops.map((item) => new Date(item.date).getFullYear()))
  );
  const isLong = selected.description.length > 300;
  const shortened = selected.description.slice(0, 300) + "...";

  function selectStop(id: string) {
    const newSelect = stops.find((item) => item.id === id);
    if (newSelect) setSelected(newSelect);
    return;
  }

  return (
    <div className="relative grid grid-cols-[1fr_3fr_2fr] gap-3 h-[300px] px-5 py-3">
      <div>
        <div
          className="absolute top-1 left-2 text-2xl text-slate-700 cursor-pointer hover:text-red-500"
          onClick={closeJourney}
        >
          &#10006;
        </div>
        <h3 className="text-center font-bold text-lg">{years.join("-")}</h3>
        <div className="overflow-y-scroll max-h-[250px] no-scrollbar">
          <ul className="flex flex-col divide-y-[1px] divide-slate-300">
            {stops.map((stop) => (
              <ViewItem
                key={stop.id}
                {...stop}
                selected={selected.id!}
                selectStop={selectStop}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          {selected.description && isLong ? (
            <Modal>
              <ModalButton name="description">
                <p
                  className={`px-3 py-2 bg-slate-100 rounded-xl  ${
                    selected.description && "cursor-pointer"
                  }`}
                >
                  {shortened}
                </p>
              </ModalButton>
              <ModalDisplay name="description">
                <p className="px-3 py-2">{selected.description}</p>
              </ModalDisplay>
            </Modal>
          ) : (
            <p className="px-3 py-2 bg-slate-100 rounded-xl">
              {selected.description || "No description about this stop."}
            </p>
          )}
        </div>
        <div className="flex mt-3 gap-2">
          {selected.images.map((image, i) => (
            <Modal key={image}>
              <div onClick={() => setSlide(i)}>
                <ModalButton name="image">
                  <Image
                    src={image}
                    width={100}
                    height={100}
                    alt="image"
                    className="max-h-[100px] object-contain cursor-pointer"
                  />
                </ModalButton>
              </div>
              <ModalDisplay name="image">
                <Carousel
                  axis="horizontal"
                  showArrows={true}
                  showThumbs={false}
                  selectedItem={slide}
                >
                  {selected.images.map((image) => (
                    <Image
                      key={image}
                      src={image}
                      width={900}
                      height={500}
                      className="object-contain"
                      alt="image"
                    />
                  ))}
                </Carousel>
              </ModalDisplay>
            </Modal>
          ))}
        </div>
      </div>

      <JourneyViewMap selected={selected} />
    </div>
  );
}

type ViewItemProps = StopType & {
  selected: string;
  selectStop: (id: string) => void;
};

function ViewItem({ id, city, date, selected, selectStop }: ViewItemProps) {
  const dateToDate = new Date(date);
  const day = dateToDate.getDate();
  const month = dateToDate.getMonth() + 1;
  const isSelected = id === selected;
  return (
    <li
      className={`flex items-center gap-2 py-1 justify-start ${
        isSelected && "text-slate-900"
      } text-slate-400 cursor-pointer`}
      key={id}
      onClick={() => selectStop(id!)}
    >
      <p className="italic font-normal text-sm whitespace-nowrap">
        {day} {monthNames[month]}.
      </p>
      <p className="truncate">{city}</p>
    </li>
  );
}

export default FullJourneyView;
