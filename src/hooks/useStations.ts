import { useCallback, useEffect, useState } from "react";
import { fetchStationInfo, fetchStationStatus } from "../api";
import type { Station } from "../types";

interface UseStationsResult {
  stations: Station[];
  lastUpdated: Date | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useStations(): UseStationsResult {
  const [stations, setStations] = useState<Station[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [infoResult, statusResult] = await Promise.all([
        fetchStationInfo(),
        fetchStationStatus(),
      ]);

      const statusMap = new Map(statusResult.stations.map((s) => [s.station_id, s]));

      const merged: Station[] = infoResult.stations.map((info) => {
        const status = statusMap.get(info.station_id);
        return {
          ...info,
          num_bikes_available: status?.num_bikes_available ?? 0,
          num_docks_available: status?.num_docks_available ?? 0,
        };
      });

      merged.sort((a, b) => a.name.localeCompare(b.name, "no"));
      setStations(merged);
      setLastUpdated(new Date(statusResult.lastUpdated * 1000));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { stations, lastUpdated, loading, error, refresh: load };
}
