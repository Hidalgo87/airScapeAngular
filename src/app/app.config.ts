import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Importar el proveedor de animaciones
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(), // Añadir animaciones al conjunto de proveedores
  ],
};
