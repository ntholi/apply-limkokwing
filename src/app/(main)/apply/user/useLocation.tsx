import { useEffect, useState } from 'react';
import { MapLocation } from './MapLocation';

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
