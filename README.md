# airScape Deliver Branch: segunda_entrega

## Indicaciones Técnicas

### ¿Dónde poner las credenciales de supabase?

En la ruta src/environments/environment.ts se encuentra la siguiente definición:

export const environment = {
supabaseConfig: {
url: 'your_project_url',
apikey:
'your_supabase_api_key',
},
};

Por favor, crear en la carpeta src/environments un archivo llamado: environment.development.ts con la misma estructura y credenciales dada en el .txt entregado de Uvirtual.

### Tailwind y librerías de componentes

Usamos tailwind para los estilos y una librería de componentes llamada PrimeNG (https://primeng.org/).

Toda etiqueta en _html_ que inicie con _<p-_ hace parte de ésta librería. Específicamente, los usamos para los / sliders / calendario / dropdown /

### Propiedades quemadas

En app.component.ts hay un proceso que sube unas propiedades quemadas a su localStorage, por lo que recomendamos verificar que en su localStorage no haya una clave 'listings' antes de iniciar la aplicación para que las propiedades se puedan subir correctamente. Como aún carecemos de retroalimentación de usuarios, la calificación a una propiedad se asigna aleatoriamente.

### Búsqueda usando API

En el apartado de búsqueda se está usando un API, que nos indica la longitud y latitud de una ciudad ingresada. Acá un ejemplo (https://nominatim.openstreetmap.org/search?q=bogota&format=json&limit=1&accept-language=en-US).

Con la longitud y latitud de la ciudad, podemos filtrar todas las propiedades en un radio cercano.

## Indicaciones Prácticas

### Recomendaciones para buscar

Para la búsqueda, hay propiedades ubicadas en: Medellín, Cali y Cartagena.

### Búsqueda no toma en cuenta la fecha

La fecha de llegada y salida se puede ingresar como filtro de búsqueda, sin embargo, no está funcional el filtrado por fecha porque aún no existen propiedades reservadas, entonces todas las propiedades pasan a estar disponibles en cualquier fecha.
