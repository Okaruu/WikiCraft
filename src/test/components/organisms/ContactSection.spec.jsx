import { render, screen } from '@testing-library/react';
import ContactSection from '../../../components/organisms/ContactSection';

describe('ContactSection (organismo)', () => {
  it('renderiza el título "Contacto"', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeTruthy();
  });

  it('tiene el enlace de correo', () => {
    render(<ContactSection />);
    expect(screen.getByRole('link', { name: 'Correo' }).getAttribute('href'))
      .toBe('https://workspace.google.com/intl/es-419/gmail/');
  });

  it('tiene el enlace a Instagram de WikiCraft', () => {
    render(<ContactSection />);
    expect(screen.getByRole('link', { name: 'Instagram' }).getAttribute('href'))
      .toBe('https://www.instagram.com/wikicraft.cl/');
  });
});
