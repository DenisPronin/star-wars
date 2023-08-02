import { CarOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { IVehicle } from 'interfaces';
import React from 'react';

export function VehicleListItem({ data }: {
  data: IVehicle;
}) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar size="large" shape="square" icon={<CarOutlined />} />
        }
        title={data.name}
        description={(
          <>
            <div>
              Model:
              {' '}
              {data.model}
            </div>
            <div>
              Made by:
              {' '}
              {data.manufacturer}
            </div>
          </>
        )}
      />
    </List.Item>
  );
}
