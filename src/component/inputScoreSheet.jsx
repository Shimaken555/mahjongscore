import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Button,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {FC, useEffect, useState, useRef} from 'react';

import {usePoint} from '../Providers/mahjongProvider';

export const InputScoreSheet = ({RoomNumber, tableScoreCount}) => {
  const [pointA, setPointA] = useState(parseInt(0));
  const [pointB, setPointB] = useState(parseInt(0));
  const [pointC, setPointC] = useState(parseInt(0));
  const [pointD, setPointD] = useState(parseInt(0));

  // const countRoundRef = useRef(1);
  // const inputEl = useRef(null);
  // const handleOnClick = () => inputEl.current.focus();

  const {
    createRule,
    createScore,
    setIsRuleDone,
    points,
    tableScores,
    playerScores,
  } = usePoint();

  const purePointA =
    pointA === '' ? 0 : Number.isNaN(pointA) ? 0 : parseInt(pointA);
  const purePointB =
    pointB === '' ? 0 : Number.isNaN(pointB) ? 0 : parseInt(pointB);
  const purePointC =
    pointC === '' ? 0 : Number.isNaN(pointC) ? 0 : parseInt(pointC);
  const purePointD =
    pointD === '' ? 0 : Number.isNaN(pointD) ? 0 : parseInt(pointD);

  const scores = [
    {
      Player: 1,
      pointStick: purePointA,
      id: 1,
      Top: 0,
      RankPoint: 0,
      UnderBox: 0,
      Bird: 0,
      TopRound: 0,
    },
    {
      Player: 2,
      pointStick: purePointB,
      id: 1,
      Top: 0,
      // RealScore: -32,
      RankPoint: 0,
      UnderBox: 0,
      Bird: 0,
      TopRound: 0,
    },
    {
      Player: 3,
      pointStick: purePointC,
      id: 1,
      Top: 0,
      // RealScore: 0,
      RankPoint: 0,
      UnderBox: 0,
      Bird: 0,
      TopRound: 0,
    },
    {
      Player: 4,
      pointStick: purePointD,
      id: 1,
      Top: 0,
      // RealScore: 17,
      RankPoint: 0,
      UnderBox: 0,
      Bird: 0,
      TopRound: 0,
    },
  ];

  const PlayerA = scores.filter(user => {
    return user.Player == 1;
  });

  const PlayerB = scores.filter(user => {
    return user.Player == 2;
  });

  const PlayerC = scores.filter(user => {
    return user.Player == 3;
  });

  const PlayerD = scores.filter(user => {
    return user.Player == 4;
  });

  if (purePointA < 0) {
    PlayerA[0].UnderBox = points[0].underBox * -1;
  }
  if (purePointB < 0) {
    PlayerB[0].UnderBox = points[0].underBox * -1;
  }
  if (purePointC < 0) {
    PlayerC[0].UnderBox = points[0].underBox * -1;
  }
  if (purePointD < 0) {
    PlayerD[0].UnderBox = points[0].underBox * -1;
  }

  if (purePointA > purePointB) {
    // A???B?????????????????????
    if (purePointA > purePointC) {
      // A???BC?????????????????????
      if (purePointA > purePointD) {
        // A????????????
        PlayerA[0].Top =
          ((points[0].returnPoint - points[0].basePoint) / 1000) * 4;
        PlayerA[0].RankPoint = points[0].horse1;
      } else {
        // A???2???D??????????????????????????????DABC???DACB
        PlayerA[0].RankPoint = points[0].horse2;
      }
    } else {
      // A???B????????????C?????????????????????
      if (purePointA > purePointD) {
        // A???2?????????????????????CABD???CADB
        PlayerA[0].RankPoint = points[0].horse2;
      } else {
        // A???3?????????????????????DCAB???CDAB
        PlayerA[0].RankPoint = points[0].horse2 * -1;
      }
    }
  } else {
    // A???B?????????????????????
    if (purePointA < purePointC) {
      if (purePointA < purePointD) {
        // A????????????
        PlayerA[0].RankPoint = points[0].horse1 * -1;
      } else {
        // A???3??????D??????????????????????????????BCAD???CBAD
        PlayerA[0].RankPoint = points[0].horse2 * -1;
      }
    } else {
      //A???B???????????????C????????????????????????
      if (purePointA > purePointD) {
        // A???2?????????????????????BACD,BADC
        PlayerA[0].RankPoint = points[0].horse2;
      } else {
        // A???3?????????????????????BDAC???DBAC
        PlayerA[0].RankPoint = points[0].horse2 * -1;
      }
    }
  }

  if (purePointB > purePointA) {
    // A???B?????????????????????
    if (purePointB > purePointC) {
      // A???BC?????????????????????
      if (purePointB > purePointD) {
        // A????????????
        PlayerB[0].Top =
          ((points[0].returnPoint - points[0].basePoint) / 1000) * 4;
        PlayerB[0].RankPoint = points[0].horse1;
      } else {
        // A???2???D??????????????????????????????DABC???DACB
        PlayerB[0].RankPoint = points[0].horse2;
      }
    } else {
      // A???B????????????C?????????????????????
      if (purePointB > purePointD) {
        // A???2?????????????????????CABD???CADB
        PlayerB[0].RankPoint = points[0].horse2;
      } else {
        // A???3?????????????????????DCAB???CDAB
        PlayerB[0].RankPoint = points[0].horse2 * -1;
      }
    }
  } else {
    // B???A?????????????????????
    if (purePointB < purePointC) {
      if (purePointB < purePointD) {
        // B????????????
        PlayerB[0].RankPoint = points[0].horse1 * -1;
      } else {
        // B???3??????D??????????????????????????????ACBD???CABD
        PlayerB[0].RankPoint = points[0].horse2 * -1;
      }
    } else {
      //A???B???????????????C????????????????????????
      if (purePointB > purePointD) {
        // A???2?????????????????????BACD,BADC
        PlayerB[0].RankPoint = points[0].horse2;
      } else {
        // A???3?????????????????????BDAC???DBAC
        PlayerB[0].RankPoint = points[0].horse2 * -1;
      }
    }
  }

  if (purePointC > purePointA) {
    // C???A?????????????????????
    if (purePointC > purePointB) {
      // C???B?????????????????????
      if (purePointC > purePointD) {
        // C????????????
        PlayerC[0].Top =
          ((points[0].returnPoint - points[0].basePoint) / 1000) * 4;
        PlayerC[0].RankPoint = points[0].horse1;
      } else {
        // C???2???D??????????????????????????????
        PlayerC[0].RankPoint = points[0].horse2;
      }
    } else {
      // C???A????????????B?????????????????????
      if (purePointC > purePointD) {
        // C???2?????????????????????
        PlayerC[0].RankPoint = points[0].horse2;
      } else {
        // C???3?????????????????????
        PlayerC[0].RankPoint = points[0].horse2 * -1;
      }
    }
  } else {
    // C???A?????????????????????
    if (purePointC < purePointB) {
      if (purePointC < purePointD) {
        // C????????????
        PlayerC[0].RankPoint = points[0].horse1 * -1;
      } else {
        // C???3??????D??????????????????????????????
        PlayerC[0].RankPoint = points[0].horse2 * -1;
      }
    } else {
      //C???A???????????????B????????????????????????
      if (purePointC > purePointD) {
        // C???2?????????????????????
        PlayerC[0].RankPoint = points[0].horse2;
      } else {
        // C???3?????????????????????
        PlayerC[0].RankPoint = points[0].horse2 * -1;
      }
    }
  }

  if (purePointD > purePointB) {
    // A???B?????????????????????
    if (purePointD > purePointC) {
      // A???BC?????????????????????
      if (purePointD > purePointA) {
        // A????????????
        PlayerD[0].Top =
          ((points[0].returnPoint - points[0].basePoint) / 1000) * 4;
        PlayerD[0].RankPoint = points[0].horse1;
      } else {
        // A???2???D??????????????????????????????DABC???DACB
        PlayerD[0].RankPoint = points[0].horse2;
      }
    } else {
      // A???B????????????C?????????????????????
      if (purePointD > purePointA) {
        // A???2?????????????????????CABD???CADB
        PlayerD[0].RankPoint = points[0].horse2;
      } else {
        // A???3?????????????????????DCAB???CDAB
        PlayerD[0].RankPoint = points[0].horse2 * -1;
      }
    }
  } else {
    // D???B?????????????????????
    if (purePointD < purePointC) {
      // D???BC?????????????????????
      if (purePointD < purePointA) {
        // D????????????
        PlayerD[0].RankPoint = points[0].horse1 * -1;
      } else {
        // D???3??????A???????????????
        PlayerD[0].RankPoint = points[0].horse2 * -1;
      }
    } else {
      //D???B???????????????C????????????????????????
      if (purePointD > purePointA) {
        // D???2??????
        PlayerD[0].RankPoint = points[0].horse2;
      } else {
        // D???3??????
        PlayerD[0].RankPoint = points[0].horse2 * -1;
      }
    }
  }

  const TopPlayer = Math.max(purePointA, purePointB, purePointC, purePointD);

  const userPureScoreA = parseInt(
    PlayerA.map(output => {
      return Math.round(
        (output.pointStick - points[0].returnPoint) / 1000 +
          output.RankPoint +
          output.Top +
          output.UnderBox +
          output.Bird -
          0.1,
      );
    })[0],
  );

  const userPureScoreB = parseInt(
    PlayerB.map(output => {
      return Math.round(
        (output.pointStick - points[0].returnPoint) / 1000 +
          output.RankPoint +
          output.Top +
          output.UnderBox +
          output.Bird -
          0.1,
      );
    })[0],
  );

  const userPureScoreC = parseInt(
    PlayerC.map(output => {
      return Math.round(
        (output.pointStick - points[0].returnPoint) / 1000 +
          output.RankPoint +
          output.Top +
          output.UnderBox +
          output.Bird -
          0.1,
      );
    })[0],
  );

  const userPureScoreD = parseInt(
    PlayerD.map(output => {
      return Math.round(
        (output.pointStick - points[0].returnPoint) / 1000 +
          output.RankPoint +
          output.Top +
          output.UnderBox +
          output.Bird -
          0.1,
      );
    })[0],
  );

  const TotalPointA =
    purePointA === '' ? 0 : Number.isNaN(purePointA) ? 0 : parseInt(purePointA);
  const TotalPointB =
    purePointB === '' ? 0 : Number.isNaN(purePointB) ? 0 : parseInt(purePointB);
  const TotalPointC =
    purePointC === '' ? 0 : Number.isNaN(purePointC) ? 0 : parseInt(purePointC);
  const TotalPointD =
    purePointD === '' ? 0 : Number.isNaN(purePointD) ? 0 : parseInt(purePointD);

  const Total =
    TotalPointA +
    TotalPointB +
    TotalPointC +
    TotalPointD -
    points[0].basePoint * 4;

  const userScoreA =
    Total == 0
      ? TopPlayer == purePointA
        ? (parseInt(userPureScoreB) +
            parseInt(userPureScoreC) +
            parseInt(userPureScoreD)) *
          -1
        : userPureScoreA
      : '';

  const userScoreB =
    Total == 0
      ? TopPlayer == purePointB
        ? (parseInt(userPureScoreA) +
            parseInt(userPureScoreC) +
            parseInt(userPureScoreD)) *
          -1
        : userPureScoreB
      : '';

  const userScoreC =
    Total == 0
      ? TopPlayer == purePointC
        ? (parseInt(userPureScoreA) +
            parseInt(userPureScoreB) +
            parseInt(userPureScoreD)) *
          -1
        : userPureScoreC
      : '';

  const userScoreD =
    Total == 0
      ? TopPlayer == pointD
        ? (parseInt(userPureScoreA) +
            parseInt(userPureScoreB) +
            parseInt(userPureScoreC)) *
          -1
        : userPureScoreD
      : '';

  const onPressScore = () => {
    createScore(
      RoomNumber,
      1,
      PlayerA[0].Top,
      PlayerA[0].pointStick,
      userScoreA,
      PlayerA[0].RankPoint,
      PlayerA[0].bird,
      PlayerA[0].underBox,
      2,
      PlayerB[0].Top,
      PlayerB[0].pointStick,
      userScoreB,
      PlayerB[0].RankPoint,
      PlayerB[0].bird,
      PlayerB[0].underBox,
      3,
      PlayerC[0].Top,
      PlayerC[0].pointStick,
      userScoreC,
      PlayerC[0].RankPoint,
      PlayerC[0].bird,
      PlayerC[0].underBox,
      4,
      PlayerD[0].Top,
      PlayerD[0].pointStick,
      userScoreD,
      PlayerD[0].RankPoint,
      PlayerD[0].bird,
      PlayerD[0].underBox,
      tableScoreCount,
    );
  };

  const ClearPoint = () => {
    setPointA('');
    setPointB('');
    setPointC('');
    setPointD('');
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreLeft}>
          <View style={styles.scoreLeftRow}>
            <Text style={styles.TextFontNormal}>{tableScoreCount + 1}</Text>
          </View>
          <View style={styles.scoreLeftRow}>
            <Text style={styles.TextFontNormal}>??????</Text>
          </View>
        </View>
        <View style={styles.scoreSquare}>
          <Text style={styles.TextFontNormal}>??????</Text>
          <TextInput
            maxLength={6}
            style={styles.TextInput}
            keyboardType="numeric"
            autoFocus="true"
            // onChangeText={text => setBasePoint(parseInt(text) * 100)}
            // onChangeText={text => {
            //   setPointA(parseInt(isNaN(text) ? pointA : text));
            // }}
            value={pointA}
            onChange={e => setPointA(parseInt(e.nativeEvent.text))}
            placeholder={String(points[0].basePoint)}
            returnKeyType={'done'}
          />
          <Text style={styles.TextFontNormal}>?????????</Text>
          <Text style={styles.TextInput}>{userScoreA}</Text>
        </View>
        <View style={styles.scoreSquare}>
          <Text style={styles.TextFontNormal}>??????</Text>
          <TextInput
            maxLength={6}
            style={styles.TextInput}
            keyboardType="numeric"
            value={pointB}
            onChange={e => setPointB(parseInt(e.nativeEvent.text))}
            placeholder={String(points[0].basePoint)}
            returnKeyType={'done'}
          />
          <Text style={styles.TextFontNormal}>?????????</Text>
          <Text style={styles.TextInput}>{userScoreB}</Text>
        </View>
        <View style={styles.scoreSquare}>
          <Text style={styles.TextFontNormal}>??????</Text>
          <TextInput
            maxLength={6}
            style={styles.TextInput}
            keyboardType="numeric"
            // onChangeText={text => setBasePoint(parseInt(text) * 100)}
            // onChangeText={text => {
            //   setPointC(parseInt(isNaN(text) ? pointA : text));
            // }}
            value={pointC}
            onChange={e => setPointC(parseInt(e.nativeEvent.text))}
            placeholder={String(points[0].basePoint)}
            returnKeyType={'done'}
          />
          {/* <Text>{userScoreC}</Text> */}
          <Text style={styles.TextFontNormal}>?????????</Text>
          <Text style={styles.TextInput}>{userScoreC}</Text>
        </View>
        <View style={styles.scoreSquare}>
          <Text style={styles.TextFontNormal}>??????</Text>
          <TextInput
            maxLength={6}
            style={styles.TextInput}
            keyboardType="numeric"
            // onChangeText={text => setBasePoint(parseInt(text) * 100)}
            // onChangeText={text => {
            //   setPointD(parseInt(isNaN(text) ? pointA : text));
            // }}
            value={pointD}
            onChange={e => setPointD(parseInt(e.nativeEvent.text))}
            placeholder={String(points[0].basePoint)}
            returnKeyType={'done'}
          />
          <Text>?????????</Text>
          <Text style={styles.TextInput}>{userScoreD}</Text>
        </View>
      </View>

      <View style={styles.Footer}>
        <View>
          <Text style={styles.Total}>??????{Total}???</Text>
        </View>

        <View style={styles.PlusButton}>
          <Button
            onPress={() => {
              onPressScore();
              ClearPoint();
            }}
            disabled={Total == 0 ? false : true}
            // color="black"
            title="???????????????"
            color={'#000'}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
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
    padding: 7,
    paddingBottom: 0,
    // alignItems: 'center',
    fontSize: 22,
  },
  scoreLeft: {
    width: '14%',
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },
  buttonText: {
    // TextAlign: 'center',
    color: 'red',
    padding: 20,
  },
  TextInput: {
    padding: 3,
    textAlign: 'center',
    borderColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 8,
  },
  scoreLeftRow: {
    padding: 5,
  },
  TextFontNormal: {
    fontSize: 16,
  },
  Total: {
    fontSize: 16,
  },
  PlusButton: {
    marginTop: 5,
    borderRadius: 20,
    // width: 100,
    borderColor: '#807E7E',
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    fontSize: 16,
  },
  Footer: {
    marginLeft: 'auto',
    margin: 20,
  },
});
