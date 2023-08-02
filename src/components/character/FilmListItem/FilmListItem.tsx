import { VideoCameraOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { IFilm } from 'interfaces';
import React from 'react';

export function FilmListItem({ data }: {
  data: IFilm;
}) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar size="large" shape="square" icon={<VideoCameraOutlined />} />
        }
        title={data.title}
        description={(
          <>
            <div>
              Episode:
              {' '}
              {data.episode_id}
            </div>
            <div>
              Released:
              {' '}
              {data.release_date}
            </div>
            <div>
              Directed by:
              {' '}
              {data.director}
            </div>
          </>
        )}
      />
    </List.Item>
  );
}
