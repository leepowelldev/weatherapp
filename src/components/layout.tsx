import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

export type LayoutProps = SafeAreaViewProps & {
  noScrollView?: boolean;
};

export function Layout({
  children,
  style,
  noScrollView = false,
  ...props
}: LayoutProps): JSX.Element {
  return (
    <SafeAreaView
      style={[styles.root, style]}
      edges={['left', 'right']}
      {...props}
    >
      {(() => {
        if (noScrollView) {
          return <View style={styles.container}>{children}</View>;
        }
        return (
          <ScrollView contentContainerStyle={styles.container} bounces={false}>
            {children}
          </ScrollView>
        );
      })()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
