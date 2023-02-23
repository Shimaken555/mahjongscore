import {
  TouchableHighlight,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {FC, useState, useCallback, useRef} from 'react';

import {Title} from './title';
import {RankPoint} from './Rule/rankPoint';
import {UnderBox} from './Rule/underBox';

import {usePoint} from '../Providers/mahjongProvider';

export const HeaderComponent = ({
  navigation,
  title,
  titleRight,
  MyRoomNumber,
  onClick,
  onClickCancel,
  sumA,
  sumB,
  sumC,
  sumD,
  tableScoreCount,
  boolean,
}) => {
  const {
    createRule,
    deleteRule,
    setIsRuleDone,
    points,
    tableScores,
    createTotalScore,
    UpdateTotalScore,
  } = usePoint();

  // {const tableScores = tableScores?.length > 0 ? tableScores : 1;}

  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCancelVisible, setModalCancelVisible] = useState(false);

  // console.log(height);
  // console.log(width);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const onPressReturnPoint = returnPoint => {
    setReturnPoint(returnPoint);
  };

  const onPressCancel = MyRoomNumber => {
    // deleteRule(MyRoomNumber);
    const selectRoom = points.filter(user => {
      return user.gameNumber == MyRoomNumber;
    })[0];
    console.log(selectRoom);
  };

  const onPressScore = () => {
    createTotalScore(
      MyRoomNumber,
      `${year}/${month}/${date}`,
      sumA,
      sumB,
      sumC,
      sumD,
      'Aさん',
      'Bさん',
      'Cさん',
      'Dさん',
      tableScoreCount,
    );
  };

  const onChangeScore = () => {
    UpdateTotalScore(MyRoomNumber, sumA, sumB, sumC, sumD, tableScoreCount);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleLeft}>
        {boolean ? (
          <Text
            style={styles.fontsize}
            onPress={() => {
              // navigation.navigate('Title', {
              //   RoomNumber: MyRoomNumber,
              // });
              {
                // onPressCancel(MyRoomNumber);
                setModalCancelVisible(true);
              }
            }}>
            キャンセル
          </Text>
        ) : (
          <Text
            style={styles.fontsize}
            onPress={() => {
              navigation.navigate('Title', {
                RoomNumber: MyRoomNumber,
              });
              {
                // onPressCancel(MyRoomNumber);
              }
            }}>
            トップ画面へ
          </Text>
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.fontsizeTitle}>{title}</Text>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalCancelVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalCancelVisible(!modalCancelVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                入力内容を破棄してトップ画面に戻りますか？
              </Text>
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    // console.log('押されてる');
                    {
                      setModalCancelVisible(!modalCancelVisible);
                      onPressCancel(MyRoomNumber);
                    }
                    navigation.navigate('Title', {
                      RoomNumber: MyRoomNumber,
                    });
                  }}>
                  <Text style={styles.textStyle}>トップへ戻る</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalCancelVisible(!modalCancelVisible)}>
                  <Text style={styles.textStyle}>キャンセル</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.titleRight}>
        <Text
          style={styles.fontsize}
          onPress={() => {
            // navigation.navigate('Title', {
            //   RoomNumber: MyRoomNumber,
            // });
            {
              setModalVisible(true);
            }
          }}>
          {titleRight}
        </Text>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                入力したスコアを登録しますか？
              </Text>
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    // console.log('押されてる');
                    {
                      setModalVisible(!modalVisible);
                      onClick();
                    }
                    navigation.navigate('Title', {
                      RoomNumber: MyRoomNumber,
                    });
                  }}>
                  <Text style={styles.textStyle}>登録する</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>キャンセル</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  screen: {
    backgroundColor: '#00A698',
    textAlign: 'center',
    alignItems: 'center',
    // height: '13%',
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'center',
  },
  titleLeft: {
    fontSize: 16,
    marginBottom: 10,
    position: 'absolute',
    left: 10,
    bottom: 0,
  },
  titleRight: {
    fontSize: 16,
    marginBottom: 10,
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  fontsize: {
    fontSize: 18,
    color: '#1A0DAB',
  },
  fontsizeTitle: {
    fontSize: 18,
    color: '#111111',
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
    padding: 13,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    margin: 8,
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
