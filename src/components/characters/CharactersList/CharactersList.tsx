import { LoadingOutlined } from '@ant-design/icons';
import { Col, Input, List, Pagination, Row } from 'antd';
import { ICharacter, useAppDispatch } from 'interfaces';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIdFromSWApiUrl } from 'utils/url';
import { characterLoadList, characterSelectedLoaded } from '../../../store/Characters/Characters.actions';
import { selectCharactersModel } from '../../../store/Characters/Characters.selectors';
import { CharactersListItem } from '../CharactersListItem/CharactersListItem';
import styles from './CharactersList.module.css';

export function CharactersList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const charactersModel = useSelector(selectCharactersModel);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSearch = useCallback((value: string) => {
    dispatch(characterLoadList(1, value));
  }, [dispatch]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(characterLoadList(page, searchValue));
  }, [dispatch, searchValue]);

  const handleSelectCharacter = useCallback((character: ICharacter) => {
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
            disabled={charactersModel.isLoading}
            allowClear
            enterButton="Search"
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
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
        renderItem={(character) => (
          <CharactersListItem
            character={character}
            onSelect={handleSelectCharacter}
          />
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
