import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
  ScrollView,
  Button,
} from 'react-native';
import {FC, useEffect, useState, useRef} from 'react';
import {usePoint} from '../Providers/mahjongProvider';
import {InputScoreSheet} from './inputScoreSheet';
import {HeaderScoreSheet} from './headerScoreSheet';

export const ScoreSheetDefault = ({
  listHeaderComponent,
  listFooterComponent,
  tableScore,
}) => {
  const {tableScores, deleteGameCount} = usePoint();

  const deleteLine = gameCount => {
    deleteGameCount(gameCount);
  };

  return (
    <View style={styles.ScoreSheet}>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        data={tableScore}
        keyExtractor={item => item._id.toHexString()}
        renderItem={({item, index}) => (
          <>
            {tableScores.length > 0 ? (
              <View style={styles.scoreContainer}>
                <View style={styles.scoreLeft}>
                  <View style={styles.scoreLeftUp}>
                    <TouchableOpacity
                      onPress={() => {
                        deleteLine(item.gameCount);
                      }}>
                      <Text style={styles.TextFontDelete}>✗</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.scoreLeftNumber}>
                    <Text style={styles.TextFontNormal}>{index + 1}</Text>
                  </View>
                  <View style={styles.scoreLeftEdit}>
                    <Text style={styles.TextFontNormal}>詳細</Text>
                  </View>
                </View>

                {item.playerScores.map(item => {
                  return (
                    <View style={styles.tasksContainer}>
                      <View style={styles.scoreSquare}>
                        <Text style={styles.TextFontNormal}>点数</Text>
                        <Text style={styles.TextInput}>{item.pointStick}</Text>
                        <Text style={styles.TextFontNormal}>スコア</Text>
                        <Text style={styles.TextInput}>{item.RealScore}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View>
                <Text>ssss</Text>
              </View>
            )}
          </>
        )}
      />
      {/* <InputScoreSheet
        RoomNumber={myRoomNumbers}
        tableScoreCount={tableScoreCount}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
  },
  scoreLeftUp: {
    marginLeft: 5,
    // marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  scoreSquare: {
    borderWidth: 1,
    borderColor: 'green',
    flex: 3,
    // width: '50%',
    padding: 7,
    paddingBottom: 0,
    // alignItems: 'center',
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
  scoreLeft: {
    width: '14%',
    borderWidth: 1,
    borderColor: 'green',
    // alignItems: 'center',
    justifyContent: 'space-around',
  },
  TextInput: {
    padding: 3,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  scoreLeftNumber: {
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
});
