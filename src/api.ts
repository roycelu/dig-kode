import type { StationInfo, StationStatus } from "./types";

const BASE_URL = "https://gbfs.urbansharing.com/oslobysykkel.no";

interface GbfsInfoResponse {
  last_updated: number;
  data: { stations: StationInfo[] };
}

interface GbfsStatusResponse {
  last_updated: number;
  data: { stations: StationStatus[] };
}

export async function fetchStationInfo(): Promise<{ stations: StationInfo[]; lastUpdated: number }> {
  const res = await fetch(`${BASE_URL}/station_information.json`);
  if (!res.ok) throw new Error(`Klarte ikke hente stasjonsinfo (${res.status})`);
  const json: GbfsInfoResponse = await res.json();
  return { stations: json.data.stations, lastUpdated: json.last_updated };
}

export async function fetchStationStatus(): Promise<{ stations: StationStatus[]; lastUpdated: number }> {
  const res = await fetch(`${BASE_URL}/station_status.json`);
  if (!res.ok) throw new Error(`Klarte ikke hente sanntidsstatus (${res.status})`);
  const json: GbfsStatusResponse = await res.json();
  return { stations: json.data.stations, lastUpdated: json.last_updated };
}
