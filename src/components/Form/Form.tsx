import React, { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@axa-fr/react-toolkit-all";
import { DateInput } from "../dateInput/DateInput";

import { genderOptions, defaultFieldsErrorsState } from "./Form.config.json";

import { useValidateForm } from "../../hooks/useValidateForm/useValidateForm.hook";

import { Gender } from "./Form.types";

import "./Form.css";

export const Form = () => {
  const [gender, setGender] = useState<Gender | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");

  const { fieldsErrors, setFieldsErrors, validateFieldRules } = useValidateForm(
    { defaultFieldsErrorsState }
  );

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
        placeholder="x@y.z"
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
};
