import { AutocompleteProps, Input, InputProps } from '@nextui-org/react';
import React, { Key, useEffect } from 'react';
import { TCountryCode, continents, countries, languages } from 'countries-list';
import ReactCountryFlag from 'react-country-flag';
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from '@nextui-org/react';
import {
  getCountryCode,
  getCountryData,
  getCountryDataList,
  getEmojiFlag,
} from 'countries-list';
import useLocation from './useLocation';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CountryInput({ value, onChange, ...rest }: Props) {
  const data = Object.entries(countries).map(([_, country]) => ({
    name: country.name,
    value: country,
  }));

  return (
    <>
      <Autocomplete
        label='Country'
        defaultItems={data}
        value={value}
        onSelectionChange={(key) => onChange(key.toString())}
        selectedKey={value}
      >
        {(item) => (
          <AutocompleteItem key={item.name}>
            <span className='flex items-center gap-2'>
              <ReactCountryFlag
                countryCode={getCountryCode(item.name).toString()}
                svg
              />
              {item.name}
            </span>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
}
