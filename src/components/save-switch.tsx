import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Switch, SwitchProps, Text } from 'react-native-paper';

export type SaveSwitchProps = Omit<SwitchProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
};

export function SaveSwitch({ style, ...props }: SaveSwitchProps) {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>Save</Text>
      <Switch {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginRight: 10,
    fontWeight: 'bold',
  },
});
