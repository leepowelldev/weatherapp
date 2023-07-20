import React from 'react';
import {
  Button as RNPButton,
  ButtonProps as RNPButtonProps,
} from 'react-native-paper';

export type ButtonProps = RNPButtonProps;

export function Button(props: ButtonProps) {
  return <RNPButton {...props} mode="contained-tonal" />;
}
