
import ingredients from './ingredients.json';
import {http, HttpResponse} from 'msw'

export const handlers = [
  http.get('/api/ingredients', () => {
    return HttpResponse.json(ingredients);
  })
];

