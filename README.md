# WikiCraft

Proyecto **Desarrollo Fullstack II (DSY1104)** 

WikiCraft es una página sobre Minecraft donde puedes buscar una estructura del juego y ver qué ítems pueden salir en sus cofres y con qué probabilidad. Al hacer click en un ítem se muestra su información y sus atributos.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

La página queda en http://localhost:5173 o https://wiki-craft-ten.vercel.app/

Para correr las pruebas:

```bash
npm run test
```

## Qué hicimos

### 1. Pasamos el proyecto a React

Al principio la página estaba hecha con HTML, CSS y JavaScript normal, todo en un solo archivo `metodos.js`. La pasamos a **React con Vite** y separamos todo en componentes usando **diseño atómico**:

- **Átomos:** las piezas más chicas (`Button`, `Input`, `Label`, `Text`, `Slot`).
- **Moléculas:** juntan átomos (`FormField`, `SelectField`, `AccordionItem`, `AutocompleteInput`, `FavoriteButton`).
- **Organismos:** partes más grandes de la página (`Header`, `Footer`, `ChestInventory`, `ItemPanel`, `LoginForm`, `RegisterForm`, etc.).
- **Templates:** la estructura general (`MainLayout` para las páginas normales y `AuthTemplate` para login y registro).
- **Páginas:** `Home`, `LoginPage`, `RegisterPage`, `FavoritePage` y `AdminPage`.

Los datos (mundos, estructuras e ítems) quedaron en la carpeta `data/`, y el estado global (sesión, favoritos y ediciones del admin) lo manejamos con **Context** de React.

### 2. Funcionalidades

- Buscador de estructuras con autocompletado. Se puede elegir con el mouse o con las flechas del teclado y Enter.
- Selectores de mundo y estructura. El fondo de la página cambia según el mundo (Overworld, Nether o End).
- Cofre de 27 casillas. Al abrirlo suena la música y al elegir un ítem aparece un panel con su información, probabilidad y atributos.
- Registro e inicio de sesión. Las cuentas se guardan en el `localStorage`.
- Validaciones del correo (no deja poner dos puntos seguidos, dos @, caracteres raros, etc.) y de la contraseña (mínimo 8 caracteres, una mayúscula, un número y un carácter especial).
- Favoritos: solo se pueden guardar si iniciaste sesión, y cada usuario tiene su propia lista.
- Modo administrador: puede editar la información y los atributos de los ítems.
- Rutas protegidas: no se puede entrar a `/favoritos` sin sesión, ni a `/admin` si no eres administrador.

### 3. Diseño responsivo con Bootstrap

Usamos **Bootstrap** para que la página se vea bien en celular y en computador. Lo usamos sobre todo en la grilla (`container`, `row`, `col-12`, `col-md-4`, `col-lg-auto`, etc.):

- En celular el cofre y el panel del ítem quedan uno debajo del otro, y en computador quedan lado a lado.
- Los selectores de mundo y estructura se acomodan según el tamaño de la pantalla.
- El footer tiene 3 columnas en computador y en celular quedan apiladas.
- Los favoritos se muestran en una grilla que cambia la cantidad de columnas según la pantalla.

Además cada componente tiene su propio archivo CSS en la carpeta `styles/`, ordenado igual que los componentes.

### 4. Pruebas unitarias con Jasmine y Karma

Hicimos las pruebas con **Jasmine** y **Karma**, siguiendo la guía de la clase. Usamos **Babel** y **webpack** para que Karma entienda el código de React, y **Testing Library** para renderizar los componentes en las pruebas.

Las pruebas están en `src/test/` y siguen el mismo orden que los componentes (átomos, moléculas, organismos, templates y páginas). Hay **al menos 3 pruebas por cada componente**, más de 100 en total.

Algunas cosas que probamos:

- Que los componentes se muestren bien y reciban bien sus props.
- Que los botones y campos respondan cuando se hace click o se escribe.
- Que el login muestre errores con correos inválidos o contraseña incorrecta.
- Que el registro no deje crear dos cuentas con el mismo correo.
- Que los favoritos solo funcionen con la sesión iniciada.
- Que el administrador pueda editar un ítem y un usuario normal no.
- Que las rutas protegidas te manden al login si no has iniciado sesión.
- Que la página use la grilla de Bootstrap.
- Cuánto se demora en cargar la página de inicio (con `Profiler` de React).

#### Mocks

Para no depender de otras partes del código usamos mocks:

- `jasmine.createSpy` para simular funciones como `onSubmit`, `onClose` o `onSelect` y revisar con qué datos se llaman.
- `spyOn(window, 'alert')` para que no salgan los alert de verdad durante las pruebas.
- `spyOn(HTMLMediaElement.prototype, 'play')` para que no suene la música al abrir el cofre.
- Guardamos datos de prueba en el `localStorage` para simular usuarios, cuentas y favoritos.

#### Cobertura

Al correr `npm run test` sale en la terminal un resumen de la cobertura (cuánto del código se ejecutó en las pruebas). El reporte completo queda en `coverage/html/index.html` y se puede abrir en el navegador para ver archivo por archivo.

### 5. Problemas que tuvimos

- Al instalar las librerías de Babel nos dio un conflicto de versiones. Lo arreglamos borrando `node_modules` y `package-lock.json` y volviendo a instalar.
- Las pruebas fallaban con el error **"React is not defined"**. Se arregló poniendo `runtime: 'automatic'` en la configuración de Babel.
- Webpack no encontraba los archivos `.js` porque el proyecto tiene `"type": "module"`. Lo solucionamos con `fullySpecified: false` en el `karma.conf.cjs`.
- Al principio la cobertura salía vacía, así que agregamos `babel-plugin-istanbul` para que se pudiera medir.

## Limitaciones

Como el proyecto es solo frontend, las cuentas, la sesión, los favoritos y lo que edita el administrador se guardan en el `localStorage` del navegador. O sea, no es una seguridad real y los datos no se comparten entre computadores.

## Integrantes

- Carlos Miranda
- Franco Fernandez
- Sergio Torres
