import { IApiUrl } from './Utils.interface';

export interface IVehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: IApiUrl[];
  films: IApiUrl[];
  url: IApiUrl;
  vehicle_class: string;
}
