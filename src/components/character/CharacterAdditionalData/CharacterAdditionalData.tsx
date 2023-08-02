import { LoadingOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { ICharacterListKey, useAppDispatch } from 'interfaces';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { characterLoadAdditionalData } from '../../../store/Characters/Characters.actions';
import { selectCharacterAdditionalData } from '../../../store/Characters/Characters.selectors';
import { FilmListItem } from '../FilmListItem/FilmListItem';
import { StarshipListItem } from '../StarshipListItem/StarshipListItem';

type IDataMap = {
  [key in ICharacterListKey]?: Function;
};

const DataMap: IDataMap = {
  films: FilmListItem,
  starships: StarshipListItem,
};

export function CharacterAdditionalData({ listKey }: {
  listKey: ICharacterListKey;
}) {
  const dispatch = useAppDispatch();
  const model = useSelector(selectCharacterAdditionalData(listKey));

  useEffect(() => {
    dispatch(characterLoadAdditionalData(listKey));
  }, [dispatch, listKey]);

  if (!model) {
    return null;
  }

  return (
    <List
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
