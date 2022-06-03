import { TextInput } from "@axa-fr/react-toolkit-form-input-text";
import { Controller, FieldValues } from "react-hook-form";
import { IFormInputText } from "./types";

function InputText<T extends FieldValues>({
  className,
  name,
  type,
  label,
  control,
  disabled,
  placeholder,
}: IFormInputText<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          id={name}
          name={name}
          label={label}
          type={type}
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

export default InputText;
