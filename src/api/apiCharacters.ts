import { ICharacterListResponse } from 'interfaces';
import { queryGet } from './apiConfig';

export function apiCharactersLoadPage(
  page: number,
  search?: string,
): Promise<ICharacterListResponse> {
  return queryGet<ICharacterListResponse>('/people/', {
    params: {
      page,
      search,
    },
  });
}

export function apiCharactersLoadItem(id: string) {
  return queryGet(`/people/${id}/`);
}
