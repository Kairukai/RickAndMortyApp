import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ setSearchTerm }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search for a character..."
      onChangeText={text => setSearchTerm(text)}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default SearchBar;
