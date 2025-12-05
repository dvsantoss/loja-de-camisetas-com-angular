import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // para capturar erros
    provideZonelessChangeDetection(), // para melhorar performance
    provideRouter(routes, withComponentInputBinding()), // para configurar rotas
    provideHttpClient() // para fazer requisições HTTP
  ]
};
