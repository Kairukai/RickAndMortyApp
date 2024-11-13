import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CharacterCard = ({ character }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.status}>{character.status}</Text>
      <Text style={styles.details}>{character.species} - {character.gender}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%', // Adjust this for 2 columns per row
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  status: {
    color: 'green',
  },
  details: {
    color: 'gray',
  },
});

export default CharacterCard;
