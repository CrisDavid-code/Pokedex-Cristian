Autor: Cristian David Aguilar

Pokédex App

¡Bienvenido a la Pokédex App! 
Esta aplicación permite explorar una lista de Pokémon, consultar detalles, buscar por nombre, filtrar por tipos y agregar favoritos. La aplicación utiliza la PokéAPI para obtener datos actualizados.

- Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalados:

Node.js (versión 16 o superior).
npm (incluido con Node.js).

- Instrucciones de Instalación

1. Clona el repositorio o descarga el código:

git clone <URL-DEL-REPOSITORIO>
cd pokemon-app

2. Instala las dependencias:

npm install
Si encuentras problemas de dependencias, usa:

npm install --legacy-peer-deps.

- Ejecutar el Proyecto

1. Modo desarrollo:

Ejecuta el comando:

npm start
Esto abrirá la aplicación en el navegador (generalmente en http://localhost:3000).

2. Si deseas usar otro puerto:

Abre el archivo package.json y modifica los scripts:

"scripts": {
  "start": "PORT=3003 react-scripts start"
}

Luego, ejecuta nuevamente npm start

- Estructura del Proyecto

src/
├── components/   # Componentes reutilizables como Navbar y tarjetas
│   ├── Navbar.js
│   ├── Pagination.js
│   ├── PokemonCard.js
│   └── FavoritesButton.js
├── pages/ # Páginas principales
│   ├── Home.js
│   ├── Favorites.js
│   └── PokemonDetails.js
├── services/ # Funciones para consumir la API
│   └── api.js
├── styles/   # Estilos CSS
│   ├── Home.css
│   ├── Favorites.css
│   └── PokemonDetails.css
└── App.js # Configuración principal de rutas

- Características Principales

1. Página Principal:

Lista de Pokémon con imágenes y nombres.
Filtros dinámicos por tipo de Pokémon.
Barra de búsqueda para buscar por nombre.
Paginación para navegar entre Pokémon.

2. Página de Detalles:

Información detallada sobre cada Pokémon (habilidades, estadísticas, tipos, evoluciones).
Gráficos interactivos para mostrar estadísticas (usando Chart.js).

3. Página de Favoritos:

Agrega Pokémon a favoritos y almacena datos en localStorage.
Elimina Pokémon de favoritos.

4. Diseño Responsivo:

La aplicación se adapta a diferentes tamaños de pantalla.

- Problemas Comunes

1. Error con Chart.js: Si aparece un error relacionado con category, asegúrate de registrar las escalas al importar Chart.js:

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

2. Problemas con dependencias: Usa el comando npm install --legacy-peer-deps para resolver conflictos.

3. Error de red: Asegúrate de estar conectado a internet para consumir la PokéAPI.

- Construcción para Producción

Para preparar la aplicación para producción:

npm run build

Esto generará una carpeta build/ lista para desplegar en cualquier servidor.

- Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:

git checkout -b feature-nueva-funcionalidad

3. Realiza tus cambios y haz commit:

git commit -m "Agrega nueva funcionalidad"

4. Haz push de tu rama:

git push origin feature-nueva-funcionalidad

5. Abre un Pull Request.

MIT License

Copyright (c) [2024] 
[Cristian David Aguilar]

Se otorga permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y los archivos de documentación asociados (el "Software"), para tratar el Software sin restricciones, incluidos, entre otros, los derechos de usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software, y para permitir a las personas a quienes se les proporcione el Software hacerlo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O DE OTRO MODO, QUE SURJA DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
