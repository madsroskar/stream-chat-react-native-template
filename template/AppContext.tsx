import React, {type ReactElement, useState} from 'react';
import {Streami18n} from 'stream-chat-react-native';

import type {Channel, Thread} from './types';

export const useAppState = () => {
  const streami18n = new Streami18n({
    language: 'en',
  });
  const [channel, setChannel] = useState<Channel>();
  const [thread, setThread] = useState<Thread>();
  return {channel, setChannel, thread, setThread, streami18n};
};

interface AppContextType {
  channel: Channel | undefined;
  setChannel: React.Dispatch<Channel>;
  setThread: React.Dispatch<React.SetStateAction<Thread | undefined>>;
  thread: Thread | undefined;
  streami18n: Streami18n;
}

interface AppStateProviderProps {
  children?: ReactElement;
}

export function AppStateProvider({children}: AppStateProviderProps) {
  const state = useAppState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export const AppContext = React.createContext({} as AppContextType);
