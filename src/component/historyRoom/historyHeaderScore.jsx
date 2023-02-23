import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {FC, useEffect, useState, useRef} from 'react';
import {usePoint} from '../../Providers/mahjongProvider';
import {HeaderComponent} from '../headerComponent';
import {ScoreSheetTop} from '../scoreSheetTop';

export const HistoryHeaderScore = ({
  sumA,
  sumB,
  sumC,
  sumD,
  RoomNumber,
  navigation,
  tableScoreCount,
  date,
}) => {
  // const windowWidth = useWindowDimensions().width;

  const {
    points,
    createTotalScore,
    gameTotalScore,
    UpdateTotalScore,
    UpdateName,
  } = usePoint();

  const thisTotalScore = gameTotalScore.filter(user => {
    return user.gameNumber == RoomNumber;
  });

  const nameA = thisTotalScore[0].nameA;
  const nameB = thisTotalScore[0].nameB;
  const nameC = thisTotalScore[0].nameC;
  const nameD = thisTotalScore[0].nameD;

  const [changeNameA, setChangeNameA] = useState(nameA);
  const [changeNameB, setChangeNameB] = useState(nameB);
  const [changeNameC, setChangeNameC] = useState(nameC);
  const [changeNameD, setChangeNameD] = useState(nameD);

  const onChangeScore = () => {
    UpdateTotalScore(
      RoomNumber,
      sumA,
      sumB,
      sumC,
      sumD,
      tableScoreCount,
      changeNameA,
      changeNameB,
      changeNameC,
      changeNameD,
    );
  };
  // const onChangeName = () => {
  //   UpdateName(RoomNumber, nameA);
  // };

  console.log(sumB);
  return (
    <>
      <HeaderComponent
        title="スコアシート"
        navigation={navigation}
        titleRight="編集完了"
        MyRoomNumber={RoomNumber}
        onClick={onChangeScore}
        sumA={sumA}
        sumB={sumB}
        sumC={sumC}
        sumD={sumD}
        tableScoreCount={tableScoreCount}
        boolean={true}
      />
      <ScoreSheetTop
        tableScoreCount={tableScoreCount}
        gameDate={thisTotalScore[0].date}
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
    </>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'green',
    // width: '30%',
    // flexWrap: 'wrap',
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
  tasksContainer: {
    margin: 0,
    flexDirection: 'row',
    flex: 4,
    flexWrap: 'wrap',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  scoreLeft: {
    flex: 1,
    // alignItems: 'center',
  },
  scoreLeftText: {
    padding: 5,
  },
});
