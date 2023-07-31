import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Input, List, Row } from 'antd';
import { useAppDispatch } from 'interfaces';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { characterLoadList } from '../../store/Characters/Characters.actions';
import { selectCharactersModel } from '../../store/Characters/Characters.selectors';
import styles from './CharactersList.module.css';

export function CharactersList() {
  const dispatch = useAppDispatch();
  const charactersModel = useSelector(selectCharactersModel);

  const handleSearch = useCallback((value: string) => {
    dispatch(characterLoadList(1, value));
  }, [dispatch]);

  const handleSearchInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  }, [handleSearch]);

  const handleSearchInputChangeDebounced = useDebouncedCallback(
    handleSearchInputChange,
    300,
  );

  const handlePageChange = useCallback((page: number) => {
    dispatch(characterLoadList(page));
  }, [dispatch]);

  useEffect(() => {
    dispatch(characterLoadList(1));
  }, [dispatch]);

  return (
    <div>
      <Row>
        <Col md={12}>
          <Input.Search
            placeholder="Search character by name"
            onSearch={handleSearch}
            onChange={handleSearchInputChangeDebounced}
          />
        </Col>
      </Row>

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
          onChange: handlePageChange,
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
    </div>
  );
}
