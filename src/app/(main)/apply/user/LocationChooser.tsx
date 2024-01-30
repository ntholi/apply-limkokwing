import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Skeleton } from '@nextui-org/skeleton';
import { useEffect, useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { MapLocation } from './MapLocation';

type Props = {
  location: MapLocation | null;
  setLocation: React.Dispatch<React.SetStateAction<MapLocation | null>>;
};

export default function LocationChooser({ location, setLocation }: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getLocation(position)
          .then((data) => {
            setLocation(data);
          })
          .catch(console.error)
          .finally(() => {
            setLoading(false);
          });
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
      { timeout: 1000 * 10, enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className='flex items-center gap-1'>
      {loading ? (
        <Skeleton className='h-12 w-full rounded-md' />
      ) : (
        <Input
          label='Address'
          variant='bordered'
          size='sm'
          value={location?.display_name}
        />
      )}
      <Button
        isIconOnly
        variant='bordered'
        className='h-12 w-14'
        aria-label='Pick Location'
      >
        <MdLocationOn className='text-2xl text-gray-600' />
      </Button>
    </div>
  );
}

const getLocation = async (position: GeolocationPosition) => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  );
  const data: MapLocation = await response.json();
  return data;
};
