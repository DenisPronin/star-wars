import { ICharacterListResponse } from 'interfaces';
import { queryGet } from './apiConfig';

export function apiCharactersLoadPage(page: number): Promise<ICharacterListResponse> {
  return queryGet<ICharacterListResponse>(`/people/?page=${page}`);
}

export function apiCharactersLoadItem(id: string) {
  return queryGet(`/people/${id}/`);
}
