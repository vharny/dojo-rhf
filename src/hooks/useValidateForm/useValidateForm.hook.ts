import { useState } from "react";

import { FieldsErrors } from "./useValidateForm.types";

export const useValidateForm = ({
  defaultFieldsErrorsState,
}: {
  defaultFieldsErrorsState: FieldsErrors;
}) => {
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>(
    defaultFieldsErrorsState
  );

  const errorsMessage = {
    required: "Ce champ est requis",
    invalidFormat: "Format invalide",
    mismatchFields: "Les champs ne correspondent pas",
  };

  const addFieldError = (
    setFieldsErrors: React.Dispatch<React.SetStateAction<FieldsErrors>>,
    fieldId: string,
    errorMessage: string
  ) => {
    setFieldsErrors((prevFieldsErrorsState: any) => {
      return {
        ...prevFieldsErrorsState,
        [fieldId]: [
          ...new Set([...prevFieldsErrorsState[fieldId], errorMessage]),
        ],
      };
    });
  };

  const removeFieldError = (
    setFieldsErrors: React.Dispatch<React.SetStateAction<FieldsErrors>>,
    fieldId: string,
    errorMessage: string
  ) => {
    setFieldsErrors((prevFieldsErrorsState: any) => {
      return {
        ...prevFieldsErrorsState,
        [fieldId]: [
          ...new Set([
            ...prevFieldsErrorsState[fieldId].filter(
              (currErrorMessage: string) => currErrorMessage !== errorMessage
            ),
          ]),
        ],
      };
    });
  };

  const validateFieldRules = (
    fieldId: string,
    fieldState: string,
    fieldValidationRules: any,
    setFieldsErrors: React.Dispatch<React.SetStateAction<FieldsErrors>>
  ) => {
    Object.entries(fieldValidationRules).forEach(([ruleName, ruleValue]) => {
      switch (ruleName) {
        case "required":
          if (ruleValue) {
            !Boolean(fieldState)
              ? addFieldError(setFieldsErrors, fieldId, errorsMessage.required)
              : removeFieldError(
                  setFieldsErrors,
                  fieldId,
                  errorsMessage.required
                );
          }
          break;
        case "regexValidation":
          !fieldState.match(ruleValue as string)
            ? addFieldError(
                setFieldsErrors,
                fieldId,
                errorsMessage.invalidFormat
              )
            : removeFieldError(
                setFieldsErrors,
                fieldId,
                errorsMessage.invalidFormat
              );
          break;
        case "mustBeEquals":
          !(ruleValue as string[]).every((value) => value === ruleValue[0])
            ? addFieldError(
                setFieldsErrors,
                fieldId,
                errorsMessage.mismatchFields
              )
            : removeFieldError(
                setFieldsErrors,
                fieldId,
                errorsMessage.mismatchFields
              );
          break;
        default:
          break;
      }
    });
  };

  return {
    fieldsErrors,
    setFieldsErrors,
    validateFieldRules
  };
};
