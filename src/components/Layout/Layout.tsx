import { Layout as AntLayout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const { Header, Content } = AntLayout;

export function Layout({ children }: {
  children: any;
}) {
  return (
    <AntLayout className={styles.layout}>
      <Header>
        <Link to="/" className={styles.headerLink}>
          Star Wars Characters
        </Link>
      </Header>
      <Content className={styles.content}>
        {children}
      </Content>
    </AntLayout>
  );
}
