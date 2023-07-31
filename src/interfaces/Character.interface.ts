import { Nullish } from './Utils.interface';

export type IApiUrl = string;

export enum IGender {
  Male = 'male',
  Female = 'female',
  NA = 'n/a',
}

export interface ICharacter {
  created: string;
  edited: string;
  gender: IGender;
  birth_year: string;
  eye_color: string;
  hair_color: string;
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
