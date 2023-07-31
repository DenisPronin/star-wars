import { NotAvailable, Nullish, Unknown } from './Utils.interface';

export type IApiUrl = string;

export enum IGender {
  Male = 'male',
  Female = 'female',
}

export interface ICharacter {
  created: string;
  edited: string;
  gender: IGender | NotAvailable | Unknown;
  birth_year: string | Unknown;
  eye_color: string | NotAvailable | Unknown;
  hair_color: string | NotAvailable | Unknown;
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
