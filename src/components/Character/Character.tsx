import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Select, Spin } from 'antd';
import { IGender, IUnknownValues, useAppDispatch } from 'interfaces';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { characterLoad } from '../../store/Characters/Characters.actions';
import { ICharacterSelectedState } from '../../store/Characters/Characters.reducer';
import { selectCharacterSelectedModel } from '../../store/Characters/Characters.selectors';

export function Character() {
  const dispatch = useAppDispatch();
  const { characterId } = useParams();
  const characterModel: ICharacterSelectedState = useSelector(selectCharacterSelectedModel);

  useEffect(() => {
    dispatch(characterLoad(characterId));
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
    <div>
      <Form
        labelCol={{ xs: { span: 24 }, sm: { span: 3 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 21 } }}
        initialValues={characterModel.data}
      >
        <Form.Item
          label="Name"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
        >
          <Select placeholder="select your gender">
            {Object.keys(IGender).map((gender) => (
              <Select.Option value={gender} key={gender}>
                {gender}
              </Select.Option>
            ))}
            {Object.keys(IUnknownValues).map((value) => (
              <Select.Option value={value} key={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Birth year"
          name="birth_year"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Eye color"
          name="eye_color"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hair color"
          name="hair_color"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Skin color"
          name="skin_color"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Height"
          name="height"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Mass"
          name="mass"
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </div>
  );
}
