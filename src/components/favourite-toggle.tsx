import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export type FavouriteToggleProps = {
  value?: boolean;
  onToggle?: (nextValue: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function FavouriteToggle({
  value = false,
  onToggle: onValueChange,
  style,
}: FavouriteToggleProps) {
  return (
    <TouchableOpacity
      style={[styles.root, style]}
      onPress={() => onValueChange?.(!value)}
      accessible
      accessibilityLabel="Save to favourites"
    >
      <Icon name={value ? 'heart' : 'hearto'} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
    color: 'red',
  },
});
