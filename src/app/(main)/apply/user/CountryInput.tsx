import { AutocompleteProps, Input, InputProps } from '@nextui-org/react';
import React from 'react';
import { continents, countries, languages } from 'countries-list';
import ReactCountryFlag from 'react-country-flag';
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from '@nextui-org/react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CountryInput({ value, onChange, ...rest }: Props) {
  const data = Object.entries(countries).map(([code, country]) => ({
    label: country.name,
    value: country.name,
  }));
  return (
    <>
      {/* <ReactCountryFlag countryCode='US' svg /> */}
      <Autocomplete
        label='Country'
        defaultItems={data}
        value={value}
        onSelectionChange={(item) => onChange(item.toString())}
        selectedKey={value}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
}
