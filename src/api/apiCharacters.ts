import { ICharacter, ICharacterListResponse } from 'interfaces';
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

export function apiCharactersLoadItem(id: string): Promise<ICharacter> {
  return queryGet<ICharacter>(`/people/${id}/`);
}
