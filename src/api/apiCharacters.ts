import { queryGet } from './apiConfig';

export function apiCharactersLoadPage() {
  return queryGet('/people/');
}

export function apiCharactersLoadItem(id: string) {
  return queryGet(`/people/${id}`);
}
