import {
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,

} from 'react-native';
import {FC, useEffect, useState, useRef} from 'react';
import {usePoint} from '../Providers/mahjongProvider';
import {InputScoreSheet} from './inputScoreSheet';
import {HeaderScoreSheet} from './headerScoreSheet';
import {ScoreSheetDefault} from './scoreSheetDefault';

export const TotalScoreSheet = ({route, navigation}) => {
  const {points, tableScores, playerScores, deleteGameCount, gameTotalScore} =
    usePoint();

  const myRoomNumbers = route.params.RoomNumber;

  const tableScore = tableScores.filter(user => {
    return user.gameNumber == myRoomNumbers;
  });

  const tableScoreCount = tableScore.length;

  const deleteLine = gameCount => {
    deleteGameCount(gameCount);
    console.log(gameCount);
  };

  return (
    <>
      <ScoreSheetDefault
        listHeaderComponent={
          <HeaderScoreSheet
            MyRoomNumber={myRoomNumbers}
            navigation={navigation}
            tableScoreCount={tableScoreCount}
          />
        }
        listFooterComponent={
          <InputScoreSheet
            RoomNumber={myRoomNumbers}
            tableScoreCount={tableScoreCount}
          />
        }
        tableScore={tableScore}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
    // height: '30%',
    alignItems: 'center',
  },
  ScoreBoardContainer: {
    backgroundColor: 'blue',
  },
  scoreContainer: {
    flexDirection: 'row',
    // width: '30%',
    // flexWrap: 'wrap',
  },
  text: {
    backgroundColor: 'gray',
    width: 260,
    alignItems: 'center',
  },
  scoreLeftUp: {
    marginLeft: 5,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  scoreSquare: {
    borderWidth: 1,
    borderColor: 'green',
    flex: 1,
    // width: '50%',
    padding: 10,
    paddingTop: 5,
    // alignItems: 'center',
  },
  scoreSquares: {
    borderWidth: 1,
    flex: 3,
    borderColor: 'green',
    padding: 10,
    paddingBottom: 5,

    // width: '100%',
  },
  TextFontNormal: {
    fontSize: 16,
  },
  TextFontDelete: {
    fontSize: 13,
  },
  tasksContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tasksContainerFlat: {
    // borderWidth: 1,
    // borderColor: 'black',
  },
  scoreLeft: {
    width: '14%',
    borderWidth: 1,
    borderColor: 'green',
    // alignItems: 'center',
    justifyContent: 'space-around',
  },
  scoreLeftText: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  buttonText: {
    // TextAlign: 'center',
    color: 'red',
    padding: 20,
  },
  TextInput: {
    padding: 3,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  scoreLeftRow: {
    padding: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  scoreLeftEdit: {
    marginBottom: 15,
    textAlign: 'center',
    alignItems: 'center',
  },
  Total: {
    fontSize: 13,
  },
  forScore: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    // width: 100,
    padding: 10,
    margin: 20,
    marginLeft: 'auto',
    alignItems: 'center',
  },
});
