import React from 'react';
import {useStreamChatTheme} from './useStreamChatTheme';
import {
  DarkTheme as DarkNavigationTheme,
  DefaultTheme as LightNavigationTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {ChannelListScreen, ChannelScreen, ThreadScreen} from './screens';
import {createStackNavigator} from '@react-navigation/stack';

export interface NavigationParametersList {
  [key: string]: undefined;
  Channel: undefined;
  ChannelList: undefined;
  Thread: undefined;
}

export const Stack = createStackNavigator<NavigationParametersList>();

export function Navigation() {
  const {theme, isDarkMode} = useStreamChatTheme();

  const themeBase = isDarkMode ? DarkNavigationTheme : LightNavigationTheme;

  return (
    <NavigationContainer
      theme={{
        colors: {
          ...themeBase.colors,
          background: theme.colors?.white_snow ?? themeBase.colors.background,
        },

        dark: isDarkMode,
      }}>
      <Stack.Navigator
        initialRouteName="ChannelList"
        screenOptions={{
          headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
        }}>
        <Stack.Screen component={ChannelScreen} name="Channel" />
        <Stack.Screen
          component={ChannelListScreen}
          name="ChannelList"
          options={{headerTitle: 'Channel List'}}
        />
        <Stack.Screen
          component={ThreadScreen}
          name="Thread"
          options={() => ({headerLeft: () => <></>})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
