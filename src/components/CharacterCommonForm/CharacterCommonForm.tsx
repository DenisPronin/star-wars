import { Button, Col, Form, Input, InputNumber, notification, Row, Select } from 'antd';
import { ICharacter, IGender, IUnknownValues, useAppDispatch } from 'interfaces';
import React, { useCallback } from 'react';
import { characterEditFinish } from '../../store/Characters/Characters.actions';
import styles from './CharacterCommonForm.module.css';

export function CharacterCommonForm({ characterData }: {
  characterData: ICharacter;
}) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = useCallback((values: Partial<ICharacter>) => {
    dispatch(characterEditFinish({
      ...characterData,
      ...values,
    }));
    api.success({
      message: 'Saved!',
      placement: 'bottomRight',
    });
  }, [dispatch, characterData]);

  return (
    <Row className={styles.container}>
      <Col lg={12} md={24} sm={24} xs={24}>
        {contextHolder}
        <Form
          form={form}
          layout="vertical"
          initialValues={characterData}
          scrollToFirstError
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input character name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
          >
            <Select placeholder="select your gender">
              {Object.values(IGender).map((gender) => (
                <Select.Option value={gender} key={gender}>
                  {gender}
                </Select.Option>
              ))}
              {Object.values(IUnknownValues).map((value) => (
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

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!form.isFieldsTouched()}
              >
                Save
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
