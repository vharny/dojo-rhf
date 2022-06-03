import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "./InputText";
import InputTextarea from "./InputTextarea";

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email"), null], "Emails must match")
    .required("Required"),
  birthDate: yup.date().required("Required"),
  hasAdditionnalDetails: yup.boolean(),
  additionnalDetails: yup.string().required("Required"),
});

const Form = () => {
  const { control, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      birthDate: "",
      hasAdditionnalDetails: false,
      additionnalDetails: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const hasAdditionnalDetails = watch("hasAdditionnalDetails");

  return (
    <form
      onSubmit={handleSubmit(() => {
        console.log("test");
      })}
    >
      <p>{JSON.stringify(getValues())}</p>
      <InputText
        type="text"
        name="firstName"
        label="Prénom"
        control={control}
      />
      <InputText type="text" name="lastName" label="Nom" control={control} />
      <InputText
        type="text"
        name="email"
        label="Adresse email"
        control={control}
      />
      <InputText
        type="text"
        name="confirmEmail"
        label="Confirmer adresse email"
        control={control}
      />
      <InputText
        type="date"
        name="birthDate"
        label="Date de naissance"
        control={control}
      />
      {hasAdditionnalDetails && (
        <InputTextarea
          name="additionnalDetails"
          label="Informations complémentaires"
          control={control}
        />
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
