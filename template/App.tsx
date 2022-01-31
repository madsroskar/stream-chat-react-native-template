import React, {ReactElement} from 'react';
import Config from 'react-native-config';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {OverlayProvider} from 'stream-chat-react-native';

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
import {Navigation} from './Navigation';

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
