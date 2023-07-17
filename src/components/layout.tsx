import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

export type LayoutProps = SafeAreaViewProps;

export function Layout({
  children,
  style,
  ...props
}: LayoutProps): JSX.Element {
  return (
    <SafeAreaView
      style={[styles.root, style]}
      edges={['left', 'right', 'bottom']}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
