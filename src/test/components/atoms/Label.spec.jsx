import { render, screen } from '@testing-library/react';
import Label from '../../../components/atoms/Label';

describe('Label (átomo)', () => {
  it('renderiza el texto de la etiqueta', () => {
    render(<Label htmlFor="x">Mundo</Label>);
    expect(screen.getByText('Mundo')).toBeTruthy();
  });

  it('asigna el atributo for con htmlFor', () => {
    render(<Label htmlFor="world">Mundo</Label>);
    expect(screen.getByText('Mundo').getAttribute('for')).toBe('world');
  });

  it('queda asociada al input con el mismo id', () => {
    render(
      <>
        <Label htmlFor="estructura">Estructura</Label>
        <input id="estructura" />
      </>
    );
    expect(screen.getByLabelText('Estructura').id).toBe('estructura');
  });
});
