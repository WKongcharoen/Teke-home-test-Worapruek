import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { SocketIo } from './src/socket';
import Main from './src/screens/main/Main';

export default function App() {

  const [socket] = useState(SocketIo);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'rgb(72 84 109)',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Main />
      <StatusBar style="auto" />
    </View>
  );
}
