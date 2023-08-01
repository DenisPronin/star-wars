import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Input, List, Pagination, Row } from 'antd';
import { ICharacter, useAppDispatch } from 'interfaces';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { characterLoadList, characterSelectedLoaded } from '../../store/Characters/Characters.actions';
import { selectCharactersModel } from '../../store/Characters/Characters.selectors';
import { getIdFromSWApiUrl } from '../../utils/url';
import styles from './CharactersList.module.css';

export function CharactersList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const handleSelectCharacter = useCallback((character: ICharacter) => () => {
    const id = getIdFromSWApiUrl(character.url);
    dispatch(characterSelectedLoaded(character));
    navigate(`/characters/${id}`);
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(characterLoadList(1));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Row>
        <Col md={12}>
          <Input.Search
            placeholder="Search character by name"
            loading={charactersModel.isLoading}
            disabled={charactersModel.isLoading}
            onSearch={handleSearch}
            onChange={handleSearchInputChangeDebounced}
          />
        </Col>
      </Row>

      <List
        className={styles.list}
        dataSource={charactersModel.list}
        loading={{
          size: 'large',
          spinning: charactersModel.isLoading,
          indicator: <LoadingOutlined spin />,
        }}
        renderItem={(item) => (
          <List.Item onClick={handleSelectCharacter(item)}>
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

      <Pagination
        total={charactersModel.count}
        pageSize={charactersModel.perPage}
        current={charactersModel.page}
        showSizeChanger={false}
        disabled={charactersModel.isLoading}
        onChange={handlePageChange}
      />
    </div>
  );
}
