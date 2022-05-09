import React, { useEffect, useState } from "react";
import { SelectInput } from "@axa-fr/react-toolkit-form-input-select";
import { TextInput } from "@axa-fr/react-toolkit-form-input-text";
import { DateInput } from "./DateInput";

import { FieldsErrors, Gender } from "./App.types";
import "./App.css";

const genderOptions = [
  {
    id: "male",
    label: "M",
    value: "M",
  },
  {
    id: "female",
    label: "F",
    value: "F",
  },
  {
    id: "other",
    label: "Autre",
    value: "O",
  },
];

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
          ? addFieldError(setFieldsErrors, fieldId, errorsMessage.invalidFormat)
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

function App() {
  const [gender, setGender] = useState<Gender | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors>({
    gender: [],
    firstName: [],
    lastName: [],
    birthdate: [],
    email: [],
    confirmEmail: [],
  });

  const fieldsValidationRules = {
    gender: {
      required: true,
    },
    firstName: {
      required: true,
    },
    lastName: {
      required: true,
    },
    birthdate: {
      required: true,
      regexValidation: "^\\d{4}-\\d{2}-\\d{2}$",
    },
    email: {
      required: true,
      regexValidation:
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    },
    confirmEmail: {
      required: true,
      mustBeEquals: [email, confirmEmail],
    },
  };

  useEffect(() => {
    fieldsValidationRules.confirmEmail.mustBeEquals = [email, confirmEmail];
  }, [email, confirmEmail]);

  const validateForm = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();

    [
      { gender },
      { firstName },
      { lastName },
      { birthdate },
      { email },
      { confirmEmail },
    ].forEach((field) => {
      const [fieldId, fieldState] = Object.entries(field)[0];
      const fieldValidationRules = fieldsValidationRules[
        fieldId as keyof fieldsValidationRules
      ] as typeof fieldsValidationRules;

      validateFieldRules(
        fieldId,
        fieldState,
        fieldValidationRules,
        setFieldsErrors
      );
    });
  };

  return (
    <form
      className="container af-form"
      onSubmit={(formEvent) => validateForm(formEvent)}
    >
      <SelectInput
        classModifier="required"
        id="gender"
        label="Civilité"
        options={genderOptions}
        value={gender}
        placeholder="Sélectionnez une civilité"
        onChange={({ value }: { value: string }) => setGender(value as Gender)}
        onBlur={() =>
          validateFieldRules(
            "gender",
            gender,
            fieldsValidationRules.gender,
            setFieldsErrors
          )
        }
        message={fieldsErrors["gender"]?.join(" - ")}
        forceDisplayMessage
      />
      <TextInput
        classModifier="required"
        id="firstName"
        label="Prénom"
        value={firstName}
        size={21}
        onChange={({ value }: { value: string }) => setFirstName(value)}
        onBlur={() =>
          validateFieldRules(
            "firstName",
            firstName,
            fieldsValidationRules.firstName,
            setFieldsErrors
          )
        }
        message={fieldsErrors["firstName"]?.join(" - ")}
        forceDisplayMessage
      />
      <TextInput
        classModifier="required"
        id="lastName"
        label="Nom"
        value={lastName}
        size={21}
        onChange={({ value }: { value: string }) => setLastName(value)}
        onBlur={() =>
          validateFieldRules(
            "lastName",
            lastName,
            fieldsValidationRules.lastName,
            setFieldsErrors
          )
        }
        message={fieldsErrors["lastName"]?.join(" - ")}
        forceDisplayMessage
      />
      <DateInput
        classModifier="required"
        id="birthdate"
        label="Date de naissance"
        value={birthdate}
        size={21}
        onChange={setBirthdate}
        onBlur={() =>
          validateFieldRules(
            "birthdate",
            birthdate,
            fieldsValidationRules.birthdate,
            setFieldsErrors
          )
        }
        message={fieldsErrors["birthdate"]?.join(" - ")}
        forceDisplayMessage
      />
      <TextInput
        classModifier="required"
        id="email"
        label="Email"
        value={email}
        size={21}
        onChange={({ value }: { value: string }) => setEmail(value)}
        onBlur={() =>
          validateFieldRules(
            "email",
            email,
            fieldsValidationRules.email,
            setFieldsErrors
          )
        }
        message={fieldsErrors["email"]?.join(" - ")}
        forceDisplayMessage
      />
      <TextInput
        classModifier="required"
        id="confirmEmail"
        label="Confirmez l'email"
        value={confirmEmail}
        size={21}
        onChange={({ value }: { value: string }) => setconfirmEmail(value)}
        onBlur={() =>
          validateFieldRules(
            "confirmEmail",
            confirmEmail,
            fieldsValidationRules.confirmEmail,
            setFieldsErrors
          )
        }
        message={fieldsErrors["confirmEmail"]?.join(" - ")}
        forceDisplayMessage
      />
      <div className="af-btn--right">
        <button
          type="submit"
          className="af-btn form-actions__button af-btn--hasiconRight"
        >
          <span>Valider</span>
          <span className="glyphicon glyphicon-arrowthin-right" />
        </button>
      </div>
    </form>
  );
}

export default App;
