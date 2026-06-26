import { useStations } from "../hooks/useStations";
import { StationCard } from "./StationCard";
import "./StationList.css";

interface Props {
  searchWord: string;
}

export function StationList({ searchWord }: Props) {
  const { stations, lastUpdated, loading, error, refresh } = useStations();

  if (loading) return <p role="status">Laster stasjoner…</p>;

  if (error) {
    return (
      <div role="alert">
        <p>Feil: {error}</p>
        <button onClick={refresh}>Prøv igjen</button>
      </div>
    );
  }

  const filtered = searchWord
    ? stations.filter((s) =>
        s.name.toLowerCase().includes(searchWord.toLowerCase()),
      )
    : stations;

  return (
    <div>
      <div className="last-updated">
        <span>Sist oppdatert: {lastUpdated?.toLocaleString("no-NO")}</span>
        <button onClick={refresh} aria-label="Oppdater stasjonsdata">
          Oppdater
        </button>
      </div>
      <ul
        className="station-list"
        aria-live="polite"
        aria-label="Stasjonsliste"
      >
        {filtered.map((station) => (
          <StationCard key={station.station_id} station={station} />
        ))}
      </ul>
    </div>
  );
}
