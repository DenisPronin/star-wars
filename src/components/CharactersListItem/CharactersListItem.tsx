import { UserOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { ICharacter } from 'interfaces';
import React, { useCallback } from 'react';
import styles from '../CharactersList/CharactersList.module.css';

export function CharactersListItem({ character, onSelect }: {
  character: ICharacter;
  onSelect: (character: ICharacter) => void;
}) {
  const handleSelect = useCallback(() => {
    onSelect(character);
  }, [character, onSelect]);

  return (
    <List.Item className={styles.listItem} onClick={handleSelect}>
      <List.Item.Meta
        className={styles.listItemMeta}
        avatar={
          <Avatar size="large" icon={<UserOutlined />} />
        }
        title={(
          <div className={styles.listItemTitle}>
            {character.name}
          </div>
        )}
        description={(
          <div>
            Films:
            {' '}
            {character.films.length}
          </div>
        )}
      />
    </List.Item>
  );
}
