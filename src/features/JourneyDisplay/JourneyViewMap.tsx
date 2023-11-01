"use client";

import { Marker, useMap } from "react-leaflet";
import { StopType } from "../../models/Journey";
import Map from "../UI/Map";

type JourneyViewMap = {
  selected: StopType;
};

function JourneyViewMap({ selected }: JourneyViewMap) {
  return (
    <Map center={[selected.position.lat!, selected.position.lng!]}>
      <Marker position={[selected.position.lat!, selected.position.lng!]} />
      <CenterMap
        latitude={selected.position.lat!}
        longitude={selected.position.lng!}
      />
    </Map>
  );
}

function CenterMap({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();
  if (latitude && longitude) {
    map.setView([latitude, longitude], 10);
  }
  return null;
}

export default JourneyViewMap;
