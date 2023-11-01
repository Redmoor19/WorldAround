"use client";

import { useState } from "react";
import { StopType } from "../models/Journey";
import { forwardGeocoding, reverceGeocoding } from "../services/geocodingApi";
import toast from "react-hot-toast";

function useStop() {
  const initialState: StopType = {
    country: "",
    city: "",
    description: "",
    images: [],
    date: new Date(),
    position: {
      lat: null,
      lng: null,
    },
  };

  const [currentStop, setCurrentStop] = useState(initialState);

  function changeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCurrentStop((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function blurHandler() {
    if (currentStop.city && currentStop.country) {
      setCurrentStop((prev) => ({
        ...prev,
        position: {
          lat: null,
          lng: null,
        },
      }));
      changeLocation();
    }
  }

  function changeDate(date: Date) {
    setCurrentStop((prev) => ({
      ...prev,
      date: date,
    }));
    initialState.date = date;
  }

  function saveImages(images: string[]) {
    setCurrentStop((prev) => ({
      ...prev,
      images,
    }));
  }

  async function changeLocation() {
    const data = await forwardGeocoding(currentStop.city, currentStop.country);
    if (data) {
      setCurrentStop((prev) => ({
        ...prev,
        position: {
          lat: data.latitude,
          lng: data.longitude,
        },
      }));
    } else {
      toast.error(
        "Couldn't find this place. Please check the spelling or find the place on the map!"
      );
    }
  }

  async function setMarkerPosition(lat: number, lng: number) {
    const data = await reverceGeocoding(lat, lng);
    if (data.country && data.name) {
      let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      const country = regionNames.of(data.country);
      setCurrentStop((prev) => ({
        ...prev,
        country: country!,
        city: data.name,
        position: {
          lat,
          lng,
        },
      }));
    }
  }

  return {
    currentStop,
    setCurrentStop,
    initialState,
    changeHandler,
    blurHandler,
    changeDate,
    saveImages,
    setMarkerPosition,
  };
}

export default useStop;
