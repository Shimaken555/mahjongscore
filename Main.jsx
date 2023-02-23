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

import {Title} from './src/component/title';
import {FourRule} from './src/component/fourRule';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TotalScoreSheet} from './src/component/totalScoreSheet';
import {HistoryRoom} from './src/component/historyRoom/historyRoom';
import {HistoryScoreSheet} from './src/component/historyRoom/historyScoreSheet';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    // <SafeAreaView>
    //   <View>
    //     <Text>麻雀アプリ</Text>
    //   </View>
    //   <AppNavigator />
    // </SafeAreaView>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen
          name="Title"
          component={Title}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FourRule"
          component={FourRule}
          options={{title: '４人麻雀ルール', headerShown: false}}
        />
        <Stack.Screen
          name="ScoreSheet"
          component={TotalScoreSheet}
          options={{title: 'スコアシート', headerShown: false}}
        />
        <Stack.Screen
          name="HistoryRoom"
          component={HistoryRoom}
          options={{title: '履歴', headerShown: false}}
        />
        <Stack.Screen
          name="HistoryScoreSheet"
          component={HistoryScoreSheet}
          options={{title: 'スコアシート', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
