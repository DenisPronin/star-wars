import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export function PageNotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      icon={<div>test</div>}
      extra={(
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      )}
    />
  );
}
