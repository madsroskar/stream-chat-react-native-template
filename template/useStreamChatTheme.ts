import {useEffect, useState} from 'react';
import {type ColorSchemeName, useColorScheme} from 'react-native';
import type {DeepPartial, Theme} from 'stream-chat-react-native';

type ColorScheme = 'dark' | 'light';

const darkThemeColors = {
  accent_blue: '#005FFF',
  accent_green: '#20E070',
  accent_red: '#FF3742',
  bg_gradient_end: '#101214',
  bg_gradient_start: '#070A0D',
  black: '#FFFFFF',
  blue_alice: '#00193D',
  border: '#141924',
  grey: '#7A7A7A',
  grey_gainsboro: '#2D2F2F',
  grey_whisper: '#1C1E22',
  icon_background: '#FFFFFF',
  modal_shadow: '#000000',
  overlay: '#00000066', // 66 = 40% opacity
  overlay_dark: '#FFFFFFCC', // CC = 80% opacity
  shadow_icon: '#00000080', // 80 = 50% opacity
  targetedMessageBackground: '#302D22',
  transparent: 'transparent',
  white: '#101418',
  white_smoke: '#13151B',
  white_snow: '#070A0D',
};

const lightThemeColors = {
  accent_blue: '#005FFF',
  accent_green: '#20E070',
  accent_red: '#FF3742',
  bg_gradient_end: '#F7F7F7',
  bg_gradient_start: '#FCFCFC',
  black: '#000000',
  blue_alice: '#E9F2FF',
  border: '#00000014', // 14 = 8% opacity; top: x=0, y=-1; bottom: x=0, y=1
  grey: '#7A7A7A',
  grey_gainsboro: '#DBDBDB',
  grey_whisper: '#ECEBEB',
  icon_background: '#FFFFFF',
  modal_shadow: '#00000099', // 99 = 60% opacity; x=0, y= 1, radius=4
  overlay: '#00000033', // 33 = 20% opacity
  overlay_dark: '#00000099', // 99 = 60% opacity
  shadow_icon: '#00000040', // 40 = 25% opacity; x=0, y=0, radius=4
  targetedMessageBackground: '#FBF4DD', // Dark mode = #302D22
  transparent: 'transparent',
  white: '#FFFFFF',
  white_smoke: '#F2F2F2',
  white_snow: '#FCFCFC',
};

const useCustomChatTheme = (colorScheme: ColorSchemeName) => ({
  colors: colorScheme === 'dark' ? darkThemeColors : lightThemeColors,

  imageGallery: {
    blurType: colorScheme ?? 'dark',
  },

  spinner: {
    height: 15,
    width: 15,
  },
});

export const useStreamChatTheme = (): {
  theme: DeepPartial<Theme>;
  isDarkMode: boolean;
} => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    setColorScheme(systemColorScheme ?? 'dark');
  }, [systemColorScheme]);

  return {
    theme: useCustomChatTheme(colorScheme),
    isDarkMode: colorScheme === 'dark',
  };
};
