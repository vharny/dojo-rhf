import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import TextMulti from 'layout/Form/TextMulti';

import { IWrappedTextMulti } from './inputsWrappers.types';

export function WrappedTextMulti<T extends FieldValues>({
  name,
  path = '',
  label,
  addButonLabel,
  placeholder,
  isRequired,
  shouldForceFirstInputDisplay = false,
  inputSize,
  control,
  disabled,
  rules,
  dispatch,
}: IWrappedTextMulti<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState}) => (
        <TextMulti
          id={name}
          label={label}
          aria-label={label}
          htmlFor={name}
          name={name}
          values={field.value}
          placeholder={placeholder}
          labelAdd={addButonLabel}
          onChange={({ value } : { value: string }) => {
            dispatch && dispatch(path, value);
            field.onChange(value);
          }}
          onBlur={() => field.onBlur()}
          required={isRequired}
          shouldForceFirstInputDisplay={shouldForceFirstInputDisplay}
          classNameContainerLabel="col-md-3"
          classNameContainerInput={inputSize}
          disabled={disabled}
          message={fieldState?.error?.message}/>
      )}/>
  );
}
