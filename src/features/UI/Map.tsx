import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer } from "react-leaflet";
import getGeoposition from "@/src/hooks/useGeolocation";

type MapProps = {
  children: React.ReactNode;
  className?: string;
  center?: [number, number];
  zoom?: number;
};

function Map({ children, className, center, zoom }: MapProps) {
  return (
    <MapContainer
      className={`${className} z-0 rounded-lg`}
      center={center || [51.505, -0.09]}
      zoom={zoom || 13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
export default Map;
