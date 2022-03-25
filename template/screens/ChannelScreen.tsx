import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from 'stream-chat-react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/elements';

import {AppContext} from '../AppContext';
import type {StreamChatTypes, Thread} from '../types';
import {NavigationParametersList} from '../Navigation';
import {useStreamChat} from '../useStreamChat';

interface ChannelScreenProps {
  navigation: StackNavigationProp<NavigationParametersList, 'Channel'>;
}

export const ChannelScreen: React.FC<ChannelScreenProps> = ({
  navigation,
}: ChannelScreenProps) => {
  const {channel, setThread, thread: selectedThread} = useContext(AppContext);
  const headerHeight = useHeaderHeight();
  const {setTopInset} = useAttachmentPickerContext();

  const {client, i18nInstance} = useStreamChat();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  if (channel === undefined) {
    return null;
  }

  return (
    <Chat client={client} i18nInstance={i18nInstance}>
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        thread={selectedThread}>
        <View style={{flex: 1}}>
          <MessageList<StreamChatTypes>
            onThreadSelect={(thread: Thread) => {
              setThread(thread);
              if (channel?.id) {
                navigation.navigate('Thread');
              }
            }}
          />
          <MessageInput />
        </View>
      </Channel>
    </Chat>
  );
};
