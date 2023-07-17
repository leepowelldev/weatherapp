import React from 'react';
import { Text } from 'react-native';
import { Layout } from '../components';
import { Link } from '@react-navigation/native';
import { routes } from '../router';
import { buildLink } from '../utils/links';

export function HomeScreen(): JSX.Element {
  return (
    <Layout>
      <Text>Home</Text>
      <Link to={buildLink(routes.forecast)}>Forecast</Link>
    </Layout>
  );
}
