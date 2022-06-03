import { TextareaInput } from "@axa-fr/react-toolkit-form-input-textarea";
import { Controller, FieldValues } from "react-hook-form";
import { IInputBase } from "./types";

function InputTextarea<T extends FieldValues>({
  className,
  name,
  label,
  control,
  disabled,
  placeholder,
}: IInputBase<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextareaInput
          id={name}
          name={name}
          label={label}
          onBlur={field.onBlur}
          onChange={(e: { value: string }) => {
            field.onChange(e.value);
          }}
          forceDisplayMessage={Boolean(fieldState.error)}
          value={field.value}
          message={fieldState.error?.message}
          disabled={disabled}
          className={className}
          placeholder={placeholder}
        />
      )}
    />
  );
}

export default InputTextarea;
