import {useHeaderHeight} from '@react-navigation/elements';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
import {
  Channel,
  Chat,
  Thread,
  useOverlayContext,
} from 'stream-chat-react-native';

import {AppContext} from '../AppContext';
import {useStreamChat} from '../useStreamChat';
import type {
  LocalAttachmentType,
  LocalChannelType,
  LocalCommandType,
  LocalEventType,
  LocalMessageType,
  LocalReactionType,
  LocalUserType,
} from '../types';
import {NavigationParametersList} from '../Navigation';

interface ThreadScreenProps {
  navigation: StackNavigationProp<NavigationParametersList, 'Thread'>;
  route: RouteProp<NavigationParametersList, 'Thread'>;
}

export const ThreadScreen: React.FC<ThreadScreenProps> = ({
  navigation,
}: ThreadScreenProps) => {
  const {channel, setThread, thread} = useContext(AppContext);
  const [gestureEnabled, setGestureEnabled] = useState(false);
  const headerHeight = useHeaderHeight();
  const {overlay} = useOverlayContext();
  const {client, i18nInstance} = useStreamChat();

  useEffect(() => {
    setGestureEnabled(Platform.OS === 'ios' && overlay === 'none');
  }, [overlay]);

  navigation.setOptions({
    gestureEnabled,
  });
  return (
    <SafeAreaView>
      <Chat client={client} i18nInstance={i18nInstance}>
        <Channel
          channel={channel as any}
          keyboardVerticalOffset={headerHeight}
          thread={thread}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <Thread<
              LocalAttachmentType,
              LocalChannelType,
              LocalCommandType,
              LocalEventType,
              LocalMessageType,
              LocalReactionType,
              LocalUserType
            >
              onThreadDismount={() => {
                setThread(null);
              }}
            />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};
