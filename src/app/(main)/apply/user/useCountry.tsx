'use client';
import axios from 'axios';
import React, { useEffect } from 'react';

export default function useCountry() {
  const [country, setCountry] = React.useState<string>('');
  useEffect(() => {
    axios.get('/api/countries').then((res) => {
      setCountry(res.data.country);
    });
  }, []);

  return country;
}
