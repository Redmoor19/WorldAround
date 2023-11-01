"use client";

import "react-datepicker/dist/react-datepicker.css";
import { StopType } from "../../../models/Journey";

import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useEffect } from "react";

import UploadStopImages from "./UploadStopImages";
import Button from "../../UI/Button";
import useStop from "../../../hooks/useStop";
import useGeoposition from "../../../hooks/useGeolocation";

const StopEditorMap = dynamic(() => import("./StopEditorMap"), {
  ssr: false,
});

type StopEditorProps = {
  saveForm: (state: StopType) => void;
  editForm: (state: StopType) => void;
  editableStop: StopType;
};

function StopEditor({ saveForm, editForm, editableStop }: StopEditorProps) {
  const {
    initialState,
    currentStop,
    setCurrentStop,
    changeHandler,
    blurHandler,
    changeDate,
    saveImages,
    setMarkerPosition,
  } = useStop();

  const currLocation = useGeoposition();

  useEffect(() => {
    if (!editableStop.id) return;
    setCurrentStop(editableStop);
  }, [editableStop.id]);

  function submitHandler() {
    if (!currentStop.city || !currentStop.country) {
      toast.error("Please enter country and city names.");
      return;
    }

    if (!currentStop.position.lat || !currentStop.position.lng) {
      toast.error(
        "Couldn't find the location. Please check the spelling or put the marker on the map."
      );
      return;
    }
    if (!editableStop.id) {
      saveForm(currentStop);
      setCurrentStop(initialState);
    }
    if (editableStop.id) {
      editForm(currentStop);
      setCurrentStop(initialState);
    }
  }

  function cancelHandler() {
    if (!editableStop) return;
    editForm(editableStop);
    setCurrentStop(initialState);
  }

  return (
    <div className="grid grid-cols-[3fr_4fr] py-6 px-8 rounded-lg bg-slate-500">
      <form>
        <div className="grid grid-cols-[12rem_auto] gap-y-4 items-center">
          <label className=" text-white text-lg" htmlFor="country">
            Country:
          </label>
          <input
            id="country"
            name="country"
            type="text"
            value={currentStop.country}
            onChange={changeHandler}
            onBlur={blurHandler}
            className="input"
          />

          <label className=" text-white text-lg" htmlFor="city">
            City:
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={currentStop.city}
            onChange={changeHandler}
            onBlur={blurHandler}
            className="input"
          />

          <label className=" text-white text-lg" id="date">
            Date:
          </label>
          <DatePicker
            selected={currentStop.date}
            dateFormat={"dd/MM/yyyy"}
            withPortal={true}
            portalId="date"
            onChange={changeDate}
            className="input w-full"
          />
          <label className=" text-white text-lg">Share some photos:</label>
          <UploadStopImages
            images={currentStop.images}
            setImages={saveImages}
          />
        </div>

        <label className="mt-3 block text-white text-lg" htmlFor="description">
          Tell about your stop:
        </label>
        <textarea
          id="descripotion"
          name="description"
          value={currentStop.description}
          onChange={changeHandler}
          className="w-full h-32 input mt-2 resize-none"
        />
      </form>
      <div className="w-full px-6 relative">
        <StopEditorMap
          markerPosition={currentStop.position}
          setMarkerPosition={setMarkerPosition}
          className="w-full h-full z-0"
        />
        {!currentStop.position.lat && (
          <span className="absolute bottom-3 left-[50%] translate-x-[-50%]">
            <Button
              onClick={() =>
                setMarkerPosition(currLocation.latitude, currLocation.longitude)
              }
              type="secondary"
              className="!bg-green-300"
            >
              Get My Position
            </Button>
          </span>
        )}
      </div>
      <div className="col-start-1 col-end-3 flex gap-3 mx-auto mt-4 w-60 justify-center">
        {editableStop.id && (
          <Button
            type="secondary"
            onClick={cancelHandler}
            className="flex-1 bg-slate-200"
          >
            Cancel
          </Button>
        )}
        <Button onClick={submitHandler} className="flex-1">
          {editableStop.id ? "Save" : "Add"}
        </Button>
      </div>
    </div>
  );
}

export default StopEditor;
