import matchers from '@testing-library/jasmine-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

beforeEach(() => {
    jasmine.getEnv().addMatchers(matchers.default.default);
    // Cada prueba parte sin sesión, cuentas ni favoritos guardados
    localStorage.clear();
    document.body.classList.remove('overworld', 'nether', 'end');
});
