import { render, screen, fireEvent } from '@testing-library/react';
import MusicButton from '../../../components/molecules/MusicButton';
import { MusicProvider } from '../../../context/MusicProvider';
import { useMusic } from '../../../hooks/useMusic';

const CLAVE = 'wikicraft:musica-silenciada';

function AbrirCofre() {
  const { iniciar } = useMusic();
  return <button type="button" onClick={iniciar}>Abrir cofre</button>;
}

function renderMusica() {
  return render(
    <MusicProvider>
      <MusicButton />
      <AbrirCofre />
    </MusicProvider>
  );
}

describe('MusicButton (molécula)', () => {
  let play;
  let pause;

  beforeEach(() => {
    play = spyOn(HTMLMediaElement.prototype, 'play').and.returnValue(Promise.resolve());
    pause = spyOn(HTMLMediaElement.prototype, 'pause');
  });

  it('por defecto la música está activa y el botón ofrece silenciarla', () => {
    renderMusica();
    expect(screen.getByRole('button', { name: 'Silenciar música' })).toBeTruthy();
  });

  it('al silenciar pausa la música y guarda el estado en localStorage', () => {
    renderMusica();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir cofre' }));
    fireEvent.click(screen.getByRole('button', { name: 'Silenciar música' }));
    expect(pause).toHaveBeenCalled();
    expect(localStorage.getItem(CLAVE)).toBe('true');
    expect(screen.getByRole('button', { name: 'Activar música' })).toBeTruthy();
  });

  it('recuerda que estaba silenciada y no suena al abrir el cofre', () => {
    localStorage.setItem(CLAVE, 'true');
    renderMusica();
    expect(screen.getByRole('button', { name: 'Activar música' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir cofre' }));
    expect(play).not.toHaveBeenCalled();
  });

  it('al activar la música vuelve a sonar y guarda el cambio', () => {
    localStorage.setItem(CLAVE, 'true');
    renderMusica();
    fireEvent.click(screen.getByRole('button', { name: 'Activar música' }));
    expect(play).toHaveBeenCalled();
    expect(localStorage.getItem(CLAVE)).toBe('false');
  });

  it('sin MusicProvider no muestra nada (no rompe la página)', () => {
    const { container } = render(<MusicButton />);
    expect(container.querySelector('button')).toBeNull();
  });
});
