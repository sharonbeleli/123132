import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the first question', () => {
  render(<App />);
  const firstQuestion = screen.getByText(/כמה זה|לדנה היו|ליוסי יש/);
  expect(firstQuestion).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<App />);
  const button = screen.getByText('שלח תשובה');
  expect(button).toBeInTheDocument();
});
