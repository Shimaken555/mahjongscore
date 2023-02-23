import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

export const Title = ({navigation}) => {
  return (
    <SafeAreaView style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('FourRule')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>新 規 対 局 作 成</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HistoryRoom');
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>対 戦 履 歴</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
    // height: '30%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f39800',
    width: 260,
    alignItems: 'center',
    marginTop: 60,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonText: {
    // TextAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 20,
    fontFamily: 'Hiragino Mincho ProN',
  },
});
