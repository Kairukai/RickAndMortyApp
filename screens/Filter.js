import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Filter = ({ setFilters }) => {
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.filterContainer}>
      <Text>Filter</Text>
      <Picker
        selectedValue=""
        style={styles.picker}
        onValueChange={value => handleFilterChange('gender', value)}
      >
        <Picker.Item label="Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <Picker
        selectedValue=""
        style={styles.picker}
        onValueChange={value => handleFilterChange('species', value)}
      >
        <Picker.Item label="Species" value="" />
        <Picker.Item label="Human" value="Human" />
        <Picker.Item label="Alien" value="Alien" />
      </Picker>
      <Picker
        selectedValue=""
        style={styles.picker}
        onValueChange={value => handleFilterChange('status', value)}
      >
        <Picker.Item label="Status" value="" />
        <Picker.Item label="Alive" value="Alive" />
        <Picker.Item label="Dead" value="Dead" />
        <Picker.Item label="unknown" value="unknown" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default Filter;
