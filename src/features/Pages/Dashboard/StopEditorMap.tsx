import Map from "../../UI/Map";
import { Marker, useMap, useMapEvent } from "react-leaflet";

type MapProps = {
  className: string;
  markerPosition: {
    lat: number | null;
    lng: number | null;
  };
  setMarkerPosition: (lat: number, lng: number) => void;
};

function StopEditorMap({
  markerPosition,
  setMarkerPosition,
  className,
}: MapProps) {
  return (
    <Map className={`${className}`}>
      <CenterMap latitude={markerPosition.lat} longitude={markerPosition.lng} />
      <SetMarker setMarkerPosition={setMarkerPosition} />
      {markerPosition.lat && markerPosition.lng && (
        <Marker position={[markerPosition.lat, markerPosition.lng]} />
      )}
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

function SetMarker({
  setMarkerPosition,
}: {
  setMarkerPosition: (lat: number, lng: number) => void;
}) {
  const map = useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition(lat, lng);
  });
  return null;
}

export default StopEditorMap;
