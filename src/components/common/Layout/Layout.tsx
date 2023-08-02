import { Layout as AntLayout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'media/darth-vader.svg';
import styles from './Layout.module.css';

const { Header, Content } = AntLayout;

export function Layout({ children }: {
  children: any;
}) {
  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <Link to="/" className={styles.headerLink}>
          <Logo width={56} />
          Star Wars Characters
        </Link>
      </Header>
      <Content className={styles.content}>
        {children}
      </Content>
    </AntLayout>
  );
}
