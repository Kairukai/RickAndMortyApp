import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CharacterCard = ({ character, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.status}>{character.status}</Text>
      <Text style={styles.details}>{character.species} - {character.gender}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontSize: 12,
    color: 'green',
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    color: 'gray',
  },
});

export default CharacterCard;
