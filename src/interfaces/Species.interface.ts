import { IApiUrl } from './Utils.interface';

export interface ISpecies {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: IApiUrl;
  language: string;
  name: string;
  people: IApiUrl[];
  films: IApiUrl[];
  skin_colors: string;
  url: IApiUrl;
}
