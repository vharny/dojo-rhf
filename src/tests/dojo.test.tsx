import { expect } from 'vitest';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react'

import App from '../App'

const feature = loadFeature('src/tests/dojo.feature');

defineFeature(feature, test => {
  test('Affichage du titre de la page', ({ given, when, then }) => {
    when("J'accède au DOJO", () => {
      render(<App />)
    })
    then(/^Le titre "(.*)" est affiché$/, title => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  });
});
