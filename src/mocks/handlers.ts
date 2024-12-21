import ingredients from './ingredients.json';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/ingredients', () => HttpResponse.json(ingredients))
];
