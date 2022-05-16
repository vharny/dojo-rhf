import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { TextInput } from '@axa-fr/react-toolkit-all';

import { IWrappedFormInputs } from './inputsWrappers.types';

function WrappedTextInput<T extends FieldValues>({
  name,
  path = '',
  label,
  helpMessage,
  isRequired,
  inputSize,
  control,
  disabled,
  rules,
  dispatch,
}: IWrappedFormInputs<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextInput
          id={name}
          label={label}
          helpMessage={helpMessage}
          aria-label={label}
          htmlFor={name}
          name={name}
          value={field.value}
          onChange={({ value }: { value: string }) => {
            dispatch && dispatch(path, value);
            field.onChange(value);
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

export { WrappedTextInput };
