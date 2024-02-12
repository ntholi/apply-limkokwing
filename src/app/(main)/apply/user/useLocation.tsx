import { useEffect, useState } from 'react';

export default function useLocation() {
  const [location, setLocation] = useState<MapLocation | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getLocation(position)
          .then((data) => {
            setLocation(data);
          })
          .catch(console.error);
      },
      (error) => {
        console.log(error);
      },
      { timeout: 1000 * 10, enableHighAccuracy: true }
    );
  }, []);

  return location;
}

const getLocation = async (position: GeolocationPosition) => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  );
  const data: MapLocation = await response.json();
  return data;
};

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
