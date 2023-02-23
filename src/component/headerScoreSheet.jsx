import {StyleSheet, Text, View, TextInput} from 'react-native';
import {FC, useEffect, useState, useRef} from 'react';
import {usePoint} from '../Providers/mahjongProvider';
import {HeaderComponent} from './headerComponent';
import {ScoreSheetTop} from './scoreSheetTop';

export const HeaderScoreSheet = ({
  MyRoomNumber,
  navigation,
  tableScoreCount,
}) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  // const windowWidth = useWindowDimensions().width;

  const {
    points,
    createTotalScore,
    gameTotalScore,
    tableScores,
    UpdateTotalScore,
    deleteRule,
  } = usePoint();

  const tableScore = tableScores.filter(user => {
    return user.gameNumber == MyRoomNumber;
  });

  const [changeNameA, setChangeNameA] = useState('');
  const [changeNameB, setChangeNameB] = useState('');
  const [changeNameC, setChangeNameC] = useState('');
  const [changeNameD, setChangeNameD] = useState('');

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

  const onPressScore = () => {
    createTotalScore(
      MyRoomNumber,
      `${year}/${month}/${date}`,
      sumA,
      sumB,
      sumC,
      sumD,
      changeNameA,
      changeNameB,
      changeNameC,
      changeNameD,
      tableScoreCount,
    );
  };

  const onPressCancel = () => {
    // deleteRule(MyRoomNumber);
  };

  return (
    <View>
      <HeaderComponent
        title="スコアシート"
        navigation={navigation}
        titleRight="入力完了"
        MyRoomNumber={MyRoomNumber}
        onClick={onPressScore}
        onClickCancel={onPressCancel}
        sumA={sumA}
        sumB={sumB}
        sumC={sumC}
        sumD={sumD}
        tableScoreCount={tableScoreCount}
        boolean={true}
      />
      <ScoreSheetTop
        tableScoreCount={tableScoreCount}
        gameDate={`${year}/${month}/${date}`}
        setChangeNameA={setChangeNameA}
        setChangeNameB={setChangeNameB}
        setChangeNameC={setChangeNameC}
        setChangeNameD={setChangeNameD}
        sumA={sumA}
        sumB={sumB}
        sumC={sumC}
        sumD={sumD}
        changeNameA={changeNameA}
        changeNameB={changeNameB}
        changeNameC={changeNameC}
        changeNameD={changeNameD}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
