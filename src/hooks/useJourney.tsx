"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

import { IJourney, StopType } from "../models/Journey";
import useJourneyAPI from "./useJourneyAPI";

function useJourney(editableJourney: IJourney | undefined) {
  const { refresh, push } = useRouter();

  const journeyIsEditing = !!editableJourney;
  const { isSubmitting, response } = useJourneyAPI();

  const [stops, setStops] = useState<StopType[]>(() => {
    if (!editableJourney) return [];
    const editableStops = editableJourney.stops.map((item) => ({
      ...item,
      date: new Date(item.date),
    }));
    return editableStops;
  });
  const [editableStop, setEditableStop] = useState({} as StopType);

  function findStop(id: string) {
    const stop = stops.filter((item) => item.id === id)[0];
    return { stop, index: stops.indexOf(stop) };
  }

  function moveStop(id: string, atIndex: number) {
    const { stop, index } = findStop(id);
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    updatedStops.splice(atIndex, 0, stop);
    setStops(updatedStops);
  }

  function addStop(stop: StopType) {
    setStops((prev) => [
      ...prev,
      {
        id: uuid(),
        ...stop,
      },
    ]);
  }

  function deleteStop(id: string) {
    setStops((prev) => prev.filter((item) => item.id !== id));
  }

  function startEditStop(stop: StopType) {
    setEditableStop(stop);
  }

  function saveEditStop(stop: StopType) {
    const index = stops.findIndex((item) => item.id === stop.id);
    if (index === -1) return;
    const newStops = stops;
    stops[index] = stop;
    setStops(newStops);
    setEditableStop({} as StopType);
  }

  function clearStops() {
    setStops([]);
  }

  function cancelEditing() {
    push("/dashboard");
  }

  async function postJourney() {
    if (stops.length < 1) return;

    await response(
      "POST",
      stops,
      () => {
        toast.success("Journey successfully saved!");
        setStops([]);
      },
      () => {
        toast.error("Couldn't save your journey. Try again later, please!");
      }
    );
  }

  async function patchJourney() {
    if (stops.length < 1) return;

    await response(
      "PATCH",
      { id: editableJourney?._id, stops },
      () => {
        toast.success("Journey successfully updated!");
        push("/dashboard");
      },
      () => {
        toast.error("Couldn't update your journey. Try again later, please!");
      }
    );
  }

  async function deleteJourney() {
    await response(
      "DELETE",
      editableJourney?._id,
      () => {
        toast.success("Journey successfully deleted!");
        push("/dashboard");
      },
      () => {
        toast.error("Couldn't delete your journey. Please, try again.");
      }
    );
  }

  return {
    editableStop,
    stops,
    addStop,
    deleteStop,
    clearStops,
    moveStop,
    findStop,
    saveEditStop,
    startEditStop,
    isSubmitting,
    journeyIsEditing,
    cancelEditing,
    postJourney,
    patchJourney,
    deleteJourney,
  };
}

export default useJourney;
