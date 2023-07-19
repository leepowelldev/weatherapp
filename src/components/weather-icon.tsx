import React from 'react';
import { Image } from 'react-native';
import { weatherCodeToIconMap } from '../weather-code-to-icon-map';

export type WeatherIconProps = {
  code: number;
};

export function WeatherIcon({ code }: WeatherIconProps) {
  const icon = weatherCodeToIconMap[code];

  if (!icon) {
    return null;
  }

  return <Image source={icon.src} alt={icon.alt} />;
}
