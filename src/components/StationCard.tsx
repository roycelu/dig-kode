import type { Station } from "../types";
import "./StationCard.css";

interface Props {
  station: Station;
}

export function StationCard({ station }: Props) {
  return (
    <li className="station-card">
      <h2>{station.name}</h2>
      <p>{station.address}</p>
      <p><b>Ledige sykler:</b> {station.num_bikes_available}</p>
      <p><b>Tilgjengelige låser:</b> {station.num_docks_available} av {station.capacity}</p>
    </li>
  );
}
