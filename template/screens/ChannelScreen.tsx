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
import type {
  LocalAttachmentType,
  LocalChannelType,
  LocalCommandType,
  LocalEventType,
  LocalMessageType,
  LocalReactionType,
  LocalUserType,
} from '../types';
import {NavigationParametersList} from '../App';
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

  /**
   * TODO: The `as any` assertion on `channel` is a result
   * of the type definition in stream-chat not being permissibe
   * enough for the local type here.
   *
   * An issue is created for this.
   * */
  return (
    <Chat client={client} i18nInstance={i18nInstance}>
      <Channel
        channel={channel as any}
        keyboardVerticalOffset={headerHeight}
        thread={selectedThread}>
        <View style={{flex: 1}}>
          <MessageList<
            LocalAttachmentType,
            LocalChannelType,
            LocalCommandType,
            LocalEventType,
            LocalMessageType,
            LocalReactionType,
            LocalUserType
          >
            onThreadSelect={(thread: any) => {
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
