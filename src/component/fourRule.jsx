import {
  TouchableHighlight,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  image,
  View,
  TextInput,
  Image,
} from 'react-native';
import {FC, useState, useCallback, useRef} from 'react';

import {usePoint} from '../Providers/mahjongProvider';
import {HeaderComponent} from './headerComponent';

export const FourRule = ({navigation}) => {
  const [basePoint, setBasePoint] = useState(25000);
  const [returnPoint, setReturnPoint] = useState(30000);

  const [rankPointA, setRankPointA] = useState(20);
  const [rankPointB, setRankPointB] = useState(10);

  const [underPoint, setUnderPoint] = useState(10);

  const {
    createRule,
    deleteRule,
    setIsRuleDone,
    points,
    tableScores,
    gameTotalScore,
  } = usePoint();

  console.log(gameTotalScore);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const onPressReturnPoint = returnPoint => {
    setReturnPoint(returnPoint);
  };

  const RoomNumber = points.length > 0 ? points[0].RoomNumber + 1 : 1;

  const onPressRule = () => {
    createRule(
      basePoint,
      returnPoint,
      rankPointA,
      rankPointB,
      underPoint,
      RoomNumber,
    );
  };

  // console.log(points);

  return (
    <ScrollView style={styles.fourRuleScreen}>
      <HeaderComponent navigation={navigation} title="ルール設定" />
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleImage}>
            <Image
              style={{
                width: 33,
                height: 44,
              }}
              source={require('../img/1sou2.jpeg')}
            />
          </View>
          <View style={styles.titleTextView}>
            <Text style={styles.titleText}>持ち点</Text>
          </View>
          <View style={styles.titleTextInputView}>
            <TextInput
              maxLength={5}
              style={styles.TextInput}
              keyboardType="numeric"
              // onChangeText={text => setBasePoint(parseInt(text) * 100)}
              onChangeText={text => setBasePoint(parseInt(text))}
              defaultValue="25000"
              returnKeyType={'done'}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.titleImage}>
            <Image
              style={{
                width: 33,
                height: 44,
              }}
              source={require('../img/2sou2.jpeg')}
            />
          </View>
          <View style={styles.titleTextView}>
            <Text style={styles.titleText}>返し点</Text>
          </View>
          <View style={styles.titleTextInputView}>
            <TextInput
              maxLength={5}
              style={styles.TextInput}
              keyboardType="numeric"
              // value={parseInt(basePoint)}
              // onChangeText={text => onPressReturnPoint(parseInt(text) * 100)}
              onChangeText={text => onPressReturnPoint(parseInt(text))}
              defaultValue="30000"
              returnKeyType={'done'}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.titleImage}>
            <Image
              style={{
                width: 33,
                height: 44,
              }}
              source={require('../img/3sou2.jpeg')}
            />
          </View>
          <View style={styles.titleTextView}>
            <Text style={styles.titleText}>ウマ　</Text>
          </View>
          <View style={styles.titleTextInputView}>
            <TextInput
              maxLength={4}
              style={styles.TextInput}
              keyboardType="numeric"
              // value={parseInt(basePoint)}
              // onChangeText={text => onPressReturnPoint(parseInt(text) * 100)}
              onChangeText={text => {
                setRankPointA(parseInt(text));
              }}
              defaultValue="20"
              returnKeyType={'done'}
            />
            <Text style={styles.TextBar}>-</Text>
            <TextInput
              maxLength={4}
              style={styles.TextInput}
              keyboardType="numeric"
              // value={parseInt(basePoint)}
              // onChangeText={text => onPressReturnPoint(parseInt(text) * 100)}
              onChangeText={text => {
                setRankPointB(parseInt(text));
              }}
              defaultValue="10"
              returnKeyType={'done'}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.titleImage}>
            <Image
              style={{
                width: 33,
                height: 44,
              }}
              source={require('../img/4sou2.jpeg')}
            />
          </View>
          <View style={styles.titleTextView}>
            <Text style={styles.titleText}>飛び賞</Text>
          </View>
          <View style={styles.titleTextInputView}>
            <TextInput
              maxLength={4}
              style={styles.TextInput}
              keyboardType="numeric"
              // value={parseInt(basePoint)}
              // onChangeText={text => onPressReturnPoint(parseInt(text) * 100)}
              onChangeText={text => setUnderPoint(parseInt(text))}
              defaultValue="10"
              returnKeyType={'done'}
            />
          </View>
        </View>

        {/* <View>
          <Text>焼き鳥</Text>
          <Button title="10" color="#f194ff" />
          <Button title="5" color="#f194ff" />
          <Button title="20" color="#f194ff" />
          <Button title="入力" color="#f194ff" />
          <Button title="なし" color="#f194ff" />
        </View>
        <View>
          <Text>100点台の端数処理</Text>
          <Button title="五捨六入" color="#f194ff" />
          <Button title="四捨五入" color="#f194ff" />
          <Button title="切り上げ" color="#f194ff" />
          <Button title="入力" color="#f194ff" />
          <Button title="しない" color="#f194ff" />
        </View> */}
        <View style={styles.buttonContainer}>
          <Button
            style={styles.roomCreateButton}
            onPress={() => {
              navigation.navigate('ScoreSheet', {
                RoomNumber: RoomNumber,
              });
              onPressRule();
            }}
            title="ルーム作成"
            color={'#000'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fourRuleScreen: {
    backgroundColor: '#fff',
  },
  screen: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // textDecorationLine: 'underline',
    marginTop: 20,
    padding: 5,
  },
  titleTextView: {
    alignSelf: 'center',
  },
  titleTextInputView: {
    marginLeft: 35,
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonContainer: {
    margin: 40,
    alignSelf: 'flex-end',
    borderColor: '#A8A2A2',
    borderRadius: 20,
    borderWidth: 1,
    // width: 120,
    padding: 5,
    backgroundColor: '#ECECEC',
  },
  roomCreateButton: {
    fontSize: 16,
  },
  titleImage: {
    marginLeft: 60,
  },
  titleText: {
    fontSize: 22,
    marginLeft: 22,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    padding: 5,
    fontSize: 21,
    alignItems: 'flex-end',
  },
  buttonText: {
    color: 'red',
    padding: 20,
  },
  TextBar: {
    fontSize: 24,
    alignSelf: 'center',
  },
});
