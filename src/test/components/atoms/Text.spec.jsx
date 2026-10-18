import { render, screen } from '@testing-library/react';
import { Text } from '../../../components/atoms/Text';

describe('Text (átomo)', () => {
  it('por defecto renderiza un párrafo <p>', () => {
    render(<Text>Hola</Text>);
    expect(screen.getByText('Hola').tagName).toBe('P');
  });

  it('con variant="h1" renderiza un encabezado <h1>', () => {
    render(<Text variant="h1">WikiCraft</Text>);
    expect(screen.getByRole('heading', { level: 1, name: 'WikiCraft' })).toBeTruthy();
  });

  it('aplica la clase recibida en className', () => {
    render(<Text variant="h2" className="text-contact">Contacto</Text>);
    expect(screen.getByText('Contacto')).toHaveClass('text-contact');
  });
});
