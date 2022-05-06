import React, { useState } from "react";

import "./App.css";
import { SelectInput } from "@axa-fr/react-toolkit-form-input-select";
import { TextInput } from "@axa-fr/react-toolkit-form-input-text";

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

function App() {
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");

  const validateForm = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    console.log("validateForm");
  };

  return (
    <form className="container af-form" onSubmit={formEvent => validateForm(formEvent)}>
      <SelectInput
        classModifier="required"
        id="gender"
        label="Civilité"
        options={genderOptions}
        value={gender}
        placeholder="Sélectionnez une civilité"
        onChange={({ value }: { value: string}) => setGender(value)} />
      <TextInput
        classModifier="required"
        id="firstName"
        label="Prénom"
        value={firstName}
        size={21}
        onChange={({ value }: { value: string }) => setFirstName(value)}
      />
      <TextInput
        classModifier="required"
        id="lastName"
        label="Nom"
        value={lastName}
        size={21}
        onChange={({ value }: { value: string }) => setLastName(value)}
      />
      <div className="row af-form__group af-form__group--required">
        <div className="col-md-2">
          <label htmlFor="birthdate" className="af-form__group-label">Date de naissance</label>
        </div>
        <div className="col-md-10">
          <div className="af-form__text">
          <input
            id="birthdate"
            type={"date"}
            value={birthdate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBirthdate(e.target.value)
            }
            className="af-form__input-text col-md-3"
          />
          </div>
        </div>
      </div>
      <TextInput
        classModifier="required"
        id="email"
        label="Email"
        value={email}
        size={21}
        onChange={({ value }: { value: string }) => setEmail(value)}
      />
      <TextInput
        classModifier="required"
        id="emailConfirm"
        label="Confirmez l'email"
        value={confirmEmail}
        size={21}
        onChange={({ value }: { value: string }) => setconfirmEmail(value)}
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
