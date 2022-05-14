import { Form } from "./components/Form/Form"

const App = () => (
  <div className="container-fluid">
    <div className="row">
      <div
        className="col-md-6"
        style={{ overflow: "scroll", height: "100vh" }}
      >
        <h1>DOJO REACT HOOF FORM</h1>
        <p>
          Le but de ce dojo est de vous familiariser à l'utilisation de la
          librairie{" "}
          <a href="https://react-hook-form.com" target={"_blank"}>
            React-Hook-Form
          </a>{" "}
          (RHF).
        </p>
        <p>L'application se compose :</p>
        <ul>
          <li>
            d'un composant Form affichant un formulaire utilisant le
            react-toolkit AXA,
          </li>
          <li>
            d'un hook de validation des champs d'un formulaire
            useValidationForm,
          </li>
          <li>
            une suite de test couvrant les cas d'utilisation du formulaire et
            permettant de valider la refactorisation.
          </li>
        </ul>
        <p>
          Tous les outils sont pré-installés pour que vous puissiez
          entièrement terminer le dojo et les challenges.
        </p>
        <h2>Sujet</h2>
        <p>
          Nous imaginons que nous travaillons sur une application déjà
          développée et livrée en production.
        </p>
        <p>
          Le formulaire rendu par le composant Form n'utilise pas la librairie
          RHF mais vous souhaitez qu'il l'utilise.
        </p>
        <p>
          Le but du dojo est de refactorer le composant Form afin de lui faire
          utiliser RHF.
        </p>
        <p>
          Pour valider que la refactorisation soit correcte et nous assurer
          que l'application continuera de fonctionner en production, il faudra
          s'assurer que les tests passent toujours.
        </p>
        <h2>Challenges (optionnels)</h2>
        <p>
          Si vous le souhaitez vous pouvez mettre en place ces différents
          challenges en plus de refactoriser le composant Form pour lui faire
          utiliser RFH :
        </p>
        <ul>
          <li>
            Utiliser un{" "}
            <a
              href="https://react-hook-form.com/api/useform/#validationResolver"
              target={"_blank"}
            >
              resolver
            </a>{" "}
            comme{" "}
            <a href="https://www.npmjs.com/package/yup" target={"_blank"}>
              yup
            </a>{" "}
            pour valider les champs du formulaire,
          </li>
          <li>
            Persister les champs du formulaire avec le localStorage,
          </li>
          <li>
            Ajouter un nouveau champ de formulaire conditionné par rapport à
            un ou plusieurs autres champs.
          </li>
        </ul>
      </div>
      <div className="col-md-6">
        <Form />
      </div>
    </div>
  </div>
)

export default App