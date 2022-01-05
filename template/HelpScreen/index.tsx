import React, {ReactChildren, ReactElement} from 'react';
import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const HelpScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const line = '='.repeat(20);
  console.log(`
${line}
Read our documentation:
https://getstream.io/chat/docs/sdk/reactnative/
${line}`);
  return (
    <SafeAreaProvider style={{backgroundColor: '#070A0D'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./mark.png')} />
          <Text
            style={[
              styles.headerText,
              {
                color: isDarkMode ? '#000000' : '#FFFFFF',
              },
            ]}>
            Welcome 👋
          </Text>
        </View>
        <Section title="Getting started">
          Please follow the steps described in the README.md file
        </Section>
        <Section title="Read the documentation">
          The URL to our documentation has been logged to your console.
        </Section>
      </View>
    </SafeAreaProvider>
  );
};

interface SectionProps {
  children?: ReactChildren | string;
  title: string;
}
function Section({children, title}: SectionProps): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? '#000000' : '#FFFFFF',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionContent,
          {
            color: isDarkMode ? '#000000' : '#FFFFFF',
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},

  header: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'flex-start',
  },

  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },

  sectionTitle: {
    fontSize: 25,
    textAlign: 'left',
  },

  sectionContent: {
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: 5,
    fontSize: 18,
  },
});
