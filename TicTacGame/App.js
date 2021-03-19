import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';

var styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    height: 100,
    width: 100,
    borderColor: 'rgba(166, 84, 41, 1)',
  },
});

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [currrentTurn, setCurrrentTurn] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.flex, {backgroundColor: 'black'}]}>
        {!!player1 && (
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 24,
              textAlign: 'center',
              paddingVertical: 20,
              backgroundColor:
                currrentTurn === 'player1' ? 'red' : 'transparent',
            }}>
            {player1}
          </Text>
        )}
        {!!player2 && (
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 24,
              textAlign: 'center',
              backgroundColor:
                currrentTurn === 'player2' ? 'red' : 'transparent',
            }}>
            {player2}
          </Text>
        )}
        <View style={styles.column}>
          {[0, 1, 2].map((i) => {
            return (
              <View key={i} style={styles.row}>
                {[0, 1, 2].map((j) => {
                  var borderStyle = {
                    borderRightWidth: j === 2 ? 0 : 5,
                    borderBottomWidth: i === 2 ? 0 : 5,
                  };
                  return (
                    <Pressable
                      key={j}
                      style={[
                        styles.box,
                        borderStyle,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}
                      onPress={() => {
                        if (
                          !result.some(([x, y, player]) => x === i && y === j)
                        ) {
                          const newResult = [...result, [i, j, currrentTurn]];

                          if (newResult.length >= 5) {
                            const checkXWin = newResult.filter(
                              ([x, y, player]) => {
                                return x === i && player === currrentTurn;
                              },
                            );
                            const checkYWin = newResult.filter(
                              ([x, y, player]) => {
                                return y === j && player === currrentTurn;
                              },
                            );
                            const checkForwardSlant = newResult.filter(
                              ([x, y, player]) => {
                                return (
                                  i === j && x === y && player === currrentTurn
                                );
                              },
                            );
                            const checkBackwordSlant = newResult.filter(
                              ([x, y, player]) => {
                                return (
                                  i + j === 2 &&
                                  x + y === 2 &&
                                  player === currrentTurn
                                );
                              },
                            );
                            if (
                              checkXWin.length === 3 ||
                              checkYWin.length === 3 ||
                              checkForwardSlant.length === 3 ||
                              checkBackwordSlant.length === 3
                            ) {
                              Alert.alert(
                                'Match Won',
                                `${[currrentTurn]} won the match`,
                              );
                              setResult([]);
                            } else {
                              if (newResult.length === 9) {
                                Alert.alert('Match Draw', `Please Play again`);
                                setResult([]);
                              } else {
                                setResult(newResult);
                              }
                            }
                          } else {
                            setResult(newResult);
                          }
                          if (currrentTurn === 'player1') {
                            setCurrrentTurn('player2');
                          } else {
                            setCurrrentTurn('player1');
                          }
                        } else {
                          Alert.alert(
                            'Filled',
                            'Box is already filled Please select another box',
                          );
                        }
                      }}>
                      {result.some(
                        ([x, y, player]) =>
                          x === i && y === j && player === 'player1',
                      ) && (
                        <Text
                          style={{
                            fontSize: 50,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          0
                        </Text>
                      )}
                      {result.some(
                        ([x, y, player]) =>
                          x === i && y === j && player === 'player2',
                      ) && (
                        <Text
                          style={{
                            fontSize: 50,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}>
                          X
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
        </View>
      </SafeAreaView>
      <Modal isVisible={isOpen}>
        <View
          style={{
            borderRadius: 10,
            padding: 20,
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Please Enter Player 1 Name
          </Text>
          <View style={{marginVertical: 20}}>
            <TextInput
              value={player1}
              onChangeText={(text) => {
                if (text.length !== 0) {
                  setError('');
                }
                setPlayer1(text);
              }}
              style={{
                paddingHorizontal: 10,
                borderRadius: 5,
                paddingVertical: 5,
                borderWidth: 1,
                fontSize: 18,
                fontWeight: '500',
                borderColor: error ? 'red' : 'gray',
              }}
            />
            {!!error && (
              <Text style={{color: 'red', paddingVertical: 4}}>{error}</Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              alignSelf: 'flex-end',
              backgroundColor: '#007bff',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              if (player1.length > 0) {
                setIsOpen(false);
                setTimeout(() => {
                  setIsOpen1(true);
                }, 500);
              } else {
                setError('Please Enter Player 1 Name');
              }
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#fff',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isOpen1}>
        <View
          style={{
            borderRadius: 10,
            padding: 20,
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Please Enter Player 2 Name
          </Text>
          <View style={{marginVertical: 20}}>
            <TextInput
              value={player2}
              onChangeText={(text) => {
                if (text.length !== 0) {
                  setError('');
                }
                setPlayer2(text);
              }}
              style={{
                paddingHorizontal: 10,
                borderRadius: 5,
                paddingVertical: 5,
                borderWidth: 1,
                fontSize: 18,
                fontWeight: '500',
                borderColor: error ? 'red' : 'gray',
              }}
            />
            {!!error && (
              <Text style={{color: 'red', paddingVertical: 4}}>{error}</Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              alignSelf: 'flex-end',
              backgroundColor: '#007bff',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              if (player2.length > 0) {
                setIsOpen1(false);
                const randomValue = Math.round(Math.random());
                setCurrrentTurn(randomValue === 0 ? 'player1' : 'player2');
              } else {
                setError('Please Enter Player 2 Name');
              }
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#fff',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default App;
