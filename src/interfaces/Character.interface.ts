import { IUnknownValues, Nullish } from './Utils.interface';

export type IApiUrl = string;

export enum IGender {
  Male = 'male',
  Female = 'female',
}

export type ICharacterListKey = 'films' | 'species' | 'starships' | 'vehicles';

export interface ICharacter {
  created: string;
  edited: string;
  gender: IGender | IUnknownValues;
  birth_year: string | IUnknownValues.Unknown;
  eye_color: string | IUnknownValues;
  hair_color: string | IUnknownValues;
  skin_color: string;
  height: string;
  mass: string;
  name: string;
  url: IApiUrl;
  homeworld: IApiUrl;
  films: IApiUrl[];
  species: IApiUrl[];
  starships: IApiUrl[];
  vehicles: IApiUrl[];
}

export interface ICharacterListResponse {
  count: number;
  next: Nullish<IApiUrl>;
  previous: Nullish<IApiUrl>;
  results: ICharacter[];
}
