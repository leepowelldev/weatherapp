import React from 'react';
import { StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

export type LocationsListProps = {
  locations: Array<string>;
  onLocationPress: (location: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function LocationsList({
  locations,
  onLocationPress,
  style,
}: LocationsListProps) {
  return (
    <ScrollView style={[styles.root, style]}>
      {locations.map((location) => (
        <Button
          key={location}
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => onLocationPress(location)}
        >
          {location}
        </Button>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    flex: 1,
  },
  button: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
  },
});
