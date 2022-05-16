import { Control, RegisterOptions, FieldValues, Path } from 'react-hook-form';

interface IReactHookFormWrapper<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions | undefined;
}

export interface IWrappedFormInputs<T> extends IReactHookFormWrapper<T> {
  path?: string;
  // TODO : Corriger le type any lors de la refacto complète du useApi en TypeScript
  dispatch?: (x: string, y: any ) => void;
  label: string;
  isRequired: boolean;
  inputSize: string;
  helpMessage?: string;
  disabled: boolean;
}

type WrappedRadioInputOptions = {
  label: string;
  value: string;
  id: string;
};

export interface IWrappedRadioInput<T> extends IWrappedFormInputs<T> {
  options: WrappedRadioInputOptions[];
}

type WrappedAutoCompleteOptions = {
  label: string;
  value: string;
  id: string;
};

export interface IWrappedAutoComplete<T> extends IWrappedFormInputs<T> {
  options: WrappedAutoCompleteOptions[];
}

export interface IWrappedTextMulti<T> extends IWrappedFormInputs<T> {
  placeholder: string;
  addButonLabel: string;
  shouldForceFirstInputDisplay?: boolean;
}
