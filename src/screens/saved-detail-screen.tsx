import React from 'react';
import { Text } from 'react-native';
import { Layout } from '../components';
import { SavedDetailScreenProps } from '../router';

export type SavedDetailScreenParams = {
  location: string;
};

export function SavedDetailScreen({
  route,
}: SavedDetailScreenProps): JSX.Element {
  return (
    <Layout>
      <Text>{route.params.location}</Text>
    </Layout>
  );
}
