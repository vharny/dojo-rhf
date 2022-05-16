import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { RadioInput } from '@axa-fr/react-toolkit-all';

import { IWrappedRadioInput } from './inputsWrappers.types';

function WrappedRadioInput<T extends FieldValues>({
  name,
  path = '',
  label,
  options,
  isRequired,
  inputSize,
  control,
  disabled,
  rules,
  dispatch,
}: IWrappedRadioInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <RadioInput
          id={name}
          label={label}
          aria-label={label}
          htmlFor={name}
          name={name}
          options={options}
          value={field.value}
          onChange={({ value }: { value: boolean | string }) => {
            let newValue = value;
            if (value === 'true') newValue = true;
            if (value === 'false') newValue = false;
            dispatch && dispatch(path, newValue);
            field.onChange(newValue);
          }}
          onBlur={() => field.onBlur()}
          classModifier={isRequired ? 'required' : null}
          classNameContainerLabel="col-md-3"
          classNameContainerInput={inputSize}
          disabled={disabled}
          message={fieldState?.error?.message}
          forceDisplayMessage/>
      )}/>
  );
}

export { WrappedRadioInput };
