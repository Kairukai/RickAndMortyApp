import React from 'react';
import { SafeAreaView } from 'react-native';
import CharacterList from './screens/CharacterList'; // Adjust the path as needed

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CharacterList />
    </SafeAreaView>
  );
}

export default App;
