import { GithubOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { ISpecies } from 'interfaces';
import React from 'react';

export function SpeciesListItem({ data }: {
  data: ISpecies;
}) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar size="large" shape="square" icon={<GithubOutlined />} />
        }
        title={data.name}
        description={(
          <>
            <div>
              Classification:
              {' '}
              {data.classification}
            </div>
            <div>
              Designation:
              {' '}
              {data.designation}
            </div>
            <div>
              Language:
              {' '}
              {data.language}
            </div>
          </>
        )}
      />
    </List.Item>
  );
}
