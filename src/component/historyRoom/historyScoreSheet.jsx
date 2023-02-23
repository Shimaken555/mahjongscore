import {
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
  ScrollView,
  Button,
} from 'react-native';
import {FC, useEffect, useState, useRef} from 'react';
import {usePoint} from '../../Providers/mahjongProvider';
import {InputScoreSheet} from '../inputScoreSheet';
import {HistoryHeaderScore} from './historyHeaderScore';
import {ScoreSheetDefault} from '../scoreSheetDefault';

export const HistoryScoreSheet = ({route, navigation}) => {
  const {points, tableScores, playerScores, deleteGameCount, gameTotalScore} =
    usePoint();

  const myRoomNumbers = route.params.RoomNumber;

  const tableScore = tableScores.filter(user => {
    return user.gameNumber == myRoomNumbers;
  });

  const date = tableScore.date;
  const tableScoreCount = tableScore.length;
  const nameA = tableScoreCount.nameA;

  const AllScore = tableScore.map(user => {
    return user.playerScores;
  });

  const playerAScore = AllScore.map(user => {
    return user[0].RealScore;
  });
  const playerBScore = AllScore.map(user => {
    return user[1].RealScore;
  });
  const playerCScore = AllScore.map(user => {
    return user[2].RealScore;
  });
  const playerDScore = AllScore.map(user => {
    return user[3].RealScore;
  });

  const sumA = playerAScore.reduce((sum, num) => {
    return sum + num;
  }, 0);
  const sumB = playerBScore.reduce((sum, num) => {
    return sum + num;
  }, 0);
  const sumC = playerCScore.reduce((sum, num) => {
    return sum + num;
  }, 0);
  const sumD = playerDScore.reduce((sum, num) => {
    return sum + num;
  }, 0);

  console.log(tableScore);

  return (
    <>
      <ScoreSheetDefault
        listHeaderComponent={
          <HistoryHeaderScore
            sumA={sumA}
            sumB={sumB}
            sumC={sumC}
            sumD={sumD}
            RoomNumber={myRoomNumbers}
            navigation={navigation}
            tableScoreCount={tableScoreCount}
            date={date}
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
    flex: 1,
    borderColor: 'green',
    padding: 5,
    // width: '100%',
  },
  tasksContainer: {
    margin: 0,
    flexDirection: 'row',
    flex: 3,
    flexWrap: 'wrap',
    borderWidth: 1,
    // borderColor: 'blue',
  },
  tasksContainerFlat: {
    borderWidth: 1,
    // borderColor: 'black',
  },
  scoreLeft: {
    flex: 1,
    width: '40%',
    // alignItems: 'center',
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
    padding: 5,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  TextCount: {
    padding: 5,
    borderColor: 'blue',
    borderWidth: 1,
    textAlign: 'center',
    marginVertical: 5,
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
