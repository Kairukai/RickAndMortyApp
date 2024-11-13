import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CharacterList from './screens/CharacterList';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <CharacterList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
