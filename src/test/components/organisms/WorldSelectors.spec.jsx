import { render, screen, fireEvent } from '@testing-library/react';
import WorldSelectors from '../../../components/organisms/WorldSelectors';

function renderSelectores(props = {}) {
  return render(
    <WorldSelectors mundo="" zona="" onMundo={() => {}} onZona={() => {}} animKey={0} {...props} />
  );
}

describe('WorldSelectors (organismo)', () => {
  it('muestra los tres mundos en el selector de Mundo', () => {
    renderSelectores();
    expect(screen.getByRole('option', { name: 'Overworld' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Nether' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'End' })).toBeTruthy();
  });

  it('sin mundo elegido, el selector de Estructura solo tiene el placeholder', () => {
    renderSelectores();
    expect(screen.getByLabelText('Estructura').options.length).toBe(1);
  });

  it('con mundo "nether" muestra las estructuras del Nether', () => {
    renderSelectores({ mundo: 'nether' });
    expect(screen.getByRole('option', { name: 'Fortaleza del Nether' })).toBeTruthy();
    expect(screen.queryByRole('option', { name: 'Aldea' })).toBeNull();
  });

  it('llama a onMundo y onZona al cambiar los selectores', () => {
    const onMundo = jasmine.createSpy('onMundo');
    const onZona = jasmine.createSpy('onZona');
    renderSelectores({ mundo: 'overworld', onMundo, onZona });
    fireEvent.change(screen.getByLabelText('Mundo'), { target: { value: 'end' } });
    fireEvent.change(screen.getByLabelText('Estructura'), { target: { value: 'aldea' } });
    expect(onMundo).toHaveBeenCalledWith('end');
    expect(onZona).toHaveBeenCalledWith('aldea');
  });
});
