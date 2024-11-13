import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './FilterStyles';

const Filter = ({ setFilters }) => {

  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('');

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    
    // Update local state based on the selected filter
    if (field === 'gender') setGender(value);
    if (field === 'species') setSpecies(value);
    if (field === 'status') setStatus(value);
  };

  const clearFilters = () => {

    setFilters({ gender: '', species: '', status: '' });

    setGender('');
    setSpecies('');
    setStatus('');
  };

  return (
    <View style={styles.filterContainer}>
      <Text>Filter</Text>

      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={value => handleFilterChange('gender', value)}
      >
        <Picker.Item label="Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <Picker
        selectedValue={species}
        style={styles.picker}
        onValueChange={value => handleFilterChange('species', value)}
      >
        <Picker.Item label="Species" value="" />
        <Picker.Item label="Human" value="Human" />
        <Picker.Item label="Alien" value="Alien" />
      </Picker>

      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={value => handleFilterChange('status', value)}
      >
        <Picker.Item label="Status" value="" />
        <Picker.Item label="Alive" value="Alive" />
        <Picker.Item label="Dead" value="Dead" />
        <Picker.Item label="unknown" value="unknown" />
      </Picker>

      <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
        <Text style={styles.clearButtonText}>Clear Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;
