import React from 'react';
import { Text } from 'react-native';
import { Link } from '@react-navigation/native';
import { Layout } from '../components';
import { routes } from '../router';
import { buildLink } from '../utils/links';

export function ForecastScreen(): JSX.Element {
  return (
    <Layout>
      <Text>Forecast</Text>
      <Link to={buildLink(routes.home)}>Home</Link>
    </Layout>
  );
}
