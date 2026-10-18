import { render, screen, fireEvent } from '@testing-library/react';
import StructureSearch from '../../../components/organisms/StructureSearch';

function buscar(texto) {
  fireEvent.change(screen.getByPlaceholderText('Ej: Aldea'), { target: { value: texto } });
  fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
}

describe('StructureSearch (organismo)', () => {
  beforeEach(() => {
    spyOn(window, 'alert');
  });

  it('si el campo está vacío avisa y no busca', () => {
    const onSelect = jasmine.createSpy('onSelect');
    render(<StructureSearch onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(window.alert).toHaveBeenCalledWith('Por favor escribe el nombre de una estructura.');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('encuentra la estructura escrita y llama a onSelect con su valor', () => {
    const onSelect = jasmine.createSpy('onSelect');
    render(<StructureSearch onSelect={onSelect} />);
    buscar('Aldea');
    expect(onSelect).toHaveBeenCalledWith('aldea');
  });

  it('ignora mayúsculas y tildes ("IGLU" encuentra "Iglú")', () => {
    const onSelect = jasmine.createSpy('onSelect');
    render(<StructureSearch onSelect={onSelect} />);
    buscar('IGLU');
    expect(onSelect).toHaveBeenCalledWith('iglu');
  });

  it('avisa cuando la estructura no existe', () => {
    const onSelect = jasmine.createSpy('onSelect');
    render(<StructureSearch onSelect={onSelect} />);
    buscar('castillo');
    expect(window.alert).toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
  });
});
