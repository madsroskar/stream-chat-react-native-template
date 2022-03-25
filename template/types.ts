import type {ThreadContextValue} from 'stream-chat-react-native';
import type {Channel as ChannelType, StreamChat} from 'stream-chat';

export type StreamChatTypes = {
  attachmentType: {};
  channelType: {};
  commandType: '';
  eventType: {};
  messageType: {};
  reactionType: {};
  userType: {
    id: string;
  };
};

export type Channel<T> = ChannelType<
  T extends StreamChatTypes ? T : StreamChatTypes
>;

export type Thread = ThreadContextValue<StreamChatTypes>['thread'];

export type Client<T> = StreamChat<
  T extends StreamChatTypes ? T : StreamChatTypes
>;
