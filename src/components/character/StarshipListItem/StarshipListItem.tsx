import { RocketOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { IStarship } from 'interfaces';
import React from 'react';

export function StarshipListItem({ data }: {
  data: IStarship;
}) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar size="large" shape="square" icon={<RocketOutlined />} />
        }
        title={data.name}
        description={data.model}
      />
    </List.Item>
  );
}
