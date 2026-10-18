import { render, screen, fireEvent } from '@testing-library/react';
import SelectField from '../../../components/molecules/SelectField';

const opciones = [
  { valor: 'overworld', nombre: 'Overworld' },
  { valor: 'nether', nombre: 'Nether' },
];

function renderSelect(props = {}) {
  return render(
    <SelectField
      id="world"
      label="Mundo"
      value=""
      options={opciones}
      placeholder="Selecciona un mundo"
      onChange={() => {}}
      className="world-select"
      wrapperClass="world-selector"
      {...props}
    />
  );
}

describe('SelectField (molécula)', () => {
  it('renderiza el placeholder y todas las opciones', () => {
    renderSelect();
    const select = screen.getByLabelText('Mundo');
    expect(select.options.length).toBe(3);
    expect(screen.getByRole('option', { name: 'Overworld' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Nether' })).toBeTruthy();
  });

  it('llama a onChange con el valor elegido', () => {
    const onChange = jasmine.createSpy('onChange');
    renderSelect({ onChange });
    fireEvent.change(screen.getByLabelText('Mundo'), { target: { value: 'nether' } });
    expect(onChange).toHaveBeenCalledWith('nether');
  });

  it('agrega la clase de animación solo cuando animKey es mayor a 0', () => {
    const { unmount } = renderSelect({ animKey: 0 });
    expect(screen.getByLabelText('Mundo')).not.toHaveClass('select-updated');
    unmount();
    renderSelect({ animKey: 2 });
    expect(screen.getByLabelText('Mundo')).toHaveClass('select-updated');
  });
});
