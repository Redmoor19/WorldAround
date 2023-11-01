"use client";

import { useEffect, useState } from "react";

type Geoposition = {
  latitude: number;
  longitude: number;
};

export default function useGeoposition() {
  const [location, setLocation] = useState({} as Geoposition);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (coords) {
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      }
    });
  }, []);

  return location;
}
