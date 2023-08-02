import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Tabs } from 'antd';
import { useAppDispatch } from 'interfaces';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { characterLoad, characterReset } from '../../../store/Characters/Characters.actions';
import { ICharacterSelectedState } from '../../../store/Characters/Characters.reducer';
import { selectCharacterSelectedModel } from '../../../store/Characters/Characters.selectors';
import { CharacterAdditionalData } from '../CharacterAdditionalData/CharacterAdditionalData';
import { CharacterCommonForm } from '../CharacterCommonForm/CharacterCommonForm';
import styles from './Character.module.css';

export function Character() {
  const dispatch = useAppDispatch();
  const { characterId } = useParams();
  const characterModel: ICharacterSelectedState = useSelector(selectCharacterSelectedModel);

  useEffect(() => {
    dispatch(characterLoad(characterId));

    return () => {
      dispatch(characterReset());
    };
  }, [dispatch, characterId]);

  if (characterModel.isLoading) {
    return (
      <Spin size="large" indicator={<LoadingOutlined spin />} />
    );
  }

  if (!characterModel.data) {
    return (
      <div>
        404
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {characterModel.data.name}
      </div>

      <Tabs
        tabPosition="top"
        items={[{
          label: 'Common info',
          key: '1',
          children: (
            <CharacterCommonForm characterData={characterModel.data} />
          ),
        }, {
          label: 'Films',
          key: '2',
          children: (
            <CharacterAdditionalData listKey="films" />
          ),
        }, {
          label: 'Starships',
          key: '3',
          children: (
            <CharacterAdditionalData listKey="starships" />
          ),
        }, {
          label: 'Vehicles',
          key: '4',
          children: (
            <CharacterAdditionalData listKey="vehicles" />
          ),
        }]}
      />
    </div>
  );
}
