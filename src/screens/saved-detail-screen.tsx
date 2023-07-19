import React from 'react';
import { Text } from 'react-native';
import { Layout } from '../components';

export type SavedDetailScreenParams = {
  location: string;
};

export function SavedDetailScreen(): JSX.Element {
  return (
    <Layout>
      <Text>Saved Detail</Text>
    </Layout>
  );
}
