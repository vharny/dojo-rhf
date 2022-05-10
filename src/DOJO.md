# DOJO REACT HOOK FORM - sujet et challenges

Le but de ce dojo est de vous familiariser à l'utilisation de la librairie [React-Hook-Form](https://react-hook-form.com) (RHF).

L'application se compose :

- d'un composant `Form` affichant un formulaire utilisant le [react-toolkit AXA](https://github.com/AxaGuilDEv/react-toolkit),
- d'un hook de validation des champs d'un formulaire `useValidationForm`,
- une suite de test couvrant les cas d'utilisation du formulaire et permettant de valider la refactorisation.

Tous les outils sont pré-installés pour que vous puissiez entièrement terminer le dojo et les challenges (voir `package.json`).

## Sujet

Nous imaginons que nous travaillons sur une application déjà développée et livrée en production.

Le formulaire rendu par le composant `Form` n'utilise pas la librairie RHF mais vous souhaitez qu'il l'utilise.

Le but du dojo est de refactorer le composant `Form` afin de lui faire utiliser RHF.

Pour valider que la refactorisation soit correcte et nous assurer que l'application continuera de fonctionner en production, il faudra s'assurer que les tests passent toujours.

## Challenges (optionnels)

Si vous le souhaitez vous pouvez mettre en place ces différents challenges en plus de refactoriser le composant `Form` pour lui faire utiliser RFH :

- Utiliser un [resolver](https://react-hook-form.com/api/useform/#validationResolver) comme [yup](https://www.npmjs.com/package/yup) pour valider les champs du formulaire,
- Persister les champs du formulaire avec le localStorage,
- Ajouter un nouveau champ de formulaire conditionné par rapport à un ou plusieurs autres champs.
