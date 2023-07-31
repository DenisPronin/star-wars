import { UserOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { useAppDispatch } from 'interfaces';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { characterLoadList } from '../../store/Characters/Characters.actions';
import { selectCharactersModel } from '../../store/Characters/Characters.selectors';
import styles from './CharactersList.module.css';

export function CharactersList() {
  const dispatch = useAppDispatch();
  const charactersModel = useSelector(selectCharactersModel);

  const onPageChange = useCallback((page: number) => {
    dispatch(characterLoadList(page));
  }, [dispatch]);

  useEffect(() => {
    dispatch(characterLoadList(1));
  }, [dispatch]);

  return (
    <List
      className={styles.list}
      pagination={{
        total: charactersModel.count,
        pageSize: charactersModel.perPage,
        current: charactersModel.page,
        showSizeChanger: false,
        position: 'bottom',
        align: 'start',
        disabled: charactersModel.isLoading,
        onChange: onPageChange,
      }}
      dataSource={charactersModel.list}
      loading={{
        size: 'large',
        spinning: charactersModel.isLoading,
        wrapperClassName: styles.listInner,
      }}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar size="large" icon={<UserOutlined />} />
            }
            title={<div>{item.name}</div>}
            description={<div>{item.birth_year}</div>}
          />
        </List.Item>
      )}
    />
  );
}
