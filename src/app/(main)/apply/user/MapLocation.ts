export interface MapLocation {
  address: {
    country: string;
    country_code: string;
    district: string;
    neighbourhood: string;
    postcode: string;
    state: string;
    surburb: string;
    village: string;
    city: string;
  };
  boundingbox: string[];
  category: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
}
