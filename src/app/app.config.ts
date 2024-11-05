import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Importar el proveedor de animaciones
import { routes } from './app.routes';
import { authInterceptor } from './auth/interceptors/auth-interceptor.interceptor';
import { loadingInterceptor } from './layout/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(), // Añadir animaciones al conjunto de proveedores
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
  ],
};
