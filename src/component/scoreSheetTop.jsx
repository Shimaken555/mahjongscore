import {StyleSheet, Text, View, TextInput} from 'react-native';
import {FC, useEffect, useState, useRef} from 'react';
import {usePoint} from '../Providers/mahjongProvider';
import {HeaderComponent} from './headerComponent';

export const ScoreSheetTop = ({
  tableScoreCount,
  gameDate,
  setChangeNameA,
  setChangeNameB,
  setChangeNameC,
  setChangeNameD,
  sumA,
  sumB,
  sumC,
  sumD,
  changeNameA,
  changeNameB,
  changeNameC,
  changeNameD,
}) => {
  return (
    <>
      <View style={styles.scoreHeader}>
        <View style={styles.scoreHeaderParts}>
          <Text style={styles.TextFontNormal}>ルール</Text>
        </View>
        <View style={styles.scoreHeaderParts}>
          <Text style={styles.TextFontNormal}>合計{tableScoreCount}半荘</Text>
        </View>
        <View style={styles.scoreHeaderParts}>
          <Text style={styles.TextFontNormal}>{gameDate}</Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreLeft}>
          <Text style={styles.TextFontNormal}>名前</Text>
        </View>
        <View style={styles.tasksContainer}>
          <View style={styles.scoreSquare}>
            <TextInput
              maxLength={6}
              onChange={e => setChangeNameA(e.nativeEvent.text)}
              style={
                changeNameA.length < 6
                  ? styles.playerName
                  : styles.playerNameLong
              }
              placeholder={'Noname'}>
              {changeNameA}
            </TextInput>
          </View>
          <View style={styles.scoreSquare}>
            <TextInput
              maxLength={6}
              onChange={e => setChangeNameB(e.nativeEvent.text)}
              style={
                changeNameB.length < 6
                  ? styles.playerName
                  : styles.playerNameLong
              }
              placeholder={'Noname'}>
              {changeNameB}
            </TextInput>
          </View>
          <View style={styles.scoreSquare}>
            <TextInput
              maxLength={6}
              onChange={e => setChangeNameC(e.nativeEvent.text)}
              style={
                changeNameC.length < 6
                  ? styles.playerName
                  : styles.playerNameLong
              }
              placeholder={'Noname'}>
              {changeNameC}
            </TextInput>
          </View>
          <View style={styles.scoreSquare}>
            <TextInput
              maxLength={6}
              onChange={e => setChangeNameD(e.nativeEvent.text)}
              style={
                changeNameD.length < 6
                  ? styles.playerName
                  : styles.playerNameLong
              }
              placeholder={'Noname'}>
              {changeNameD}
            </TextInput>
          </View>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreLeft}>
          <Text style={styles.TextFontNormal}>合計</Text>
        </View>
        <View style={styles.tasksContainer}>
          <View style={styles.scoreSquare}>
            <Text style={styles.TextFontNormal}>{sumA}</Text>
          </View>
          <View style={styles.scoreSquare}>
            <Text style={styles.TextFontNormal}>{sumB}</Text>
          </View>
          <View style={styles.scoreSquare}>
            <Text style={styles.TextFontNormal}>{sumC}</Text>
          </View>
          <View style={styles.scoreSquare}>
            <Text style={styles.TextFontNormal}>{sumD}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    // width: '30%',
    // flexWrap: 'wrap',
  },
  scoreHeader: {
    flexDirection: 'row',
    padding: 5,
    margin: 3,
    borderWidth: 1,

    justifyContent: 'space-around',
    backgroundColor: '#DCDCDC',
  },
  scoreHeaderParts: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  scoreSquare: {
    borderWidth: 1,
    borderColor: 'green',
    flex: 1,
    // width: '50%',
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  tasksContainer: {
    margin: 0,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    // borderColor: 'blue',
  },
  scoreLeft: {
    // flex: 1,
    width: '14%',
    // height: 55,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextFontNormal: {
    fontSize: 16,
  },
  playerName: {
    borderBottomColor: '#A8A2A2',
    fontSize: 15,
    borderBottomWidth: 1,
  },
  playerNameLong: {
    borderBottomColor: '#A8A2A2',
    fontSize: 13,
    borderBottomWidth: 1,
  },
});
