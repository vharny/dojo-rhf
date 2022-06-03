import { Control, FieldValues, Path } from "react-hook-form";
export interface IInputBase<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label: string;
}

export interface IFormInputText<T> extends IInputBase<T> {
  type: "text" | "email" | "date";
}

