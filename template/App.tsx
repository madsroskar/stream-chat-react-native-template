import type {ReactElement} from 'react';
import React from 'react';
import Config from 'react-native-config';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  DarkTheme as DarkNavigationTheme,
  DefaultTheme as LightNavigationTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {OverlayProvider} from 'stream-chat-react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {HelpScreen} from './HelpScreen';
import type {
  LocalAttachmentType,
  LocalChannelType,
  LocalCommandType,
  LocalEventType,
  LocalMessageType,
  LocalReactionType,
  LocalUserType,
} from './types';
import {useStreamChatTheme} from './useStreamChatTheme';
import {AppStateProvider} from './AppContext';
import {useStreamChat} from './useStreamChat';
import {ChannelListScreen, ChannelScreen, ThreadScreen} from './screens';

interface ChannelRoute {
  Channel: undefined;
}
interface ChannelListRoute {
  ChannelList: undefined;
}
interface ThreadRoute {
  Thread: undefined;
}
export interface NavigationParametersList
  extends ChannelRoute,
    ChannelListRoute,
    ThreadRoute {
  [key: string]: undefined;
}
export const Stack = createStackNavigator<NavigationParametersList>();

function Navigation() {
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

interface AppOverlayProps {
  children?: ReactElement;
}

function AppOverlay({children}: AppOverlayProps) {
  const {theme} = useStreamChatTheme();
  const {i18nInstance} = useStreamChat();
  const {bottom} = useSafeAreaInsets();

  return (
    <OverlayProvider<
      LocalAttachmentType,
      LocalChannelType,
      LocalCommandType,
      LocalEventType,
      LocalMessageType,
      LocalReactionType,
      LocalUserType
    >
      bottomInset={bottom}
      i18nInstance={i18nInstance}
      value={{style: theme}}>
      {children}
    </OverlayProvider>
  );
}

function App() {
  if (isMissingConfiguration) {
    return <HelpScreen />;
  }

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <AppOverlay>
          <Navigation />
        </AppOverlay>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

const isMissingConfiguration =
  Config.STREAM_API_KEY === undefined ||
  Config.STREAM_USER_ID === undefined ||
  Config.STREAM_USER_TOKEN === undefined;

export default function () {
  return isMissingConfiguration ? <HelpScreen /> : <App />;
}
