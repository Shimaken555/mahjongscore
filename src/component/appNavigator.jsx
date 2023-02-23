import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  SectionList,
} from 'react-native';
import {Title} from './title';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const FourRule = () => {
  return (
    <TouchableOpacity>
      <View>
        <Text>4人麻雀のルール画面だお</Text>
      </View>
    </TouchableOpacity>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FourRule">
        <Stack.Screen
          name="Title"
          component={Title}
          options={{headerShown: false}}
        />
        <Stack.Screen name="FourRule" component={FourRule}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
