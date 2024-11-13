import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SortButton = ({ setSorted }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setSorted(prev => !prev)}
    >
      <Text style={styles.buttonText}>SORT A-Z</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SortButton;
