/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SectionList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Title} from './src/component/title';
import {FourRule} from './src/component/fourRule';
import {ThreeRule} from './src/component/threeRule';
import {NavigationContainer} from '@react-navigation/native';
import {TotalScoreSheet} from './src/component/totalScoreSheet';

import Main from './Main';
import {PointProvider} from './src/Providers/mahjongProvider';

const App = () => {
  return (
    // <SafeAreaView>
    //   <View>
    //     <Text>麻雀アプリ</Text>
    //   </View>
    //   <AppNavigator />
    // </SafeAreaView>
    <PointProvider>
      <Main />
    </PointProvider>
  );
};

export default App;
