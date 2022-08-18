import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('verificar page App', () => {
  test('verificar se input está na tela', () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeInTheDocument();
  });

  test('verificar input de pesquisa', () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/Name/i);
    userEvent.type(nameInput, 'Tatooine');
    expect(screen.getByRole("cell", { name: /tatooine/i })).toBeInTheDocument();
  })
});
