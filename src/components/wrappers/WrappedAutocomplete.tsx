import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
// import Autocomplete from 'layout/Form/Autocomplete';

// import { Autocomplete } from '../../../Autocomplete';

import {Autocomplete} from '@ose/react-components';
import { IWrappedAutoComplete } from './inputsWrappers.types';

export function WrappedAutoComplete<T extends FieldValues>({
  name,
  path = '',
  label,
  options,
  isRequired,
  control,
  disabled,
  rules,
  dispatch,
} : IWrappedAutoComplete<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState}) => (
        <Autocomplete
          id={name}
          label={label}
          options={options}
          value={field.value}
          onChange={(value : string) => {
            dispatch && dispatch(path, value);
            console.log('value', value);
            field.onChange(value);
          }}
          onBlur={() => {
            console.log('onBlur');
            field.onBlur();
          }}
          isRequired={isRequired}
          disabled={disabled}
          error={fieldState?.error?.message || ''}
          shouldDebounceOptionsListRecalculation />
      )}/>
  );
}
