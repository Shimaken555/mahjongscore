import {
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {FC, useState, useCallback, useRef} from 'react';

import {Title} from './title';

import {usePoint} from '../../Providers/mahjongProvider';
import {HeaderComponent} from '../headerComponent';
import {NULL} from 'sass';

export const HistoryRoom = ({navigation}) => {
  const {
    createRule,
    deleteScore,
    setIsRuleDone,
    points,
    tableScores,
    createTotalScore,
    gameTotalScore,
  } = usePoint();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const [modalDelete, setModalDelete] = useState(false);

  const gameTotalScores =
    gameTotalScore[0] !== 'undefined'
      ? gameTotalScore.filter(output => {
          return output.name == '部屋用合計スコア';
        })
      : console.log(null);

  const onPressDelete = gameNumber => {
    console.log(
      gameTotalScore.filter(user => {
        return user.gameNumber == gameNumber;
      })[0],
    );
    deleteScore(gameNumber);
  };

  const data = [
    {date: '2023/1/28', gameCount: 3, gameNumber: 1, name: '部屋用合計スコア'},
    {date: '2023/1/29', gameCount: 2, gameNumber: 2, name: '部屋用合計スコア'},
  ];

  console.log(gameTotalScores);

  return (
    <>
      {gameTotalScore.length > 0 ? (
        <View>
          <FlatList
            // horizontal
            contentContainerStyle={styles.tasksContentContainer}
            data={gameTotalScores}
            ListHeaderComponent={
              <HeaderComponent navigation={navigation} title="履歴" />
            }
            keyExtractor={(item, index) => `${item}${index}`}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.historyBox}
                onPress={() => {
                  navigation.navigate('HistoryScoreSheet', {
                    RoomNumber: item.gameNumber,
                  });
                }}>
                <View style={styles.historyRoomHeader}>
                  <View style={styles.historyRoomHeaderLeft}>
                    <View style={styles.historyRoomParts}>
                      <Text>{item.date}</Text>
                    </View>
                    <View style={styles.historyRoomParts}>
                      <Text>{item.gameCount}半荘</Text>
                    </View>
                  </View>
                  <View style={styles.historyRoomHeaderRight}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalDelete(true);
                      }}>
                      <Text style={styles.TextFontNormal}>✗</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.sumScore}>
                  <View style={styles.sumScoreLeft}>
                    <Text style={styles.TextFontNormal}>スコア</Text>
                  </View>
                  <View style={styles.sumScoreRight}>
                    <View style={styles.sumScoreRow1}>
                      <View style={styles.sumPlayer}>
                        <Text style={styles.TextFontNormal}>
                          {item.nameA}　：{item.sumA}
                        </Text>
                      </View>
                      <View style={styles.sumPlayer}>
                        <Text style={styles.TextFontNormal}>
                          {item.nameB}　：{item.sumB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.sumScoreRow2}>
                      <View style={styles.sumPlayer}>
                        <Text style={styles.TextFontNormal}>
                          {item.nameC}　：{item.sumC}
                        </Text>
                      </View>
                      <View style={styles.sumPlayer}>
                        <Text style={styles.TextFontNormal}>
                          {item.nameD}　：{item.sumD}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Modal
                  animationType="none"
                  transparent={true}
                  visible={modalDelete}
                  onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalDelete(!modalDelete);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        このゲームを削除しますか？
                      </Text>
                      <View style={styles.modalButton}>
                        <TouchableOpacity
                          style={[styles.button, styles.modalButton]}
                          onPress={() => {
                            // console.log('押されてる');
                            {
                              setModalDelete(!modalDelete);
                              onPressDelete(item.gameNumber);
                            }
                          }}>
                          <Text style={styles.textStyle}>削除する</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.modalButton]}
                          onPress={() => setModalDelete(!modalDelete)}>
                          <Text style={styles.textStyle}>キャンセル</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <SafeAreaView>
          <Text>記録なし</Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={() => {
              navigation.navigate('Title', {});
            }}>
            <Text style={styles.textStyle}>トップへ戻る</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  historyBox: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#1C1C1C',
    backgroundColor: 'white',
    shadowRadius: 1,
    // elevation: 5,
  },
  historyRoomHeader: {
    flexDirection: 'row',
    padding: 5,
    margin: 3,
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  historyRoomHeaderLeft: {
    flexDirection: 'row',
  },
  TextFontNormal: {
    fontSize: 16,
  },
  historyRoomParts: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 10,
  },
  sumScore: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 12,
    marginRight: 12,
    width: '90%',
  },
  sumScoreLeft: {
    marginTop: 3,
  },
  sumScoreRight: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sumPlayer: {
    padding: 5,
    marginLeft: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    backgroundColor: '#2196F3',
    margin: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
  },
  modalButton: {
    flexDirection: 'row',
    marginTop: 1,
  },
});
