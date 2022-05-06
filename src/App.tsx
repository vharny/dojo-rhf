import React, { useState } from "react";
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
  invalidEmail: "Email invalide",
  emailsMismatch: "Les emails ne correspondent pas",
  invalidDate: "Date invalide",
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

  const validateRequiredFields = (fieldId: string, fieldState: string) => {
    if (!Boolean(fieldState)) {
      setFieldsErrors((prevFieldsErrorsState) => {
        return {
          ...prevFieldsErrorsState,
          [fieldId]: [
            ...new Set([
              ...prevFieldsErrorsState[fieldId],
              errorsMessage.required,
            ]),
          ],
        };
      });
    } else {
      setFieldsErrors((prevFieldsErrorsState) => {
        return {
          ...prevFieldsErrorsState,
          [fieldId]: [
            ...new Set([
              ...prevFieldsErrorsState[fieldId].filter(
                (errorMessage) => errorMessage !== errorsMessage.required
              ),
            ]),
          ],
        };
      });
    }
  };

  const validateBirthdate = (fieldState: string) => {
    const dateValidationRegex = new RegExp(
      /^\d{4}-\d{2}-\d{2}$/
    );
      console.log("fieldState", fieldState);
    if (!fieldState.match(dateValidationRegex)) {
      setFieldsErrors((prevFieldsErrorsState) => {
        return {
          ...prevFieldsErrorsState,
          birthdate: [
            ...new Set([
              ...prevFieldsErrorsState["birthdate"],
              errorsMessage.invalidDate,
            ]),
          ],
        };
      });
    } else {
      setFieldsErrors((prevFieldsErrorsState) => {
        return {
          ...prevFieldsErrorsState,
          birthdate: [
            ...new Set([
              ...prevFieldsErrorsState["birthdate"].filter(
                (errorMessage) => errorMessage !== errorsMessage.invalidDate
              ),
            ]),
          ],
        };
      });
    }
  }

  const validateEmail = (fieldState: string) => {
    const weakEmailValidationRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    if (!fieldState.match(weakEmailValidationRegex)) {
      setFieldsErrors((prevFieldsErrorsState) => {
        return {
          ...prevFieldsErrorsState,
          email: [
            ...new Set([
              ...prevFieldsErrorsState["email"],
              errorsMessage.invalidEmail,
            ]),
          ],
        };
      });
    } else {
      setFieldsErrors((prevFieldsErrorsState) => {
        return {
          ...prevFieldsErrorsState,
          email: [
            ...new Set([
              ...prevFieldsErrorsState["email"].filter(
                (errorMessage) => errorMessage !== errorsMessage.invalidEmail
              ),
            ]),
          ],
        };
      });
    }
  };

  const compareEmails = (email: string, confirmEmail: string) =>
    email !== confirmEmail
      ? setFieldsErrors((prevFieldsErrorsState) => {
          return {
            ...prevFieldsErrorsState,
            confirmEmail: [
              ...new Set([
                ...prevFieldsErrorsState["confirmEmail"],
                errorsMessage.emailsMismatch,
              ]),
            ],
          };
        })
      : setFieldsErrors((prevFieldsErrorsState) => {
          return {
            ...prevFieldsErrorsState,
            confirmEmail: [
              ...new Set([
                ...prevFieldsErrorsState["confirmEmail"].filter(
                  (errorMessage) =>
                    errorMessage !== errorsMessage.emailsMismatch
                ),
              ]),
            ],
          };
        });

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
      const [fieldId, fieldState]: string[] = Object.entries(field)[0];

      validateRequiredFields(fieldId, fieldState);
    });

    validateBirthdate(birthdate);
    validateEmail(email);
    compareEmails(email, confirmEmail);
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
        onBlur={() => validateRequiredFields("gender", gender)}
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
        onBlur={() => validateRequiredFields("firstName", firstName)}
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
        onBlur={() => validateRequiredFields("lastName", lastName)}
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
        onBlur={() => validateRequiredFields("birthdate", birthdate)}
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
        onBlur={() => validateRequiredFields("email", email)}
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
        onBlur={() => validateRequiredFields("confirmEmail", confirmEmail)}
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
