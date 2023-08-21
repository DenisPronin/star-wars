import { LoadingOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { ICharacterListKey, IFilm, ISpecies, IStarship, IVehicle, useAppDispatch } from 'interfaces';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { characterLoadAdditionalData } from '../../../store/Characters/Characters.actions';
import { IAdditionalDataByKey } from '../../../store/Characters/Characters.reducer';
import { selectCharacterAdditionalData } from '../../../store/Characters/Characters.selectors';
import { FilmListItem } from '../FilmListItem/FilmListItem';
import { SpeciesListItem } from '../SpeciesListItem/SpeciesListItem';
import { StarshipListItem } from '../StarshipListItem/StarshipListItem';
import { VehicleListItem } from '../VehicleListItem/VehicleListItem';

type IDataMap = {
  [key in ICharacterListKey]?: Function;
};

const DataMap: IDataMap = {
  films: FilmListItem,
  starships: StarshipListItem,
  vehicles: VehicleListItem,
  species: SpeciesListItem,
};

export function CharacterAdditionalData({ listKey }: {
  listKey: ICharacterListKey;
}) {
  const dispatch = useAppDispatch();
  const model: IAdditionalDataByKey | undefined = useSelector(
    selectCharacterAdditionalData(listKey),
  );

  useEffect(() => {
    dispatch(characterLoadAdditionalData(listKey));
  }, [dispatch, listKey]);

  if (!model) {
    return null;
  }

  return (
    <List<IFilm | IStarship | IVehicle | ISpecies>
      dataSource={model.data}
      loading={{
        size: 'large',
        spinning: model.isLoading,
        indicator: <LoadingOutlined spin />,
      }}
      renderItem={(item) => {
        const Component = DataMap[listKey];
        if (!Component) {
          return null;
        }

        return (
          <Component data={item} />
        );
      }}
    />
  );
}
