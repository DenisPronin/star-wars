import { Layout as AntLayout } from 'antd';
import React from 'react';
import styles from './Layout.module.css';

const { Header, Content } = AntLayout;

export function Layout({ children }: {
  children: any;
}) {
  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        Star Wars Characters
      </Header>
      <Content className={styles.content}>
        {children}
      </Content>
    </AntLayout>
  );
}
