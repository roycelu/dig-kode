export interface StationInfo {
  station_id: string;
  name: string;
  address: string;
  capacity: number;
}

export interface StationStatus {
  station_id: string;
  num_bikes_available: number;
  num_docks_available: number;
}

export interface Station {
  station_id: string;
  name: string;
  address: string;
  capacity: number;
  num_bikes_available: number;
  num_docks_available: number;
}
