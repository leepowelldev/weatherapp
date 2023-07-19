import React from 'react';
import { Text } from 'react-native';
import { SearchDetailScreenProps } from '../router';

export type SearchDetailScreenParams = {
  location: string;
};

export function SearchDetailScreen({ route }: SearchDetailScreenProps) {
  return <Text>{route.params.location}</Text>;
}
